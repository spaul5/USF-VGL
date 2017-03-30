var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 800 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

d3.csv("midwest.csv", function(data) {

	var x = d3.scaleLinear()
		.domain([0, 102])
		.range([0, width]);

	var y = d3.scaleLinear()
    	.domain([0, 100])
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

	main.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'main axis date')
		.call(xAxis);

	var yAxis = d3.axisLeft()
		.scale(y);

	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

	//draw graph object
	var g = main.append("svg:g")

	var xValue = 1;
	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle") // creates perchsd circles
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL") {
					return y(+d.perchsd);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#FF4500") // orange
	
	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle") // creates percollege circles
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(+d.percollege);
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#000080") // navy

	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle") // creates percprof circles
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(+d.percprof);
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#228B22") // forest green
	

});	