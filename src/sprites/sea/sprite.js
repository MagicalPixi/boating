var pixiLib = require('pixi-lib');
var PIXI = require('pixi');

var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

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