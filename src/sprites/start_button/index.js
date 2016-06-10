/**
 * Created by zhouchunjie on 16/5/31.
 */
var HEIGHT = pixiLib.createRender.DEFAULT_HEIGHT;

module.exports = function (buttonName,index) {

    if(!index){
        index = 0
    }

    var container = new PIXI.Container();

    var height = 130;

    container.x = 0;
    container.y = HEIGHT - height*(index+1);

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
    }

    //开始按钮
    var startGraphics = new PIXI.Graphics();
    startGraphics.beginFill('0x'+(parseInt(0xFF6347)+index*20000).toString(16), 1);
    startGraphics.drawRect(0, 0, 640, height);
    container.addChild(startGraphics);

    var startText = new PIXI.Text(buttonName, ruleStyle);
    startText.x = 230;
    startText.y = 43;

    container.addChild(startText);
    container.interactive = true;

    return container;
}

