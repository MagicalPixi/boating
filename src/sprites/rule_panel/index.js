/**
 * Created by zhouchunjie on 16/5/27.
 */

module.exports = function () {

    var container = new PIXI.Container();

    var graphics = new PIXI.Graphics();

    //规则区块
    graphics.beginFill(0xFF700B, 0.5);
    graphics.drawRect(0, 100, 650, 375);

    //分割线
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.moveTo(325, 180);
    graphics.lineTo(325, 475);
    graphics.endFill();

    //规则内容
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
        wordWrapWidth: 250
    };
    var ruleTitle = new PIXI.Text('Rules',ruleStyle);
    ruleTitle.x = 270;
    ruleTitle.y = 120;
    container.addChild(ruleTitle);

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

    var leftRule = new PIXI.Text('On the left side sliding down, the boat will turn right.', ruleStyle);
    leftRule.x = 50;
    leftRule.y = 180;
    container.addChild(leftRule);

    var rightRule = new PIXI.Text('On the right side sliding down, the boat will turn left.', ruleStyle);
    rightRule.x = 375;
    rightRule.y = 180;
    container.addChild(rightRule);


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

    container.addChild(graphics);
    container.addChild(startButton);

    return container;
}