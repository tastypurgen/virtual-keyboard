const body = document.querySelector('body');
const input = document.createElement('textarea');

body.append(input);

const keys = {
  eng: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter'],
    ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ру', 'Left', 'Down', 'Right'],
  ],
  engShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', 'Delete'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '|', 'Enter'],
    ['Shift', '|', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ру', 'Left', 'Down', 'Right'],
  ],
  rus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'],
    ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'En', 'Left', 'Down', 'Right'],
  ],
  rusShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '/', 'Enter'],
    ['Shift', '/', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'En', 'Left', 'Down', 'Right'],
  ],
};

function createKey(key) {
  const keyEl = document.createElement('div');
  keyEl.classList.add('key');
  keyEl.innerText = key.toLowerCase();
  return keyEl;
}

function createKeyboard(keysArr) {
  const board = document.createElement('div');
  board.classList.add('board');
  body.append(board);
  keysArr.eng.forEach((row) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');
    board.append(rowEl);
    row.forEach((key) => {
      rowEl.append(createKey(key));
    });
  });
  body.append(board);
}


createKeyboard(keys);
