let orangeWire;
let greenWire;
let blueWire;
let pos = 0.0;

function setup(){
  createCanvas(800,800);
  background(255,241,196);

  orangeWire = new Wire({x:0, y:450}, {x:100, y:600}, {x:200, y:150}, {x:350, y:400},
                        {x: 500, y:625}, {x:550, y:150}, {x:800,y:350}, color(255,123,22));

  greenWire = new Wire({x:0, y:250}, {x:200, y:800}, {x:300, y:750}, {x:450, y:300},
                       {x: 550, y:0}, {x:650, y:500}, {x:800,y:450}, color(56,181,77));

  blueWire = new Wire({x:0, y:50}, {x:150, y:0}, {x:50, y:400}, {x:400, y:200},
                      {x: 700, y:40}, {x:300, y:600}, {x:800,y:700}, color(35,101,255));
  
}

function draw(){
  background(255,241,196);

  orangeWire.display();
  orangeWire.drawShape(pos, color(255,95,0), "square");

  greenWire.display();
  greenWire.drawShape(pos, color(56,148,56), "circle");

  blueWire.display();
  blueWire.drawShape(pos,color(0,64,255), "triangle");

  pos += 0.005;

  if(pos >= 1){
    pos = 0;
  }

  //console.log(pos)

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

  drawShape(pos, shapeColor, shapeType){
    
    push();
    noStroke();
    fill(shapeColor);
    rectMode(CENTER);
    let x;
    let y;
    if(pos <= 0.5){
      x = bezierPoint(this.anchor1_.x, this.pull1_.x, this.pull2_.x, this.anchor2_.x,pos*2);
      y = bezierPoint(this.anchor1_.y, this.pull1_.y,this.pull2_.y,this.anchor2_.y,pos*2);
    } else{
      x = bezierPoint(this.anchor2_.x, this.pull3_.x, this.pull4_.x, this.anchor3_.x,(pos*2)-1);
      y = bezierPoint(this.anchor2_.y, this.pull3_.y,this.pull4_.y,this.anchor3_.y,(pos*2)-1);
    }
    translate(x,y);
    rotate(pos*PI*2);
    if(shapeType == "square"){
      rect(0,0,25,25);
    }
    if(shapeType == "circle"){
      ellipse(0,0,35,25);
    }
    if(shapeType == "triangle"){
      triangle(-15, 15, 0, -15, 15, 15);
    }
    pop();

  }

}


  