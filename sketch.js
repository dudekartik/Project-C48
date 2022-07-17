var runner, runnerImage;
var platform,platformImage,platformGroup;
var bullet,bulletGroup;
var coin,coinImage,coinGroup;
var ground;
var enemyGroup;
var gameState= "play";
var score=0;
var enemyImage1;
var enemyImage2;
var restart;

function preload(){
  runnerImage= loadAnimation("Images/boy1.png","Images/boy2.png","Images/boy3.png","Images/boy4.png","Images/boy5.png",
  "Images/boy6.png","Images/boy7.png","Images/boy8.png","Images/boy9.png","Images/boy10.png");
  coinImage = loadImage("Images/coin.png");
  platformImage = loadImage("Images/platforms.png");
  enemyImage1=loadImage("Images/flappy.png");
  enemyImage2=loadImage("Images/turtle.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-50);
  runner = createSprite(200, displayHeight-130 , 50, 50);
  runner.addAnimation("runner",runnerImage);
  ground = createSprite(displayWidth/2,displayHeight-100,displayWidth,10)
 ground.shapeColor="green";
 platformGroup=new Group();
 bulletGroup=new Group();
 enemyGroup=new Group();
 coinGroup=new Group();
 restart = createSprite(680,410,10,10);
 restart.visible = false
}

function draw() {
  background(0,0,0); 
  textSize(20);
  fill("white");
  text("Score: "+score,100,50);
  if(gameState==="play"){
    if(keyWentDown("space")){
      runner.velocityY=-20; 
    }
    
    if(keyDown("s")){
      createBullet();
    }
    runner.velocityY=runner.velocityY+0.8;
    runner.bounceOff(platformGroup);
    if(runner.x-0){
    runner.x=200  
    }

    console.log(runner.velocityY)
    spawnPlatform();
    spawnGroundEnemy();
    spawnAirEnemy();
    for(var i=0;i<enemyGroup.length;i++){
      if(enemyGroup.get(i).isTouching(bulletGroup)){
        enemyGroup.get(i).destroy();
        score=score+1
      }
    }
    for(var i=0;i<coinGroup.length;i++){
      if(coinGroup.get(i).isTouching(runner)){
        coinGroup.get(i).destroy();
        score=score+1
      }

    }
    if(enemyGroup.isTouching(runner)){
      runner.destroy();
      gameState="end";
    }
  }
  else if(gameState==="end"){
    restart.visible = true
    platformGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    bulletGroup.setVelocityXEach(0);
    textSize(60);
    fill("white");
    textFont("Felix Titling");
    text("GAME OVER",displayWidth/2-200,displayHeight/2);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  runner.collide(ground);
  drawSprites();
}

function createBullet(){
  bullet=createSprite(runner.x,runner.y,20,5);
  bullet.velocityX=20;
  bullet.shapeColor="white";
  bulletGroup.add(bullet);
}

function spawnPlatform(){
  if(frameCount%150===0){
  platform=createSprite(displayWidth,300,10,10);
  platform.addImage(platformImage);
  platform.scale=0.3;
  platform.velocityX=-4;
  platform.y = Math.round(random(150,600));
  platformGroup.add(platform);
  platform.setCollider("rectangle",0,0,300,100);

  var rand=Math.round(random(1,3));
  if(rand===1){
    coin=createSprite(platform.x,platform.y-35,10,10);
    coin.addImage(coinImage);
    coin.velocityX=-4;
    coin.scale=0.06;
    coinGroup.add(coin);
  } 

  else if(rand===2){
    coin=createSprite(platform.x+15,platform.y-35,10,10);
    coin.addImage(coinImage);
    coin.velocityX=-4;
    coin.scale=0.06;
    coin2=createSprite(platform.x-15,platform.y-35,10,10);
    coin2.addImage(coinImage);
    coin2.velocityX=-4;
    coin2.scale=0.06
    coinGroup.add(coin);
    coinGroup.add(coin2);
 } 
  else {
    coin=createSprite(platform.x,platform.y-35,10,10);
    coin.addImage(coinImage);
    coin.velocityX=-4;
    coin.scale=0.06;
    coin2=createSprite(platform.x-30,platform.y-35,10,10);
    coin2.addImage(coinImage);
    coin2.velocityX=-4;
    coin2.scale=0.06;
    coin3=createSprite(platform.x+30,platform.y-35,10,10);
    coin3.addImage(coinImage);
    coin3.velocityX=-4;
    coin3.scale=0.06;
    coinGroup.add(coin);
    coinGroup.add(coin2);
    coinGroup.add(coin3);

  } 
 
  }
}

function spawnGroundEnemy(){
if(frameCount%100===0){
enemy=createSprite(windowWidth+10,displayHeight-130,10,10);
enemy.velocityX=-4;
enemy.addImage(enemyImage2);
enemy.scale=0.4;
enemy.setCollider("rectangle",0,0,100,100);
enemyGroup.add(enemy);
}
}

function spawnAirEnemy(){
  if(frameCount%170===0){
  enemy2=createSprite(windowWidth+10,displayHeight-130,10,10);
  enemy2.y=random(100,displayHeight-200);
  enemy2.addImage(enemyImage1);
  enemy2.scale=0.2;
  enemy2.setCollider("rectangle",0,0,200,160);
  enemy2.velocityX=-4;
  enemyGroup.add(enemy2);
  }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    platformGroup.destroyEach();
    coinGroup.destroyEach();
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();
    score = 0;
  }  