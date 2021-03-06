var detectRect = function(rect1, rect2) {
  var anchor1 = getAnchor(rect1)
  var anchor2 = getAnchor(rect2)
  var width1 = rect1.width
  var width2 = rect2.width
  var height1 = rect1.height
  var height2 = rect2.height
  var center1 = {
    x: (0.5 - anchor1.x) * width1 + rect1.x,
    y: (0.5 - anchor1.y) * height1 + rect1.y
  }
  var center2 = {
    x: (0.5 - anchor2.x) * width2 + rect2.x,
    y: (0.5 - anchor2.y) * height2 + rect2.y 
  }
  var distanceX = Math.abs(center1.x - center2.x)
  var distanceY = Math.abs(center1.y - center2.y)
  return distanceX < (width1 + width2) / 2 && distanceY < (height1 + height2) / 2
}

var getAnchor = function(rect) {
  if (rect.anchor) {
    return {x: rect.anchor.x, y:rect.anchor.y}
  } else {
    var anchor = {x: rect.pivot.x, y:rect.pivot.y}
    anchor.x = anchor.x / (rect.width)
    anchor.y = anchor.y / (rect.height)
    return anchor
  }
}

module.exports = {
  detectRect: detectRect
}
