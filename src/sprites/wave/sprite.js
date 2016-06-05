var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('wave'),

  

    

    "spriteName" :  "wave" ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}