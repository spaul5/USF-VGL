var margin = {top: 50, right: 50, bottom: 50, left: 100},
	width = 1500 - margin.left - margin.right,
	height = 1500 - margin.top - margin.bottom;
	barHeight = 10;

var superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹",
    formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };


d3.csv("midwest.csv", function(data) {

	var x = d3.scaleLog()
		.base(Math.E)
		.clamp(true)
    	.domain([Math.exp(0), Math.exp(7)])
		.range([0, width]);

	var y = d3.scaleBand()
		.range([height, 0])
		.domain(data.map(function(d) { 
			if (d.state == "IL") {
				return d.county.replace(d.county.substring(1,d.county.length), d.county.substring(1,d.county.length).toLowerCase());
			} else return null;
		}));

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
		.scale(x)
		.tickFormat(function(d) { return "e" + formatPower(Math.round(Math.log(d))); });

	main.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'main axis date')
		.call(xAxis);

	var yAxis = d3.axisLeft()
		.scale(y)
		.tickSize([0]);

	main.append('g')
		.attr('transform', 'translate(0,0)')
		.attr('class', 'main axis date')
		.call(yAxis);

	// now add titles to graph and the axes
    main.append("text")
    	.attr("text-anchor", "middle")  
     	.attr("transform", "translate("+ -80 +","+(height/2)+")rotate(-90)")
     	.text("County");

   	main.append("text")
    	.attr("text-anchor", "middle") 
    	.attr("transform", "translate("+ (width/2) +","+(height+25)+")")
    	.text("Population");

    main.append("text")
    	.attr("text-anchor", "middle")
    	.attr("transform", "translate(" + (width/2) +"," + -10 + ")")
    	.text("Population of Illinois by Race");

    var tooltip = d3.select("body")
    	.append("div")
    	.style("position", "absolute")
    	.style("z-index", "10")
    	.style("visibility", "hidden")
    	.text("");

	//draw graph object
	var county = main.selectAll(".county")
    	.data(data)
    	.enter().append("g")
    	.attr("class", "g")
    	.attr("transform", function(d, i) { return "translate(0," + y(d.county.replace(d.county.substring(1,d.county.length), d.county.substring(1,d.county.length).toLowerCase())) + ")"; });

    county.append("rect") // popwhite
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("x", 2)
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(Math.log(+d.popwhite));
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#98abc5");	

	county.append("rect") // popblack
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("x", function(d) {
    		if (d.state == "IL") {
				return x(Math.log(+d.popwhite)); 
			} else return null;
    	})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(Math.log(+d.popblack));
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#7b6888");	

	county.append("rect") // popamerindian
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("x", function(d) {
    		if (d.state == "IL") {
				return x(Math.log(+d.popwhite) + Math.log(+d.popblack)); 
			} else return null;
    	})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(Math.log(+d.popamerindian));
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#6b486b");

	county.append("rect") // popasian
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("x", function(d) {
    		if (d.state == "IL") {
				return x(Math.log(+d.popwhite) + Math.log(+d.popblack) + Math.log(+d.popamerindian)); 
			} else return null;
    	})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(Math.log(+d.popasian));
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#d0743c");

	county.append("rect") // popother
    	.attr("y", function(d) {
    		if (d.state == "IL") {
				return y((+d.PID - 560));
			} else return null;
    	})
    	.attr("x", function(d) {
    		if (d.state == "IL") {
				return x(Math.log(+d.popwhite) + Math.log(+d.popblack) + Math.log(+d.popamerindian) + Math.log(+d.popasian)); 
			} else return null;
    	})
    	.attr("width", function(d) { 
    		if (d.state == "IL") {
    			return x(Math.log(+d.popother));
    		} else return null;
    	})
		.attr("height", barHeight - 1)
		.attr("fill", "#ff8c00")
		.on("mouseover", function(d) {
    		d3.select(this).append("text")
        		.text(d.popother);
        		// .attr("x", x(d.x))
        		// .attr("y", y(d.y)); 
		});
		// .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.popother);});

	var color = d3.scaleOrdinal()
		.range(["#98abc5", "#7b6888", "#6b486b", "#d0743c", "#ff8c00"]);

	var race = ["White", "Black", "American Indian", "Asian", "Other"];

	var legend = main.selectAll(".legend")
      .data(["#98abc5", "#7b6888", "#6b486b", "#d0743c", "#ff8c00"])
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  	legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d, i) { return race[i]; });

});	