var gost={
	
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
        var dx=this.x-pacman.x;
        var dy=this.y-pacman.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
	{
		pacman.mort=true;
		document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
    }

		canvasContext.save();
		canvasContext.drawImage(imageGost[0],
								0,0,tailleCelluleLaby,tailleCelluleLaby,
								this.x,this.y,tailleCelluleLaby,tailleCelluleLaby);
		canvasContext.restore();
        var dx=this.x-pacman.x;
        var dy=this.y-pacman.y;

		if(((dx**2)+(dy**2)) < distanceCollision )
	{
		pacman.mort=true;
		document.getElementById("message").innerHTML="Desmark-Dev est mort";
	
    }
   
},

    
  
}