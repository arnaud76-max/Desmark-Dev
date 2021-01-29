


//Hauteur et  largeur du labyrinthe avec une taille de cellule de 50 X 50 //

var score =0;
const largeurLaby=17;

const hauteurLaby=9;

const tailleCelluleLaby=50;

const taillePacman=50;

const distanceCollision=((taillePacman**2)+(taillePacman**2));

const canvasWidth=largeurLaby*tailleCelluleLaby;

const canvasHeight=hauteurLaby*tailleCelluleLaby;

var canvasContext;

var mort=false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LE LABYRINTHE BINAIRE
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var laby1 =[[ 9, 5, 1, 1, 5, 1, 5, 1, 1, 1, 5, 1, 1, 5, 5, 5,  3],  //les différentes cases pour construire le laby
			[10, 0,12, 2, 0,10, 0, 8, 0, 2, 0, 8, 6, 0, 0, 0, 10],
			[10, 0, 0,14, 0,10, 0, 8, 4, 2, 0, 10,0, 13, 5, 1, 2],
			[10, 0, 0, 0, 0,10, 0,10, 0,10, 0, 8, 3, 0, 0, 12, 2],
			[10, 0, 0, 0, 0,10, 0,14,0, 14, 0, 8, 0, 1, 0, 0, 10],
			[10, 0,11, 0, 0,10, 0, 0,11, 0, 0, 8, 0, 2, 0, 0, 10],
			[10, 0,10, 0, 0,10, 0, 0,10, 0, 0, 8, 4, 6, 0, 0, 10],
			[10, 0, 8, 3, 0,10, 0, 9, 0, 3, 0,10, 0, 0, 0, 9,  2],
			[12, 5, 4, 4, 5, 4, 5, 4, 4, 4, 5, 4, 5, 5, 5, 4,  6],
];
var level=0;
var definitionLevel=[ 
						{labyrinthe:laby1,startX:9,startY:0,direction:9},
				];
// Chargement des images des murs et leur position dans l'objet laby1//  
var imageMur;
function start()
{
    imageMur=loadImage([	"asset/mur0.png",
							"asset/mur1.png",
							"asset/mur2.png",
							"asset/mur3.png",
							"asset/mur4.png",
							"asset/mur5.png",
							"asset/mur6.png",
							"asset/mur7.png",
							"asset/mur8.png",
							"asset/mur9.png",
							"asset/mur10.png",
							"asset/mur11.png",
							"asset/mur12.png",
							"asset/mur13.png",
							"asset/mur14.png",
							"asset/mur15.png"],endLoadMur);
}

var imagePacman;
function endLoadMur() 
{
	imagePacman=loadImage([		"asset/curseur.png",
								"asset/curseur2.png"],endLoadPacman);
}
//Chargement des images  fantomes//
var imageGost;
function endLoadPacman() {
	imageGost=loadImage([		"asset/fantome1.png",
								"asset/fantome2.png",
								"asset/fantome3.png",
								"asset/fantome4.png"],endLoadGost);	
}
var imageBonus;
function endLoadBonus()
{
	imageBonus=loadImage([
								"asset/pinceau.png",
								"asset/potdepeinture.png",
								"asset/superpacgomme.png"],endLoadMur);	
	
}
function endLoadGost()
{
	
    document.getElementById("presentation").style.display="none";
	document.getElementById("jeu").style.display="";
	document.getElementById("saisieHiscore").style.display="none";

	var canvas=document.getElementById("canvas");
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;		
	canvasContext=canvas.getContext("2d");
	document.getElementById("canvas").style.display="";
	
	desmarkDev.init(definitionLevel[level]);
	gost.init(definitionLevel[level]);
	gost2.init(definitionLevel[level]);
	gost3.update(definitionLevel[level]);
	gost4.update(definitionLevel[level]);
	createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);

	loopMain();
}
var nbPillule=0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction loop
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loopMain() 
{
	var cptFrame;
	var nbPillule=drawLaby(definitionLevel[level].labyrinthe);
	desmarkDev.update(definitionLevel[level]);
	gost.update(definitionLevel[level]);
	gost2.update(definitionLevel[level]);
	gost3.update(definitionLevel[level]);
	gost4.update(definitionLevel[level]);
	document.getElementById("message").innerHTML = score + " / " + nbPillule ; 
	
	if(cptFrame>120){
		for (var ligne=0;ligne<hauteurLaby;ligne++)
		{
			for(var colonne=0;colonne<largeurLaby;colonne++)
			{
				var bonus=definitionLevel[level].labyrinthe[colonne] [ligne]>>9;
				if(bonus&1 && Math.random()>.3)
				{
					definitionLevel[level].labyrinthe[colonne] [ligne] >>9;
				}
			}
		}
	}
		if(desmarkDev.mort)
			desmarkDev.vie--;
		if(desmarkDev.vie==0)
		{
			return;
		}
	
	   if(!nbPillule || desmarkDev.mort) 
	    {
		desmarkDev.mort=false;
		desmarkDev.init(definitionLevel[level]);
		createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);
	   }
		setTimeout(loopMain,1000/60);
}

const delaiDemandeMax=20;
// Création de la class pac-man //
var desmarkDev=
{
	bonus:0,
	bonus2:0,
	bonus3:0,
	x:0,
	y:0,
	direction:0,
	derniereDirection:0,
	directionDemande:0,
	delaiDemande:0,
	vitesse:5,
	vitesseAnim:6,
	vAnim:0,
	noAnim:0,
	vie:3,
	mort:false,
	
	init(paramLevel) 
	{
		this.x=paramLevel.startX*tailleCelluleLaby;
		this.y=paramLevel.startY*tailleCelluleLaby;
		this.directionDemande=this.direction=this.derniereDirection=paramLevel.direction;
		this.delaiDemande=-30;
	},
	// Dépalcement du pac-man avec la condition du joystick//
	update(paramLevel)
	{

		if(this.delaiDemande>=0) 
		{
			 if(joystick&1) 
			{
				this.directionDemande=1;
				this.delaiDemande=delaiDemandeMax;
			} 
			 else if(joystick&2) 
			{
				this.directionDemande=2;
				this.delaiDemande=delaiDemandeMax;
			} 
			 else if(joystick&4) 
			{
				this.directionDemande=4;
				this.delaiDemande=delaiDemandeMax;
			}
			  else if(joystick&8) 
			{
				this.directionDemande=8;
				this.delaiDemande=delaiDemandeMax;
			}
		}
				
		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) 
		{
			if(this.delaiDemande>0) 
			{
				if((paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.directionDemande)==0) {
					this.direction=this.directionDemande;
					this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
					this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
				}
			} 
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) {
				this.direction=0;
				this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
				this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
			}
		}
		if(this.delaiDemande>0)
			this.delaiDemande--;
		else if(this.delaiDemande<0)
			this.delaiDemande++;
			
		switch(this.direction)
		{
			case 1:
			 this.y-=this.vitesse;
			 break;
			case 2:
			 this.x+=this.vitesse;
			 break;
			case 4:
			 this.y+=this.vitesse;
			 break;
			case 8:
			 this.x-=this.vitesse;
			 break;
		}

		var dx=this.x-paramLevel.startX*tailleCelluleLaby;
		//    Test de collision avec Pacman
		 // Gestion de déplacement  et direction du pac-man//

		canvasContext.save();
		if(this.derniereDirection&8) 
		{
			canvasContext.scale(-1,1);
			canvasContext.translate((-this.x*2)-tailleCelluleLaby,0);
		}
		 else if(this.derniereDirection&4) 
		{
			canvasContext.translate(this.x+this.y+tailleCelluleLaby,this.y-this.x);
			canvasContext.rotate(Math.PI/2);			
		} 
		else if(this.derniereDirection&1)
		{
			canvasContext.translate(-this.y+this.x,this.x+this.y+tailleCelluleLaby);
			canvasContext.rotate(-Math.PI/2);
		}		
		if(this.direction) 
		{
			this.derniereDirection=this.direction;
			if(this.vAnim>0) 
			{ 
				this.vAnim--;
			} 
			else 
			{
				this.vAnim=this.vitesseAnim;
				this.noAnim=(this.noAnim+1)%imagePacman.length;
			}
		} 
		else 
		{
			this.noAnim=this.vAnim=0;
		}
		canvasContext.drawImage(imagePacman[this.noAnim],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		
		var xPillule=parseInt(this.x/tailleCelluleLaby);
		var yPillule=parseInt(this.y/tailleCelluleLaby);
		if(paramLevel.labyrinthe[yPillule][xPillule]&(1<<4))
        {
            paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(1<<4);
            score++;
        }

        // pièce de droite
        if( (this.direction&10) && (this.x%tailleCelluleLaby)>4 && paramLevel.labyrinthe[yPillule][xPillule]&(2<<4) )
        {
            paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(1<<4);
            score++;
        }

        // pièce du sud
        if( (this.direction&5) && (this.y%tailleCelluleLaby)>4 && paramLevel.labyrinthe[yPillule][xPillule]&(4<<4) )
        { 
            paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(4<<4);
            score++;
		}
		

		document.getElementById("message").innerHTML = score + " / " + nbPillule; 
	}
}

// Couleur et position des pillules dans le labyrinthe//
function drawLaby(laby)
{

	var pillule;
	canvasContext.fillStyle="#ffffff";
	for(var ligne=0;ligne<hauteurLaby;ligne++)
	 {
		for(var colonne=0;colonne<largeurLaby;colonne++) 
		{
			var x=colonne*tailleCelluleLaby;
			var y=ligne*tailleCelluleLaby;
			canvasContext.drawImage(imageMur[laby[ligne][colonne]&15],
									0,0,tailleCelluleLaby,tailleCelluleLaby,
									x,y,tailleCelluleLaby,tailleCelluleLaby);
		}
	}

	var cptPillule=0;
	for(var ligne=0;ligne<hauteurLaby;ligne++) 
	{
		for(var colonne=0;colonne<largeurLaby;colonne++)
		 {
			var x=colonne*tailleCelluleLaby;
			var y=ligne*tailleCelluleLaby;
			pillule=(laby[ligne][colonne]>>4)& 15;
			if(pillule&1) 
			{
				canvasContext.fillRect(x+(tailleCelluleLaby/2)-2,y+(tailleCelluleLaby/2)-2,4,4);
				cptPillule++;
			}
			if(pillule&2)
			 {
				canvasContext.fillRect(x+tailleCelluleLaby-2,y+(tailleCelluleLaby/2)-2,4,4);
				cptPillule++;
			}
			if(pillule&4)
			 {
				canvasContext.fillRect(x+(tailleCelluleLaby/2)-2,y+tailleCelluleLaby-2,4,4);
				cptPillule++;
			}
		}
	}
	return cptPillule;
}

function createPillules(laby,x,y)
 {
	laby[y][x]|=1<<4;
	laby[y][x]|=1<<7;
	if(!(laby[y][x]&2)) laby[y][x]|=2<<4;
	if(!(laby[y][x]&4)) laby[y][x]|=2<<4;
	if(!(laby[y][x]&1) && !(laby[y-1][x]&(1<<4))) createPillules(laby,x,y-1);
	if(!(laby[y][x]&2) && !(laby[y][x+1]&(1<<4))) createPillules(laby,x+1,y);
	if(!(laby[y][x]&4) && !(laby[y+1][x]&(1<<4))) createPillules(laby,x,y+1);
	if(!(laby[y][x]&8) && !(laby[y][x-1]&(1<<4))) createPillules(laby,x-1,y);
}
 




