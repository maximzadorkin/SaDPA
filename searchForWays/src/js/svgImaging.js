// создание svg круга
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

// создание svg линии
const createLine = (x1, y1, x2, y2) => {
  const line = document.createElement('line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', lineColor);
  return line;
};

// создание svg веса пути между 2 точками
const createWeight = (x1, y1, x2, y2, number) => {
  const textNode = document.createElement('text');

  const [x, y] = [(x2 + x1) / 2, (y2 + y1) / 2];
  textNode.setAttribute('x', x);
  textNode.setAttribute('y', y);

  const text = document.createTextNode(number); 
  textNode.append(text);
  return textNode;
};