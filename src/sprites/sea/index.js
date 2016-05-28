var PIXI = require('pixi');
var pixiLib = require('pixi-lib')

var riverAsideFn = require('../river_aside');

var mySpriteFn = require('./sprite.js');

var mySprite = mySpriteFn();
var mySprite2 = mySpriteFn();

var width = pixiLib.createRender.DEFAULT_WIDTH;
var height = pixiLib.createRender.DEFAULT_HEIGHT;

function wrapper(obj){

  obj.render = function () {
    this.y += this.speed

    if(this.y >= height){
      this.y = -height
    }
  }
  return obj;
}

mySprite.y = 0;
mySprite2.y = -height;


module.exports = function (boat) {

  var container = new PIXI.Container();

  container.initX = 0
  container.initY = 0

  container.x = 0
  container.y = 0

  container.centralX = width/2
  container.centralY = height/2

  container.addChild(wrapper(mySprite));
  container.addChild(wrapper(mySprite2));

  container.render = function () {

    //this.rotation = boat.bgDirection
    //var distanceArr = pixiLib.math.rotateWithCentral(container.centralX,container.centralY,boat.bgDirection);
    //this.x = container.initX - distanceArr[0]/2
    //this.y = container.initY - distanceArr[1]/2

    this.children.forEach(function (c) {
      c.speed = boat.speed;
      c.render();
    })
  }

  window.bg = container;

  return container;
};