var json = [
  
    'boating_player',

];
var png = [
  "sea",
  'race_flag',
  'river_aside',
  'zongzi'
];

module.exports = function (add,callback) {

  add(json,'json','')
  .add(png,'png','')
  .load(callback);
}