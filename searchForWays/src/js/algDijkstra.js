const Dijkstra = () => {
  const timeStart = new Date().getMilliseconds();

  const tops = document.querySelector('#tops').value.trim().split(' ');
  const matrix = readMatrix();
  const start = document.querySelector('#startPoint').value;
  const end = document.querySelector('#endPoint').value;

  const P = tops.map(el => start); // кто откуда пришел, изначально все из стартовой точки

  const S = [[start, 0]]; // те вершины, для которых уже найдена минимальный путь
  let iter = matrix.filter(el => el.name === start)
    .map(el => {
      const haveDirWithWeight = el.dirs.map(val => [val.nameTo, val.weight]);
      const haveDir = haveDirWithWeight.map(val => val[0]);
      const anotherWays = tops.filter(val => !haveDir.includes(val) && start !== val)
        .map(val => [val, Infinity]);
      return haveDirWithWeight.concat(anotherWays);
    }).flat(); // первая итерация
  let minimalOnIter = iter.reduce((min, value) => min[1] > value[1] ? value : min, [null, Infinity]);
  iter = iter.filter(val => val !== minimalOnIter);
  S.push(minimalOnIter);


  while (!S.map(el => el[0]).includes(end)) {

    const lastMinimal = matrix.filter(el => el.name === S[S.length - 1][0])[0];
    iter = iter.map(top => {
      const roadFromLastToTop = lastMinimal.dirs.filter(val => val.nameTo === top[0])[0];
      let newRoad;
      if (roadFromLastToTop) newRoad = +S[S.length - 1][1] + +roadFromLastToTop.weight;
      else newRoad = top[1];
      const D = Math.min(top[1], newRoad);
      if (D < top[1]) {
        const index = tops.reduce((acc, val, index) => val === top[0] ? index : acc, Infinity);
        P[index] = minimalOnIter[0];
      }
      return [top[0], D];
    });

    minimalOnIter = iter.reduce((min, value) => min[1] > value[1] ? value : min, [null, Infinity]);
    iter = iter.filter(val => val !== minimalOnIter);
    S.push(minimalOnIter);

  }

  // находим путь по road 
  const road = [end];
  while (road[0] !== start) {
    const now = road[0];
    const index = tops.reduce((acc, val, index) => val === now ? index : acc, Infinity);
    const from = P[index];
    road.unshift(from);
  }

  buildSuccessGraph(road);

  const timeEnd = new Date().getMilliseconds();
  document.querySelector('#output').style.display = 'block';
  document.querySelector('#output').innerHTML = `Кратчайший путь: ${road} </br>
  длина: ${minimalOnIter[1]}</br>время: ${timeEnd - timeStart}`;
};

const buildSuccessGraph = (road) => {
  // сбрасываем цвета 
  [...document.querySelectorAll('circle')].forEach(el => el.style.setProperty('fill', lineColor));
  [...document.querySelectorAll('line')].forEach(el => el.setAttribute('stroke', lineColor));

  const allSvgElements = [...document.querySelector('#svg').children];
  const coords = 
  road.map(node => {
    return allSvgElements.filter(el => node === el.textContent)
      .map(el => ({ x: +el.getAttribute('x') + 5, y: el.getAttribute('y') - 5 }));
  }).flat();

  allSvgElements.filter(el => road.includes(el.textContent))
    .map(el => ({ x: +el.getAttribute('x') + 5, y: el.getAttribute('y') - 5 }));

  // ищем и раскрашиваем круги
  coords.forEach(coord => {
    const circle = [...document.querySelectorAll('circle')]
      .filter(el => +el.getAttribute('cx') === +coord.x && +el.getAttribute('cy') === +coord.y);
    if (circle) circle[0].style.setProperty('fill', roadColor);
  });

  // ищем и раскрашиваем линии
  for (let i = 0; i < coords.length - 1; i += 1) {
    const coordStart = [coords[i].x, coords[i].y].join('');
    const coordEnd = [coords[i + 1].x, coords[i + 1].y].join('');
    const lines = [...document.querySelectorAll('line')]
      .filter(el => {
        const first = [+el.getAttribute('x1'), +el.getAttribute('y1')].join('');
        const second = [+el.getAttribute('x2'), +el.getAttribute('y2')].join('');
        const firstLine = first == coordStart && second == coordEnd;
        const secondLine = first == coordEnd && second == coordStart;
        return firstLine || secondLine;
      });
    lines.forEach(el => el.setAttribute('stroke', roadColor));
  }

};


