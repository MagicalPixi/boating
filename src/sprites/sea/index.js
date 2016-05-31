var PIXI = require('pixi');
var pixiLib = require('pixi-lib')

var riverAsideFn = require('../river_aside');

var waveFn = require('../wave');

var WIDTH = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

function seaBg(){

  var graphics = new PIXI.Graphics();

  graphics.beginFill(0x38dcFF);

  graphics.lineStyle(2, 0x0BA5FF, 1);

  graphics.drawRect(0, 0, WIDTH, HEIGHT);

  graphics.endFill();

  return graphics;
}


module.exports = function (boat) {

  var container = new PIXI.Container();
  var wave = waveFn(boat)

  var wave2 = waveFn(boat)
  wave2.y = 400

  var wave3 = waveFn(boat)
  wave3.y = 800

  container.initX = 0
  container.initY = 0

  container.x = 0
  container.y = 0

  container.centralX = WIDTH/2
  container.centralY = HEIGHT/2

  container.addChild(seaBg());
  container.addChild(wave);
  container.addChild(wave2);
  container.addChild(wave3);

  container.render = function () {

    //this.rotation = boat.bgDirection
    //var distanceArr = pixiLib.math.rotateWithCentral(container.centralX,container.centralY,boat.bgDirection);
    //this.x = container.initX - distanceArr[0]/2
    //this.y = container.initY - distanceArr[1]/2

    this.children.forEach(function (c) {
      c.render && c.render()
    })
  }

  window.bg = container;

  return container;
};