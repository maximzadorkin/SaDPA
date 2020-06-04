const drawRoad = (road, weightOfRoad) => {
  for (step of road) {
    const { x, y } = step.position;
    const line = [...document.querySelector('tbody').children][x];
    const cell = [...line.children][y];
    console.log(cell);
    [...cell.children][0].classList.add('success');
  }
};