const color = '#ffcc00' //главный цвет 
const triangleColor = '#222'; //цвет вырезанных треугольников

const makePoint = (x, y) => ({x, y});

const makeTrianglePoints = (startPoint, height, length) => ({
  pointLeft: startPoint,
  pointRight: { x: startPoint.x + length, y: startPoint.y },
  pointBottom: { x: startPoint.x + (Math.round(length / 2)), y: startPoint.y + height }
});

const makeTriangle = (startPoint, height, length, color) => {
  const triangle = document.createElement('polygon');
  const points = makeTrianglePoints(startPoint, height, length);
  const point1 = Object.values(points.pointLeft).join(' ');
  const point2 = Object.values(points.pointRight).join(' ');
  const point3 = Object.values(points.pointBottom).join(' ');
  triangle.setAttribute('points', `${point1} ${point2} ${point3}`);
  triangle.setAttribute('fill', color);
  return triangle;
};

const dive = (fractal, svg, points, depth, maxDepth, length, color) => {
  if (depth > maxDepth) return;
  
  //строим все 3угольники на этом уровне
  const newPoints = points.flatMap(point => {
    // point: создание треугольника
    //   *
    //  o *
    // *****
    const height = length - length * (1 - Math.sqrt(3) / 2);
    const triangle = makeTriangle(point, height, length, color);
    svg.append(triangle);
    // пересоздаем новые точки на месте этой старой для будущей итерации
    // потом здесь будет 3 треугольника
    ///    *
    ///   0 *
    ///  *   *
    /// 1   2 *
    /// *******
    const { x, y } = point;
    const leftBottomPoint = makePoint(x - length / 4, y + height / 2); // 0
    const leftTopPoint = makePoint(x + length / 4, y - height / 2); // 1
    const rightBottomPoint = makePoint(leftBottomPoint.x + length, leftBottomPoint.y); // 2
    return [leftBottomPoint, leftTopPoint, rightBottomPoint];
  });
  
  dive(fractal, svg, newPoints, depth + 1, maxDepth, length / 2, color);
};

const drawFractal = () => {
  // первая ступень: создаем основу для фрактала
  const length = 600; //длина стороны треугольника
  const depth = 1; // текущая глубина 
  const maxDepth = document.querySelector('#depth-fractal').value; // глубина, на которую нужно погрузиться
  const fractal = document.querySelector('#fractal'); 
  const svg = document.createElement('svg');

  const timeStart = new Date().getTime();
  
  // Создание главного треугольника
  const mTriangle = document.createElement('polygon');
  const height = length - Math.sqrt(3) * length / 2;
  const leftPoint = makePoint(0, length);
  const rightPoint = makePoint(length, length);
  const topPoint = makePoint(length / 2, height);
  const trianglePoints = [...Object.values(leftPoint),
    ...Object.values(topPoint), ...Object.values(rightPoint)];
    mTriangle.setAttribute('points', `${trianglePoints.join(' ')}`);
    mTriangle.setAttribute('fill', color);
    svg.append(mTriangle);
    
    
    //строим фрактал
    const points = [makePoint(length / 4, (length + height) / 2)]; // пояснение в dive к этой точке
    dive(fractal, svg, points, depth, maxDepth, length / 2, triangleColor);
    
    fractal.innerHTML = svg.innerHTML;
    const timeEnd = new Date().getTime();
    document.querySelector('.time').textContent = `Затраченное время: ${timeEnd - timeStart}`;
  };
  
  document.querySelector('#start-btn').addEventListener('click', drawFractal);