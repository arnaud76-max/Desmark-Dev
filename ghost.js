////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATION DU GOST 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gost={
	
	x:0,
	y:0,
	direction:6,
	vitesse:2,
	
	init(paramLevel) 
	{
		this.x=8*tailleCelluleLaby;
		this.y=4*tailleCelluleLaby;
	},
//Direction et vitesse des fantome//
	update(paramLevel)
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
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
				{
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
//Directiopn par case du fantome//
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
		canvasContext.drawImage(imageGost[0],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
        var dx=this.x-desmarkDev.x;
        var dy=this.y-desmarkDev.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
		{
		desmarkDev.mort=true;
		document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
   		}
	 }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATION DU GOST 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gost2=
{
	
	x:0,
	y:0,
	direction:4,
	vitesse:2,
	
	init(paramLevel) 
	{
		this.x=8*tailleCelluleLaby;
		this.y=4*tailleCelluleLaby;
	},
		//Direction et vitesse des fantome//
	update(paramLevel)
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
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
				{
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
//Direction par case du fantome//
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
		canvasContext.drawImage(imageGost[1],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
        var dx=this.x-desmarkDev.x;
        var dy=this.y-desmarkDev.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
		{
		desmarkDev.mort=true;
		document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
    	}

	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATION DU GOST 3
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gost3=
{
	
	x:0,
	y:0,
	direction:8,
	vitesse:2,
	
	init(paramLevel) 
	{
		this.x=8*tailleCelluleLaby;
		this.y=4*tailleCelluleLaby;
	},
//Direction et vitesse des fantome//
	update(paramLevel)
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
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
				{
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
               //Directiopn par case du fantome//
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
		canvasContext.drawImage(imageGost[2],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
        var dx=this.x-desmarkDev.x;
        var dy=this.y-desmarkDev.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
		{
		desmarkDev.mort=true;
		document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
   		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATION DU GOST 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var gost4=
{
	
	x:50,
	y:50,
	direction:4,
	vitesse:2,
	
	init(paramLevel) 
	{
		this.x=8*tailleCelluleLaby;
		this.y=4*tailleCelluleLaby;
	},
//Direction et vitesse des fantome//
	update(paramLevel)
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
				var demiTour=(this.direction<<2);if(demiTour>15) demiTour>>=4;
				this.direction=2**Math.floor(Math.random()*4);
				while(this.direction==demiTour || paramLevel.labyrinthe[parseInt(this.y/tailleCelluleLaby)][parseInt(this.x/tailleCelluleLaby)]&this.direction)
				{
					this.direction=2**Math.floor(Math.random()*4);
				}
			}
			this.x=(parseInt(this.x/tailleCelluleLaby))*tailleCelluleLaby;
			this.y=(parseInt(this.y/tailleCelluleLaby))*tailleCelluleLaby;
		}
//Directiopn par case du fantome//
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
			canvasContext.drawImage(imageGost[3],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
			canvasContext.restore();
        	var dx=this.x-desmarkDev.x;
        	var dy=this.y-desmarkDev.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
		{
			desmarkDev.mort=true;
			document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
   		}
	}
}


