//let ORANGE = color(255,123,22);

function setup(){
  createCanvas(800,800);
  background(255,241,196);
  
}

function draw(){

  orangeWire = new Wire({x:0, y:450}, {x:100, y:600}, {x:200, y:150}, {x:350, y:400},
                        {x: 500, y:625}, {x:550, y:150}, {x:800,y:350}, color(255,123,22));
  orangeWire.display();
  orangeWire.drawSquare(0.25, color(255,95,0));
  orangeWire.drawSquare(0.8, color(255,95,0));

  greenWire = new Wire({x:0, y:250}, {x:200, y:800}, {x:300, y:750}, {x:450, y:300},
                       {x: 550, y:0}, {x:650, y:500}, {x:800,y:450}, color(56,181,77));
  greenWire.display();
  greenWire.drawCircle(0.3, color(56,148,56));

  blueWire = new Wire({x:0, y:50}, {x:150, y:0}, {x:50, y:400}, {x:400, y:200},
                      {x: 700, y:40}, {x:300, y:600}, {x:800,y:700}, color(35,101,255));
  blueWire.display();

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

  drawSquare(position, squareColor){
    noStroke();
    fill(squareColor);
    rectMode(CENTER);
    let x = bezierPoint(this.anchor1_.x, this.pull1_.x, this.pull2_.x, this.anchor2_.x,position);
    let y = bezierPoint(this.anchor1_.y, this.pull1_.y,this.pull2_.y,this.anchor2_.y,position);
    rect(x,y,25,25);

  }

  drawCircle(position, circleColor){

    noStroke();
    fill(circleColor);
    let x = bezierPoint(this.anchor1_.x, this.pull1_.x, this.pull2_.x, this.anchor2_.x,position);
    let y = bezierPoint(this.anchor1_.y, this.pull1_.y,this.pull2_.y,this.anchor2_.y,position);
    ellipse(x,y,25,25);
  }
  

}


  