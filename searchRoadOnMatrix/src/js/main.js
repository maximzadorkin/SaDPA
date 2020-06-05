document.querySelector('#createMatrix').addEventListener('click', createMatrix);
document.querySelector('#mode').addEventListener('click', changeMode);
document.querySelector('#width').addEventListener('change', cleanAll);
document.querySelector('#aStar').addEventListener('click', aStar);

function clearTableResult() {
  const weightResult = document.body.querySelector('#weightRoad');
  if (weightResult) weightResult.remove();
  const success = [...document.querySelectorAll('.success')];
  for (step of success) {
    step.classList.remove('success');
    const className = step.className;
    step.className = className;
  }
}

function cleanAll() {
  if (document.querySelector('table')) {
    document.body.querySelector('table').remove();
    document.querySelector('#mode').textContent = createBarriersMode;
    clearTableResult();
  }
}