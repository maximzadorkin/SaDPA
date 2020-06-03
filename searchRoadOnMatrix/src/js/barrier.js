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