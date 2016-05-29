var PIXI = require('pixi');
var pixiLib = require('pixi-lib')

var riverAsideFn = require('../river_aside');

var mySpriteFn = require('./sprite.js');

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

function wrapper(obj){

  obj.render = function () {

    this.y += boat.speedY
    if(this.y>HEIGHT){
      this.y = - 200
    }
  }
  return obj;
}

var wave = mySpriteFn()
wave.scale.x = 0.5
wave.scale.y = 0.5
wave.x = (WIDTH - wave.width)/2

var wave2 = mySpriteFn()
wave2.scale.x = 0.5
wave2.scale.y = 0.5
wave2.x = (WIDTH - wave.width)/2
wave2.y = -400

module.exports = function (boat) {

  var container = new PIXI.Container();

  container.initX = 0
  container.initY = 0

  container.x = 0
  container.y = 0

  container.centralX = WIDTH/2
  container.centralY = HEIGHT/2

  container.addChild(seaBg());
  container.addChild(wrapper(wave,boat));
  container.addChild(wrapper(wave2,boat));

  container.render = function () {

    //this.rotation = boat.bgDirection
    //var distanceArr = pixiLib.math.rotateWithCentral(container.centralX,container.centralY,boat.bgDirection);
    //this.x = container.initX - distanceArr[0]/2
    //this.y = container.initY - distanceArr[1]/2

    this.children.forEach(function (c) {
      c.render && c.render();
    })
  }

  window.bg = container;

  return container;
};