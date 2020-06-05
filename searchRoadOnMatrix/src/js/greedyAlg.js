/*
  h - эвристическая стоимость 
*/
const setHFrom = (dir, node, finishNode) => {
  dir.h = getH(dir.position, finishNode.position); // вычислили h
  dir.from = node.position;
};

const greedyAlg = () => {
  if (!document.querySelector('table')) return;
  const diagonal = document.querySelector('#diagonal').checked;

  const matrix = readTable();
  addDirections(matrix, diagonal);
  addPosition(matrix);

  const startCoord = document.querySelector('#startCoord').value.split(' ');
  const endCoord = document.querySelector('#endCoord').value.split(' ');
  const startNode = matrix[startCoord[0] - 1][startCoord[1] - 1];
  const finishNode = matrix[endCoord[0] - 1][endCoord[1] - 1];

  startNode.g = 0;
  startNode.h = getH(startNode.position, finishNode.position);
  let lastMinimal = startNode;
  
  let pendingReview = [];
  const viewed = [];
  while (lastMinimal.type !== 'end') {
    const node = lastMinimal;

    const nodeDirections = Object.values(node.dirs)
      .filter((dir) => dir !== null) // убираем преграды из направлений
      .map((dir) => matrix[dir.x][dir.y]) // находим все эти позиции в матрице
      .filter((dir) => !pendingReview.includes(dir)) // удаляем те, которые уже стоят в очереди на просмотр
      .filter((dir) => !viewed.includes(dir)); // удаляем те, которые уже просмотрели
    nodeDirections.forEach((dir) => setHFrom(dir, node, finishNode)); // устанавливаем длины путей
    
    nodeDirections.forEach((dir) => pendingReview.push(dir)); // отправляем в очередь для обработки полученные направления
    pendingReview = pendingReview.sort((dir1, dir2) => dir1.h > dir2.h ? 1 : -1); // сортируем ожидающие направления

    if (pendingReview.length === 0 && lastMinimal.type !== 'end') {
      alert('Такого пути не существует');
      clearTableResult();
      return;
    }

    lastMinimal = pendingReview.shift(); // берем самый маленький и удаляем из очереди
    viewed.push(node); // добавляем текущий узел в просмотренные
  }

  // находим пройденный путь
  let step = matrix[finishNode.position.x][finishNode.position.y];
  const road = [step];
  let weightOfRoad = 0;
  while (road[0].type !== 'start') {
    const previous = step.from;
    weightOfRoad += +step.value;
    step = matrix[previous.x][previous.y];
    road.unshift(step);
  }

  // вес пути
  drawRoad(road, weightOfRoad);
};