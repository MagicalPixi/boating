var json = [
  
    'boating_player',

];
var png = [
  "sea",
  'race_flag'
];

module.exports = function (add,callback) {

  add(json,'json','')
  .add(png,'png','')
  .load(callback);
}