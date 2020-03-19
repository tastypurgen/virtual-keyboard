const body = document.querySelector('body');
const input = document.createElement('textarea');
let currentLang = localStorage.currentLang || 'eng';

body.append(input);

const keys = {
  eng: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Lang', 'Left', 'Down', 'Right'],
  ],
  engShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Q', 'E', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Lang', 'Left', 'Down', 'Right'],
  ],
  rus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'],
    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Lang', 'Left', 'Down', 'Right'],
  ],
  rusShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'Й', 'ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Delete'],
    ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '/', 'Enter'],
    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Lang', 'Left', 'Down', 'Right'],
  ],
};


function createKey(key) {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.id = key;
  if (key === ' ') keyEl.id = 'space';
  if (key === 'Ctrl') keyEl.id = 'Control';
  keyEl.innerText = key;
  if (key === 'Lang') keyEl.innerHTML = '';
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
    currentLang = currentLang === 'eng' ? 'rus' : 'eng';
    createKeyboard(currentLang);
    localStorage.currentLang = currentLang;
  });
}


document.addEventListener('keydown', (e) => {
  console.log('e', e.key);
  if (e.key === 'Shift') {
    if (currentLang === 'eng') {
      createKeyboard('engShift');
      document.querySelector(`#${e.key}`).classList.add('active');
      return;
    }
    createKeyboard('rusShift');
    document.querySelector(`#${e.key}`).classList.add('active');
    return;
  }
  if (e.key === ' ') {
    document.querySelector('#space').classList.add('active');
    input.textContent += ' ';
    return;
  }
  document.querySelector(`#${e.key}`).classList.add('active');
  input.textContent += e.key;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    if (currentLang === 'eng') createKeyboard('eng');
    else createKeyboard('rus');
  }
  if (e.key === ' ') {
    document.querySelector('#space').classList.remove('active');
    input.textContent += ' ';
    return;
  }
  document.querySelector(`#${e.key}`).classList.remove('active');
});

createKeyboard(currentLang);
