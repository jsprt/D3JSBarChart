var barData = []
for(var i = 0 ; i < 100; i++){
    barData.push(Math.round(Math.random()*30) + 5)
}
var margin  = {top: 30, right:30, bottom:40, left:50}
var height = 500 - margin.top - margin.bottom,
    width = 600 - margin.left - margin.right,
    barOffset = 5 ,
    barWidth = 50,
    currenetColor ;
var toolTip = d3.select('body')
    .append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)

var colors =  d3.scale.linear()
    .domain([0, barData.length *.33 , barData.length *.66, barData.length])
    //.range(['#B58929', '#C61C6F', '#268BD2', '#85992C'])
    .range(['yellow','blue','green'])
var yScale = d3.scale.linear()
    .domain([0 , d3.max(barData)])
    .range([0, height - 20]);
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, barData.length))
    .rangeBands([0, width],.1 ,.2)

var graph = d3.select("#container")
    .style('background', '#E7E0CB')
    .append('svg')
    .attr('height', height + margin.left + margin.right)
    .attr('width', width +margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate('+margin.left+','+margin.top +')')
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


var vGuideScale  = d3.scale.linear()
    .domain([0,d3.max(barData)])
    .range([height,0])

var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(20)


var vGuide =  d3.select('svg').append('g');

vAxis(vGuide)

vGuide.attr('transform','translate('+ margin.left+',' + margin.top+')')

vGuide.selectAll('path')
    .style({fill:'none', stroke:'#000'} )

vGuide.selectAll('line')
    .style({stroke:'#000'} )


var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d,i){
        return !(i % (barData.length /5));
    }));

var hGuide =  d3.select('svg').append('g')

hAxis(hGuide)


hGuide.attr('transform','translate('+ margin.left+',' + (height + margin.top)+')')
hGuide.selectAll('path')
    .style({fill:'none', stroke:'#000'} )

hGuide.selectAll('line')
    .style({stroke:'#000'} )