var pixiLib = require('pixi-lib')
var mySpriteFn = require('./sprite.js')

function detect(o1,o2){

  var d = pixiLib.math.distance(o1.centralX,o1.centralY,o2.detectX,o2.detectY)

  //if(d<80){
  //  console.log(o1.centralX,o1.centralY,o2.detectX,o2.detectY,d)
  //}

  return d < 40
}

function wrapper(obj,boat){


  obj.render = function () {

    this.y += boat.speedY
    this.centralY = this.y + this.height/2

    //碰撞
    if(!this.eated){
      this.eated = detect(this,boat)
      if(this.eated){
        boat.speedUp()

      }
    }
    if(this.y > 1004 || this.eated){
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

  var zongzi = mySpriteFn()

  zongzi.x = Math.random() * 272  + 128
  zongzi.centralX = zongzi.width/2 + zongzi.x
  zongzi.centralY = zongzi.heigt/2

  zongzi.eated = false;

  zongzi = wrapper(zongzi,boat)

  return zongzi
}