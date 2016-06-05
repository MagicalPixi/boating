var pixiLib = require('pixi-lib');

window.pixiLib = pixiLib;

var render = pixiLib.createRender(document.body);

var scenesLoader = require.context('./scenes/');

scenesLoader.keys().filter(function(key){
  return /index\.js/.test(key);
}).map(function (key, i) {

  var sceneStart = scenesLoader(key);

  window['scene' + i] = function (render) {
    sceneStart(render);
  }
});

// window.scene0(render);
window.scene1(render);
// window.scene2(render);

