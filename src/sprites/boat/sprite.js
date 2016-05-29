/**
 * Created by zyg on 16/5/15.
 */
var PIXI = require('pixi');


module.exports = function(){

  var graphics = new PIXI.Graphics();

  graphics.beginFill(0x512E0F);

  graphics.lineStyle(2, 0x512E0F, 1);

  graphics.drawRect(0, 0, 200, 400);

  graphics.endFill();


  return graphics;
};