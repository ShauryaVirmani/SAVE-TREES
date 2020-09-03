var robot,robotImage;
var ground;
var background1,backgroundImage;
var enemy,enemyImage,seedImage,treeImage;
var seed,seedGroup;
var enemyGroup;
var count = 0;

function preload(){
 robotImage = loadAnimation("sprites/rob1.png","sprites/rob2.png","sprites/rob3.png","sprites/rob4.png","sprites/rob5.png","sprites/rob6.png","sprites/rob7.png","sprites/rob8.png");
 backgroundImage = loadImage("sprites/background.png");
 enemyImage = loadImage("sprites/enemy.png");
 seedImage = loadImage("sprites/seed.png");
 treeImage = loadImage("sprites/tree.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  
  for(i=0;i<=displayWidth*5;i=i+1280){
    var background2 = new Ground(i,displayHeight/2,displayWidth,displayHeight);
    background2.body.addImage("backgroungImg",backgroundImage);
  }
  robot = new Player(50,displayHeight-80,80,40);
  robot.body.addAnimation("robImg",robotImage);
  robot.body.scale= 0.2;
  robot.body.debug= true;
  robot.body.setCollider("rectangle",0,0,390,640);
  ground = new Ground(displayWidth/2,displayHeight-30,displayWidth*5,20);
  ground.body.visible= false;
  enemyGroup = new Group();
  enemy = new Enemy (displayWidth,displayHeight-80,100,50);
  enemy.createEnemy();
  seedGroup = new Group(); 
  spawnSeeds();
}


function draw() {
  background(255,255,255);

  textSize(50);
  textFont("Georgia");
 
  robot.body.collide(ground.body);
 
  if(keyWentDown("right")&& robot.y>=displayHeight-80){
    robot.body.velocityX=7;
    
  }else if(keyWentUp("right")){
    robot.body.velocityX=0;
    
  }
  if (touches.length>0||keyDown("space")&& robot.y>=displayHeight-80){
    robot.body.velocityY=-16;
    touches=[];
  }
  robot.body.velocityY=robot.body.velocityY+0.8;
  camera.position.y = displayHeight/2;
  camera.position.x = robot.body.x;
  
  
if (seedGroup.isTouching(robot.body)){
  count = count+1;
  console.log(count);
  seedGroup.destroyEach();
}
if (enemyGroup.isTouching(robot.body)){
  
  textSize(50);
  textFont("Georgia");
  text("gameover",displayWidth/2,displayHeight/4);
}

  drawSprites();
  textSize(50);
  textFont("Georgia");
  text("Score:"+count,displayWidth/2,displayHeight/4);

  if (robot.y===displayWidth*5){
  background("white");
  textSize(250);
  textFont("Georgia");
  text("you win",displayWidth/2,displayHeight/2);
  }  
    
  
}
function spawnSeeds(){
  for (i=displayWidth/3;i<=displayWidth*5;i=i+displayWidth/3){
    seed = createSprite(i,displayHeight-80,20,20);
    seed.addImage("seedimg",seedImage);
    seed.scale=0.15;
    seed.debug=true;
    seed.setCollider("rectangle",0,0,490,600);
    seedGroup.add(seed);
    }}