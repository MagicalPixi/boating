
var PIXI = require('pixi')

var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

var rw = 50

function rect(reverse){

  var g = new PIXI.Graphics()
  if(reverse){
    g.beginFill(0xffffff)
  }else{
    g.beginFill(0x000000)
  }

  g.drawRect(0,0,rw,rw)
  g.endFill()

  return g
}


module.exports = function (boat) {

  var container = new PIXI.Container()

  for(var i=0;i<5;i++){

    var r1 = rect(true)
    var r2 = rect(false)
    var r3 = rect(false)
    var r4 = rect(true)

    r1.x = i * rw * 2
    r2.x = i * rw * 2 + rw
    r3.x = i * rw * 2
    r4.x = i * rw * 2 + rw

    r3.y = rw
    r4.y = rw

    container.addChild(r1)
    container.addChild(r2)
    container.addChild(r3)
    container.addChild(r4)
  }

  container.x = (WIDTH - container.width)/2
  container.initY = - rw * 2
  container.y = - rw * 2
  container.visible = false;
  container.stoped = false;

  var endPosition = 650

  container.render = function () {

    if(boat.distanceY  > (maxDistance - endPosition + container.initY) && !container.stoped){
      container.visible = true
      container.y += boat.speedY;

      if(container.y >= endPosition
      ){
        container.stoped = true
        boat.keepMove()
      }
    }
  }

  return container
}