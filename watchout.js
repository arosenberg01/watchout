// start slingin' some d3 here.

var height = 600;
var width = 1000;

var generateEnemies = function() {

  var enemyData = [];

  for (var i = 0; i < 10; i++) {
    var enemy = {};
    enemy.cx = Math.floor(Math.random() * width);
    enemy.cy = Math.floor(Math.random() * height);
    enemyData.push(enemy);
  }

  return enemyData;
};

var svg = d3.select('svg');

// d3.select('svg').append("circle").attr("cx", 50).attr("cy", 50).attr("r", 25);
svg.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)
  .style({"fill-opacity": 0, "stroke": "black", "stroke-width": 1, "stroke-opacity": 1, "fill": "white"});
// d3.select('svg').selectAll("circle").data(enemyData).enter().append("circle").attr("cx", Math.floor(Math.random() * width)).attr("cy", Math.floor(Math.random() * height)).attr("r", 25);
var firstEnemies = generateEnemies();

svg.selectAll("circle")
  .data(firstEnemies)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d.cx})
  .attr("cy", function(d) { return d.cy})
  .attr("r", 10);

firstEnemies.push(1);

var player = svg.selectAll("circle")
  .data(firstEnemies)
  .enter()
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", 10)
  .style({"fill": "blue", "stroke": "black", "stroke-width": 2})
  .call(d3.behavior.drag().on("drag", move));

function move(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("cx", x).attr("cy", y);
}

function checkCollision(enemy) {
  var radiusSum = parseFloat(enemy.attr("r")) + parseFloat(player.attr("r"));
  var xDiff = parseFloat(enemy.attr("cx")) - parseFloat(player.attr("cx"));
  var yDiff = parseFloat(enemy.attr("cy")) - parseFloat(player.attr("cy"));
  var separation = (Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < Math.pow(radiusSum, 2)) {
      currentScore = 0;
    }
}

var currentScore = 10;

var randomMove = function () {
  d3.select('svg').selectAll("circle").data(generateEnemies()).transition().duration(1000).attr("cx", function(d) { return d.cx}).attr("cy", function(d) { return d.cy});
}

setInterval(randomMove , 1500);
