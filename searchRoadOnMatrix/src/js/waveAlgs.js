const waveAlg = () => {
  if (!document.querySelector('table')) return;

  const matrix = readTable();
  addDirections(matrix);
  addPosition(matrix);

  const startNode = matrix[0][0];
  const finishNode = matrix[matrix.length - 1][matrix.length - 1];

  startNode.g = 0;
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
    nodeDirections.forEach((dir) => setGHFFrom(dir, node, finishNode)); // устанавливаем длины путей
    
    nodeDirections.forEach((dir) => pendingReview.push(dir)); // отправляем в очередь для обработки полученные направления
    pendingReview = pendingReview.sort((dir1, dir2) => dir1.f > dir2.f ? 1 : -1); // сортируем ожидающие направления

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
  while (road[0].type !== 'start') {
    const previous = step.from;
    step = matrix[previous.x][previous.y];
    road.unshift(step);
  }

  // вес пути
  const weightOfRoad = matrix[finishNode.position.x][finishNode.position.y].g;
  drawRoad(road, weightOfRoad);
};