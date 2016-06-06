var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')


function detect(o1,o2){
  return Math.abs(o1.centralX - o2.x) < (o1.width * o1.scale.x / 2 + o2.width * o2.scale.x / 2) && Math.abs(o1.centralY - o2.y) < (o1.height * o1.scale.y / 2 + o2.height * o2.scale.y / 2) 
}

function wrapper(obj,boat){

  obj.render = function () {
    if(detect(boat, this)) {
      window.scene2()
    }
    this.y += boat.speedY
    this.centralY = this.y + this.height/2

    if(this.y > 1004 || this.crashed){
      requestAnimationFrame(function () {
        obj.parent.removeChild(obj);
        obj.destroy()
      })
    }
  }

  return obj
}

module.exports = function (boat) {

  var stone = mySpriteFn()

  stone.x = 400
  stone.centralX = stone.width/2 + stone.x
  stone.centralY = stone.heigt/2

  stone.crashed = false;

  stone = wrapper(stone,boat)

  return stone
}
