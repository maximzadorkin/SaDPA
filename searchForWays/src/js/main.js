const lineColor = '#1E90FF';
const roadColor = '#00CC00';

const deleteMatrix = () => {
  document.querySelector('#matrix').innerHTML = '';
  document.querySelector('#picture').innerHTML = '';
  document.querySelector('.find').style.display = 'none';
  document.querySelector('#output').style.display = 'none';
};

// добавление матрицы 
document.body.querySelector('#createMatrix').addEventListener('click', createMatrix);

// кнопка визуализации
document.body.querySelector('#btn-draw').addEventListener('click', imaging);

// удаление матрицы при изменении вершин
document.querySelector('#tops').addEventListener('keydown', deleteMatrix);

// поиск кратчайшего пути
document.querySelector('#findRoad').addEventListener('click', Dijkstra);

// шаблон для работы
document.querySelector('#quickStart').addEventListener('click', quickStart);