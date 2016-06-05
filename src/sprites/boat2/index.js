/**
 * Created by zyg on 16/5/15.
 */
var PIXI = require('pixi');
var pixiLib = require('pixi-lib')
var range = require('lodash/range');
var spriteFn = require('./sprite');

var PLAYER_GAP = 30;
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
    p.x = 82.5;
    p.y += 145 + i*PLAYER_GAP;
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

    var radians = -(right - left) * SINGLE_PI;

    //if(Math.abs(radians) >= this.maxDirection){
    //  if(radians > 0){
    //    this.bgDirection = radians - this.maxDirection
    //    radians = this.maxDirection;
    //  }else{
    //    this.bgDirection = radians + this.maxDirection
    //    radians = -this.maxDirection;
    //  }
    //}

    console.log('left-right:',left,right);

    var originX = this.originX;
    var originY = this.originY;

    var targetArr = pixiLib.math.rotateWithCentral(originX,-originY,-radians)
    var distanceX = targetArr[0]
    var distanceY = targetArr[1]

    //targetX = originX*Math.cos(radians) - originY*Math.sin(radians);
    //targetY = originX*Math.cos(radians) + originY*Math.sin(radians);

    //this.x = this.initX - (targetX - originX)/2;
    //this.y = this.initY - (targetY - originY)/2;

    this.x = this.initX - distanceX/2
    this.y = this.initY + distanceY/2

    this.rotation = radians;
    this.direction = radians;
    this.allDirection = radians + this.bgDirection;
  };
  /**
   * 调整速度
   */
  boat.updateSpeed = function(){
    this.speed = this.initSpeed + (this.speedLeftCount + this.speedRightCount)/2 + this.speedExtra;
    this.speedY = this.speed * Math.cos(this.allDirection)
    this.speedX = this.speed * Math.sin(this.allDirection)
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
    boat.distanceX -= boat.speed * Math.sin(this.allDirection);

    var d = boat.speed * Math.sin(this.allDirection);
    boat.x += d
    boat.initX += d
    boat.centralX = boat.initX + boat.originX
  }

  boat.speedUp = function () {

    console.log('speeeeeeed UP!');

    this.speedExtra += 10
    boat.updateSpeed()

    setTimeout(function () {
      boat.speedExtra -= 10
      boat.updateSpeed()
    }, 2000)
  }
  boat.test = function(){
    this.directionLeftCount = 6;
    this.updateRatio();
  }

  return boat;
}

module.exports = function(playerFn){

  var boat = spriteFn();

  boat.scale.x = 1.3
  boat.scale.y = 1.3

  var container = new PIXI.Container();

  container.name = '船';

  container.directionLeftCount = DEFAULT_PLAY_COUNT;
  container.directionRightCount = DEFAULT_PLAY_COUNT;

  container.speedLeftCount = DEFAULT_PLAY_COUNT;
  container.speedRightCount = DEFAULT_PLAY_COUNT;

  container.initSpeed = 2;
  container.speedExtra = 0;
  container.speed = 2;
  container.speedX = 0;
  container.speedY = 2;

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

  container.originX = container.width/2;
  container.originY = container.height/2;
  container.initX = (WIDTH - container.width)/2;
  container.initY = HEIGHT - container.height - 40;
  container.centralX = container.initX + container.originX;
  container.centralY = container.initY + container.originX;
  container.x = container.initX;
  container.y = container.initY;

  container.distanceX = 0;
  container.initDistanceY = HEIGHT - container.originY - container.y
  container.distanceY = HEIGHT - container.height - container.y

  leftPlayerObj.players.concat(rightPlayerObj.players).forEach(function (p) {
    container.addChild(p);
  });

  container.leftPlayerObj = leftPlayerObj;
  container.rightPlayerObj = rightPlayerObj;

  container = wrapperBoat(container);

  window.boat = container;

  return container;
};
