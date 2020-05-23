const quickStart = () => {
  document.querySelector('#matrix').innerHTML = `<thead>
  <tr><th></th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th></tr>
  </thead>
  <tbody id="matrixBody">
  <tr><td>a</td><td><input value="-" class="top"></td><td><input value="5" class="top"></td><td><input value="1" class="top"></td><td><input value="-" class="top"></td><td><input value="2" class="top"></td><td><input value="7" class="top"></td></tr>
  <tr><td>b</td><td><input value="5" class="top"></td><td><input value="-" class="top"></td><td><input value="8" class="top"></td><td><input value="1" class="top"></td><td><input value="3" class="top"></td><td><input value="3" class="top"></td></tr>
  <tr><td>c</td><td><input value="1" class="top"></td><td><input value="8" class="top"></td><td><input value="-" class="top"></td><td><input value="15" class="top"></td><td><input value="-" class="top"></td><td><input value="-" class="top"></td></tr>
  <tr><td>d</td><td><input value="-" class="top"></td><td><input value="1" class="top"></td><td><input value="15" class="top"></td><td><input value="-" class="top"></td><td><input value="-" class="top"></td><td><input value="12" class="top"></td></tr>
  <tr><td>e</td><td><input value="2" class="top"></td><td><input value="3" class="top"></td><td><input value="-" class="top"></td><td><input value="-" class="top"></td><td><input value="-" class="top"></td><td><input value="10" class="top"></td></tr>
  <tr><td>f</td><td><input value="7" class="top"></td><td><input value="3" class="top"></td><td><input value="-" class="top"></td><td><input value="12" class="top"></td><td><input value="10" class="top"></td><td><input value="-" class="top"></td></tr>
  </tbody>`;
  document.querySelector('#tops').value = 'a b c d e f';
  document.querySelector('#startPoint').value = 'a';
  document.querySelector('#endPoint').value = 'd';
};