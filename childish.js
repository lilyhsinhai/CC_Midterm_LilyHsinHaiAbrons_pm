let orangeWire;
let greenWire;
let blueWire;
let pause = false;

function setup(){
  createCanvas(800,800);
  background(255,241,196);

  orangeWire = new Wire({x:0, y:450}, {x:100, y:600}, {x:200, y:150}, {x:350, y:400},
                        {x: 500, y:625}, {x:550, y:150}, {x:800,y:350}, color(255,123,22));
  orangeWire.addShape(0.3, 0.005, color(255,95,0), "square");

  greenWire = new Wire({x:0, y:250}, {x:200, y:800}, {x:300, y:750}, {x:450, y:300},
                       {x: 550, y:0}, {x:650, y:500}, {x:800,y:450}, color(56,181,77));
  greenWire.addShape(0.9, -0.008, color(56,148,56), "circle");

  blueWire = new Wire({x:0, y:50}, {x:150, y:0}, {x:50, y:400}, {x:400, y:200},
                      {x: 700, y:40}, {x:300, y:600}, {x:800, y:700}, color(35,101,255));
  blueWire.addShape(0.7, 0.002, color(0,64,255), "triangle");
  
}

function draw(){
  background(255,241,196);

//TO DO: condense this

  orangeWire.display();
  orangeWire.move();
  orangeWire.drawShape();

  greenWire.display();
  greenWire.move();
  greenWire.drawShape();

  blueWire.display();
  blueWire.move();
  blueWire.drawShape();
  
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
    if(pause == false){
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
    let x;
    let y;
    if(this.pos_ <= 0.5){
      x = bezierPoint(this.anchor1_.x, this.pull1_.x, this.pull2_.x, this.anchor2_.x,this.pos_*2);
      y = bezierPoint(this.anchor1_.y, this.pull1_.y,this.pull2_.y,this.anchor2_.y,this.pos_*2);
    } else{
      x = bezierPoint(this.anchor2_.x, this.pull3_.x, this.pull4_.x, this.anchor3_.x,(this.pos_*2)-1);
      y = bezierPoint(this.anchor2_.y, this.pull3_.y,this.pull4_.y,this.anchor3_.y,(this.pos_*2)-1);
    }
    translate(x,y);
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

}

function keyPressed(){

  /*if(key == "-"){
    speed = speed*0.3;
    formerSpeed = speed;
  }
  if(key == "="){
    speed = speed*2;
    formerSpeed = speed;
  }*/
  if(key == " "){
    if(pause == true){
      pause = false;
    }else{
      pause = true;
    }
  }
}



