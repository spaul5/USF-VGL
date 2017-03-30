var xdata = [5, 10, 15, 20],
	ydata = [3, 17, 4, 6];

var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// scale x and y values
var x = d3.scaleLinear()
	.domain([0, d3.max(xdata)])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, d3.max(ydata)])
	.range([height, 0]);

// chart object
var chart = d3.select('body')
	.append('svg:svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class',  'chart')

// main object where chart and axis are drawn
var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')

// draw x and y axis
var xAxis = d3.axisBottom()
	.scale(x);
//	.orient('bottom');

main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

var yAxis = d3.axisLeft()
	.scale(y);
//	.orient('left');

main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

//draw graph object
var g = main.append("svg:g")

g.selectAll("scatter-dots")
	.data('data')
	.enter().append("svg:circle") // creates circles
		.attr("cx", function(d, i) { return x(xdata[i]); }) // translate x value
		.attr("cy", function(d, i) { return y(ydata[i]); }) // translate y value
		.attr("r", function(d, i) { return Math.sqrt(height-y(ydata[i])); }) // radius

// add position text to each circle
g.selectAll("text")
	.data('data')
	.enter()
	.append("text")
	.text(function(d, i) { return xdata[i] + "," + ydata[i]; })  // position
	.attr("x", function(d, i) { return x(xdata[i]); })
	.attr("y", function(d, i) { return y(ydata[i]) - Math.sqrt(height-y(ydata[i])) - 1; }) // so it is not in the circle
	.attr("font-family", "sans-serif")
	.attr("font-size", "10px")

