const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext('2d');

//make rectangle for the little apple
let appleImage = new Image();
appleImage.onload = function() {
    ctx.drawImage(appleImage, 70, 50, 25, 25);

};
appleImage.src = "../Project 0/apple.png";


//make a retangle
// ctx.fillStyle = "green";
// ctx.fillRect(100, 300, 30, 30);

//this is our unit base to move through board
//makes 2d array more managable for the array the snake is
let box = 32;

//array variable set in global scope for snake body
let snake = []
snake[0]={x: 9*box, y: 10*box};

//place them random  apples
let eatApple = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
};

//How many blue apples have you eaten
let score = 0;

//controls for our young blood
let direction;
document.addEventListener("keydown", uDLR);

function uDLR(event){
    let key = event.keyCode;
    if( key == 37 && direction != "R"){
        direction = "L";
    }else if(key == 38 && direction != "D"){
        direction = "U";
    }else if(key == 39 && direction != "L"){
        direction = "R";
    }else if(key == 40 && direction != "U"){
        direction = "D";
    }
}

console.log("made it");
//this re draws snake, score, apples
function draw(){
    for(let i = 0; i < snake.length; i++){
        if(i == 0){
            ctx.fillStyle = "green";
        }
        else{
            ctx.fillStyle = "purple";
        }
        ctx.fillRect(snake[i].x,snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y, box, box)
    }

    //previos head position
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    //pop the last postion
    snake.pop();

    switch(direction){
        case "L":
            snakeHeadX -= box;
            break;
        case "U":
            snakeHeadY -= box;
            break;
        case "R":
            snakeHeadX += box;
            break;
        case "D":
            snakeHeadY += box;
            break;
    }

    let newHead = {
        x: snakeHeadX,
        y: snakeHeadY
    }

    snake.unshift(newHead);

    ctx.drawImage(appleImage, eatApple.x,eatApple.y);
    ctx.fillStyle = "white";
    ctx.font = "25px Changa One";
    ctx.fillText(score,box,box);
}

let game = setInterval(draw(), 100);

const pageColor=document.querySelector('body'); 
const randColor=document.getElementById('randColor');



randColor.addEventListener('click', () => { 
  var rannumber1=Math.floor(Math.random() * 256 ); 
  var rannumber2=Math.floor(Math.random() * 256 ); 
  var rannumber3=Math.floor(Math.random() * 256 ); 
  var ranrgb="rgb("+rannumber1+","+rannumber2+","+rannumber3+")";
  pageColor.style.backgroundColor=ranrgb;
 });