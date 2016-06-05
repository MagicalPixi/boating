/**
 * Created by zhouchunjie on 16/6/1.
 */

module.exports = function (score) {

    var scorePanel = new PIXI.Container();

    var graphics = new PIXI.Graphics();

    scorePanel.x = 0;
    scorePanel.y = 100;
    scorePanel.width = 650;
    scorePanel.height = 375;

    //规则区块
    graphics.beginFill(0xFF700B, 0.5);
    graphics.drawRect(0, 0, 650, 375);
    graphics.endFill();

    scorePanel.addChild(graphics);

    //规则内容
    var ruleStyle = {
        font: 'bold italic 80px Arial',
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
    var scoreTitle = new PIXI.Text('Score',ruleStyle);
    scoreTitle.x = 270;
    scoreTitle.y = 20;
    scorePanel.addChild(scoreTitle);

    var ruleStyle = {
        font: 'bold italic 80px Arial',
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

    var scoreText =  new PIXI.Text(score,ruleStyle);
    scoreText.x = 50;
    scoreText.y = 80;
    scorePanel.addChild(scoreText);

    return scorePanel;
}