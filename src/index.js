var pixiLib = require('pixi-lib');
window.NODE_ENV = 'production'
window.pixiLib = pixiLib;

var render = pixiLib.createRender(document.body);

var scenesLoader = require.context('./scenes/');

scenesLoader.keys().filter(function(key){
  return /index\.js/.test(key);
}).map(function (key, i) {

  var sceneStart = scenesLoader(key);

  window['scene' + i] = function () {
    sceneStart(render);
  }
});

//0未开始，1开始，2结束,3.正在结束
window.GAME_INIT=0
window.GAME_START=1
window.GAME_OVER=2
window.GAME_ON_OVER = 3;

window.gameState = GAME_INIT;

window.gameStart = function () {
  gameState = GAME_START
}
window.gameOver = function () {
  gameState = GAME_OVER
}

//耗时
window.duration  = 0

window.maxDistance = 10000

window.scene0(render);
//window.scene1(render);
//window.scene2(render);

