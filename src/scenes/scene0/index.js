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

  addResource(loader.add.bind(loader),function(){

    var seaFn = require('../../sprites/sea');

    var boatingPlayerFn = require('../../sprites/boating_player');
    var boatFn = require('../../sprites/boat');
    var distanceProgressFn = require('../../sprites/distance_progress');

    var boat = boatFn(boatingPlayerFn);
    var distanceProgress = distanceProgressFn(boat);

    var sea = seaFn(boat);

    var stage = new PIXI.Container();

    stage.addChild(sea);

    stage.addChild(distanceProgress);
    stage.addChild(boat);

    stage.interactive = true;

    stage = handTap(stage, function (aside) {
      console.log('aside:',aside);
      boat.playBoat(aside);
    });

    render(stage);
  });
};