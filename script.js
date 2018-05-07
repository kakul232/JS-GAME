var canvas= document.getElementById('myId');
var context= canvas.getContext('2d');
// ball Propertied
var ballRadious=10;
var ballColour="red"
var x= canvas.width/2;
var y=canvas.height-30;
var dx= 2;
var dy= -2;

// Paddle Properties
var paddleheight= 10;
var paddlewidth= 100;
var paddlex=canvas.width/2;
var paddley=canvas.height-paddleheight;
var padleSpeed= 7;
var Move=2;
// Bricks property

var BrikesHeight=30;
var BrikesWidth=100;
var BricksRow=5;
var BricksCol=5;

var Bricks=[];
var score=0;
var lives=5;

for(c=0;c<BricksCol;c++){
    Bricks[c]=[];
    for(r=0;r<BricksRow;r++){
        Bricks[c][r]= {x:0,y:0,status:1};
    }
}


function drawBall(){
    context.beginPath();
    context.arc(x,y,ballRadious,0,Math.PI*2);
    context.fillStyle=ballColour;
    context.fill();
    context.closePath();
   
}


function drawPaddle(){
    
    context.beginPath();
    context.rect(paddlex,paddley , paddlewidth,paddleheight);
    context.fillStyle="red";
    context.fill();
    context.closePath();
}

function drawBricks(){
    var count = 0;
    for(c=0;c<BricksCol;c++){
        for(r=0;r<BricksRow;r++){
            if(Bricks[c][r].status ==1 ){
            Bricks[c][r].x=(c*BrikesWidth+BrikesWidth) + 30;
            Bricks[c][r].y=(r*BrikesHeight+BrikesHeight) + 10
            console.log(Bricks);
            context.beginPath();
            context.rect(Bricks[c][r].x,Bricks[c][r].y , BrikesWidth,BrikesHeight);
            context.fillStyle="red";
            context.strokeStyle="#000";
            context.fill();
            context.stroke();
            context.closePath();
            count +=1;
            }
        }
    }
  
    console.log(count);
  
}

function destroyBrick(){
    for(c=0;c<BricksCol;c++){
        for(r=0;r<BricksRow;r++){
            var b= Bricks[c][r];
            if(x> b.x && x< b.x+BrikesWidth && y>b.y && y < b.y+BrikesHeight && b.status ==1){
                dy = -dy;
                b.status=0;
                score++;
                if(score >= (BricksCol*BricksRow)){
                    alert('You Win ! Score : '+ score);
                    document.location.reload();
                }
            }
        }
    }
}

function drawScore(){
    context.beginPath();
    context.font="16px Arial";
    context.fillStyle="red";
    context.fillText("Score: "+score,8,20);
    context.closePath();
}
function drawLives(){
    context.beginPath();
    context.font="16px Arial";
    context.fillStyle="red";
    context.fillText("Lives: "+lives,canvas.width/2,20);
    context.closePath();
}


function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    destroyBrick();
    drawBricks();
    drawScore();
    drawLives();
   
    if( y+ dy < ballRadious) {
        dy = -dy;
    }else if (y + dy > canvas.height-10){
        if(x > paddlex && x < paddlex + paddlewidth ){
            dy = -dy;
        }else{
            lives--;
            if(!lives){
            alert('GAME OVER');
            document.location.reload();
            }else{
                 x= canvas.width/2;
                 y=canvas.height-30; 
                 dy = -dy;
            }
        }
       
    }

    if( x + dx > canvas.width-10 || x+ dx < ballRadious) {
        dx = -dx;
    }
    x +=dx;
    y += dy; 

    requestAnimationFrame(draw);
}


document.addEventListener("keydown", arrowpress);
document.addEventListener("mousemove", mousemove);




function arrowpress(e){
    
    var event = window.event ? window.event : e;
    // Left
    if (event.keyCode == '37' && paddlex > 0) {
        
            drawPaddle();
            paddlex = paddlex - padleSpeed; 
        
        
    }
    // Right
    if (event.keyCode == '39'  && paddlex < canvas.width-paddlewidth) {
        
            drawPaddle();
            paddlex = paddlex + padleSpeed; 
        
    }

}

    function mousemove(e){
        var relativex= e.clientX;
        if(relativex > 0 && relativex < canvas.width){
        paddlex = relativex - paddlewidth/2;
        } 
        
    }

    draw();