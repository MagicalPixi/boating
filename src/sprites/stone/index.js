var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')


function detect(o1,o2){

  var d = pixiLib.distance(o1.centralX,o1.centralY,o2.centralX,o2.centralY)

  //console.log(d)

  return d < 80
}

function wrapper(obj,boat){

  obj.render = function () {

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