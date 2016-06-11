var pixiLib = require('pixi-lib');

var args = [{
  textures:pixiLib.getTextures('warning'),
    "spriteName" :  "warning" ,
    "scale.x" :  0.3 ,
    "scale.y" :  0.3 ,
}]
args.push([]);

module.exports = function spriteFn(){
  var mySprite = pixiLib.getIm.apply(pixiLib,args);
  return mySprite;
}
