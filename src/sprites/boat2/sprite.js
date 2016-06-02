var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('boat2'),

  

    

    "spriteName" :  "boat2" ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}