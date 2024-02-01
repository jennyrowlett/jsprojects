let numbers = [3, 2, 1];

function update(data) {
  d3.select("svg")
    .selectAll("circle")
    .data(data, (d) => d)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", (d, i) => (i + 1) * 50)
          .attr("cy", 50)
          .attr("fill", "red")
          .attr("r", (d, i) => 50)
          .transition()
          .duration(500)
          .attr("fill", "purple")
          .attr("r", (d, i) => d * 5),
      (update) =>
        update
          .transition()
          .duration(500)
          .attr("cx", (d, i) => (i + 1) * 50),
      (exit) =>
        exit
          .transition()
          .duration(500)
          .attr("r", 50)
          .attr("fill", "red")
          .remove()
    );
}

update(numbers);

function getRandomNumber() {
  return 1 + Math.random() * 4;
}

d3.select("#append").on("click", () => {
  numbers.push(getRandomNumber());
  update(numbers);
});

d3.select("#prepend").on("click", () => {
  numbers.unshift(getRandomNumber());
  update(numbers);
});

d3.select("#drop").on("click", () => {
  numbers.pop();
  update(numbers);
});
