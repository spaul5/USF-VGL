// var category = [Dogs, Parrots, Cats];
// var data = [5, 3, 2];

// var barWidth = 20;

var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 800 - margin.top - margin.bottom;

var x = d3.scaleBand()
	.paddingInner(0.2)
	.range([0, width]);

var y = d3.scaleBand()
	.paddingInner(0.01)
	.range([height, 0]);

d3.csv("data.csv", function(data) {


	x.domain(data.map(function(d) { return d.name; }));
	y.domain(d3.range(d3.max(data, function(d) { return +d.value; })));
	// y.align(1);

	var main = d3.select("body").append("svg:svg")
			.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
  		.append("g")
  			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

	main.append("text")
    	.attr("text-anchor", "middle")  
     	.attr("transform", "translate("+ -35 +","+(height/2)+")rotate(-90)")
     	.text("Count");

   	main.append("text")
    	.attr("text-anchor", "middle") 
    	.attr("transform", "translate("+ (width/2) +","+(height+40)+")")
    	.text("Animal");

    main.append("text")
    	.attr("text-anchor", "middle")
    	.attr("transform", "translate(" + (width/2) +"," + -10 + ")")
    	.text("Number of Different Animals");

	// main.selectAll("bar")
	// 		.data(data)
	// 	.enter().append("rect")
	// 		.attr("x", function(d) { return x(d.name); })
	// 		// .attr("y", function(d) { return y(+d.value); })
	// 		.attr("height", function(d) { return height - 5;})// y(+d.value); })
	// 		.attr("width", x.bandwidth())
	// 		.style("fill", "none")
	// 		.style("stroke", "red");

	var g = main.append("svg:g")

	g.selectAll("g.bar")
		.data(data)
		.enter().append("g")
				.attr("class", "bar")
				.attr("id", function(d) {return d.name; })
				.attr("transform", function(d) { return "translate(" + x(d.name) +",0)"; }) //x position for group
				.selectAll("circle")
					.data(function(d) {
						return d3.range(+d.value);
					})
						.enter().append("circle")
								.attr("cx", x.bandwidth()/2)
								.attr("cy", function(d, i) { return y(i); })
								.attr("r", y.bandwidth()/2)
								.style("fill", "steelblue")
});