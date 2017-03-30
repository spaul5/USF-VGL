var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 1120 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };


d3.csv("midwest.csv", function(data) {

	var x = d3.scaleLinear()
		.domain([0, 102])
		.range([0, width]);

	var y = d3.scaleLog()
		//.domain([0, d3.max(data, function(d) { return d.popwhite; })])
		.base(Math.E)
		.clamp(true)
    	//.domain([0, 10000000])
    	.domain([Math.exp(0), Math.exp(3)])
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
		.scale(y)
		// .ticks(6, tickFormatForLogScale);
		.tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });

	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

	//draw graph object
	var g = main.append("svg:g")

	// creates popwhite circles
	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL") {
					return y(Math.log(+d.popwhite));
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#FF4500") // orange
	
	// creates popblack circles
	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(Math.log(+d.popblack));
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#000080") // navy

	// creates popamerindian circles
	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(Math.log(+d.popamerindian));
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#228B22") // forest green
	
	// creates popasian circles
	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(Math.log(+d.popasian));
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#BA55D3") //  medium orchid


	var tooltip = d3.select("body")
      .data(data)
    	.append("div")
    	.style("position", "absolute")
    	.style("z-index", "10")
    	.style("visibility", "hidden")
    	.text(function(d) { return d.popother; });

	// creates popother circles
	g.selectAll("scatter-dots")
		.data(data)	
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.PID - 560));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL")
					return y(Math.log(+d.popother));
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("fill", "#708090") //  slate gray
			// .on("mouseover", info( function(d) { return d.popother;}, function(d) { return d.county;} ))
			// .on("mouseover", function(d){
			// 	d3.select(this).enter().append("text")
   //          		.text(function(d) {return d.popother;})
			// })
			.on("mouseover", function(){return tooltip.style("visibility", "visible");})
				console.log(function(d) { return d.popother;});
				// pass in function(d) to info. info( function(d))

	function info(d) {
		return function() {
			d3.select(this).append("text")
        		.attr("class", d.county)
        		.attr("transform", "translate(" + d3.mouse(this) + ")")
        		.attr("dx", "1em")
        		.attr("dy", "-1em")
        		.text(d.pop + ", " + d.county)
        		console.log(d.pop + ", " + d.county)
		}
	}

});	