/**
 * Created by zhouchunjie on 16/6/1.
 */

module.exports = function (score) {

    var scorePanel = new PIXI.Container();


    scorePanel.x = 0;
    scorePanel.y = 100;
    //scorePanel.height = 375;

    var graphics = new PIXI.Graphics();
    //规则区块
    graphics.beginFill(0xFF700B, 0.5);
    graphics.drawRect(0, 0, 640, 300);
    graphics.endFill();

    scorePanel.addChild(graphics);

    //规则内容
    var titleStyle = {
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
    var scoreTitle = new PIXI.Text('SCORE',titleStyle);
    scoreTitle.x = 170;
    scoreTitle.y = 40;
    scorePanel.addChild(scoreTitle);

    var scoreStyle = {
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

    var scoreText =  new PIXI.Text(score,scoreStyle);
    scoreText.x = 320 -scoreText.width/2
    scoreText.y = 160;
    scorePanel.addChild(scoreText);

    var rankingStyle = {
        font: 'bold italic 25px Arial',
        fill: '#F7EDCA',
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 550
    };
    //var rankingText = new PIXI.Text('您已击败了'+78.9 + '%的玩家',rankingStyle);
    //var rankingText = new PIXI.Text('You have defeated the '+78.9 +'% of the players',rankingStyle);
    //rankingText.x = 60;
    //rankingText.y = 280;
    //scorePanel.addChild(rankingText);

    return scorePanel;
}