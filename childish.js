//Lily Hsin-Hai Abrons - Midterm CC2pm F22

new p5(); //https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup

let scenePause = false;

let scene = 1;

const lowerBalls = [];

const upperBalls = []

const wires = [];

const palette = [color(255,95,0), color(56,148,56), color(0,64,255), color(123,0,185), color(209,10,0), color(255,206,1)];


function setup(){
  createCanvas(800,800);
  background(255,241,196);

  let orangeWire;
  let greenWire;
  let blueWire;
  let purpleWire;
  let redWire;
  let yellowWire;
  let shufflePalette = shuffle(palette);

  orangeWire = new Wire({x:0, y:450}, {x:100, y:600}, {x:200, y:150}, {x:350, y:400},
                        {x: 500, y:625}, {x:550, y:150}, {x:800,y:350}, color(255,123,22));
  orangeWire.addShape(0.3, 0.005, shufflePalette.pop(), "square");

  greenWire = new Wire({x:0, y:250}, {x:200, y:800}, {x:300, y:750}, {x:450, y:300},
                       {x: 550, y:0}, {x:650, y:500}, {x:800,y:450}, color(56,181,77));
  greenWire.addShape(0.9, -0.008, shufflePalette.pop(), "circle");

  blueWire = new Wire({x:0, y:50}, {x:150, y:0}, {x:50, y:400}, {x:400, y:200},
                      {x: 700, y:40}, {x:300, y:600}, {x:800, y:700}, color(35,101,255));
  blueWire.addShape(0.7, 0.003, shufflePalette.pop(), "triangle");

  purpleWire = new Wire({x:0, y:650}, {x:150, y:200}, {x:50, y:600}, {x:400, y:400},
                        {x: 800, y:200}, {x:200, y:800}, {x:800, y:650}, color(166,1,255));
  purpleWire.addShape(0.7, -0.006, shufflePalette.pop(), "square");

  redWire = new Wire({x:0, y:550}, {x:300, y:800}, {x:450, y:800}, {x:380, y:650},
                     {x: 250, y:400}, {x:200, y:800}, {x:800, y:750}, color(254,14,0));
  redWire.addShape(0.8, -0.007, shufflePalette.pop(), "triangle");

  yellowWire = new Wire({x:0, y:350}, {x:300, y:325}, {x:400, y:100}, {x:500, y:150},
                      {x: 700, y:250}, {x:600, y:0}, {x:800, y:150}, color(255,223,51));
  yellowWire.addShape(0.4, 0.009, shufflePalette.pop(), "circle");
  
  wires.push(orangeWire, greenWire, blueWire, purpleWire, redWire, yellowWire);

  for(let i = 0; i <= 5000; i++){
    let b = new Ball(random(800), random(800), random(palette));
    lowerBalls.push(b);
  }
  for(let i = 0; i <= 20000; i++){
    let b = new Ball(random(800), random(800), random(palette));
    upperBalls.push(b);
  }
}

function draw(){
  background(255,241,196);
  
  if(scene == 1){
    for(const wire of wires){
      wire.display();
      wire.move();
      wire.drawShape();
    }
  }
  if(scene == 2){
    for(const ball of lowerBalls){
      ball.display();
    }
    for(const ball of upperBalls){
      ball.move();
      ball.display();
    }
  }
}

class Ball{

  constructor(x, y, ballColor){

    this.ballColor = ballColor;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.deceleration = 0.8;

  }

  display(){

    fill(this.ballColor);
    noStroke();
    ellipse(this.position.x, this.position.y, 30, 30);

  }

  move(){

    this.velocity.mult(this.deceleration);
    this.position.add(this.velocity);

  }

  ballClicked(){

    var d = dist(mouseX, mouseY, this.position.x, this.position.y);
    if(d < 200){
      this.velocity = createVector(random(-30,30), random(-30,30));
    }
  }
}

class Wire{

  constructor(anchor1, pull1, pull2, anchor2, pull3, pull4, anchor3, wireColor){
    
    this.anchor1_ = anchor1;
    this.pull1_ = pull1;
    this.pull2_ = pull2;
    this.anchor2_ = anchor2;
    this.pull3_ = pull3;
    this.pull4_ = pull4;
    this.anchor3_ = anchor3;
    this.wireColor_ = wireColor;

  }

  addShape(pos, speed, shapeColor, shapeType){
    this.pos_ = pos;
    this.speed_ = speed;
    this.shapeColor_ = shapeColor;
    this.shapeType_ = shapeType;
    this.pause_ = false

  }

  display(){

    stroke(this.wireColor_);
    strokeWeight(3);
    noFill(0);

    beginShape();
    vertex(this.anchor1_.x,this.anchor1_.y);
    bezierVertex(this.pull1_.x, this.pull1_.y, this.pull2_.x, this.pull2_.y, this.anchor2_.x,this.anchor2_.y);
    bezierVertex(this.pull3_.x, this.pull3_.y, this.pull4_.x, this.pull4_.y, this.anchor3_.x,this.anchor3_.y);
    endShape();

  }

  move(){
    let x;
    let y;

    if(this.pos_ <= 0.5){
      x = bezierPoint(this.anchor1_.x, this.pull1_.x, this.pull2_.x, this.anchor2_.x,this.pos_*2);
      y = bezierPoint(this.anchor1_.y, this.pull1_.y,this.pull2_.y,this.anchor2_.y,this.pos_*2);
    }else{
      x = bezierPoint(this.anchor2_.x, this.pull3_.x, this.pull4_.x, this.anchor3_.x,(this.pos_*2)-1);
      y = bezierPoint(this.anchor2_.y, this.pull3_.y,this.pull4_.y,this.anchor3_.y,(this.pos_*2)-1);
    }

    this.x_ = x;
    this.y_ = y;

    if(this.pause_ == false){
      this.pos_ += this.speed_
     if(this.pos_ >= 1|| this.pos_ <= 0.0){
       this.speed_ = -this.speed_;
     }
    }
  }

  drawShape(){
    
    push();
    noStroke();
    fill(this.shapeColor_);
    rectMode(CENTER);

    translate(this.x_,this.y_);
    rotate(this.pos_*PI*2);
    if(this.shapeType_ == "square"){
      rect(0,0,25,25);
    }
    if(this.shapeType_ == "circle"){
      ellipse(0,0,35,25);
    }
    if(this.shapeType_ == "triangle"){
      triangle(-15, 15, 0, -15, 15, 15);
    }
    pop();
  }

  faster(){
    this.speed_ = this.speed_*2;
  }

  slower(){
    this.speed_ = this.speed_*0.5;
  }

  shapeClicked(){
    var d = dist(mouseX, mouseY, this.x_, this.y_);
    if(d < 30){
      this.shapeColor_ = random(palette);
    }
  }

  wireClicked(){
    var d = dist(mouseX, mouseY, this.anchor1_.x, this.anchor1_.y);
     if(d < 50){
      this.pause_ = !this.pause_;
    }
  }

  shapeDragged(){
    var d = dist(mouseX, mouseY, this.x_, this.y_);
    if(d < 30){
      this.pause_ = true;
      this.pos_ = mouseX/800;
    }
  }

  setPos(pos){
    this.pos_ = pos;
  }

  pause(){
    this.pause_ = true;
  }

  resume(){
    this.pause_ = false;
  }
}

function keyPressed(){

  if(key == "-"){
    for(const wire of wires){
      wire.slower();
    }
  }
  if(key == "="){
    for(const wire of wires){
      wire.faster();
    }
  }
  if(key == " "){
    if(scenePause == true){
      scenePause = false;
      for(const wire of wires){
      wire.pause();
      }
    }else{
      scenePause = true;
      for(const wire of wires){
      wire.resume();
      }
    }
  }
  if(key == "1"){
    scene = 1;
  }
  if(key == "2"){
    scene = 2;
  }
}

function mousePressed(){
  if(scene == 1){
    for(const wire of wires){
      wire.shapeClicked();
    }
    for(const wire of wires){
      wire.wireClicked();
    }
  }
  if(scene == 2){
    for(const ball of upperBalls){
      if(random() < 0.9){
        ball.ballClicked();
      }
    }
  }
}

function mouseDragged(){
  if(scene == 1){
    for(const wire of wires){
      wire.setPos(mouseX/800);
   }
  }
  if(scene == 2){
    for(const ball of upperBalls){
      if(random() < 0.3){
        ball.ballClicked();
      }
    }
  }
}