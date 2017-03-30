var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 800 - margin.top - margin.bottom;

var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };


d3.csv("midwest.csv", function(data) {

	var x = d3.scaleLinear()
		.domain([0, 12000])
		.range([0, width]);

	// var x = d3.scaleLog()
	// 	.base(Math.E)
	// 	.clamp(true)
 //    	.domain([Math.exp(0), Math.exp(5)])
	// 	.range([0, width]);

	var y = d3.scaleLinear()
    	.domain([0, 50])
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
		// .tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });

	main.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'main axis date')
		.call(xAxis);

	main.append("text")
    	.attr("text-anchor", "middle")  
     	.attr("transform", "translate("+ -35 +","+(height/2)+")rotate(-90)")
     	.text("Percent Below Poverty");

   	main.append("text")
    	.attr("text-anchor", "middle") 
    	.attr("transform", "translate("+ (width/2) +","+(height+40)+")")
    	.text("Population Density");

    main.append("text")
    	.attr("text-anchor", "middle")
    	.attr("transform", "translate(" + (width/2) +"," + -10 + ")")
    	.text("Population Density vs. Poverty in Midwest States");

	var yAxis = d3.axisLeft()
		.scale(y);

	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

	//draw graph object
	var g = main.append("svg:g")

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IL") {
					return x((+d.popdensity));
					// return x(Math.log(+d.popdensity));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IL") {
					return y(+d.percbelowpoverty);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("stroke", "#FF4500") // orange
			.attr("fill", "none")

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "IN") {
					return x((+d.popdensity));
					// return x(Math.log(+d.popdensity));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "IN") {
					return y(+d.percbelowpoverty);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("stroke", "#000080") // orange
			.attr("fill", "none")

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "MI") {
					return x((+d.popdensity));
					// return x(Math.log(+d.popdensity));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "MI") {
					return y(+d.percbelowpoverty);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("stroke", "#98abc5") // orange
			.attr("fill", "none")

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "OH") {
					return x((+d.popdensity));
					// return x(Math.log(+d.popdensity));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "OH") {
					return y(+d.percbelowpoverty);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("stroke", "#228B22") // orange
			.attr("fill", "none")

	g.selectAll("scatter-dots")
		.data(data)
		.enter().append("svg:circle")
			.attr("cx", function(d) { 
				if (d.state == "WI") {
					return x((+d.popdensity));
					// return x(Math.log(+d.popdensity));
				} 
				else
					return null;
			}) // translate x value
			.attr("cy", function(d) {
				if (d.state == "WI") {
					return y(+d.percbelowpoverty);
				}
				else
					return null;
			}) // translate y value
			.attr("r", function(d) { return 2; }) // radius
			.attr("stroke", "#BA55D3") // orange
			.attr("fill", "none")
	
	var color = d3.scaleOrdinal()
		.range(["#FF4500", "#000080", "#98abc5", "#228B22", "#BA55D3"]);
		//.domain([state abbreviations])

	var state = ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin"];

	var legend = main.selectAll(".legend")
      .data(["#FF4500", "#000080", "#98abc5", "#228B22", "#BA55D3"])
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
      .attr("x", width - 18)
      // .attr("cy", height-9)
      // .style("stroke", color)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  	legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d, i) { return state[i]; });

});	