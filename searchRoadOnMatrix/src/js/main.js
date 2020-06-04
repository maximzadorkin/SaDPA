document.querySelector('#createMatrix').addEventListener('click', createMatrix);
document.querySelector('#mode').addEventListener('click', changeMode);
document.querySelector('#width').addEventListener('change', cleanAll);
document.querySelector('#aStar').addEventListener('click', aStar);

function cleanAll() {
  if (document.querySelector('table')) {
    document.body.querySelector('table').remove();
    document.querySelector('#mode').textContent = createBarriersMode;
  }
}