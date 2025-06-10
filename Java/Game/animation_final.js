const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const justPressed = {};
let mEndTutorial = false;
let t = 120;
let mtutorial = true;
let currentLevel = 0;
let x = 0;
let dx = 10;
let y = 0;
let dy =2; 
let score = 0;
let gameRunning = false;

//this is an object
//we access values in an object like  this:
//player.x 
const player = {
    //key:value pair
    x : 1400,
    y : 200,
    color: 'green',
    speed: 10
};
const walls = [
{x: 175, y: 100, width: 10, height: 700},
{x: 350, y: 0, width: 10, height: 600},
{x: 525, y: 100, width: 10, height: 700},
{x: 700, y: 0, width: 10, height: 600},
{x: 875, y: 100, width: 10, height: 700},
{x: 1050, y: 0, width: 10, height: 600},
{x: 1225, y: 100, width: 10, height: 700}];
function tutorial(){
//Text for the rules
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Rules:", canvas.width/2, canvas.height/2 - 100);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "25px Arial";
ctx.fillText("Use arrow up key to go up, arrow left key to go left, arrow right key to go to the right, and arrow down key to go down", canvas.width/2, canvas.height/2);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "40px Arial";
ctx.fillText("type 'e' to exit the tutorial, and it will also boost your jump in the next level", canvas.width/2, canvas.height/2 +100);
}
function endTutorial(){
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Thanks for reading the tutorial!", canvas.width/2, canvas.height/2);
}

function drawWalls(){
walls.forEach(wall => {
ctx.fillStyle = "red";
ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});}
//this is also an object. We'll add the keys later.
//we access values from this kind of object
//like this:
//  keys['ArrowUp']
//Every time a key is pressed or released, we'll update this object
//if a key is currently being pressed, that key will be set to True.
//When the key is released, it will be set to False.
const keys = {};

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    //ctx.fill();
}

function drawPlayer(){
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x,player.y,20,0,2*Math.PI);
//accessing the variable called x inside the player object
    ctx.fill();
}

//This function moves the player based on the
//values inside the `keys` object. We check each of
//ArrowUp, ArrowDown, etc, and move the player accordingly
function movePlayer(){
    //note this if statement is kind of interesting. keys['ArrowDown']
    //is already a true/false value(boolean), so we don't need a comparison
    //this is equivalent to saying
    //if(keys['ArrowDown']==true)
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft'] && player.x > -15){
        player.x -= player.speed;
    }
    if(keys['ArrowRight'] && player.x < 1430){
        player.x += player.speed;
    }
    //TODO: what  happens if the player
    //goes off the edge of the screen??
    if(player.y < 0){
        player.y = 700;
    }
    if (player.y > 700){
        player.y = 0;
    }
}
function checkWallCollision() {
    for (let wall of walls) {
        const playerMinX = player.x - 20;
        const playerMaxX = player.x + 20;
        const playerMinY = player.y - 20;
        const playerMaxY = player.y + 20;

        const wallMinX = wall.x;
        const wallMaxX = wall.x + wall.width;
        const wallMinY = wall.y;
        const wallMaxY = wall.y + wall.height;

        const isColliding = (
            playerMaxX > wallMinX &&
            playerMinX < wallMaxX &&
            playerMaxY > wallMinY &&
            playerMinY < wallMaxY
        );

        if (isColliding) {
            gameRunning = false;
        }
    }
}

function drawScore(){
    ctx.font = "10px Arial";
    ctx.fillText(score, 10,10);
}

function moveBox(){
        // This code handles the position of the bouncing box.
        x = x + dx;
        y = y + dy;

        if(x > 1430){
            dx = dx * -1;
        }
        if(x < 0){
            dx = dx * -1;
        }
        if(y > 700){
            dy = dy * -1;
        }
        if(y < 0){
            dy = dy * -1;
        }
}

function checkCollision(){
    //this is the AABB method
    
    //first, I'm going to make some helper variables
    let player_min_x = player.x - 20;
    let player_max_x = player.x + 20;
    let player_min_y = player.y - 20;
    let player_max_y = player.y + 20;

    let box_min_x = x;
    let box_max_x = x + 50;
    let box_min_y = y;
    let box_max_y = y + 50;

    if(box_max_y > player_min_y
        && box_min_y < player_max_y
        && box_max_x > player_min_x
        && box_min_x < player_max_x){
        gameRunning = false;
    }
}
function resetGame(){
if(animationId){
cancelAnimationFrame(animationId);
}
gameRunning = true;
player.speed = 7;
score = 0;
player.x = 1400;
player.y = 200;
requestAnimationFrame(animate);
}
function loadLevel(levelIndex){
const level = levels[levelIndex];
player.x = level.playerStart.x;
player.y = level.playerStart.y;}
function gameOver(){
ctx.fillStyle = "white";
ctx.font = "100px Arial";
ctx.textAlign = "center";
ctx.fillText("Game Over", canvas.width/2, canvas.height/2);

ctx.font = "30px Arial";
ctx.fillText("Press R to restart", canvas.width/2, canvas.height/2 + 100);
}

function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

if(mtutorial){
tutorial();
if(justPressed['e']){
mEndTutorial = true;
mtutorial = false;
delete justPressed['e'];}}
if(mEndTutorial){
endTutorial();
t--;}
if(t <= 0){
mEndTutorial = false;
gameRunning = true;
}
//`gameRunning` tracks the game state. 
    //when it becomes false, game over
    //so we'll only update score, move shapes, etc
    //as long as gameRunning is true
    if(gameRunning){
        score++;
        drawRect(x,y);
        drawScore();
        drawWalls();
        movePlayer();
        drawPlayer();
        moveBox();
        checkCollision();
       checkWallCollision();
    }
if(!gameRunning && !mtutorial && !mEndTutorial){
gameOver();
return;}
if(justPressed['r']){
resetGame();
}
    //this schedules the next call of this function for 1/60
    //of a second from now
    requestAnimationFrame(animate);
}

//This is the "event listner" that we'll attach to the DOM
//it automatically receives an input, e, which is the event
//and includes properties like which key was pressed 
function handleKeyPress(e){
    //as an early test to see which key was pressed, we wrote this:
    //console.log(e.key); 
    keys[e.key] = true;
}

document.addEventListener('keydown', (e) =>{
const key = e.key.toLowerCase();
if(!gameRunning && !mtutorial && key != 'r') return;
if(key === 'r' && !mEndTutorial && !mtutorial){
console.log("Restart key pressed");
resetGame();
return
}
if(!keys[e.key]){
justPressed[e.key] = true;
}
if(e.key === 'e' && !keys['e']){
justPressed['e'] = true;
keys['e'] = true;
}
keys[e.key] = true;
});
//This is a shorthand way to define and use a function
// at the same time. We call this
//an "arrow function"
document.addEventListener('keyup', (e) => {
if(e.key === 'e'){
keys[e.key] = false;
}
keys[e.key] = false;
});

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
animate();{
drawWalls();
checkWallCollision();
}
