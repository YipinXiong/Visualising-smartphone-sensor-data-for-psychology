const width = 600;
const height =400;
const padding = 80;

const tooltip = d3.select("body")
                    .append("div")
                      .classed("tooltip", true);

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
    .attr("x", width/2)
    .attr("y", 40)
    .style("font-size", "1.5em")
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .text("Latest 7 days Screen Usage");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height/2 )
  .attr("y", padding)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
  .text("Frequency")

svg.append("text")
  .attr("x", width/2)
  .attr("y", height - padding)
  .attr("dy", "3em")
  .style("text-anchor", "middle")
  .text("Date");

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
    .attr("fill", "steelblue")
    .on("mousemove", showTooltips)
    .on("mouseout" , hideTooltips)
    .on("click",changePie);
    
function showTooltips (d) {
  tooltip.style("opacity", 1)
          .style("left", d3.event.x -(tooltip.node().offsetWidth/2) + "px")
          .style("top", d3.event.y + 30 + "px")
          .html(`
            <p>Date: ${d.date}</p>
            <p>Frequencies: ${d.duration}</p>
          `);
}

function hideTooltips () { tooltip.style("opacity", 0) }

//TODO: click to change the pie chart
function changePie() {};