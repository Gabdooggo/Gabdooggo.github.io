const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const justPressed = {};
const maxBoostCooldown = 300; // 5 seconds (300 frames at 60fps)
let up = false;
let animationId = null;
let lastTime = null;
let collision = false;
let wins = false;
let win = false;
let t = 120;
let mEndTutorial = false;
let mtutorial = true;
let minBoostCooldown = 0;
let onPlatform = false;
let useBoost = true;
let usedDown = false;
let currentLevel = 0;
let x = 0;
//let dx = 5;
let y = 0;
//let dy =1; 
let score = 0;
let gameRunning = false;
let jump = 200;
let gravity = 0.5;
let time = 200;
//this is an object
//we access values in an object like  this:
//player.x 
if(collision && win){
wins = true;
}
function lol(){
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Womp, Womp", canvas.width/2, canvas.height/2);
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "50px Arial";
ctx.fillText("You have to make the challenge jump", canvas.width/2, canvas.height/2 + 100);
}
function wons(){
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Congrats, You Won!", canvas.width/2, canvas.height/2);
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "50px Arial";
ctx.fillText("Press 'r' to restart!", canvas.width/2, canvas.height/2 + 100);}
function tutorial(){
//Text for the rules
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Rules:", canvas.width/2, canvas.height/2 - 100);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "35px Arial";
ctx.fillText("Use arrow up key to jump up, arrow left key to go left, and arrow right key to go to the right", canvas.width/2, canvas.height/2);

ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "50px Arial";
ctx.fillText("type 'e' to exit the tutorial, and it also boosts your jump in game", canvas.width/2, canvas.height/2 +100);
}
function endTutorial(){
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "100px Arial";
ctx.fillText("Thanks for reading the tutorial!", canvas.width/2, canvas.height/2);
}
const player = {
    //key:value pair
    x : 1400,
    y : 680,
    color: 'blue',
    speed: 7
};
const walls = [
{x: 0, y:680, width: 1350, height: 20}
//{x: 175, y: 100, width: 10, height: 700},
//{x: 350, y: 0, width: 10, height: 600},
//{x: 525, y: 100, width: 10, height: 700},
//{x: 700, y: 0, width: 10, height: 600},
//{x: 875, y: 100, width: 10, height: 700},
//{x: 1050, y: 0, width: 10, height: 600},
//{x: 1225, y: 100, width: 10, height: 700}
];
const walld = [
{x: 1000, y: 580, width: 100, height: 10},
{x: 1250, y: 630, width: 100, height: 10},
{x: 800, y: 450, width: 100, height: 10},
{x: 650, y: 375, width: 100, height: 10},
{x: 500, y: 275, width: 100, height: 10}
];
const wallp = [
{x: 50, y: 150, width: 100, height: 10}];
const wallf = [
{x: 150, y: 650, width: 100, height: 10}
];
function drawWall(){
walld.forEach(wall => {
ctx.fillStyle = "black";
ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});}
function drawWallp(){
wallp.forEach(wall =>{
ctx.fillStyle = "black";
ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});}
function drawWalls(){
walls.forEach(wall => {
ctx.fillStyle = "red";
ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});}
function gwalls(){
wallf.forEach(wall =>{
ctx.fillStyle = "gold";
ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
});}
function drawCooldownMeter(){
const meterWidth = 100;
const cooldownWidth = (minBoostCooldown / maxBoostCooldown) * meterWidth;

// Background
ctx.fillStyle = "rgba(0,0,0,0.5)";
ctx.fillRect(50, 30, meterWidth, 10);

// Cooldown fill
ctx.fillStyle = useBoost ? "#00ff00" : "#ff0000";
ctx.fillRect(50, 30, meterWidth - cooldownWidth, 10);

// Text
ctx.fillStyle = "blue";
ctx.font = "15px Arial";
ctx.fillText("Boost (e)", 100,20);
}
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
function movePlayer(deltaTime){
const PLAYER_SPEED = 350; // pixels per second
const moveAmount = PLAYER_SPEED * deltaTime;
const safeDeltaTime = (deltaTime > 0.1) ? 0.016 : deltaTime;
    //note this if statement is kind of interesting. keys['ArrowDown']
    //is already a true/false value(boolean), so we don't need a comparison
    //this is equivalent to saying
    //if(keys['ArrowDown']==true)
  for (const key in justPressed) {
        if (!keys[key]) {
            delete justPressed[key];
        }
    }
if (!useBoost){
minBoostCooldown--;
if(minBoostCooldown <= 0){
useBoost = true;
minBoostCooldown = 0;
}
}
if(player.y > 680){
player.y = 680;
}
if(justPressed['e'] && !usedDown && useBoost){
        jump += 200;
	time += 200;;
	usedDown = true;
	useBoost = false;
	minBoostCooldown = maxBoostCooldown;
	delete justPressed['e'];
    }
if(justPressed['e'] && useBoost) {
if(onPlatform || player.y >= 679) {
jump = 400;
time = 400;
}}
    if(justPressed['ArrowUp']&& jump >= 30){
        player.y -= player.speed;
	jump -= player.speed;

    }
if(jump < 200){
time -= player.speed;
}
if(jump <= 30 && player.y < 680 && !up){
player.y += gravity;
}
if(jump <= 80 && player.y < 680){
player.speed = 5;
}
if(player.y >= 679){
jump = 200;
time = 200;
usedDown = false;
}
if(time === 200 || time > 200){
player.speed = 7;
}
    if(keys['ArrowLeft'] && player.x > -15){
        player.x -= player.speed;
    }
    if(keys['ArrowRight'] && player.x < 1430){
        player.x += player.speed;
    }}
    //TODO: what  happens if the player
    //goes off the edge of the screen??
      
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
function checkWallgCollision() {
    for (let wall of wallp) {
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
	collision = true;
    const isLanding = (player.y + 20) - wall.y < 10 && player.y < wall.y;
    if (isLanding && player.y < wall.y) {
        player.y = wall.y - 20; // align player to top of the wall
        jump = 200;
        time = 200;
        player.speed = 7;
        usedDown  = false;
        onPlatform = true;
	up = false;
    } else {
        // Colliding from side or below
        player.y += player.speed;
        time -= player.speed;
    }
}
if(!player.y > 680 && !isColliding && !justPressed['ArrowUp'] && (jump <= 30 || jump === 200)){
player.y += 10;
up = true;
}
        if(time < 10){
player.y += gravity;
player.speed = 0;
}
        if(isColliding && jump >= 150 && jump  <= 200){
player.y -= gravity;
}
        if (!isColliding && player.y < 680) {
            player.y += gravity;
}

         
        
    }
}

function gcheckWallCollisions() {

    for (let wall of wallf) {
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
if (isColliding){
win = true;
const isLanding = (player.y + 20) - wall.y < 10 && player.y < wall.y;
    if (isLanding && player.y < wall.y) {
        player.y = wall.y - 20; // align player to top of the wall
        jump = 200;
        time = 200;
        player.speed = 7;
        usedDown  = false;
        onPlatform = true;
	up = false;
    } else {
        // Colliding from side or below
        player.y += player.speed;
        time -= player.speed;
    }
}
        if(time < 10){
player.y += gravity;
PLAEYER_SPEED = 0;
}
if(!player.y > 680 && !isColliding && !justPressed['ArrowUp'] && (jump <= 30 || jump === 200)){
player.y += 10;
up = true;
}
        if(isColliding && jump >= 150 && jump  <= 200){
player.y -= gravity;
}
        if (!isColliding && player.y < 680) {
            player.y += gravity;
}
}
}
function checkWallCollisions() {

    for (let wall of walld) {
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
//If im actively colliding with a box and actively jumping then I reset my jump back to 200 which makes me able to jump again.
if (isColliding) {
    const isLanding = (player.y + 20) - wall.y < 10 && player.y < wall.y;
    if (isLanding && player.y < wall.y) {
        player.y = wall.y - 20; // align player to top of the wall
        jump = 200;
        time = 200;
	player.speed = 7;
	usedDown  = false;
	onPlatform = true;
    } else {
        // Colliding from side or below
        player.y += player.speed;
        time -= player.speed;
    }
}
	if(time < 10){
player.y += gravity;
player.speed = 0;
}
if(!player.y > 680 && !isColliding && !justPressed['ArrowUp'] && (jump <= 30 || jump === 200)){
player.y += 10;
up = true;
}
	if(isColliding && jump >= 150 && jump  <= 200){
player.y -= gravity;
}
	if (!isColliding && player.y < 680) {
	    player.y += gravity;
}
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
player.y = 680;
useBoost = true;
usedDown = false;
jump = 200;
time = 200;
minBoostCooldown = 0;
win = false;
collision = false;
lastTime = null;
requestAnimationFrame(animate);
}


function drawScore(){
    ctx.fillStyle = "blue";
    ctx.font = "10px Arial";
    ctx.fillText(score, 10,10);
}

function gameOver(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.font = "100px Arial";
ctx.textAlign = "center";
ctx.fillText("Game Over", canvas.width/2, canvas.height/2);

ctx.font = "30px Arial";
ctx.fillText("Press R to restart", canvas.width/2, canvas.height/2 + 100);
player.speed = 0;
gameRunning = false;
}
function animate(timestamp) {
if(!lastTime){
lastTime = timestamp;
}
const deltaTime = (timestamp - lastTime) / 1000;
lastTime = timestamp;
ctx.clearRect(0, 0, canvas.width, canvas.height);
    //`gameRunning` tracks the game state. 
    //when it becomes false, game over
    //so we'll only update score, move shapes, etc
    //as long as gameRunning is true
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
    if(gameRunning){
        score++;
        drawScore();
        drawWalls();
	drawWall();
        movePlayer(deltaTime);
        drawPlayer();
	drawCooldownMeter();
        checkWallCollision();
        checkWallCollisions();
	gcheckWallCollisions();
	gwalls();
	checkWallgCollision();
	drawWallp();
   }
if(!gameRunning && !mtutorial && !wins && !mEndTutorial){
gameOver();}
if(win && collision){
wons();
gameRunning = false;
}
if(win && !collision){
lol();
gameRunning = false;
}
if(justPressed['r']){
resetGame();
}

animationId = requestAnimationFrame(animate);
    //this schedules the next call of this function for 1/60    //of a second from now    
}
//This is the "event listner" that we'll attach to the DOM
//it automatically receives an input, e, which is the event
//and includes properties like which key was pressed 

document.addEventListener('keydown',(e) => {
const key = e.key.toLowerCase();
if(!gameRunning && !mtutorial && key != 'r') return;
if(key === 'r' && !mEndTutorial && !mtutorial){
console.log("Restart key pressed");
resetGame();
return;
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
    keys['e'] = false;
}
keys[e.key] = false;
});

//call our animate function the first time
//after this first run, requestAnimationFrame() will
//take over
animate();
