/**
 * Created by zyg on 16/5/15.
 */
var PIXI = require('pixi');
var range = require('lodash/range');
var spriteFn = require('./sprite');

var PLAYER_GAP = 90;
var DEFAULT_PLAY_COUNT = 1;
/**
 * @param aside 0=left,1=right
 * @param playerFn
 * @returns {{players: *, play: Function}}
 */
function boatPlayer(aside,playerFn){
  var defaultAnimateSpeed = 0;

  var players = range(4).map(function () {
    return playerFn();
  });

  defaultAnimateSpeed = players[0].animationSpeed;

  players = players.map(function (p,i) {
    if(!aside){
      p.scale.x = -p.scale.x;
    }
    p.x = 100;
    p.y += i*PLAYER_GAP;
    return p;
  });

  var st = 0;
  //当前的速度累加层次，调用一次叠加一层，持续{playerCountDuration}秒
  //总是有速度的，初始为1
  var speedPlayerCount = DEFAULT_PLAY_COUNT;
  var directionPlayerCount = DEFAULT_PLAY_COUNT;
  var playerCountDuration = 500;

  return {
    players:players,
    play: function (whenDurationEndFn) {

      directionPlayerCount++;
      speedPlayerCount++

      players = players.map(function (p) {
        p.animationSpeed = defaultAnimateSpeed * speedPlayerCount;
        return p;
      });

      st = setTimeout(function(){
        speedPlayerCount--;
        players = players.map(function (p) {
          p.animationSpeed = defaultAnimateSpeed * speedPlayerCount;
          return p;
        })

        whenDurationEndFn(speedPlayerCount);

      },playerCountDuration);

      return directionPlayerCount;
    }
  }
}


function wrapperBoat(boat){

  /**
   * 调整角度
   */
  boat.updateRatio = function () {
    var left = this.directionLeftCount;
    var right = this.directionRightCount;

    console.log(left,right);

    var radians = -(right - left) * Math.PI/30;

    console.log(left,right,radians);

    var centralX = this.centralX;
    var centralY = this.centralY;

    var targetX = centralX*Math.cos(radians) - centralY*Math.sin(radians);
    var targetY = centralX*Math.cos(radians) + centralY*Math.sin(radians);

    console.log(targetX-centralX, (targetY - centralY));

    this.x = this.initX - (targetX - centralX)/2;
    this.y = this.initY - (targetY - centralY)/2;


    this.rotation = radians;
  };
  /**
   * 调整速度
   */
  boat.updateSpeed = function(){
    this.speed = this.initSpeed + (this.speedLeftCount + this.speedRightCount)/2;
  }
  /**
   * @param aside 0.left,1.right
   */
  boat.playBoat = function(aside){
    if(!aside){
      this.directionLeftCount = this.leftPlayerObj.play(function(playCount){
        boat.speedLeftCount = playCount;
        //boat.updateRatio();
        boat.updateSpeed();
      });
      this.speedLeftCount = this.directionLeftCount;
    }else{
      this.directionRightCount = this.rightPlayerObj.play(function(playCount){
        boat.speedRightCount = playCount;
        //boat.updateRatio();
        boat.updateSpeed();
      });
      this.speedRightCount = this.directionRightCount;
    }

    this.updateRatio();
    this.updateSpeed();


    //叠加操作的角度
    //var radians = -(this.rightCount - this.leftCount) * Math.PI/30;
    this.direction = this.rotation
    //this.direction += radians;
    //console.log(this.direction,radians);
  };

  boat.render = function () {
    boat.distance += boat.speed * Math.cos(this.direction);
  }

  return boat;
}

module.exports = function(playerFn){

  var boat = spriteFn();

  var container = new PIXI.Container();

  container.initX = 220;
  container.initY = 350;
  container.x = 220;
  container.y = 350;

  container.directionLeftCount = DEFAULT_PLAY_COUNT;
  container.directionRightCount = DEFAULT_PLAY_COUNT;

  container.speedLeftCount = DEFAULT_PLAY_COUNT;
  container.speedRightCount = DEFAULT_PLAY_COUNT;

  container.initSpeed = 1;
  container.speed = 1;

  container.distance = 0;
  //船的历史角度叠加记录
  container.direction = 0

  container.addChild(boat);

  var leftPlayerObj = boatPlayer(0,playerFn);
  var rightPlayerObj = boatPlayer(1,playerFn);

  leftPlayerObj.players.concat(rightPlayerObj.players).forEach(function (p) {
    container.addChild(p);
  });

  container.centralX = container.width/2;
  container.centralY = container.height/2;

  container.leftPlayerObj = leftPlayerObj;
  container.rightPlayerObj = rightPlayerObj;

  container = wrapperBoat(container);

  return container;
};