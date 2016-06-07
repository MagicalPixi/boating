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

//0未开始，1开始，2结束
window.gameState = false;

window.scene0(render);
//window.scene1(render);
// window.scene2(render);

