var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')

var WIDTH = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;



function wrapper(obj,boat){

  obj.render = function () {

    this.y += boat.speedY
    if(this.y>HEIGHT){
      this.y = - 200
    }
  }
  return obj;
}


module.exports = function (boat) {

  var wave = mySpriteFn()
  wave.scale.x = 0.5
  wave.scale.y = 0.5
  wave.x = (WIDTH - wave.width)/2

  wave = wrapper(wave,boat)

  return wave;
}