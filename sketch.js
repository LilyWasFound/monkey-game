var monkey , monkey_running, monkey_collided
var banana ,bananaImage
var obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var survivalTime;

function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600)
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  survivalTime = 0;
}


function draw() {
  background(999);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime, 100,50)
  
  ground.x=ground.width/2;  
  
  if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if(obstacleGroup.isTouching(monkey)){
      text("Game Over", 300,300);
      textSize(20);
      fill("black");
      
      monkey.changeAnimation("collided", monkey_collided);
      
      ground.velocityX = 0;
      monkey.velocityY = 0
    
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
     
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
    
    
    }
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    }
  
  spawnFood();
  spawnObstacle();
  
  drawSprites();
  
  monkey.collide(ground);
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(630,330,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
    }
}

function spawnFood() {
  if (frameCount % 300 === 0) {
    banana = createSprite(630,340,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 300;
    
    foodGroup.add(banana);
    }
}