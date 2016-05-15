var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('sea'),

  

    

    "spriteName" :  "sea" ,

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getIm.apply(pixiLib,args);

  return mySprite;
}