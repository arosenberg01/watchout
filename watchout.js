// start slingin' some d3 here.

var height = 600;
var width = 1000;

// var enemyData = [];

// for (var i = 0; i < 10; i++) {
//   var enemy = {};
//   enemy.cx = Math.floor(Math.random() * width);
//   enemy.cy = Math.floor(Math.random() * height);
//   enemy.r = 25;
//   enemyData.push(enemy);
// }

var randomMove = function () {
  d3.select("circle").transition().duration(1000).attr("cx", (Math.floor(Math.random() * width))).attr("cy", (Math.floor(Math.random() * height)));
}

d3.select('svg').append("circle").attr("cx", 50).attr("cy", 50).attr("r", 25);
d3.select('svg').append("rect").attr("x", 0).attr("y", 0).attr("width", width).attr("height", height).style({"fill-opacity": 0, "stroke": "black", "stroke-width": 1, "stroke-opacity": 1, "fill": "white"});

setInterval(randomMove, 3000);
