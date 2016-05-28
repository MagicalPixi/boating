/**
 * Created by zyg on 16/5/15.
 */
var PIXI = require('pixi');
var pixiLib = require('pixi-lib')
var range = require('lodash/range');
var spriteFn = require('./sprite');

var PLAYER_GAP = 90;
var DEFAULT_PLAY_COUNT = 1;

var WIDTH  = pixiLib.createRender.DEFAULT_WIDTH;
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

var SINGLE_PI = Math.PI/60;
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

    var radians = -(right - left) * SINGLE_PI;

    if(Math.abs(radians) >= this.maxDirection){
      if(radians > 0){
        this.bgDirection = radians - this.maxDirection
        radians = this.maxDirection;
      }else{
        this.bgDirection = radians + this.maxDirection
        radians = -this.maxDirection;
      }
    }

    console.log('left-right:',left,right);

    var centralX = this.centralX;
    var centralY = this.centralY;

    var targetArr = pixiLib.math.rotateWithCentral(centralX,centralY,radians)
    var distanceX = targetArr[0]
    var distanceY = targetArr[1]

    //targetX = centralX*Math.cos(radians) - centralY*Math.sin(radians);
    //targetY = centralX*Math.cos(radians) + centralY*Math.sin(radians);

    //this.x = this.initX - (targetX - centralX)/2;
    //this.y = this.initY - (targetY - centralY)/2;

    this.x = this.initX - distanceX/2
    this.y = this.initY - distanceY/2

    this.rotation = radians;
    this.direction = radians;
    this.allDirection = radians + this.bgDirection;
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
    //this.direction += radians;

    console.log('bgDirection:',this.bgDirection);
  };

  boat.render = function () {
    boat.distanceX -= boat.speed * Math.sin(this.allDirection);
    boat.distanceY += boat.speed * Math.cos(this.allDirection);
  }

  boat.test = function(){
    this.directionLeftCount = 6;
    this.updateRatio();
  }

  return boat;
}

module.exports = function(playerFn){

  var boat = spriteFn();

  var container = new PIXI.Container();

  container.name = '船';

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

  //船的历史角度叠加记录
  container.direction = 0
  //超过这个角度，船不在旋转,而是背景旋转
  container.maxDirection = 3 * SINGLE_PI;
  //背景旋转度
  container.bgDirection = 0;
  //总旋转角度
  container.allDirection = 0;

  container.addChild(boat);

  var leftPlayerObj = boatPlayer(0,playerFn);
  var rightPlayerObj = boatPlayer(1,playerFn);

  leftPlayerObj.players.concat(rightPlayerObj.players).forEach(function (p) {
    container.addChild(p);
  });

  container.centralX = container.width/2;
  container.centralY = container.height/2;

  container.distanceX = 0;
  container.initDistanceY = HEIGHT - container.centralY - container.y
  container.distanceY = HEIGHT - container.height - container.y

  container.leftPlayerObj = leftPlayerObj;
  container.rightPlayerObj = rightPlayerObj;

  container = wrapperBoat(container);

  window.boat = container;

  return container;
};