var xdata = [2, 5, 9, 10, 15, 17, 20],
	ydata = [8, 3, 10, 17, 4, 15, 6],
	size = [5, 4, 7, 20, 1, 14, 9],
	radius = 10;

var numNodes = xdata.length;

for (var n in size) {
	size[n]--;
}
for (var n in size) {
	numNodes += size[n];
}

var margin = {top: 50, right: 50, bottom: 50, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// scale x and y values
var x = d3.scaleLinear()
	.domain([0, d3.max(xdata)+2])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, d3.max(ydata)+2])
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

var data = {
	nodes:d3.range(0, numNodes).map(function(d){ return {label: d, r: 10 } }),
	links:d3.range(0, numNodes).map(function(d){ 
		if (+d >= xdata.length && +d < xdata.length+size[0])
			return { source: d, target: 0 }
		else if (+d >= xdata.length+size[0] && +d < xdata.length+size[0] + size[1])
			return { source: d, target: 1}
		else if (+d >= xdata.length+size[0] + size[1] && +d < xdata.length+size[0] + size[1] + size[2])
			return { source: d, target: 2}
		else if (+d >= xdata.length+size[0] + size[1] + size[2] && +d < xdata.length+size[0] + size[1] + size[2]+size[3])
			return { source: d, target: 3}
		else if (+d >= xdata.length+size[0]+size[1]+size[2]+size[3] && +d < xdata.length+size[0]+size[1]+size[2]+size[3]+size[4])
			return { source: d, target: 4}
		else if (+d >= xdata.length+size[0]+size[1]+size[2]+size[3]+size[4] && +d < xdata.length+size[0]+size[1]+size[2]+size[3]+size[4]+size[5])
			return { source: d, target: 5}
		else if (+d >= xdata.length+size[0]+size[1]+size[2]+size[3]+size[4]+size[5])
			return { source: d, target: 6}
		else
			return { source: d, target: d}
	})
}

drawChart(data)

function drawChart(data) {

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink()
			.id(function(d) { return d.index })
			.distance(radius))
		.force("collide",d3.forceCollide(radius + 0.5).iterations(18) )

	var link = main.append("g")
	        .attr("class", "links")
	        .selectAll("line")
	        .data(data.links)

	var node = main.append("g")
	        .attr("class", "nodes")
	        .selectAll("circle")
	        .data(data.nodes)
	      .enter().append("circle")
	        .attr("r", function(d){  return d.r })
	        .style("stroke", function(d, i) {
	        	if (i >= 0 && i < xdata.length)
	        		return d3.rgb("lightslategray").darker(2);
	        	else
	        		return d3.rgb("lightsteelblue").darker(2);
	        })
	        .style("fill", function(d, i) {
				if (i >= 0 && i < xdata.length)
	        		return "lightslategray";
	        	else
	        		return "lightsteelblue";
	        })
	        .on("mouseover", handleMouseOver)
	        .on("mouseout", handleMouseOut)

	var ticked = function() {
	   
	    node
	        .attr("cx", function(d, i) {
	        	// console.log(d, i);
	        	if (i >= 0 && i < xdata.length) {
	        		// console.log(x(xdata[i]));
	        		d.x = x(xdata[i])
	        	}
	        		return d.x; 
	        })
	        .attr("cy", function(d, i) {
	        	if (i >= 0 && i < xdata.length){
	        		// console.log(y(ydata[i]));
	        		d.y = y(ydata[i]);
	        	}
	        		return d.y; 
	        })
	        .on("mouseover", handleMouseOver)
	        .on("mouseout", handleMouseOut);
	    link
	        .attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });
	}

	simulation
		.nodes(data.nodes)
		.on("tick", ticked);

	simulation.force("link")
        .links(data.links);  

     // Create Event Handlers for mouse
    function handleMouseOver(d, i) {
        if (i >= 0 && i < xdata.length) {
        	d3.select(this)
        		.style("fill", "orange")

            main.append("text")
            	.attr("id", "info")
    			.attr("text-anchor", "middle") 
    			.attr("transform", "translate("+ (width/2) +","+(height+40)+")")
    			.text(xdata[i] + ", " + ydata[i] + " size: " + (size[i]+1));
        }
    }

    function handleMouseOut(d, i) {
    	if (i >= 0 && i < xdata.length) {
            // Use D3 to select element, change color back to normal
            d3.select(this)
            	.style("fill", "lightslategray")
            d3.selectAll("text#info").remove();
    	}
    }

}
