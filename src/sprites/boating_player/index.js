var mySpriteFn = require('./sprite.js');
var mySprite = mySpriteFn();

mySprite.render = function () {
}

module.exports = function () {

  var player = mySpriteFn();
  player.play();
  return player;
};
