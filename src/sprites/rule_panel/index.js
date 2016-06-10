/**
 * Created by zhouchunjie on 16/5/27.
 */

module.exports = function () {

    var rulePanel = new PIXI.Container();

    var graphics = new PIXI.Graphics();

    rulePanel.x = 0;
    rulePanel.y = 100;
    rulePanel.width = 650;
    rulePanel.height = 375;

    //规则区块
    graphics.beginFill(0xFF700B, 0.5);
    graphics.drawRect(0, 0, 650, 375);

    //分割线
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.moveTo(325, 80);
    graphics.lineTo(325, 375);
    graphics.endFill();

    rulePanel.addChild(graphics);

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
    ruleTitle.y = 20;
    rulePanel.addChild(ruleTitle);

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

    var leftRule = new PIXI.Text('On the left side sliding down, the boat will turn right. 左侧上下滑动', ruleStyle);
    leftRule.x = 50;
    leftRule.y = 80;
    rulePanel.addChild(leftRule);

    var rightRule = new PIXI.Text('On the right side sliding down, the boat will turn left. 右侧上下滑动', ruleStyle);
    rightRule.x = 375;
    rightRule.y = 80;
    rulePanel.addChild(rightRule);

    return rulePanel;
}

