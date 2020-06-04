const getH = (startNode, endNode) => 
  Number(Math.abs(endNode.x - startNode.x) + Math.abs(endNode.y - startNode.y));

const setGHF = (matrix, node, lastMinimal, finishNode) => {
  const { x, y } = node.position;
  matrix[x][y].g = +lastMinimal.g + +matrix[x][y].value; // установили g
  matrix[x][y].h = getH({ x, y }, finishNode.position); // установили h
  matrix[x][y].f = +matrix[x][y].g + +matrix[x][y].h; // установили f
};

const aStar = () => {
  if (!document.querySelector('table')) return;
  [...document.querySelectorAll('.success')].forEach((cell) => cell.classList.remove('success'));

  const matrix = readTable();
  addDirections(matrix);
  addPosition(matrix);

  const startNode = matrix[0][0];
  const finishNode = matrix[matrix.length - 1][matrix.length - 1];

  /*
    g - стоимость от начала пути
    h - эвристическая стоимость 
    f - g + h
  */
  let pendingReview = [startNode];
  const viewed = [`${startNode.position.x} ${startNode.position.y}`];
  startNode.g = 0;
  startNode.h = getH(startNode.position, finishNode.position);
  startNode.f = startNode.g + startNode.h;
  let lastMinimal = startNode;
  while (true) {
    // ищем куда идти
    const nodeDirections = Object.entries(lastMinimal.dirs)
      .filter((dir) => dir[1] !== null)
      .filter((dir) => !viewed.includes(`${dir[1].x} ${dir[1].y}`))
      .map((dir) => matrix[dir[1].x][dir[1].y]);
    // убираем откуда пришли
    
    // просчитываем g, h, f для всех
    nodeDirections.forEach((dir) => setGHF(matrix, dir, lastMinimal, finishNode));
    
    // сортируем по f
    nodeDirections.sort((dir1, dir2) => dir1.f > dir2.f ? 1 : -1);
    
    const { x, y } = nodeDirections[0].position;
    matrix[x][y].from = lastMinimal.position;
    // берем минимум
    lastMinimal = nodeDirections[0];
    console.log(matrix[x][y]);
    console.log(lastMinimal);
    return;
    // если это конец - прекращаем

    /*
    // [ [north, {}], [west, null], [south, {}] ]
    // нашли в какие стороны можем двигаться
    // так же убираем те где уже были
    const nodeDirections = Object.entries(lastMinimal.dirs)
      .filter((dir) => dir[1] !== null)
      .filter((dir) => !viewed.includes(`${dir[1].x} ${dir[1].y}`));
    // добавляем новую точку в список просмотренных
    viewed.push(`${lastPlace.position.x} ${lastPlace.position.y}`);
    
    // выражаем массив ввиде ячеек [{node}, {node}, ...]
    pendingReview = pendingReview.map((dir) => matrix[dir[1].x][dir[1].y]);
    pendingReview.forEach((node) => setGHF(matrix, node, lastPlace, finishNode)); // установили g, h, f

    // находим куда идти
    const fMinimal = pendingReview.reduce((min, dir) => min.f > dir.f ? dir : min, pendingReview[0]);

    // проверяем не пришли ли мы к концу
    if (fMinimal.type === 'end') {
      const endPos = finishNode.position;
      matrix[endPos.x][endPos.y].from = lastPlace.position;
      break; // закончили поиск
    }

    const { x, y } = fMinimal.position;
    matrix[x][y].from = lastPlace.position;
    lastPlace = fMinimal;*/
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

