//let ORANGE = color(255,123,22);

function setup(){
  createCanvas(800,800);
  background(150);
  
}

function draw(){

  orangeWire = new Wire(0,450,200,400,500,350, color(255,123,22));
  orangeWire.display();
  orangeWire.drawSquare(0.25, color(255,95,0));
  orangeWire.drawSquare(0.8, color(255,95,0));

  greenWire = new Wire(0,250,300,400,600,450, color(56,181,77));
  greenWire.display();
  greenWire.drawCircle(0.3, color(56,148,56));

}



class Wire{

  constructor(x1,y1,x2,y2,x3,y3,wireColor){
    this.x1_ = x1;
    this.y1_ = y1;
    this.x2_ = x2;
    this.y2_ = y2;
    this.x3_ = x3;
    this.y3_ = y3;
    this.wireColor_ = wireColor;

  }

  display(){

    stroke(this.wireColor_);
    strokeWeight(3);
    noFill(0);

    beginShape();
    vertex(this.x1_,this.y1_);
    bezierVertex(50,550, 150,550, this.x2_,this.y2_);
    bezierVertex(300,150, 400,150, this.x3_,this.y3_);
    endShape();

  }

  drawSquare(position, squareColor){
    noStroke();
    fill(squareColor);
    rectMode(CENTER);
    let x = bezierPoint(this.x1_, 50,150,this.x2_,position);
    let y = bezierPoint(this.y1_, 550,550,this.y2_,position)
    rect(x,y,25,25);

  }

  drawCircle(position, circleColor){

    noStroke();
    fill(circleColor);
    let x = bezierPoint(this.x1_, 50,150,this.x2_,position);
    let y = bezierPoint(this.y1_, 550,550,this.y2_,position)
    ellipse(x,y,25,25);
  }
  

}


  