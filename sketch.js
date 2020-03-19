let bg;
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/DbwQpB3ed/';
// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


//Moving sprites
let text1= "";
let v0x = 730;
let v0y=340;
let v2x = 460;
let start = false;
let angle = 0;
let angle2 = 0;
var mainbodyx=942;
var mainbodyy=409;
var compare = false;
var speed1 = 3;
var ghost, circle1;
var direction = 90; //circle initial direction moving down

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  
  bg = loadImage('background-1.png');
  
  createCanvas(windowWidth, 800);
  
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  

  //create the sprites
  head= createSprite(mainbodyx-38,mainbodyy-119);
head.addAnimation('floating', 'head.png');
 mainbody= createSprite(mainbodyx,mainbodyy);
mainbody.addAnimation('floating', 'mainbody.png');
   rightarm= createSprite(mainbodyx-131,mainbodyy-69);
rightarm.addAnimation('floating', 'rightarm.png'); 
  leftarm = createSprite(mainbodyx+58, mainbodyy-59);
  leftarm.addAnimation('floating', 'leftarm.png','leftarm1.png');
  //542 209  
  rightleg = createSprite(mainbodyx-80, mainbodyy+158);
  rightleg.addAnimation('floating', 'rightleg.png');
  leftleg = createSprite(mainbodyx+90, mainbodyy+138);
  leftleg.addAnimation('floating', 'leftleg.png');

    leftarm2 = createSprite(mainbodyx+98, mainbodyy-89);
   leftarm2.addAnimation('floating', 'leftarm2.png');
  
  
  enemy = createSprite(250,500);
enemy.addAnimation('floating', 'enemy2.png');
  
  
  
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
 
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
   
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  // translate(vec.mag() - arrowSize, 0);
  // console.log(vec.mag());
  // triangle(0, 5, 7,3, 0, 10);
  pop();
}

function draw() {

  clear()
background(bg);
    image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
 
   text1=label;
  console.log(text1);
  
 let v0 = createVector(v0x, v0y);
  let v1 = createVector(-400, -50);
  let v2 = createVector(v2x, 400);
  let v3 = createVector(400, -20);
  
  drawArrow(v0, v1.rotate(angle), 'white');
  drawArrow(v2, v3.rotate(angle2), 'white');
  //angle += 0.01;
  
  
  //aside of setting the velocity directly you can move a sprite
  //by providing a speed and an angle
  direction += 2;
  if(keyDown(UP_ARROW))
  {
    start= true;
  }
    if(keyDown(DOWN_ARROW))
  {
    text1= "Left Win";
  }
   if(keyDown(LEFT_ARROW))
  {
    text1= "Right win";
  }
 
  //speed, angle
  
//   if(compare == true){
//     rightleg.rotationSpeed = -0.5;
//      console.log(rightleg.position.x); 
//     if(rightleg.position.x<=480)
//        {
//         rightleg.position.x=rightleg.position.x+1;
//        }
    
//     if(rightleg.position.x>480)
//        {
//              rightleg.rotationSpeed = 0;
//        }
//   }
  
  if(start == true){
    if(enemy.position.x<300){
      enemy.position.x= enemy.position.x+2;
       v2x= v2x+2;
      angle2 += -0.02;
      angle += 0.02;
      v0x= v0x+2;
      v0y= v0y+2;
mainbody.position.x= mainbody.position.x+2;
leftarm.position.x= leftarm.position.x+2;
head.position.x= head.position.x+2;
rightarm.position.x= rightarm.position.x+2;
leftarm2.position.x= leftarm2.position.x+2;
rightleg.position.x= rightleg.position.x+2;
leftleg.position.x= leftleg.position.x+2;
      mainbody.position.y= mainbody.position.y+2;
leftarm.position.y= leftarm.position.y+2;
head.position.y= head.position.y+2;
rightarm.position.y= rightarm.position.y+2;
leftarm2.position.y= leftarm2.position.y+2;
rightleg.position.y= rightleg.position.y+2;
leftleg.position.y= leftleg.position.y+2;

    }
    if(enemy.position.x>=300){
       if(text1 == "Left Win"){
      if(enemy.position.x<320){
         angle2 += 0.04;
        enemy.position.x= enemy.position.x+2;
         v2x= v2x+2;
             }
      if(enemy.position.x>=320){
        console.log(enemy.position.x);
        
        if(enemy.position.x<=360){
           enemy.position.x= enemy.position.x+6;
          v2x= v2x+6;
        }
            if(enemy.position.x>=360){}
      }
      
    }
    if(text1 == "Right win"){
      if(mainbody.position.x>850){
        mainbody.position.x= mainbody.position.x-5;
leftarm.position.x= leftarm.position.x-5;
head.position.x= head.position.x-5;
rightarm.position.x= rightarm.position.x-5;
leftarm2.position.x= leftarm2.position.x-5;
rightleg.position.x= rightleg.position.x-5;
leftleg.position.x= leftleg.position.x-5;
        v0x= v0x-5;
         angle += -0.01;
      }
      if(mainbody.position.x<=850){
      }
    }
    }
    var prediction = 0;
    let x= map(prediction,0,100,0,1);
 
    
     }
  
  drawSprites();
 
}

