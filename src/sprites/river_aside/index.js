var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js');



var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

var asideWidth = 128;
var asideHeight = 130;
//轨道函数左侧,圆形
function lRoadFn2(x,y){

  function road(x){
    var r = 2*HEIGHT;
    // r^2 = (x-r+w/2)^2+y^2
    var y = Math.sqrt(Math.pow(r,2) - Math.pow((x - r +WIDTH/2),2),2);
    return y;
  }

  var positionArr = [];

  var startXStart = x < 0 ? -WIDTH/2  : x - WIDTH/2
  var startXEnd = x + WIDTH/2

  var xTrans = x < 0 ? WIDTH/2 : WIDTH/2 - x;

  var startX = startXStart
  var startY = HEIGHT - road(startX) + y;

  var i=0;
  while(startX < startXEnd && startY >= 0 && !isNaN(startY)){

    startY = HEIGHT - road(startX) + y - (i++*100);

    if(!isNaN(startY)){

      positionArr.push({
        x:startX + xTrans,
        y:startY
      })

      startX += 20
    }
  }

  return positionArr.filter(function (p) {
    return p.y < 1200 && p.y > -100
  });
}
//直线

function lRoadFn(x,y){


}


//轨道函数右侧侧
function rRoadFn(x,y){

}

function wrapper(container,boat,reverse){

  container.resetAngle = function (angle) {

  }

  var i = 0;
  container.render = function () {


    var d = boat.speedY

    this.children.map(function (child) {
      child.y += d;
      if(child.y > HEIGHT){
        child.y = - asideHeight;
      }
    })

  }

  return container;
}

module.exports = function(boat,reverse){
  var container = new PIXI.Container();

  container.name = '左侧';
  container.scale.x = 0.7

  container.initX = 0;
  container.initY = 0;
  //岸边的宽度默认为128,所以初始中心X为64；
  container.centralX = asideWidth/2
  container.centralY = HEIGHT/2 + container.y;

  container.roadFn = lRoadFn;

  for(var i = 0;i<10;i++){
    var mySprite = mySpriteFn()
    mySprite.y = i*asideHeight
    container.addChild(mySprite)
  }

  if(reverse){
    container.scale.x = -container.scale.x;
    container.name = '右侧';
    container.initX = WIDTH;
    container.x = WIDTH;
    container.roadFn = rRoadFn;
  }

  container = wrapper(container,boat)


  return container;
}