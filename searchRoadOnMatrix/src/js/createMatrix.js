const weightMode = 'Режим изменения веса';
const createBarriersMode = 'Режим создания преград';

const createMatrix = () => {
  cleanAll();
  const width = Number(document.querySelector('#width').value);

  const table = document.createElement('table');
  table.append(document.createElement('thead'));
  table.append(document.createElement('tbody'));
  document.body.append(table);

  for (let i = 1; i <= width; i += 1) {
    const line = document.createElement('tr');
    for (let j = 1; j <= width; j += 1) {

      if (i === 1 && j === 1 || i === width && j === width) {
        const pointCell = document.createElement('td');
        pointCell.classList.add('points');
        const text = document.createElement('p');
        if (i === 1) text.textContent = 'S';
        else text.textContent = 'E';
        pointCell.append(text);
        line.append(pointCell);
        continue;
      }

      const cell = document.createElement('td');
      cell.classList.add('cell-wrap');

      const input = document.createElement('input');
      input.classList.add('cell');
      input.value = Math.round(Math.random() * (100 - 1) + 1);
      
      cell.append(input);
      line.append(cell);

    }
    document.querySelector('tbody').append(line);
  }
};

const changeMode = () => {
  const btnMode = document.querySelector('#mode');
  if (btnMode.textContent === createBarriersMode) {
    // выставляем режим преград
    btnMode.textContent = weightMode;
    [...document.querySelectorAll('.cell')].forEach(el => {
      el.setAttribute('readonly', 'readonly');
    });
    [...document.querySelectorAll('.cell')].forEach(el => {
      el.addEventListener('click', barrier);
    });
  } else if (btnMode.textContent === weightMode) {
    // выставляем режим для измены веса
    btnMode.textContent = createBarriersMode;
    [...document.querySelectorAll('.cell')].forEach(el => {
      el.removeAttribute('readonly');
    });
    [...document.querySelectorAll('.cell-wrap')].forEach(el => {
      el.removeEventListener('click', barrier);
    });
  }
};

const barrier = () => {
  const mode = document.querySelector('#mode');
  if (mode.textContent !== weightMode) return;

  if (event.target.className !== 'barrier') {
    event.target.className = 'barrier';
    event.target.closest('td').style.border = 'none';
    event.target.style.backgroundColor = 'white';
  } else {
    event.target.className = 'cell';
    event.target.closest('td').style.border = '1px solid #A2CA13';
    event.target.style.backgroundColor = '#222222';
  }
};