/**
 * Created by zhouchunjie on 16/5/27.
 */
var loader = require('../../loader');
var addResource = require('../scene0/addResource');

module.exports = function (render) {

    addResource(loader.add.bind(loader),function(){

        var seaFn = require('../../sprites/sea');

        var boatingPlayerFn = require('../../sprites/boating_player');
        var boatFn = require('../../sprites/boat');
        var distanceProgressFn = require('../../sprites/distance_progress');
        var riverAsideFn = require('../../sprites/river_aside');
        var rulePanelFn = require('../../sprites/rule_panel');

        var boat = boatFn(boatingPlayerFn);
        var distanceProgress = distanceProgressFn(boat);
        var sea = seaFn(boat);

        var riverAsideLeft = riverAsideFn(boat)
        var riverAsideRight = riverAsideFn(boat,true);

        var rulePanel = rulePanelFn();

        var stage = new PIXI.Container();

        stage.addChild(sea);

        stage.addChild(riverAsideLeft)
        stage.addChild(riverAsideRight)

        stage.addChild(distanceProgress);
        stage.addChild(boat);

        stage.addChild(rulePanel);

        var ruleStyle = {
            font: 'bold italic 36px Arial',
            fill: '#F7EDCA',
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 220
        };

        //开始按钮
        var startButton = new PIXI.Container();

        var startGraphics = new PIXI.Graphics();
        startGraphics.beginFill(0xFF6347, 1);
        startGraphics.drawRect(0, 875, 650, 129);
        startButton.addChild(startGraphics);

        var startText = new PIXI.Text('START',ruleStyle);
        startText.x = 270;
        startText.y = 918;

        startButton.addChild(startText);
        startButton.on('mousedown', onStartClick);
        startButton.on('touchstart', onStartClick);

        stage.addChild(startButton);

        stage.interactive = true;


        function onStartClick(){
            console.log("on click start button");
        }

        render(stage);
    });
}

