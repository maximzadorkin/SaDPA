/*
север = north
северо-восток = northeast
восток = east
юго-восток = southeast
юг = south
юго-запад = southwest
запад = west
северо-запад = northwest
*/
const readTable = () => {
  const width = Number(document.querySelector('#width').value);
  const table = document.querySelector('tbody');
  const matrix = [];
  
  // считывание в матрицу
  const lines = [...table.children];
  for (let i = 0; i < width; i += 1) {
    const line = [...lines[i].children]
      .map(el => el.querySelector('input')); // start/end = null
    const matrixLine = [];

    for (let j = 0; j < width; j += 1) {
      const point = {};
      if (line[j] === null) {
        point.value = 0;
        point.type = i === 0 ? 'start' : 'end';
        matrixLine.push(point);
        continue;
      } 
      if (line[j].className === 'barrier') {
        point.value = 0;
        point.type = 'barrier';
        matrixLine.push(point);
        continue;
      }
      point.value = line[j].value;
      point.type = 'cell';
      matrixLine.push(point);
    }
    matrix.push(matrixLine);
  }
  return matrix;
};

const addDirections = (matrix) => {
  const length = matrix.length;
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length; j += 1) {
      matrix[i][j].dirs = {};
      let dir = i > 0 ? { x: i - 1, y: j } : null;
      matrix[i][j].dirs.north = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = i > 0 && j < length - 1 ? { x: i - 1, y: j + 1 } : null;
      matrix[i][j].dirs.northeast = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = j < length - 1 ? { x: i, y: j + 1 } : null;
      matrix[i][j].dirs.east = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = i < length - 1 && j < length - 1 ? { x: i + 1, y: j + 1 } : null;
      matrix[i][j].dirs.southeast = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = i < length - 1 ? { x: i + 1, y: j } : null;
      matrix[i][j].dirs.south = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = i < length - 1 && j > 0 ? { x: i + 1, y: j - 1 } : null;
      matrix[i][j].dirs.southwest = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = j > 0 ? { x: i, y: j - 1 } : null;
      matrix[i][j].dirs.west = getType(matrix, dir) !== 'barrier' ? dir : null;

      dir = i > 0 && j > 0 ? { x: i - 1, y: j - 1 } : null;
      matrix[i][j].dirs.nortwest = getType(matrix, dir) !== 'barrier' ? dir : null;
    }
  }
};

const addPosition = (matrix) => {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix.length; j += 1) {
      matrix[i][j].position = { x: Number(i), y: Number(j) };
    }
  }
};

const getValue = (matrix, dir) => dir === null ? null : matrix[dir.x][dir.y].value;
const getType = (matrix, dir) => dir === null ? null : matrix[dir.x][dir.y].type;
const getNode = (matrix, dir) => dir === null ? null : matrix[dir.x][dir.y];