const lineColor = '#1E90FF';
const wayColor = '#00FF00';

// добавление матрицы 
const addWay = () => {
  const top1 = document.querySelector('#top1');
  const top2 = document.querySelector('#top2');
  const weight = document.querySelector('#weight');
  
  const tr = document.createElement('tr');
  const td = [top1, top2, weight];
  let isEmpty = false;
  
  td.forEach(el => {
    if (el.value === '') isEmpty = true;
    
    const element = document.createElement('td');
    const val = document.createTextNode(el.value);
    element.append(val);
    tr.append(element);
    el.value = '';
  });
  
  if (!isEmpty) document.querySelector('tbody').append(tr);
};

// считывание графа по таблице
const readGraph = () => {
  // считывание таблицы
  const matrix = [];
  const table = document.body.querySelector('tbody');
  [...table.children].forEach(line => {
    const top1 = line.children[0].textContent;
    const top2 = line.children[1].textContent;
    const weight = Number(line.children[2].textContent);
    matrix.push([top1, top2, weight]);
  });
  return matrix;
};

const createCirle = (x, y, name) => {
  const circle = document.createElement('circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', '20');
  
  const textNode = document.createElement('text');
  textNode.setAttribute('x', x - 5);
  textNode.setAttribute('y', y + 5);
  const text = document.createTextNode(name); 
  textNode.append(text);

  return { circle, text: textNode };
};

const createLine = (x1, y1, x2, y2) => {
  const line = document.createElement('line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', lineColor);
  return line;
};

const createWeight = (x1, y1, x2, y2, number) => {
  const textNode = document.createElement('text');

  const [x, y] = [(x2 + x1) / 2, (y2 + y1) / 2];
  textNode.setAttribute('x', x);
  textNode.setAttribute('y', y);

  const text = document.createTextNode(number); 
  textNode.append(text);
  return textNode;
};

// построение (отрисовка графа)
const buildGraph = (matrix) => {
    // составляем объект для каждого узла
    const coord = [];
    matrix.forEach(line => {
      const weight = line[2];
      
      const nameNode = line[0];
      const secondNode = line[1];
      
      const coordX = Math.round(Math.random() * 600);
      const coordY = Math.round(Math.random() * 600);
      const element = createCirle(coordX, coordY, nameNode);
      const object = { nameNode, coord: [coordX, coordY], direction: [secondNode], weight, element };
      
      const coordX2 = Math.round(Math.random() * 600);
      const coordY2 = Math.round(Math.random() * 600);
      const element2 = createCirle(coordX2, coordY2, secondNode);
      const object2 = { nameNode: secondNode, coord: [coordX2, coordY2], direction: [nameNode], weight, element: element2 };
      
      if (coord.filter(el => el.nameNode === nameNode).length === 0) coord.push(object);
      else if (!coord.filter(el => el.nameNode === nameNode)[0].direction.includes(object.direction[0])) {
        coord.filter(el => el.nameNode === nameNode)[0].direction.push(object.direction[0]);
      }
      if (coord.filter(el => el.nameNode === secondNode).length === 0) coord.push(object2);
      else if (!coord.filter(el => el.nameNode === secondNode)[0].direction.includes(object2.direction[0])) {
        coord.filter(el => el.nameNode === secondNode)[0].direction.push(object2.direction[0]);
      }
    });
    console.log(coord)
    const svg = document.createElement('svg');
    // отрисовываем линии(ребра) графа
    coord.forEach(node => {
      const [x1, y1] = node.coord;
      node.direction.forEach(secondNode => {
        const [x2, y2] = coord.filter(el => el.nameNode === secondNode)[0].coord;
        svg.append(createLine(x1, y1, x2, y2));
        svg.append(createWeight(x1, y1, x2, y2, node.weight));
      });
    });

    // отрисовываем узлы графа
    coord.forEach(node => {
      svg.append(node.element.circle)
      svg.append(node.element.text)
    });

    document.querySelector('#svg').innerHTML = svg.innerHTML;
};

// кнопка визуализации
const imaging = () => {
  const matrix = readGraph();
  buildGraph(matrix);
};

// добавление матрицы 
document.body.querySelector('.btn-add').addEventListener('click', addWay);

// кнопка визуализации
document.body.querySelector('#btn-draw').addEventListener('click', imaging);



/*
1. Прописать грамотную структуру данных точек
2. Прописать построение по структуре данных
3. Реализовать алгоритм поиска путей
4. Реализовать дорисовку зеленых путей по результатам алгоритма. 
Все должно опираться на структуру из алгоритма (1)
(1) должна содержать точку и ее направления 
*/