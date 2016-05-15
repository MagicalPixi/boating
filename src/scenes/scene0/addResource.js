var json = [
  
    'boating_player',
  
];
var png = [
  "sea"
];

module.exports = function (add,callback) {

  add(json,'json','')
  .add(png,'png','')
  .load(callback);
}