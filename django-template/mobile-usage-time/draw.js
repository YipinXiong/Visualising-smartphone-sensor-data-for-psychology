const width = 900;
const height =600;
const padding = 30;

const svg = d3.select('svg')
                .attr("width", width)
                .attr("height", height);

// const xScale = d3.scaleLinear()
//                 .domain(screenUsageData.map(d => d.date))
//                 .range([padding, width-padding]);

// const yScale = d3.scaleLinear()
//                 .domain([0, d3.max(screenUsageData, d => d.duration)])
//                 .range([height - padding, padding]);

// const xAxis = d3.axisBottom(xScale)
//                 .tickSize(-height + 2* padding)
//                 .tickSizeOuter(0);

// const yAxis = d3.axisBottom(yScale)
//                 .tickSize(-width + 2* padding)
//                 .tickSizeOuter(0);

svg.append("g")
  .selectAll("rect")
    .data(screenUsageData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", (d,i) => i*40 + padding)
    .attr("width", 30)
    .attr("y", d=> height - padding - d.duration * 30)
    .attr("height", d => height - padding)