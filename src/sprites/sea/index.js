var PIXI = require('pixi');
var pixiLib = require('pixi-lib')

var mySpriteFn = require('./sprite.js');


var container = new PIXI.Container();

var mySprite = mySpriteFn();
var mySprite2 = mySpriteFn();

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

container.speed = mySprite.speed = mySprite2.speed = 1;


container.addChild(wrapper(mySprite));
container.addChild(wrapper(mySprite2));

container.render = function () {

  this.children.forEach(function (c) {
    c.speed = container.speed;
    c.render();
  })
}

module.exports = container;