const width = 600;
const height = 600;

// Add an svg element to the page
let svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let margin = { top: 20, right: 10, bottom: 20, left: 50 };

let topContainer = svg
  .append("g")
  .attr("id", "top")
  .attr("transform", `translate(0, ${margin.top})`);

let leftContainer = svg
  .append("g")
  .attr("id", "left")
  .attr("transform", `translate(${margin.left}, 0)`);

function update(data) {
  let xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([margin.left, width - margin.right])
    .nice();

  let yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.char))
    .range([margin.top, height - margin.bottom])
    .padding(0.5);

  let topAxisTicks = xScale.ticks().filter((tick) => Number.isInteger(tick));

  let topAxis = d3
    .axisTop(xScale)
    .tickValues(topAxisTicks)
    .tickFormat(d3.format("d"));

  let leftAxis = d3.axisLeft(yScale);

  topContainer.call(topAxis);

  leftContainer.call(leftAxis);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("width", (d, i) => xScale(d.count) - xScale(0))
    .attr("height", yScale.bandwidth())
    .attr("x", xScale(0))
    .attr("y", (d, i) => yScale(d.char));
}

d3.select("textarea").on("input", (e) => {
  let frequencies = {};

  e.target.value.split("").forEach((char) => {
    let currentCount = frequencies[char] || 0;
    frequencies[char] = currentCount + 1;
  });
  let data = Object.entries(frequencies).map((pair) => {
    //use Object.entries to convert the frequencies object into an array of two-element arrays
    return { char: pair[0], count: pair[1] };
  });

  data.sort((a, b) => d3.ascending(a.char, b.char));

  console.log(data);
  update(data);
});
