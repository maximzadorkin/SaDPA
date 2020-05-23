// считывание графа по таблице
const readMatrix = () => {
  // считывание таблицы
  const tops = document.querySelector('#tops').value.trim().split(' ');

  const table = document.body.querySelector('#matrixBody');

  const graph = [...table.children].map(line => {
    const node = {};
    const top = line.children[0].textContent;
    node.name = top;

    const directions = [...line.children].filter(child => child.children.length > 0)
      .map(weight => weight.children[0].value)
      .map((weight, index) => ({ nameTo: tops[index], weight }))
      .filter(way => way.weight !== '-');

      node.dirs = directions;
      return node;
  });

  return graph;
};

const generateCoord = () => {
  const start = [0, 0];
  const end = [600, 600];

  const middle = { x: 300, y: 300 };
  const radius = 250; // radius 
  const radiusInSquare = 250 * 250; // radius в квадрате

  const gradus = Math.random() * (180); // 0-180
  const sin = Math.sin(gradus); // +- 0.***
  const y = radius * sin + middle.y;

  const forSqrt = Math.abs(radiusInSquare - ((y - middle.y) ** 2));
  const sign = Math.sign(Math.floor(Math.random() * 2) - 1);
  const sqrt = Math.sqrt(Math.abs(forSqrt));
  let x = sqrt + middle.x; // по теореме пифагора
  if (sign < 0) {
    const another = x - 300;
    x -= another * 2;
  }
  return { x, y };
};

// отрисовка графа
const buildGraph = (matrix) => {
  // создание персональных точек для каждого узла
  const matrixForSvg = matrix.map(node => {
    node.coord = generateCoord();
    return node;
  });

  const picture = document.createElement('div');
  const svg = document.createElement('svg');
  svg.setAttribute('width', '600');
  svg.setAttribute('height', '600');
  svg.setAttribute('id', 'svg');
  // создание связующих линий и веса
  matrixForSvg.forEach(node => {
    const coord = node.coord;
    node.dirs.forEach(to => {
      const coordTo = matrixForSvg.filter(el => el.name === to.nameTo)[0].coord;
      const line = createLine(coord.x, coord.y, coordTo.x, coordTo.y);
      svg.append(line);
      
      const text = to.weight;
      svg.append(createWeight(coord.x, coord.y, coordTo.x, coordTo.y, text));
    });
  });

  // создание кругов
  matrixForSvg.forEach(node => {
    const { circle, text } = createCirle(node.coord.x, node.coord.y, node.name);
    svg.append(circle);
    svg.append(text);
  });

  picture.append(svg);
  document.querySelector('#picture').innerHTML = picture.innerHTML;
};

// кнопка визуализации
const imaging = () => {
  document.querySelector('.find').style.display = 'block';
  const matrix = readMatrix();
  buildGraph(matrix);
};