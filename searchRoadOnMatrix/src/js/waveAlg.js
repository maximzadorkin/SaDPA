const waveAlg = () => {
  if (!document.querySelector('table')) return;
  const diagonal = document.querySelector('#diagonal').checked;
  const matrix = readTable();
  addDirections(matrix, diagonal); // true значит добавляем и диагональные направления
  addPosition(matrix);

  const startNode = matrix[0][0];
  const finishNode = matrix[matrix.length - 1][matrix.length - 1];
  startNode.g = 0;
  finishNode.g = 0;

  const viewed = [];
  let queue = [startNode]; let i = 0;
  let haveEndOnWave = false;
  while (!haveEndOnWave) {
    if (queue.length === 0) {
      alert('Такого пути не существует');
      clearTableResult();
      return;
    }
    const wave = [];
    viewed.push(...queue); // добавляем всю волну в просмотренные
    for (node of queue) {
      const nodeDirections = Object.values(node.dirs) // выбираем все направления
        .filter((dir) => dir !== null) // убираем преграды из направлений
        .map((dir) => matrix[dir.x][dir.y]) // находим все эти позиции в матрице
        .filter((dir) => !viewed.includes(dir)); // удаляем те, которые уже были на прошлых волнах
      nodeDirections.forEach((dir) => dir.from === undefined ? dir.from = node.position : null); // устанавливаем откуда пришли
      nodeDirections.forEach((dir) => wave.includes(dir) ? null : wave.push(dir)); // пушим волну эти направления
      if (node.type === 'end') haveEndOnWave = true;
    }
    queue = wave;
  }
  
  // находим пройденный путь
  let step = matrix[finishNode.position.x][finishNode.position.y];
  const road = [step];
  let weightOfRoad = 0;
  while (road[0].type !== 'start') {
    const { x, y } = step.from;
    weightOfRoad += +step.value;
    step = matrix[x][y];
    road.unshift(step);
  }
  drawRoad(road, weightOfRoad);
};