var mySpriteFn = require('./sprite.js');


module.exports = function(reverse){
  var mySprite = mySpriteFn();

  if(reverse){
    mySprite.scale.x = -mySprite.scale.x;
  }

  return mySprite;
}