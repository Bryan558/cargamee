var trackImage, track;
var  nitro , nitroImage , nitroGroup
var obstacle , obstacleImage , obstacleGroup
var car , carImage 
var finishline , finishlineImage
var gameOver , restart 
var gameState = "play"
var score=0;

function preload(){
  trackImage = loadImage("track.jpg");
  nitroImage = loadImage("nitro1.png");
  obstacleImage = loadImage("obstacle1.png");
  carImage = loadImage("car1.png");
  finishlineImage = loadImage("finishline1.png")
 
}

function setup(){
  canvas = createCanvas (600, 600);
  
  track = createSprite(300,300);
  track.addImage("track",trackImage);
  track.velocityY = 5;
  
  nitroGroup = new Group();
  obstacleGroup = new Group();

  
  car = createSprite(300,750,50,50);
  car.scale = 0.3;
  car.addImage("car", carImage);
  

  finishline = createSprite(310,60,50,50);
  finishline.scale = 1.5;
  finishline.addImage("finishline", finishlineImage);


  
}


function draw(){
  background(0);

  if (gameState === "play") {
    if(keyDown("left_arrow")){
      car.x = car.x - 3;
    }
    
    if(keyDown("right_arrow")){
      car.x = car.x + 3;
    }
       
   
    
  }
    
    if(track.y > 400){
      track.y = 300
    }
    spawnNitro();
    spawnObstacle()
    windowResized()
    
    if(obstacleGroup.isTouching(car)){
      car.destroy();
      gameState = "end"

    }

  if(nitroGroup.isTouching(car)){
    track.velocityY = track.velocityY + 0.6
  }
  if(track.velocityY === 10){
  finishline.velocityY = 3
  }
  
 
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  drawSprites();
  }


function spawnNitro() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var nitro = createSprite(200, -50);
    nitro.x = Math.round(random(120,400));
    nitro.addImage(nitroImage)
    nitro.velocityY = 4;
    car.depth = car.depth;
    car.depth +=1;
    nitro.lifetime = 300;
    nitroGroup.add(nitro);
    nitro.scale = 0.2
  
  }
}
function spawnObstacle(){
  if (frameCount % 240 === 0) {
  var obstacle = createSprite(200,50);
  obstacle.addImage(obstacleImage);
  obstacle.velocityY = 4;
  obstacle.lifetime = 800;
  obstacle.x = Math.round(random(120,400));
  obstacleGroup.add(obstacle);
  obstacle.scale= 0.2
  
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}