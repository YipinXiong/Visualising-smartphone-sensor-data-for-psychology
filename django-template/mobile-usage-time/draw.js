let currentDataType = 'applications';
let currentDataTime = 'week';
const width = 500;
const height = 350;
const padding = 80;
const radius = Math.min(width, height) / 2 - padding;
const tooltip = d3.select("body")
  .append("div")
  .classed("tooltip", true);

const svg = d3.select('#mainSvg')
  .attr("width", width)
  .attr("height", height);

let pieSvg;



//set click function based on the operation
d3.selectAll('.data-pick').on('click', _ => {
  currentDataType = d3.event.currentTarget.textContent.toLocaleLowerCase();
  pickedTypeAndTime(currentDataType, currentDataTime);
});

d3.selectAll('.time-pick').on('click', _ => {
  currentDataTime = d3.event.currentTarget.textContent.toLocaleLowerCase();
  pickedTypeAndTime(currentDataType, currentDataTime);
})

//TODO: Based on the current data&type to draw the diagram and change url.
//TODO: fetch data asynchronously
//TODO: draw it out.

function pickedTypeAndTime(dataType = currentDataType, dataTime = currentDataTime) {
  // window.history.pushState({}, dataType, `/${dataType}`);
  console.log(`DataType: ${dataType}
  dataTime: ${dataTime}`);
  switch (dataType) {
    case 'callings':
      break;

    case 'messages':
      d3.select('#mainSvgTitle').text(`Latest ${currentDataType} grouped by ${currentDataTime}`)
      break;

    case 'applications':
      // history.pushState({}, 'patient-locations', '/applications');
      d3.select('#mainSvgTitle').text(`Latest ${currentDataTime} screen usage`)
      d3.selectAll('.svg-card').classed('hidden-element', false);
      d3.select('.map-card').classed('hidden-element', true);
      if (d3.select("#appDetails").empty()) {
        d3.select("#svg-wrapper")
          .append("div")
          .classed("svg-card", true)
          .html(`
            <div class="pie-title diagram-title">Date</div>
            <div class="diagram-wrapper">
              <svg id="appDetails">
              </svg>
            </div>`);
        pieSvg = d3.select("#appDetails")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .classed("date-pie-chart", true)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        //New ADD: initial text
        pieSvg.append("text")
          .classed("initialText", true)
          .style("text-anchor", "middle")
          .style("font-weight", "bold")
          .text("Please select a date from the left side.")

        const xScale = d3.scaleBand()
          .paddingInner(0.3)
          .paddingOuter(0.2)
          .domain(psyData.map(d => d.date))
          .range([padding, width - padding]);

        const yScale = d3.scaleLinear()
          .domain([0, d3.max(psyData, d => d.totalFreq)])
          .range([height - padding, padding]);

        const xAxis = d3.axisBottom(xScale);

        const yAxis = d3.axisLeft(yScale)
          .ticks(4);

        svg.append("g")
          .attr('transform', `translate(0,${height - padding})`)
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-60)");

        svg.append('g')
          .attr('transform', `translate(${padding}, 0)`)
          .call(yAxis)


        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -height / 2)
          .attr("y", padding)
          .attr("dy", "-3em")
          .style("text-anchor", "middle")
          .text("Frequency")

        svg.append("text")
          .attr("x", width / 2)
          .attr("y", height - padding)
          .attr("dy", "3em")
          .style("text-anchor", "middle")
          .text("Date");

        svg.append("g")
          .selectAll("rect")
          .data(psyData)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("x", d => xScale(d.date))
          .attr("width", xScale.bandwidth())
          .attr("y", d => yScale(d.totalFreq))
          .attr("height", d => height - padding - yScale(d.totalFreq))
          .attr("fill", "steelblue")
          .on("mousemove", showTooltips)
          .on("mouseout", hideTooltips)
          .on("click", d => drawPieChart(d.date));
      }


      //TODO: fetch data async based on currentTime
      drawDiagramTypeTime(dataType, dataTime);
      break;
    default:
      // history.pushState({}, 'patient-locations', '/locations');
      d3.selectAll('.svg-card').classed('hidden-element', true);
      d3.select('.map-card').classed('hidden-element', false);
  }
}

pickedTypeAndTime();

function drawDiagramTypeTime(type, time) {
  switch (type) {
    case 'applications':
      console.log('object');
    default:
  }
}


const callingSvg = d3.select("#callingDetails")
  .attr("width", width)
  .attr("height", height);



function showTooltips(d) {
  d3.event.currentTarget.style.fill = "greenyellow";
  let temp = tooltip.style("opacity", 1)
    .style("left", d3.event.x - (tooltip.node().offsetWidth / 2) + "px")
    .style("top", d3.event.pageY + 30 + "px")
  if (d.totalFreq) {
    temp.html(`
              <p>Date: ${d.date}</p>
              <p>Frequencies: ${d.totalFreq}</p>
            `);
  } else if (d.Received) {
    temp.html(`
              <p>Date: ${d.date}</p>
              <p>Received: ${d.Received}</p>
            `);
  } else {
    temp.html(`
      <p>Date: ${d.date}</p>
      <p>Sent: ${d.Sent}</p>
    `);
  }
}

function hideTooltips() {
  d3.event.currentTarget.style.fill = "steelblue";
  d3.event.currentTarget.style.cursor = "pointer";
  tooltip.style("opacity", 0)
}

function drawPieChart(date) {
  let data = psyData.filter(d => d.date === date)[0];
  let readyData = d3.entries(data.app);
  const pieColor = d3.scaleOrdinal()
    .domain(readyData.map(d => d.key))
    .range(d3.schemeDark2);

  d3.select('.pie-title').text(`${date}'s application-usage details`);

  const pie = d3.pie()
    .value(d => d.value);

  //The arc generator
  const arc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  //label positionning arc
  const labelArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // update arc data
  const arcsPieSvg = pieSvg.selectAll('.arc')
    .data(pie(readyData));

  // new Added
  d3.selectAll(".initialText").remove();

  arcsPieSvg.exit()
    .remove();

  arcsPieSvg
    .enter()
    .append('path')
    .merge(arcsPieSvg)
    .classed("arc", true)
    .attr('d', arc)
    .attr('fill', d => pieColor(d.data.key))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', 0.7);

  // add and update the polylines between chart and labels
  const allPolylines = pieSvg.selectAll('.polyline')
    .data(pie(readyData));

  allPolylines.exit()
    .remove();

  allPolylines
    .enter()
    .append('polyline')
    .merge(allPolylines)
    .classed('polyline', true)
    .attr("stroke", d => pieColor(d.data.key))
    .style('fill', 'none')
    .style('stroke-width', 1)
    .attr('points', d => {
      let posA = arc.centroid(d) // line insertion in the slice
      let posB = labelArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      let posC = labelArc.centroid(d); // Label position = almost the same as posB
      let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    });

  const allLabels = pieSvg
    .selectAll('.arc-label')
    .data(pie(readyData));
  allLabels.exit().remove();

  allLabels
    .enter()
    .append('text')
    .merge(allLabels)
    .classed('arc-label', true)
    .text(d => d.data.key)
    .attr('transform', d => {
      let pos = labelArc.centroid(d);
      let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
    })
    .style('font-size', '18px')
    .style('fill', 'black')
    .style('text-anchor', d => {
      let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
    });
}


// callings start

// Initialize the X call axis
const xCallScale = d3.scaleBand()
  .paddingInner(0.3)
  .paddingOuter(0.2)
  .range([padding, width - padding]);

const xCallAxis = callingSvg.append('g')
  .attr('transform', `translate(0,${height - padding})`)

xCallScale.domain(callings.map(d => d.date));
xCallAxis.call(d3.axisBottom(xCallScale))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-60)");

// Initialize the Y call axis
const yCallScale = d3.scaleLinear()
  .range([height - padding, padding]);

const yCallAxis = callingSvg.append("g")
  .attr("class", "myYaxis")
  .attr('transform', `translate(${padding}, 0)`);

function updateCall(key = 'Received') {
  // update Y axis
  d3.select('.calling-title').text(`Latest 7 days calls`)
  yCallScale.domain([0, d3.max(callings, d => d[key])]);
  yCallAxis.call(d3.axisLeft(yCallScale).ticks(4));
  let u = callingSvg.selectAll("rect")
    .classed(`call-${key.toLocaleLowerCase}`, true)
    .data(callings.map(d => _.pick(d, ['date', key])));

  u.exit()
    .remove();
  u.enter()
    .append('rect')
    .merge(u)
    .on("mousemove", showTooltips)
    .on("mouseout", hideTooltips)
    .transition()
    .duration(1000)
    .attr("x", d => xCallScale(d.date))
    .attr("y", d => yCallScale(d[key]))
    .attr("width", xCallScale.bandwidth())
    .attr("height", d => height - padding - yCallScale(d[key]))
    .attr("fill", "steelblue")

}

updateCall();

//callings end