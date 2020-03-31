const body = document.querySelector('body');
const input = document.createElement('textarea');

if (!localStorage.lang) localStorage.lang = 'eng';
let capsLock = false;

input.setAttribute('readonly', 'readonly');
body.append(input);

const keys = {
  eng: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  engShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'E', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rusShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete'],
    ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
};


function createKey(key) {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.id = key;
  if (key === ' ') keyEl.id = 'space';
  if (key === 'Ctrl') keyEl.id = 'Control';
  keyEl.innerText = key;
  if (key === 'Lang' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'Win' || key === 'Backspace') keyEl.innerHTML = '';
  keyEl.addEventListener('mousedown', (e) => {
    e.key = e.target.id;
    keyPress(e);
  });
  keyEl.addEventListener('mouseup', (e) => {
    e.key = e.target.id;
    keyUp(e);
  });
  return keyEl;
}

function createKeyboard(lang) {
  if (document.querySelector('.board')) document.querySelector('.board').remove();
  const board = document.createElement('div');
  board.classList.add('board');
  body.append(board);
  keys[lang].forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    board.append(rowEl);
    row.forEach((key) => {
      rowEl.append(createKey(key));
    });
  });
  body.append(board);

  document.querySelector('#Lang').addEventListener('click', () => {
    if (localStorage.lang === 'eng') {
      localStorage.lang = 'rus';
    } else {
      localStorage.lang = 'eng';
    }
    createKeyboard(localStorage.lang);
  });
}

function changeLang() {
  if (localStorage.lang === 'rus') {
    localStorage.lang = 'eng';
    createKeyboard('eng');
  } else {
    localStorage.lang = 'rus';
    createKeyboard('rus');
  }
}

function keyPress({
  key, altKey, ctrlKey, preventDefault,
}) {
  if (key === 'Tab') {
    input.value += '    ';
    preventDefault();
    document.querySelector(`[id='${key}']`).classList.add('active');
    return;
  }
  if (key === 'CapsLock') {
    if (!capsLock) {
      if (localStorage.lang === 'eng') createKeyboard('engShift');
      else createKeyboard('rusShift');
      document.querySelector('#CapsLock').classList.add('active');
      capsLock = true;
    } else {
      if (localStorage.lang === 'eng') createKeyboard('eng');
      else createKeyboard('rus');
      document.querySelector('#CapsLock').classList.remove('active');
      capsLock = false;
    }
    return;
  }
  if (key === 'Shift') {
    if (localStorage.lang === 'eng') {
      createKeyboard('engShift');
    } else {
      createKeyboard('rusShift');
    }
    document.querySelector(`[id='${key}']`).classList.add('active');
    return;
  }
  if (key === ' ' || key === 'space') {
    document.querySelector('#space').classList.add('active');
    input.value += ' ';
    return;
  }
  if (key === 'Backspace') {
    document.querySelector('#Backspace').classList.add('active');
    input.value = input.value.slice(0, -1);
    return;
  }
  if (key === 'Delete') {
    document.querySelector('#Delete').classList.add('active');
    input.value = input.value.slice(0, -1);
    return;
  }
  if (key === 'Enter') {
    document.querySelector('#Enter').classList.add('active');
    input.value += '\n';
    return;
  }
  if (altKey && ctrlKey) {
    changeLang();
  }
  if (key === 'Meta') {
    return;
  }
  if (key === "'") {
    document.querySelector(`[id="${key}"]`).classList.add('active');
    input.value += "'";
    return;
  }
  if (key === '\\') {
    document.querySelector('#\\\\').classList.add('active');
    input.value += '\\';
    return;
  }
  if (!document.querySelector(`[id='${key}']`)) changeLang();

  document.querySelector(`[id='${key}']`).classList.add('active');
  if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Control' || key === 'Win' || key === 'Alt' || key === 'Delete' || key === 'Fn' || key === 'Lang') {
    preventDefault();
    return;
  }
  input.value += key;
}

function keyUp({ key }) {
  if (key === 'Shift') {
    if (localStorage.lang === 'eng') createKeyboard('eng');
    else createKeyboard('rus');
  }

  document.querySelectorAll('.key').forEach((keyBtn) => {
    keyBtn.classList.remove('active');
  });

  if (capsLock) document.querySelector('#CapsLock').classList.add('active');
  else document.querySelector('#CapsLock').classList.remove('active');
}

document.addEventListener('keydown', keyPress);

document.addEventListener('keyup', keyUp);

createKeyboard(localStorage.lang);
