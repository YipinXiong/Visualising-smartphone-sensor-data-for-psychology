const width = 600;
const height =400;
const padding = 50;

const svg = d3.select('svg')
                .attr("width", width)
                .attr("height", height);

const xScale = d3.scaleBand()
                .paddingInner(0.3)
                .paddingOuter(0.2)
                .domain(screenUsageData.map(d => d.date))
                .range([padding, width-padding]);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(screenUsageData, d => d.duration)])
                .range([height - padding, padding]);

const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisLeft(yScale)
                  .ticks(4);


svg.append("g")
  .attr('transform', `translate(0,${height-padding})`)
  .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-60)" );

svg.append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis)

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - padding)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Screen usage hours");    

svg.append("g")
  .selectAll("rect")
    .data(screenUsageData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", d => xScale(d.date))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.duration))
    .attr("height", d => height - padding - yScale(d.duration))
    .attr("fill", "steelblue");
    
    