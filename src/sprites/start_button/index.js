/**
 * Created by zhouchunjie on 16/5/31.
 */
module.exports = function (buttonName) {

    var container = new PIXI.Container();
    container.x = 0;
    container.y = 875;
    container.width = 650;
    container.height = 130;

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
    var startGraphics = new PIXI.Graphics();
    startGraphics.beginFill(0xFF6347, 1);
    startGraphics.drawRect(0, 0, 650, 129);
    container.addChild(startGraphics);

    var startText = new PIXI.Text(buttonName, ruleStyle);
    startText.x = 230;
    startText.y = 43;

    container.addChild(startText);
    container.interactive = true;

    return container;
}

