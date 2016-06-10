/**
 * Created by zhouchunjie on 16/5/31.
 * end page
 */

var loader = require('../../loader');
var addResource = require('../scene0/addResource');

module.exports = function (render) {

    addResource(loader.add.bind(loader), function () {

        var WIDTH = pixiLib.createRender.DEFAULT_WIDTH;
        var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

        var seaFn = require('../../sprites/sea');

        var boatingPlayerFn = require('../../sprites/boating_player');
        var boatFn = require('../../sprites/boat2');
        var distanceProgressFn = require('../../sprites/distance_progress');
        var riverAsideFn = require('../../sprites/river_aside');
        var scorePanelFn = require('../../sprites/score_panel');
        var startButtonFn = require('../../sprites/start_button');

        var boat = boatFn(boatingPlayerFn);
        var distanceProgress = distanceProgressFn(boat);
        var sea = seaFn(boat);

        var riverAsideLeft = riverAsideFn(boat)
        var riverAsideRight = riverAsideFn(boat, true);

        var rulePanel = scorePanelFn(duration+'秒');
        var startButton = startButtonFn("RESTART");

        var stage = new PIXI.Container();

        stage.addChild(sea);

        stage.addChild(riverAsideLeft)
        stage.addChild(riverAsideRight)

        stage.addChild(distanceProgress);
        stage.addChild(boat);

        startButton.on('mousedown', onStartClick);
        startButton.on('touchstart', onStartClick);

        function onStartClick() {

            gameStart()
        }

        //function animate() {
        //    if (startButton.y < HEIGHT) {
        //        startButton.y += 2;
        //    }
        //    if(WIDTH - rulePanel.x >0 ){
        //        rulePanel.x -=10;
        //    }
        //    requestAnimationFrame(animate);
        //}

        stage.addChild(rulePanel);
        stage.addChild(startButton);
        
        stage.render = function () {
            if(gameState === GAME_START){
                if (startButton.y < HEIGHT) {
                    startButton.y += 2;
                }
                if (rulePanel.width + rulePanel.x > 0) {
                    rulePanel.x -= 10;
                }

                if(startButton.y >= HEIGHT || rulePanel.x < - rulePanel.width){
                    window.scene0(render)
                }
            }
        }

        stage.interactive = true;

        render(stage);
    });
};


