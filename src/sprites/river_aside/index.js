var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js');

var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

var asideHeight = 130;
//轨道函数
function roadFn(distance){
  // (x-r)^2 + y^2 = r^2
  var R = WIDTH*2;
  var x = -Math.sqrt(R*R - distance*distance) + R;

  return x;
}



function wrapper(container,boat,reverse){

  var i = 0

  container.resetAngle = function (angle) {

  }

  container.render = function () {
    if((i)%60=== 0){

      var x1 = 0//roadFn(boat.distance);


      var boatX = Math.sin(boat.direction) * boat.speed;

      if(reverse){
        x1 = -x1
        boatX = -boatX;
      }

      this.children.map(function (aside) {
        if(aside.y > HEIGHT){
          //aside.x = x1
        //  console.log(aside.x,boat.direction);
//          console.log(Math.sin(boat.direction) , boat.speed)
          aside.y = -asideHeight
        }
        aside.x -=  boatX;
        aside.y += (boat.speed )
      })
    }
  }

  return container;
}

module.exports = function(boat,reverse){
  var container = new PIXI.Container();
  container.scale.x = 0.7

  for(var i = 0;i<9;i++){
    var mySprite = mySpriteFn();
    mySprite.y = i*asideHeight;
    container.addChild(mySprite);
  }

  if(reverse){
    container.x = WIDTH;
    container.scale.x = -container.scale.x;
  }


  container = wrapper(container,boat,reverse)


  return container;
}