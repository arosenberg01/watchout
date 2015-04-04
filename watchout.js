// start slingin' some d3 here.
var currentScore = d3.select(".current").select("span");
var count = 0;
setInterval(function() {
  count++;
  currentScore.text("" + count + "");
}, 10)


var height = 600;
var width = 1000;

var generateEnemies = function() {

  var enemyData = [];

  for (var i = 0; i < 25; i++) {
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

// svg.selectAll("circle")
//   .data(firstEnemies)
//   .enter()
//   .append("circle")
//   .attr("cx", function(d) { return d.cx})
//   .attr("cy", function(d) { return d.cy})
//   .attr("r", 10)
//   .style("fill", "url(small-shuriken.png)");

svg.selectAll("circle")
  .data(firstEnemies)
  .enter()
  .append("svg:image")
  .attr("class", "shuriken")
  .attr("x", function(d) { return d.cx})
  .attr("y", function(d) { return d.cy})
  .attr("r", 10)
  .attr("width", 21)
  .attr("height", 21)
  .attr("xlink:href", "small-shuriken.png");


var player = svg.selectAll("circle")
  .data([1])
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
  var xDiff = parseFloat(enemy.attr("x")) - parseFloat(player.attr("cx"));
  var yDiff = parseFloat(enemy.attr("y")) - parseFloat(player.attr("cy"));
  var separation = (Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < Math.pow(radiusSum, 2)) {
      var currentScore = d3.select(".current").select("span");
      var highScore = d3.select(".high").select("span");
      var collisionCount = d3.select(".collisions").select("span");
      collisionCount.text("" + (parseInt(collisionCount.text()) + 1) + "")
      if (parseInt(currentScore.text()) > parseInt(highScore.text())) {
        highScore.text(currentScore.text());
      }
      currentScore.text("0");
      count = 0;
    }
}

function tweenWithCollision() {
  var enemy = d3.select(this);
  var startPos = {
    'x': parseFloat(enemy.attr('x')),
    'y': parseFloat(enemy.attr('y'))
  };
  var endPos = {
    'x': Math.floor(Math.random() * width),
    'y': Math.floor(Math.random() * height)
  };

  return function(t) {
    var enemyNextPos = {
      'x': startPos.x + (endPos.x - startPos.x)*t,
      'y': startPos.y + (endPos.y - startPos.y)*t
    };

    enemy.attr('x', enemyNextPos.x);
    enemy.attr('y', enemyNextPos.y);
    checkCollision(enemy);
  }
}

var randomMove = function () {
  d3.selectAll("image")
  .data(firstEnemies)
  .transition()
  .duration(1500)
  .tween("custom", tweenWithCollision);
}

setInterval(randomMove , 1500);
