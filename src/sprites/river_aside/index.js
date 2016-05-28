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



//轨道函数右侧侧
function rRoadFn(x,y){

}

function wrapper(container,boat,reverse){

  container.resetAngle = function (angle) {

  }

  var i = 0;
  container.render = function () {
    if(i++%10===0) {
      var asidePositionArr = this.roadFn(boat.distanceX, boat.distanceY);

      console.log(asidePositionArr.map(function(p){return p.x}));
      //console.log(asidePositionArr.map(function(p){return p.y}));

      asidePositionArr.map(function (position, i) {
        var c = container.children[i];
        if (!c) {
          var c = mySpriteFn()
          container.addChild(c);
        }
        c.x = position.x
        c.y = position.y;
      })

      var right = container.children[container.children.length-1].x
      var left = container.children[0].x;

      this.centralX = left + (right - left)/2

      window.containerObj = container;

      var myX = -320;
      var myY = boat.centralY+boat.y

      var distanceArr = pixiLib.math.rotateWithCentral(myX,myY,boat.bgDirection);

      //console.log(myX,myY)
      //console.log(distanceArr)

      this.x = container.initX + distanceArr[0]
      this.y = container.initY - distanceArr[1]

      this.rotation = -boat.bgDirection
    }


    //this.x += boat.speed * Math.sin(boat.allDirection)
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

  container.roadFn = lRoadFn2;

  //for(var i = 0;i<10;i++){
  //  var mySprite = mySpriteFn()
  //  mySprite.y = i*asideHeight
  //  container.addChild(mySprite)
  //}

  if(reverse){
    container.name = '右侧';
    container.initX = WIDTH - asideWidth;
    container.x = WIDTH - asideWidth;
    container.roadFn = rRoadFn;
  }

  container = wrapper(container,boat)


  return container;
}