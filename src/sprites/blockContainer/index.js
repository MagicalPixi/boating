/**
 * Created by zyg on 16/5/29.
 */
var PIXI = require('pixi');
var pixiLib = require('pixi-lib')


var zongziFn = require('../zongzi/')

function wrapper(container,boat){

  container.addBlock = function () {

    this.addChild(zongziFn(boat))
  }

  container.render = function () {

    if(Math.random() > 0.99 && this.children.length < 1){
      this.addBlock()
    }

    this.children.map(function (c) {
      c.render()
    })
  }

  return container;
}

module.exports = function (boat) {
  var container = new PIXI.Container();


  container.x = 0

  container = wrapper(container,boat)



  return container
}