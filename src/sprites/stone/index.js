var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')


function detect(o1,o2){
  var d = pixiLib.math.distance(o1.centralX,o1.centralY,boat.detectX,o2.detectY)

  //if(d<80){
  //  console.log(o1.centralX,o1.centralY,o2.detectX,o2.detectY,d)
  //}

  return d < 45
}

var detectRect = require('../../math').detectRect

function wrapper(obj,boat){

  obj.render = function () {
    if(detectRect(this,boat)) {
     gameOver();
    }
    this.y += boat.speedY
    this.centralY = this.y + this.height/2

    if(this.y > 1004 || this.crashed){
      obj.parent.removeChild(obj);
      obj.destroy()
      //requestAnimationFrame(function () {
      //  obj.parent.removeChild(obj);
      //  obj.destroy()
      //})
    }
  }

  return obj
}

module.exports = function (boat) {

  var stone = mySpriteFn()

  stone.x = Math.random() * 272  + 128
  stone.centralX = stone.width/2 + stone.x
  stone.centralY = stone.heigt/2

  stone.crashed = false;

  stone = wrapper(stone,boat)

  window.stone = stone

  return stone
}
