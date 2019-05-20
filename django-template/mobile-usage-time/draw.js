let currentDataType = 'applications',
  currentDataSpan = 'week',
  currentMessageType = 'Received';
let map;
let infowindow;
let service;

let pieSvg;
let xScale;
let yScale;
let xAxis;
let yAxis;

let currentMarkers = [];
const width = 500;
const height = 350;
const padding = 80;
const radius = Math.min(width, height) / 2 - padding;
const legendWidth = 12;
const switchHandler = {
  'callings': {
    'week': () => callHandler(callings),
    'month': () => callHandler(callings)
  },
  'messages': {
    'week': () => messageHandler(messages),
    'month': () => messageHandler(messages)
  },
  'applications': {
    'week': () => applicationHandler(psyData),
    'month': () => applicationHandler(psyData)
  },
  'locations': {
    'week': () => locationHandler(locations),
    'month': () => locationHandler(locations)
  }
};

const tooltip = d3.select("body").append("div").classed("tooltip", true);

const svg = d3.select('#mainSvg').attr("width", width).attr("height", height);


//set click handler for all buttons
d3.selectAll('.data-pick').on('click', _ => {
  currentDataType = d3.event.currentTarget.textContent.toLocaleLowerCase();
  console.log(currentDataType);
  switchHandler[currentDataType][currentDataSpan]();
});

d3.selectAll('.time-pick').on('click', _ => {
  currentDataSpan = d3.event.currentTarget.textContent.toLocaleLowerCase();
  switchHandler[currentDataType][currentDataSpan]();
})

switchHandler[currentDataType][currentDataSpan]();

function locationHandler(locations) {
  if (currentMarkers.length) {
    clearMarkers();
  }
  currentMarkers = [];
  locations.forEach(location => {
    currentMarkers.push(createMarker(location));
  });
  showMarkers();

  d3.selectAll('.svg-card').classed('hidden-element', true);
  d3.select('.map-card').classed('hidden-element', false);

}

function messageHandler(messages) {
  renderMessagesOrCalls('Messages', messages);
}

function callHandler(callings) {
  renderMessagesOrCalls('Callings', callings);
}

function applicationHandler(psyData) {
  if (!d3.select('.change-button').empty()) {
    d3.selectAll('.change-button').selectAll("*").remove();
    d3.selectAll('.change-button').remove();
    svg.selectAll("*").remove();
  }
  d3.select('#mainSvgTitle').text(`Latest ${currentDataSpan} screen usage`)
  d3.selectAll('.svg-card').classed('hidden-element', false);
  d3.select('.map-card').classed('hidden-element', true);
  if (d3.select("#appDetails").empty()) {
    drawAppDiagram(psyData);
  }
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
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //New ADD: initial text
  pieSvg.append("text")
    .classed("initialText", true)
    .style("text-anchor", "middle")
    .style("font-weight", "bold")
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

function drawPieChart(date, psyData) {

  let data = psyData.filter(d => d.date === date)[0];
  let readyData = d3.entries(data.app);
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

  //update legend
  const legendRect = d3.select("#appDetails").selectAll(".legend-rect").data(pie(readyData));
  const legendText = d3.select("#appDetails").selectAll('.legend-text').data(pie(readyData));

  // update legend size pattern
  legendRect.exit().remove();

  legendRect.enter()
    .append('rect')
    .merge(legendRect)
    .attr("width", legendWidth)
    .attr("height", legendWidth)
    .attr("fill", d => pieColor(d.data.key))
    .attr("transform", (d, i) => `translate(${width - 1.5*padding}, ${(i * 20 + 20)})`)
    .classed("legend-rect", true);

  legendText.exit().remove();
  legendText.enter()
    .append("text")
    .merge(legendText)
    .classed('legend-text', true)
    .text(d => d.data.key)
    .style("font-size", 16)
    .attr("y", (d, i) => i * 20 + 20 + legendWidth)
    .attr("x", width - 1.2 * padding);
}


function clearSvg() {
  d3.selectAll('.svg-card').classed('hidden-element', false);
  d3.select('.map-card').classed('hidden-element', true);
  //remove all contents of the appended pie-chart.
  let newSvg = d3.select(".appdetails");
  if (!newSvg.empty()) {
    newSvg.selectAll("*").remove();
    newSvg.remove();
    svg.selectAll("*").remove();
  }
}

function renderMessagesOrCalls(type, pickedData) {
  clearSvg();
  if (d3.select('.change-button').empty()) {
    d3.select(".svg-card").append('div')
      .classed('change-button', true)
      .html(`
    <button class="btn btn-light info-btn">Received</button>
    <button class="btn btn-light info-btn">Sent</button>
    `);
    d3.selectAll(`.info-btn`).on('click', _ => updateMessagesOrCalls(type, d3.event.currentTarget.textContent, pickedData));
  } else {
    d3.selectAll(`.info-btn`).on('click',null);
    d3.selectAll(`.info-btn`).on('click', _ => updateMessagesOrCalls(type, d3.event.currentTarget.textContent, pickedData));
  }
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
    .data(pickedData.map(d => _.pick(d, ['date', key])));
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


// Initialize and add the map
function initMap() {
  infowindow = new google.maps.InfoWindow();
  let center = calCenter();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: center
  });
  service = new google.maps.places.PlacesService(map);
}

function createMarker(location) {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
  marker.addListener('click', _ => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  });
  new ClickEventHandler(marker, location);
  return marker;
}

class ClickEventHandler {
  constructor(marker, location) {
    this.location = location;
    this.marker = marker;
    this.placesService = service;
    this.infowindow = infowindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);
    this.marker.addListener('click', () => this.handleClick);
  }

  handleClick(event) {
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {
      console.log('You clicked on place:' + event.placeId);
      event.stop();
      this.getPlaceInformation(event.placeId);
    }
  }

  getPlaceInformation(placeId) {
    let me = this;
    this.placesService.getDetails({
      placeId: placeId
    }, function (place, status) {
      if (status === 'OK') {
        me.infowindow.close();
        me.infowindow.setPosition(place.geometry.location);
        me.infowindowContent.children['place-name'].textContent = place.name;
        me.infowindowContent.children['place-id'].textContent = `Place-id: ${place.place_id}`;
        me.infowindowContent.children['place-address'].textContent =
          place.formatted_address;
        me.infowindow.open(me.marker);
      }
    });
  }
}

function calCenter() {
  let preCenter = locations.reduce(([latitude, longitude], currentLocation) => [latitude + currentLocation.lat,
    longitude + currentLocation.lng
  ], [0, 0]);
  return {
    lat: preCenter[0] / locations.length,
    lng: preCenter[1] / locations.length
  };
}

function clearMarkers() {
  setMapOnAll(null);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  currentMarkers.forEach(marker => marker.setMap(map));
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}