var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('river_aside'),

  

    

    "spriteName" :  "river_aside" ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}