var pixiLib = require('pixi-lib');

var args = [{

  textures:pixiLib.getTextures('boating_player'),

  

    

    "spriteName" :  "boating_player" ,

    

  

    

    "animationSpeed" :  0.05 ,

    

  

    

    "scale.x" :  0.25 ,

    

  

    

    "scale.y" :  0.25 ,

    

  

    

  
}]



  args.push([

    
  ]);



module.exports = function spriteFn(){
  var mySprite = pixiLib.getMc.apply(pixiLib,args);

  return mySprite;
}