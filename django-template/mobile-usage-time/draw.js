let currentDataType = 'applications',
  currentDataSpan = 'week',
  currentMessageType = 'Received';

let pieSvg;
let xScale;
let yScale;
let xAxis;
let yAxis;


const width = 500;
const height = 350;
const padding = 70;
const radius = Math.min(width, height) / 2 - padding;
const legendWidth = 12;

const switchHandler = {
  'week': {
    'applications': () => applicationHandler(appUsagesByWeek),
    'locations': () => locationHandler(locationsByWeek),
    'messages': () => messageHandler(messagesByWeek),
    'callings': () => callHandler(callingsByWeek),
    'screens': () => screenHandler(screensByWeek)
  },
  'month': {
    'applications': () => applicationHandler(appUsagesByMonth),
    'locations': () => locationHandler(locationsByMonth),
    'messages': () => messageHandler(messagesByMonth),
    'callings': () => callHandler(callingsByMonth),
    'screens': () => screenHandler(screensByMonth)
  }
}

const tooltip = d3.select("body").append("div").classed("tooltip", true);

const svg = d3.select('#mainSvg').attr("width", width).attr("height", height);


//set click handler for all buttons
d3.selectAll('.data-pick').on('click', _ => {
  currentDataType = d3.event.currentTarget.textContent.toLocaleLowerCase();
  console.log(currentDataType);
  switchHandler[currentDataSpan][currentDataType]();
});

d3.selectAll('.time-pick').on('click', _ => {
  currentDataSpan = d3.event.currentTarget.textContent.toLocaleLowerCase();
  switchHandler[currentDataSpan][currentDataType]();
})

switchHandler[currentDataSpan][currentDataType]();

function screenHandler(screenData) {
  d3.select('#mainSvgTitle').text(`Latest ${currentDataSpan} Screen Usage`)
  clearSvg();
  drawScreenDiagram(screenData);
}

function drawScreenDiagram(screenData) {
  xScale = d3.scaleBand()
    .paddingInner(0.3)
    .paddingOuter(0.2)
    .domain(screenData.map(d => d.Date))
    .range([padding, width - padding]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(screenData, d => d.Frequency)])
    .range([height - padding, padding]);

  xAxis = d3.axisBottom(xScale);

  yAxis = d3.axisLeft(yScale)
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
    .data(screenData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", d => xScale(d.Date))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.Frequency))
    .attr("height", d => height - padding - yScale(d.Frequency))
    .attr("fill", "steelblue")
    .on("mousemove", showTooltips)
    .on("mouseout", hideTooltips)
    .transition()
    .duration(1000)
}

function locationHandler(locations) {
  d3.selectAll('.svg-card').classed('hidden-element', true);
  d3.select('.map-card').classed('hidden-element', false);
  if (currentMarkers.length) {
    clearMarkers();
  }
  currentMarkers = [];
  locations.forEach(location => {
    currentMarkers.push(createMarker(location));
  });
  showMarkers();
}

function messageHandler(messages) {
  renderMessagesOrCalls('Messages', messages);
}

function callHandler(callings) {
  renderMessagesOrCalls('Callings', callings);
}

function applicationHandler(psyData) {
  d3.select('#mainSvgTitle').text(`Latest ${currentDataSpan} Applications Usage`)
  clearSvg();
  drawAppDiagram(psyData);
}


function drawAppDiagram(psyData) {
  d3.select("#svg-wrapper")
    .append("div")
    .classed("svg-card", true)
    .classed('appdetails', true)
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
    .attr("transform", "translate(" + (width - 2 * padding) / 2 + "," + height / 2 + ")");

  //New ADD: initial text
  d3.select("#appDetails").append("text")
    .classed("initialText", true)
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .text("Please select a date from the left side.")

  xScale = d3.scaleBand()
    .paddingInner(0.3)
    .paddingOuter(0.2)
    .domain(psyData.map(d => d.date))
    .range([padding, width - padding]);

  yScale = d3.scaleLinear()
    .domain([0, d3.max(psyData, d => d.totalFreq)])
    .range([height - padding, padding]);

  xAxis = d3.axisBottom(xScale);

  yAxis = d3.axisLeft(yScale)
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
    .on("click", d => drawPieChart(d.date, psyData));
}

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
      <p>Received / Sent: ${d.ReceivedSentRatio}</p>
    `);
  } else if (d.Sent) {
    temp.html(`
      <p>Date: ${d.date}</p>
      <p>Sent: ${d.Sent}</p>
      <p>Sent / Received:${d.SentReceivedRatio}</p>
    `);
  } else if (d.Outgoing) {
    temp.html(`
      <p>Date: ${d.date}</p>
      <p>Outgoing: ${d.Outgoing}</p>
    `);
  } else if (d.Incoming) {
    temp.html(`
      <p>Date: ${d.date}</p>
      <p>Incoming: ${d.Incoming}</p>
    `);
  } else if (d.Missed) {
    temp.html(`
    <p>Date: ${d.date}</p>
    <p>Missed: ${d.Missed}</p>
  `);
  } else {
    temp.html(`
    <p>Date: ${d.Date}</p>
    <p>Freqency: ${d.Frequency}</p>
    <p>Most Active Period: ${d['Most used']}</p>
  `);
  }
}

function hideTooltips() {
  d3.event.currentTarget.style.fill = "steelblue";
  d3.event.currentTarget.style.cursor = "pointer";
  tooltip.style("opacity", 0)
}

function drawPieChart(date, psyData) {
  let dataOfDate = psyData.filter(d => d.date === date)[0];
  let readyData = d3.entries(dataOfDate.app);

  const pieColor = d3.scaleOrdinal()
    .domain(readyData.map(d => d.key))
    .range(d3.schemeDark2);

  d3.select('.pie-title').text(`${date}'s application-usage details`);
  d3.selectAll(".initialText").remove();

  const pie = d3.pie()
    .value(d => d.value);

  //The arc generator
  const arc = d3.arc()
    .innerRadius(radius * 0.7)
    .outerRadius(radius * 1.2);

  // update arc data
  const arcsPieSvg = pieSvg.selectAll('.arc')
    .data(pie(readyData));
  // new Added
  arcsPieSvg.exit()
    .remove();

  arcsPieSvg.enter()
    .append('path')
    .merge(arcsPieSvg)
    .classed("arc", true)
    .attr('d', arc)
    .attr('fill', d => pieColor(d.data.key))
    .attr('stroke', 'white')
    .style('stroke-width', '2px')
    .style('opacity', 0.7);

  //label positionning arc
  const labelArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  const allLabels = pieSvg
    .selectAll('.arc-label')
    .data(pie(readyData));
  allLabels.exit().remove();

  allLabels
    .enter()
    .append('text')
    .merge(allLabels)
    .classed('arc-label', true)
    .text(d => {
      let parsedPercentage = (Math.round((d.data.value/dataOfDate.AppFreq) * 100 )).toFixed(0);
      console.log(parsedPercentage);
      let finalString = parsedPercentage< 4? '': `${parsedPercentage}%`
      return finalString;
    })
    .attr('transform', d => {
      let pos = labelArc.centroid(d);
      pos[0]*=1.05;
      pos[1]*=1.05;      
      return 'translate(' + pos + ')';
    })
    .style('font-size', '16px')
    .style('fill', 'black')
    .style('text-anchor', "middle");

  //update legend
  const legendRect = d3.select("#appDetails").selectAll(".legend-rect").data(pie(readyData));
  const legendText = d3.select("#appDetails").selectAll('.legend-text').data(pie(readyData));
  const mostFreq = d3.select("#appDetails").selectAll('.most-freq-text').data([dataOfDate]);

  // update legend size pattern
  legendRect.exit().remove();
  legendRect.enter()
    .append('rect')
    .merge(legendRect)
    .attr("width", legendWidth)
    .attr("height", legendWidth)
    .attr("fill", d => pieColor(d.data.key))
    .attr("transform", (d, i) => `translate(${width - 1.7*padding}, ${(i * 20 + 50)})`)
    .classed("legend-rect", true);

  legendText.exit().remove();
  legendText.enter().append("text")
    .merge(legendText)
    .classed('legend-text', true)
    .text(d => d.data.key)
    .style("font-size", 13)
    .attr("y", (d, i) => i * 20 + 50 + legendWidth)
    .attr("x", width - 1.5 * padding);

  mostFreq.exit().remove();
  mostFreq.enter().append("text")
    .merge(mostFreq)
    .classed('most-freq-text', true)
    .text(d => `The Most Active Period: ${d.MostUsed}`)
    .style("font-size", 13)
    .style('font-weight', 'bold')
    .attr("y", height - 0.5 * padding)
    .attr("x", width - 3 * padding);
}


function clearSvg() {
  d3.selectAll('.svg-card').classed('hidden-element', false);
  d3.select('.map-card').classed('hidden-element', true);
  //remove all contents of the appended pie-chart.
  let newSvg = d3.select(".appdetails");
  let changeBtn = d3.selectAll('.change-button');
  if (!newSvg.empty()) {
    newSvg.selectAll("*").remove();
    newSvg.remove();
  }
  if (!changeBtn.empty()) {
    changeBtn.selectAll('*').remove();
    changeBtn.remove();
  }
  svg.selectAll("*").remove();
}

function renderMessagesOrCalls(type, pickedData) {
  clearSvg();
  switch (type) {
    case 'Messages':
      currentMessageType = "Received";
      d3.select(".svg-card").append('div')
        .classed('change-button', true)
        .html(`
              <button class="btn btn-light info-btn">Received</button>
              <button class="btn btn-light info-btn">Sent</button>
            `);
      break;
    default:
      currentMessageType = "Incoming";
      d3.select(".svg-card").append('div')
        .classed('change-button', true)
        .html(`
            <button class="btn btn-light info-btn">Incoming</button>
            <button class="btn btn-light info-btn">Outgoing</button>
            <button class="btn btn-light info-btn">Missed</button>
          `);
      break;
  }
  d3.selectAll(`.info-btn`).on('click', _ => updateMessagesOrCalls(type, d3.event.currentTarget.textContent, pickedData));
  updateMessagesOrCalls(type, currentMessageType, pickedData);
}


function updateMessagesOrCalls(type, key, pickedData) {
  // update Y axis
  currentMessageType = key;
  d3.select('#mainSvgTitle').text(`Latest ${currentDataSpan} ${currentMessageType} ${type}`)
  // remove the old axes.
  d3.select('g.x-axis').remove();
  d3.select('g.y-axis').remove();
  // Initialize the X call axis

  xScale = d3.scaleBand()
    .paddingInner(0.3)
    .paddingOuter(0.2)
    .range([padding, width - padding]);
  xAxis = svg.append('g')
    .classed('x-axis', true)
    .attr('transform', `translate(0,${height - padding})`)
  xScale.domain(pickedData.map(d => d.date));
  xAxis.call(d3.axisBottom(xScale))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-60)");

  // Initialize the Y call axis
  yScale = d3.scaleLinear()
    .range([height - padding, padding]);
  yAxis = svg.append("g")
    .classed("y-axis", true)
    .attr('transform', `translate(${padding}, 0)`);
  yScale.domain([0, d3.max(pickedData, d => d[key])]);
  yAxis.call(d3.axisLeft(yScale).ticks(4));
  let u = svg.selectAll("rect")
    .classed(`${type.toLocaleLowerCase()}-${key.toLocaleLowerCase}`, true)
    .data(pickedData.map(d => _.pick(d, ['date', 'ReceivedSentRatio', 'SentReceivedRatio', key])));
  u.exit()
    .remove();
  u.enter()
    .append('rect')
    .merge(u)
    .on("mousemove", showTooltips)
    .on("mouseout", hideTooltips)
    .transition()
    .duration(1000)
    .attr("x", d => xScale(d.date))
    .attr("y", d => yScale(d[key]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - padding - yScale(d[key]))
    .attr("fill", "steelblue")
}