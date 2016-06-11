/**
 * Created by zyg on 16/5/19.
 */
var pxiLib = require('pixi-lib');

var spriteFn = require('./sprite');

var flagFn = require('../race_flag');

var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;

module.exports = function (boat) {

  var flag = flagFn();
  var bar = spriteFn.base();
  var progress = spriteFn.progress();

  var container = new PIXI.Container();

  var isEnd = false;

  flag.y = 25;
  flag.x = 5;

  container.addChild(bar);

  container.addChild(progress);
  container.addChild(flag)

  var allWidth = WIDTH * 0.9

  container.render = function () {
    if(!isEnd && gameState === GAME_START){

      var d = boat.distanceY/maxDistance * allWidth

      flag.x = d;
      isEnd = progress.updateWidth(flag.x+5);
    }
  }


  return container;
}