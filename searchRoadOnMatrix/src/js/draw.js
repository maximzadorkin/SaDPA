const drawStep = (road) => {
  const step = road[0]
  const { x, y } = step.position;
  const line = [...document.querySelector('tbody').children][x];
  const cell = [...line.children][y];
  [...cell.children][0].classList.add('success');
  if (road.length > 1) setTimeout(drawStep, 50, road.slice(1));
}

const drawRoad = (road, weightOfRoad) => {
  clearTableResult();
  drawStep(road);
  const weightRoadText = document.createElement('p');
  weightRoadText.id = 'weightRoad';
  weightRoadText.textContent = `Вес пути: ${weightOfRoad}`;
  document.body.append(weightRoadText);
};