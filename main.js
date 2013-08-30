var canvas = document.getElementById('tree'),
    c = canvas.getContext('2d');

function random(min, max){
  return Math.random() * (max - min) + min;
}

var generation = 0;
var tree = new Branch(60, 0);

setInterval(loop, 1000/400);

function loop(){
  c.clearRect(0, 0, 400, 400);
  c.save();
  c.translate(200, 380);
  tree.render();
  c.restore();
}

function Branch(len, angle){
  generation++;
  var gen = generation;
  var children = this.children = [];
  var growth = 0;
  var delay = gen * 10;

  if( len > 10){
    children.push( new Branch( len*random(0.7, 0.9), random(0, 25) ) );
    children.push( new Branch( len*random(0.7, 0.9), random(0, -25) ) );
  }
  this.render = function() {
    if( delay > 0 ) delay--;
    else growth += ( 1 - growth ) * 0.01;
    var blen = growth * len;
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI/180);
    c.lineWidth = blen/10;
    c.moveTo(0,0);
    c.lineTo(0, -blen);
    c.stroke();
    c.translate(0, -blen);
    var i=0;
    for(; i<children.length; i++){
      children[i].render();
    }
    c.restore();
  };
  generation--;
}
