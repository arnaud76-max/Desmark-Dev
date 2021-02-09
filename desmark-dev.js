
 
var score =0;
const largeurLaby=17;

const hauteurLaby=9;

const tailleCelluleLaby=50;

const taillePacman=35;

const distanceCollision=((taillePacman**1)+(taillePacman**1));

const canvasWidth=largeurLaby*tailleCelluleLaby;

const canvasHeight=hauteurLaby*tailleCelluleLaby;

var canvasContext;

var mort=false;


/*
 .----------------. .----------------. .----------------. .----------------. .----------------. .----------------. .-----------------..----------------. .----------------. .----------------. 
| .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. |
| |   _____      | | |      __      | | |   ______     | | |  ____  ____  | | |  _______     | | |     _____    | | | ____  _____  | | |  _________   | | |  ____  ____  | | |  _________   | |
| |  |_   _|     | | |     /  \     | | |  |_   _ \    | | | |_  _||_  _| | | | |_   __ \    | | |    |_   _|   | | ||_   \|_   _| | | | |  _   _  |  | | | |_   ||   _| | | | |_   ___  |  | |
| |    | |       | | |    / /\ \    | | |    | |_) |   | | |   \ \  / /   | | |   | |__) |   | | |      | |     | | |  |   \ | |   | | | |_/ | | \_|  | | |   | |__| |   | | |   | |_  \_|  | |
| |    | |   _   | | |   / ____ \   | | |    |  __'.   | | |    \ \/ /    | | |   |  __ /    | | |      | |     | | |  | |\ \| |   | | |     | |      | | |   |  __  |   | | |   |  _|  _   | |
| |   _| |__/ |  | | | _/ /    \ \_ | | |   _| |__) |  | | |    _|  |_    | | |  _| |  \ \_  | | |     _| |_    | | | _| |_\   |_  | | |    _| |_     | | |  _| |  | |_  | | |  _| |___/ |  | |
| |  |________|  | | ||____|  |____|| | |  |_______/   | | |   |______|   | | | |____| |___| | | |    |_____|   | | ||_____|\____| | | |   |_____|    | | | |____||____| | | | |_________|  | |
| |              | | |              | | |              | | |              | | |              | | |              | | |              | | |              | | |              | | |              | |
| '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' |
 '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' 
 */
//LE LABYRINTHE BINAIRE
var laby1 =[[9 , 5, 5, 5, 1, 5, 1, 5, 5, 5, 1, 5, 1, 5, 5, 5, 3],
            [10, 9, 1, 3,10,11,10, 9, 1, 3,10,11,10, 9, 1, 3,10],
            [10,12, 4, 6,10,10,10, 8, 0, 2,10,10,10, 12, 4, 6, 10],
            [8 , 5, 5, 5, 2,14,10,12, 4, 6,10,14, 8, 5, 5, 5, 2],
            [10, 13, 5, 7, 8, 1, 4, 5, 5, 5, 4, 1, 2, 13, 5, 7,10],
            [8 , 5, 5, 5, 4, 2, 9, 1, 1, 1, 3, 8, 4, 5, 5, 5, 2],
            [10, 9, 1, 1, 3, 10, 12, 4, 4, 4, 6,10, 9, 1, 1, 3,10],
            [10,12, 4, 4, 6,8 ,1 , 1, 1, 1, 1,2 , 12, 4, 4, 6,10],
            [12, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4 ,4 , 5, 5, 5, 5, 6],

];
var level=0;
var definitionLevel=[ 
						{labyrinthe:laby1,startX:8,startY:0,direction:8},
				];

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
function endLoadMur() {
	imagePacman=loadImage([		"asset/curseur.png",
								"asset/curseur2.png"],endLoadPacman);
}

var imageGost;
function endLoadPacman() {
	imageGost=loadImage([		"asset/fantome1.png",
								"asset/fantome2.png",
								"asset/fantome3.png",
								"asset/fantome4.png"],endLoadGost);	
}

var imageDessin;
var nbGost=4;
function endLoadGost() 
{
	imageDessin = loadImage([
								"asset/pinceau.png",
								"asset/potdepeinture.png",
								"asset/superpacgomme.png"],endLoadDessin);
	
}
function endLoadDessin()
{
	document.getElementById("presentation").style.display="none";
	document.getElementById("jeu").style.display="";
	document.getElementById("saisieHiscore").style.display="none";
	

	var canvas=document.getElementById("canvas");

	canvas.width=canvasWidth;
	canvas.height=canvasHeight;		
	canvasContext=canvas.getContext("2d");
	document.getElementById("canvas").style.display="";
	document.getElementById("message").innerHTML="test<br><img src='asset/fantome2.png'/><img src='asset/fantome3.png'/>";
	pacman.init(definitionLevel[level]);
	createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);
	
	
	gost=new Array();
	for(var i=0;i<nbGost;i++) 
	{
		var obj=new Object();
		obj.x=8*tailleCelluleLaby;
		obj.y=4*tailleCelluleLaby;
		obj.direction=4;
		obj.vitesse=2;
		obj.gestion=gostGestion;
		obj.img=imageGost[i%imageGost.length];
		obj.ia=function(){};
		gost.push(obj);		
	}
	gost[0].ia=gostImbecile;
	gost[1].ia=gostImbecile;
	gost[2].ia=gostUnpeuMoinsdebile;
	gost[3].ia=gostUnpeuMoinsdebile;


	var nbrDessin = 3;
	 Dessin = new Array();
	      for(var i=0;i<nbrDessin;i++) 
		{
			var obj=new Object();
			obj.x=8*tailleCelluleLaby;
			obj.y=4*tailleCelluleLaby;
			obj.img=imageDessin[i%imageDessin.length];
			Dessin.push(obj);
		}



	loopMain();

}

var nbPillule=0;
var cptFrame=0;
function loopMain() 
{
	
	cptFrame++;
	nbPillule=drawLaby(definitionLevel[level].labyrinthe);
	pacman.update(definitionLevel[level]);
	

	for(var i=0;i<gost.length;i++) gost[i].gestion(definitionLevel[level]);
	
	if(cptFrame>120)
	{
		
		var colonne=parseInt(Math.random()*largeurLaby);
		var ligne=parseInt(Math.random()*hauteurLaby);
		var	bonus = definitionLevel[level].labyrinthe[ligne][colonne]>>10;
		definitionLevel[level].labyrinthe[ligne][colonne]|=1<<8;

		cptFrame=0;
		
	}
	
	if(pacman.mort)
	 {
		pacman.nbVie--;
		if(pacman.nbVie==0) 
		{
			alert("GAME OVER");
			location.reload();
			// game over
			
			return;
		}
	}

	if(!nbPillule || pacman.mort) {
		pacman.mort=false;
		pacman.init(definitionLevel[level]);
		createPillules(definitionLevel[level].labyrinthe,definitionLevel[level].startX,definitionLevel[level].startY);
	}
	setTimeout(loopMain,1000/60);
}

const delaiDemandeMax=20;
var pacman=
{
	
	x:0,
	y:0,
	direction:0,
	derniereDirection:0,
	directionDemande:0,
	delaiDemande:0,
	vitesse:6,
	vitesseAnim:6,
	vAnim:0,
	noAnim:0,
	mort:false,
	score:0,
	nbVie:3,
	
	init(paramLevel) 
	{
		this.x=paramLevel.startX*tailleCelluleLaby;
		this.y=paramLevel.startY*tailleCelluleLaby;
		this.directionDemande=this.direction=this.derniereDirection=paramLevel.direction;
		this.delaiDemande=-30;
	},
	
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
				if((paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.directionDemande)==0) 
				{
					this.direction=this.directionDemande;
					this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
					this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
				}
			} 
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
			{
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

		canvasContext.save();
		if(this.derniereDirection&8) 
		{
			canvasContext.scale(-1,1);
			canvasContext.translate((-this.x*2)-tailleCelluleLaby,0);
		} else if(this.derniereDirection&4) 
		{
			canvasContext.translate(this.x+this.y+tailleCelluleLaby,this.y-this.x);
			canvasContext.rotate(Math.PI/2);			
		} else if(this.derniereDirection&1) 
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
			} else 
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
		// pillule du centre
		if(paramLevel.labyrinthe[yPillule][xPillule]&(1<<4)) 
		{
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(1<<4);
			this.score++;
		}
		// pillule de l'est
		if((this.direction&10) && (this.x%tailleCelluleLaby)>4 && paramLevel.labyrinthe[yPillule][xPillule]&(2<<4)) 
		{
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(2<<4);
			this.score++;
		} 
		// pillule du sud
		if((this.direction&5) && (this.y%tailleCelluleLaby)>4 && paramLevel.labyrinthe[yPillule][xPillule]&(4<<4)) 
		{
			paramLevel.labyrinthe[yPillule][xPillule]&=0xffff-(4<<4);
			this.score++;
		} 
		
		var html=this.score+"."+ nbPillule;
		for(var i=1;i<this.nbVie;i++) html+="<img src='asset/curseur2.png'/>";
		document.getElementById("message").innerHTML=html;
	},
};

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
			pillule=(laby[ligne][colonne]>>4);
			if(pillule&1) 
			{
				canvasContext.fillRect(x+(tailleCelluleLaby/2)-2,y+(tailleCelluleLaby/2)-2,4,4);
				cptPillule++;
			}
			if(pillule&2) 
			{
				canvasContext.fillRect(x+tailleCelluleLaby-2,y+(tailleCelluleLaby/2)-2,4,4);
				score++,
				cptPillule++;
			}
			if(pillule&4) 
			{
				canvasContext.fillRect(x+(tailleCelluleLaby/2)-2,y+tailleCelluleLaby-2,4,4);
				score++,
				cptPillule++;
			}
			
			if(pillule&16) 
			{
				canvasContext.fillRect(x+(tailleCelluleLaby/2)-8,y+(tailleCelluleLaby/2)-8,16,16);	
				score++;			
			}
		}
	}
	return cptPillule;
}

function createPillules(laby,x,y)
{
	laby[y][x]|=1<<4;
	laby[y][x]|=1<<7; // Cellule accessible par Pacman
	if(!(laby[y][x]&2)) laby[y][x]|=2<<4;
	if(!(laby[y][x]&4)) laby[y][x]|=4<<4;
	if(!(laby[y][x]&1) && !(laby[y-1][x]&(1<<4))) createPillules(laby,x,y-1);
	if(!(laby[y][x]&2) && !(laby[y][x+1]&(1<<4))) createPillules(laby,x+1,y);
	if(!(laby[y][x]&4) && !(laby[y+1][x]&(1<<4))) createPillules(laby,x,y+1);
	if(!(laby[y][x]&8) && !(laby[y][x-1]&(1<<4))) createPillules(laby,x-1,y);
}

var gostGestion=function(paramLevel) 
{
	
		if((this.x%tailleCelluleLaby)<this.vitesse && (this.y%tailleCelluleLaby)<this.vitesse) 
		{
			if(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
			 {
				while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) 
				{
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			 else 
			{
				this.ia(paramLevel);
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
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

		canvasContext.save();
		canvasContext.drawImage(this.img,
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
		
		// test la collision avec Pacman
		var dx=this.x-pacman.x;
		var dy=this.y-pacman.y;
		if( ((dx**1.5)+(dy**1.5)) <distanceCollision ) pacman.mort=true;
};


var gostImbecile=function(paramLevel) 
{
	this.direction=2**Math.floor(Math.random()*4);
	while(paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) 
	{
		this.direction=2**Math.floor(Math.random()*4);
	}
}

var gostUnpeuMoinsdebile=function(paramLevel)
 {
	var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
	this.direction=2**Math.floor(Math.random()*4);
	while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction) 
	{
		this.vitesse=2**Math.floor(Math.random()*4)
		this.direction=2**Math.floor(Math.random()*4);
	}
}


