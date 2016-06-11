var json = [
  
    'boating_player',

];
var png = [
  'race_flag',
  'river_aside',
  'zongzi',
  'stone',
  'wave',
  'boat2',
  'warning'
];

module.exports = function (add,callback) {

  add(json,'json','')
  .add(png,'png','')
  .load(callback);
}