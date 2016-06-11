var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')

function wrapper(obj,boat){

  var i = 0;

  obj.render = function () {
    if(i++%8===0){
      this.visible = !this.visible
    }
  }

  return obj
}

module.exports = function (stone) {

  var warning = mySpriteFn()

  warning.x = stone.x + 50
  warning.y = 200

  warning.anchor.x = 0

  warning.duration = 1000

  warning = wrapper(warning,boat)

  window.warning = warning

  setTimeout(function () {

    if(warning.parent){
      warning.parent.addChild(stone)
      warning.parent.removeChild(warning)
    }

  },warning.duration)

  return warning
}
