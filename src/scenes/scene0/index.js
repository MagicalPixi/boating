var loader = require('../../loader');
var addResource = require('./addResource')

function handTap(stage,callback){
  var sx = 0;
  var sy = 0;
  var sLeftOrRight = null;

  stage.off('touchstart');
  stage.off('touchend');
  //手势操作
  stage.on('touchstart', function (e) {
    var x = e.data.global.x;
    var y = e.data.global.y;

    sx = x;
    sy = y;
    sLeftOrRight = sx > 320;
  });

  stage.on('touchend',function (e){
    var x = e.data.global.x;
    var y = e.data.global.y;

    if(y  - sy > 100){
      callback(sLeftOrRight);
    }
  });

  return stage;
}

module.exports = function (render) {

  //var control = pixiLib.audioControl('http://o8c60jr2y.bkt.clouddn.com/bg.mp3')
  //control.play()

  addResource(loader.add.bind(loader),function(){

    gameStart()

    var seaFn = require('../../sprites/sea');

    var boatingPlayerFn = require('../../sprites/boating_player');
    var boatFn = require('../../sprites/boat2');
    var distanceProgressFn = require('../../sprites/distance_progress');
    var riverAsideFn = require('../../sprites/river_aside')

    var blockContainerFn = require('../../sprites/blockContainer')

    var destinationFn = require('../../sprites/destination')

    var boat = boatFn(boatingPlayerFn);
    var distanceProgress = distanceProgressFn(boat);
    var sea = seaFn(boat)
    var blockContainer = blockContainerFn(boat)

    var riverAsideLeft = riverAsideFn(boat)
    var riverAsideRight = riverAsideFn(boat,true);

    var destination = destinationFn(boat)

    var stage = new PIXI.Container();

    stage.addChild(sea);
    stage.addChild(destination)


    stage.addChild(riverAsideLeft)
    stage.addChild(riverAsideRight)

    stage.addChild(blockContainer)

    stage.addChild(distanceProgress);
    stage.addChild(boat);

    stage.interactive = true;


    var st = Date.now()

    stage = handTap(stage, function (aside) {
      boat.playBoat(aside);
    });

    stage.stop = gameState !== GAME_START;
    //
    stage.render = function () {
      if(gameState === 1){
        stage.stop = false;
        this.children.forEach(function (c) {
          c.render = c._render ? c._render : c.render;
        })

        if(boat.x < 100 || boat.x > 500){
          gameOver()
        }

      }else if(!stage.stop){
        stage.stop = true;
        this.children.forEach(function (c) {
          if(c.render){
            c._render = c.render;
            c.render = false;
          }
        })
      }
      if(gameState === GAME_OVER){

        duration = ((Date.now() - st) / 1000).toFixed(2)

        window.scene2(render)
      }
    }

    window.boat = boat;

    window.renderObj = render(stage);

    //renderObj.cancel();
  });
};
