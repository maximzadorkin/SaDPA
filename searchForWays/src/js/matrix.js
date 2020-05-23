// создание пустой строки матрицы
const createEmptyLine = (tops) => {
  // создание пустой строки матрицы
  const emptyLine = document.createElement('tr');
  tops.forEach(top => {
    const unit = document.createElement('td');
    const unitInput = document.createElement('input');
    unitInput.setAttribute('value','-');
    unitInput.className = 'top';
    unit.append(unitInput);
    emptyLine.append(unit);
  });
  return emptyLine;
};

// создание первичной матрицы
const createMatrix = () => {
  if (document.querySelector('#tops').value === '') return;
  const tops = document.querySelector('#tops').value.trim().split(' ');

  // создание заглавной строки
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  tr.append(document.createElement('th')); //пустая колонка

  tops.forEach(top => {
    const th = document.createElement('th');
    const text = document.createTextNode(top);
    th.append(text);
    tr.append(th);
  });
  thead.append(tr);
  
  const tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'matrixBody');
  // создание остальных строк матрицы
  tops.forEach(top => {
    const line = createEmptyLine(tops);
    const unit = document.createElement('td');
    unit.append(document.createTextNode(top));
    line.prepend(unit);
    tbody.append(line);
  });

  table.append(thead);
  table.append(tbody);
  document.querySelector('#matrix').innerHTML = table.innerHTML;
};