var xdata = [5, 10, 15, 20],
	ydata = [3, 17, 4, 6];

var margin = {top: 20, right: 15, bottom: 60, left: 60},
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
	.attr('wdith', width)
	.attr('height', height)
	.attr('class', 'main')

// draw x and y axis
var xAxis = d3.axisBottom()
	.scale(x)
//	.orient('bottom');

main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

var yAxis = d3.axisLeft()
	.scale(y)
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
		.attr("r", 10) // radius
