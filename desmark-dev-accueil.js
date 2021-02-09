var reqAnimFrame = 
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;

var canvas=document.getElementById("canvas");

    canvas.width=canvasWidth;
    canvas.height=canvasHeight;		
    canvasContext=canvas.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var car = new Image();

/// when image is loaded, call this:
desc.onload = animate;

/// x and y cannot be used, in "worse" case use this but ideally
/// use a custom object to set x and y, store image in etc.
des._x = 40;
des._y = 60;
des.src = "asset/curseur2.png";

var speed = 5;

function animate(){

    des._y += speed;

    draw();
    reqAnimFrame(animate);
}

function draw(){

    /// clear background
    ctx.clearRect(0, 0, c.width, c.height);

    /// cannot draw a string, draw the image:
    ctx.drawImage(des, des._x, des._y);
}

/// don't start animate() here
//animate();