var barData = []

for(var i = 0 ; i < 100; i++){
    barData.push(Math.round(Math.random()*30) + 5)
}

var height = 500, width = 600, barOffset = 5 , barWidth = 50, currenetColor ;
var toolTip = d3.select('body')
    .append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)

var colors =  d3.scale.linear()
    .domain([0, barData.length *.33 , barData.length *.66, barData.length])
    .range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])
var yScale = d3.scale.linear()
    .domain([0 , d3.max(barData)])
    .range([0, height - 20]);
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, barData.length))
    .rangeBands([0, width],.1 ,.2)

var graph = d3.select("#container")
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .style('fill', function (d, i ) {
        return colors(i);
    })
    .attr('width', xScale.rangeBand())
    .attr('x', function (d, i) {
        return xScale(i)
    })
    .attr('height',0)
    .attr('y', height)
    .on('mouseover', function(d){
        currenetColor = this.style.fill;
        d3.select(this)
            .style('opacity',.5)
            .style('fill', 'yellow')

        toolTip.transition()
            .style('opacity',.9)
        toolTip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top', (d3.event.pageY - 20) + 'px')
    })
    .on('mouseout', function(d){

        d3.select(this)
            .style('opacity',1)
            .style('fill', currenetColor)

        toolTip.style('opacity', .1)

    })

graph.transition()
    .attr('y', function (d) {
        return height - yScale(d);
    })
    .attr('height', function (d) {
        return yScale(d);
    })
    .delay(function(d, i ){
        return i * 10
    })
    .duration(400)
    .ease('elastic')