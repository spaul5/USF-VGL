var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 1000 - margin.top - margin.bottom,
	barHeight = 7;

d3.csv("midwest.csv", function(data) {

	var x = d3.scaleLinear()
		.domain([0, 150])
		.range([0, width]);

	var y = d3.scaleLinear()
  		.domain([0, 102])
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
		.attr('class', 'main');
		
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

	var county = main.selectAll(".county")
    	.data(data)
    	.enter().append("g")
    	.attr("class", "g")
    	.attr("transform", function(d, i) { return "translate(0," + y(d.county) + ")"; });

    county.append("rect") // perchsd rect
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(+d.perchsd);
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#FF4500"); // orange

	county.append("rect") // percollege rect
		.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
		.attr("x", function(d) { 
			if (d.state == "IL") {
				return x(+d.perchsd); 
			} else return null;
		})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(+d.percollege);
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#000080"); // navy

	county.append("rect") // percprof rect
		.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
		.attr("x", function(d) {
			if (d.state == "IL") {
				return x((+d.percollege) + (+d.perchsd));
			} else return null;
		})
    	.attr("width", function(d) {
    		if (d.state == "IL") {
    			return x(+d.percprof);
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#228B22"); // forest green	

});	