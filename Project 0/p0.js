//Button for random background color
const pageColor=document.querySelector('body'); 
const mybutton=document.getElementById('randButt');

function randColor() {
    let colorPick = "#";
  for(let i = 0; i < 6; i++){
      colorPick += Math.floor((Math.random() * 16)).toString(16);
  }
    return colorPick;
  }
  
  //onClick event listner
  mybutton.addEventListener('click', () => {
      pageColor.style.backgroundColor= randColor(); 
  
    });

//scetting up the canvas for the gameBoard
const cvs = document.getElementById("gameBoard");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "../Project 0/groundWork.png";

const foodImg = new Image();
foodImg.src = "../Project 0/apple.png";

//make that slithery snake at position 9/10 from box 
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};



let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//declare score and speed
let score = 0;
let speed = 0;

//event listner for key press variable
let keyPress;
document.addEventListener("keydown",direction);

//set key directions based on conditions
function direction(event){
    let key = event.keyCode;
    if( key == 37 && keyPress != "R"){
        keyPress = "L";
    }else if(key == 38 && keyPress != "D"){
        keyPress = "U";
    }else if(key == 39 && keyPress != "L"){
        keyPress = "R";
    }else if(key == 40 && keyPress != "U"){
        keyPress = "D";
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


function draw(){
    ctx.drawImage(ground,0,0);
    for(let i = 0; i < snake.length; i++){
        if(i == 0){
            ctx.fillStyle = randColor();
        }
        else{
            ctx.fillStyle = "black";
        }
        //at this position XY fill a box 32/32 for snake
        ctx.fillRect(snake[i].x,snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y, box, box)
    }
    
    //draw apple logo randomly
    // based on Math.random and box dimensions
    ctx.drawImage(foodImg, food.x, food.y);
    
    //hold position for head
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;


    
    
    //when snake eats apple 
    if(snakeHeadX == food.x && snakeHeadY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }

    /*set the new head acorrding to the move
    by adding or removing a box depending on
    direction works onevnt listner*/
    switch(keyPress){
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
    
    //create new Head with new pos
    let newHead = {
        x : snakeHeadX,
        y : snakeHeadY
    }
    
    //end game if
    if(snakeHeadX < box || snakeHeadX > 17 * box 
        || snakeHeadY < 3*box || snakeHeadY > 17*box 
        || collision(newHead,snake)){
        clearInterval(game);
        alert("Game over");
        document.location.reload();
    }
    
    //move new head to the front by unshifting
    snake.unshift(newHead);
    
    //score font and color
    ctx.fillStyle = "green";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    ctx.clearText();

    //speed up based on score
    //speed+=score
}

/*set variable to clear game when collision occurs
set game speed
*/
let game = setInterval(draw, 200);














