var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds,cloudImage, cloudsGroups;
var obs1i,obs2i,obs3i,obs4i,obs5i,obs6i,obsGroups;
var go,goIma,rest,restIma;
var rand1;
var score;

var PLAY=1;
var END= 0;
var gameState= PLAY;

var check, die, jump;
function preload(){
  trex_running = loadImage("dino.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("nube.png");
  
  obs1i=loadImage("cactus.png");
  obs2i=loadImage("cactus.png");
  obs3i=loadImage("cactus3 (1).png");
  obs4i=loadImage("cactus3 (1).png");
  obs5i=loadImage("cactus4.png");
 obs6i=loadImage("cactus4.png");
  
  goIma=loadImage("gameOver.png");
  restIma=loadImage("restart.png");
  
  check=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  
  score=0;
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  //crea el sprite del Trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);
  trex.scale = 0.13;
  trex.setCollider("rectangle",0,0,200 ,200);
  //trex.debug=true;
  
  //crea el sprite del suelo
  ground = createSprite(width/2,height-55,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crea el suelo invisible
  invisibleGround = createSprite(width/2,height,width,125);
  invisibleGround.visible = false;
  
  gO= createSprite(width/2,height/2-50);
    gO.scale=1.4;
    gO.addImage("gameOver",goIma);
    rest =createSprite(width/2,height/2);
    rest.scale=0.7;
    rest.addImage("restart",restIma);
  rest.visible= false;
  gO.visible=false;
  //genera números al azar
  //var rand =  Math.round(random(1,100))
  
  cloudsGroups=new Group();
  obsGroups= new Group();
  
}

function draw() {
  //establece el color del fondo
  background("lightblue");
  rand1 =  Math.round(random(1,height/3));
  //console.log(trex.y)
  if(gameState==PLAY){
    ground.velocityX = -4-3*score/100;
    score=Math.round(score+(getFrameRate()/60));
    if(score%100==0){
      check.play();
    }
    
    if (ground.x < 0){
    ground.x = windowWidth/2;
  }
    if(touches.length>0||keyDown("space")&&trex.y>=height-120) {
    //salta cuando se presiona la barra espaciadora
      trex.velocityY = -12;
      jump.play();
      touches=[];
  }
trex.velocityY = trex.velocityY + 0.5;
   //evita que el Trex caiga
    trex.collide(invisibleGround);
  spawnClouds()
  spawnObstacles();
    if(obsGroups.isTouching(trex)){
      die.play();
      gameState=END;
      //jump.play();
      // trex.velocityY=-12;
    }
  }
  else if(gameState==END){
    rest.visible=true;
    gO.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    obsGroups.setVelocityXEach(0);
    cloudsGroups.setVelocityEach(0);
    obsGroups.setLifetimeEach(-1);
    cloudsGroups.setLifetimeEach(-1);
    //trex.changeAnimation("collide",trex_collided);
    
  }
  
  if(mousePressedOver(rest)&&gameState==END){
    console.log("Fin del juego");
    rest.visible= false;
  gO.visible= false;
    reset();
  }
  
  
  
 
  
  
  //texto score
  fill("black");
  text("SCORE= "+score,width/2,height/2-100);
  
  
  //aparece las nubes
  trex.collide(invisibleGround);
  drawSprites();
  
}
function reset(){
  gameState=PLAY;
  rest.visible= false;
  gO.visible= false;
  obsGroups.destroyEach();
  cloudsGroups.destroyEach();
  score=0;
}

//función para aprecer las nubes
function spawnClouds(){
 //escribe tu código aquí 
  
  if(frameCount%60==0){
    clouds=createSprite(width+20,height-300,40,10);
    clouds.scale=0.08;
    clouds.addImage("cloud",cloudImage);
    clouds.velocityX=-4;
    clouds.y=rand1;
    clouds.lifetime=width;
    cloudsGroups.add(clouds);
    clouds.depth=trex.depth;
    trex.depth++;
  }

  //console.log(frameCount)
}
function spawnObstacles(){
if(frameCount%60==0){
  var obstacle=createSprite(width+20,height-80,10,40);
  obstacle.velocityX=-6-score/100;
  obstacle.scale=0.08;
  obstacle.depth=trex.depth;
  trex.depth++;
  var rand;
  rand= Math.round(random(1,6));
  
  switch(rand){
    case 1: obstacle.addImage("obs1",obs1i);
      break;
      case 2: obstacle.addImage("obs2",obs2i);
      break;
      case 3: obstacle.addImage("obs3",obs3i);
      break;
    case 4: obstacle.addImage("obs4",obs4i);
      break;
     case 5: obstacle.addImage("obs5",obs5i);
      break;
      case 6: obstacle.addImage("obs6",obs6i);
      break;
      default:break; 
    
  }
  obstacle.lifetime=width;
  obsGroups.add(obstacle);
}
  
}







