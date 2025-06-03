const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let currentLevel = 0;
let x = 0;
//let dx = 5;
let y = 0;
//let dy =1; 
let score = 0;
let gameRunning = true;
let jump = 100;
//this is an object
//we access values in an object like  this:
//player.x 
const player = {
    //key:value pair
    x : 1400,
    y : 680,
    color: 'blue',
    speed: 3
};
const walls = [
{x: 0, y:680, width: 1350, height: 20},
{x: 175, y: 100, width: 10, height: 700},
{x: 350, y: 0, width: 10, height: 600},
{x: 525, y: 100, width: 10, height: 700},
{x: 700, y: 0, width: 10, height: 600},
{x: 875, y: 100, width: 10, height: 700},
{x: 1050, y: 0, width: 10, height: 600},
{x: 1225, y: 100, width: 10, height: 700}];
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

function drawPlayer(){
ctx.fillStyle = player.color;
    ctx.fillRect(player.x - 20,player.y - 20,40,40);
    //ctx.fill();

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
    //if(keys['ArrowDown']){
       // player.y += player.speed;
   // }
    if(keys['ArrowUp']&& jump > 30){
        player.y -= player.speed;
	jump -= player.speed;
    }
if(player.y > 679 && jump < 30){
jump = 100;
}
    if(jump < 30 && player.y < 680){
player.y += 2;
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
function animate() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
    //`gameRunning` tracks the game state. 
    //when it becomes false, game over
    //so we'll only update score, move shapes, etc
    //as long as gameRunning is true
    if(gameRunning){
        score++;
        drawScore();
        drawWalls();
        movePlayer();
        drawPlayer();
       checkWallCollision();
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

document.addEventListener('keydown', handleKeyPress);

//This is a shorthand way to define and use a function
// at the same time. We call this
//an "arrow function"
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
animate();{
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawWalls();
checkWallCollision();
}
