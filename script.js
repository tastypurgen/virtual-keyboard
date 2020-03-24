const body = document.querySelector('body');
const input = document.createElement('textarea');

if (!localStorage.currentLang) localStorage.currentLang = 'eng';
let currentLang = localStorage.currentLang || 'eng';

input.setAttribute('readonly', 'readonly');
body.append(input);

const keys = {
  eng: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  engShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'E', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Fn', 'Lang', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
  rusShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Delete'],
    ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '/', 'Enter'],
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
    if (localStorage.currentLang === 'eng') {
      localStorage.currentLang = 'rus';
      currentLang = 'rus';
    } else {
      localStorage.currentLang = 'eng';
      currentLang = 'eng';
    }
    createKeyboard(localStorage.currentLang);
  });
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    input.value += '    ';
    document.querySelector(`[id='${e.key}']`).classList.add('active');
    return;
  }
  if (e.key === 'CapsLock') {
    if (currentLang === 'eng') {
      currentLang = 'engShift';
      createKeyboard('engShift');
      document.querySelector('#CapsLock').classList.add('active');
    } else if (currentLang === 'engShift') {
      currentLang = 'eng';
      createKeyboard('eng');
      document.querySelector('#CapsLock').classList.remove('active');
    } else if (currentLang === 'rus') {
      currentLang = 'rusShift';
      createKeyboard('rusShift');
      document.querySelector('#CapsLock').classList.add('active');
    } else {
      currentLang = 'rus';
      createKeyboard('rus');
      document.querySelector('#CapsLock').classList.remove('active');
    }
    return;
  }
  if (e.key === 'Shift') {
    if (localStorage.currentLang === 'eng') {
      createKeyboard('engShift');
    } else {
      createKeyboard('rusShift');
    }
    document.querySelector(`[id='${e.key}']`).classList.add('active');
    return;
  }
  if (e.key === ' ') {
    document.querySelector('#space').classList.add('active');
    input.value += ' ';
    return;
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    document.querySelector('#Backspace').classList.add('active');
    input.value = input.value.slice(0, -1);
    return;
  }
  if (!document.querySelector(`[id='${e.key}']`)) {
    if (localStorage.currentLang === 'rus') {
      localStorage.currentLang = 'eng';
      createKeyboard('eng');
    } else {
      localStorage.currentLang = 'rus';
      createKeyboard('rus');
    }
  }
  document.querySelector(`[id='${e.key}']`).classList.add('active');
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Control' || e.key === 'Win' || e.key === 'Alt' || e.key === 'Delete') {
    e.preventDefault();
    return;
  }
  input.value += e.key;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'CapsLock') return;
  if (e.key === 'Shift') {
    if (localStorage.currentLang === 'eng') createKeyboard('eng');
    else createKeyboard('rus');
  }
  if (e.key === ' ') {
    document.querySelector('#space').classList.remove('active');
    input.value += ' ';
    return;
  }
  document.querySelector(`[id='${e.key}']`).classList.remove('active');
});

createKeyboard(localStorage.currentLang);
