var PLAY = 1;
var END = 0;
var gameState = PLAY;
score=0
var monkey, monkey_running,monkey_collided;


var bg,bg_scroll
var ground

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6

var score=0;



localStorage["HighestScore"] = 0;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided=loadAnimation("Monkey_01.png")
  
  bg_scroll=loadImage("Jungle.jpg")

  bananaImage = loadImage("banana.png");
  
  obstacle1 = loadImage("stone.png");
  
  
}

function setup() {
  createCanvas(400, 400);
  
  monkey= createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  monkey.depth=2

  bg = createSprite(200,200,400,500);
  bg.addAnimation("scroll",bg_scroll)
 bg.x = bg.width /2;
  bg.velocityX = -(6 + 3*score/100);
  bg.depth=1
    
  
  ground = createSprite(20,380,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.visible=false;
  
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white");
  
 
     
  if (gameState===PLAY){
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 320) {
      monkey.velocityY = -12;
    
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
 
 if(bg.x < 0) { bg.x = bg.width/2 }
    
      ground.x = ground.width/2;
    
  
    
    spawnBanana();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
  }
  else if (gameState === END) {
   
     stroke("black")
  textSize(20)
  fill("black")
  text("Score: "+ score, 200,20);
  
  
 score=0
    
     bg.velocityX = 0;
    
    ground.velocityX  = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collided")
    if(keyDown("space")){
      reset();
    }
  }
 monkey.setCollider("rectangle", 0,225,75, 75);
  if(monkey.collide(ground)){
  
    monkey.velocityX=0
  }
  
 if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach()
   score=score+2
 }
  switch(score){
  case 10: monkey.scale=0.12
      break;
  case 20: monkey.scale=0.14
      break;
  case 30: monkey.scale=0.16
      break;
  case 40: monkey.scale=0.18
      break;
      
      default: break;
      
  }
  
  
  
  
  
  
  
  
  
  drawSprites();
  stroke("black")
  textSize(20)
  fill("white")
  text("Score:"+score,200,200)
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(380,230,10,40);
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -(6 + 3*score/100);
    
    
    banana.lifetime = 200;
    
  
    
  
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(380,360,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    obstacle.addImage(obstacle1)
       obstacle.scale = 0.18;
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);      
    }
}

function reset(){
gameState = PLAY
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("running")
}