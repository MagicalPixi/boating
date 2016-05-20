var PIXI = require('pixi');
var pixiLib = require('pixi-lib')

var riverAsideFn = require('../river_aside');

var mySpriteFn = require('./sprite.js');

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


module.exports = function (boat) {

  var container = new PIXI.Container();

  container.addChild(wrapper(mySprite));
  container.addChild(wrapper(mySprite2));

  container.render = function () {

    this.children.forEach(function (c) {
      c.speed = boat.speed;
      c.render();
    })
  }

  return container;
};