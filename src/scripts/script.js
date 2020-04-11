class VirtualKeyboard {
  constructor() {
    this.lastCombination = [];
    this.capsLockCounter = 0;
    this.lang = window.sessionStorage.getItem('keyboardLang');
    this.letterCase = window.sessionStorage.getItem('keyboardCase');
    this.checkSessionStore();
    this.keysButtonClass = 0;
    this.keysCode = 5;

    this.keys = [
      ['writer', '`', '~', 'ё', 'Ё', 'Backquote'],
      ['writer', '1', '!', '1', '!', 'Digit1'],
      ['writer', '2', '@', '2', '"', 'Digit2'],
      ['writer', '3', '#', '3', '№', 'Digit3'],
      ['writer', '4', '$', '4', ';', 'Digit4'],
      ['writer', '5', '%', '5', '%', 'Digit5'],
      ['writer', '6', '^', '6', ':', 'Digit6'],
      ['writer', '7', '&', '7', '?', 'Digit7'],
      ['writer', '8', '*', '8', '*', 'Digit8'],
      ['writer', '9', '(', '9', '(', 'Digit9'],
      ['writer', '0', ')', '0', ')', 'Digit0'],
      ['writer', '-', '_', '-', '_', 'Minus'],
      ['writer', '=', '+', '=', '+', 'Equal'],
      [
        'textformat backspace',
        'BackSpace',
        'BackSpace',
        'BackSpace',
        'BackSpace',
        'Backspace'
      ],
      ['textformat tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
      ['writer', 'q', 'Q', 'й', 'Й', 'KeyQ'],
      ['writer', 'w', 'W', 'ц', 'Ц', 'KeyW'],
      ['writer', 'e', 'E', 'у', 'У', 'KeyE'],
      ['writer', 'r', 'R', 'к', 'К', 'KeyR'],
      ['writer', 't', 'T', 'е', 'Е', 'KeyT'],
      ['writer', 'y', 'Y', 'н', 'Н', 'KeyY'],
      ['writer', 'u', 'U', 'г', 'Г', 'KeyU'],
      ['writer', 'i', 'I', 'ш', 'Ш', 'KeyI'],
      ['writer', 'o', 'O', 'щ', 'Щ', 'KeyO'],
      ['writer', 'p', 'P', 'з', 'З', 'KeyP'],
      ['writer', '[', '{', 'х', 'Х', 'BracketLeft'],
      ['writer', ']', '}', 'ъ', 'Ъ', 'BracketRight'],
      ['textformat del', 'Del', 'Del', 'Del', 'Del', 'Delete'],
      [
        'control capslock',
        'CapsLock',
        'CapsLock',
        'CapsLock',
        'CapsLock',
        'CapsLock'
      ],
      ['writer', 'a', 'A', 'ф', 'Ф', 'KeyA'],
      ['writer', 's', 'S', 'ы', 'Ы', 'KeyS'],
      ['writer', 'd', 'D', 'в', 'В', 'KeyD'],
      ['writer', 'f', 'F', 'а', 'А', 'KeyF'],
      ['writer', 'g', 'G', 'п', 'П', 'KeyG'],
      ['writer', 'h', 'H', 'р', 'Р', 'KeyH'],
      ['writer', 'j', 'J', 'о', 'О', 'KeyJ'],
      ['writer', 'k', 'K', 'л', 'Л', 'KeyK'],
      ['writer', 'l', 'L', 'д', 'Д', 'KeyL'],
      ['writer', ';', ':', 'ж', 'Ж', 'Semicolon'],
      ['writer', "'", '"', 'э', 'Э', 'Quote'],
      ['writer', '\\', '|', '\\', '/', 'Backslash'],
      ['textformat enter', 'Enter', 'Enter', 'Enter', 'Enter', 'Enter'],
      ['control shift', 'Shift', 'Shift', 'Shift', 'Shift', 'ShiftLeft'],
      ['writer', 'z', 'Z', 'я', 'Я', 'KeyZ'],
      ['writer', 'x', 'X', 'ч', 'Ч', 'KeyX'],
      ['writer', 'c', 'C', 'с', 'С', 'KeyC'],
      ['writer', 'v', 'V', 'м', 'М', 'KeyV'],
      ['writer', 'b', 'B', 'и', 'И', 'KeyB'],
      ['writer', 'n', 'N', 'т', 'Т', 'KeyN'],
      ['writer', 'm', 'M', 'ь', 'Ь', 'KeyM'],
      ['writer', ',', '<', 'б', 'Б', 'Comma'],
      ['writer', '.', '>', 'ю', 'Ю', 'Period'],
      ['writer', '/', '?', '.', ',', 'Slash'],
      ['arrowup', '▲', '▲', '▲', '▲', 'ArrowUp'],
      ['control shift', 'Shift', 'Shift', 'Shift', 'Shift', 'ShiftRight'],
      ['control ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'ControlLeft'],
      ['control win', 'Win', 'Win', 'Win', 'Win', 'OSLeft'],
      ['control alt', 'Alt', 'Alt', 'Alt', 'Alt', 'AltLeft'],
      ['textformat space writer', ' ', ' ', ' ', ' ', 'Space'],
      ['control alt', 'Alt', 'Alt', 'Alt', 'Alt', 'AltRight'],
      ['arrowleft', '◄', '◄', '◄', '◄', 'ArrowLeft'],
      ['arrowdown', '▼', '▼', '▼', '▼', 'ArrowDown'],
      ['arrowright', '►', '►', '►', '►', 'ArrowRight'],
      ['control ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', 'ControlRight']
    ];
  }

  checkSessionStore() {
    if (!this.lang) {
      window.sessionStorage.setItem('keyboardLang', 1);
      this.lang = 1;
    }

    if (!this.letterCase) {
      window.sessionStorage.setItem('keyboardCase', 0);
      this.letterCase = 0;
    }
  }

  createField() {
    const textarea = document.createElement('textarea');
    const keyboard = document.createElement('div');
    textarea.setAttribute('id', 'textarea');
    keyboard.setAttribute('id', 'keyboard');
    document.body.append(textarea);
    document.body.append(keyboard);
  }

  createButtons() {
    this.keys.forEach(item => {
      const button = document.createElement('button');
      button.innerText = item[Number(this.lang) + Number(this.letterCase)];
      button.setAttribute('class', `${item[this.keysButtonClass]}`);

      document.querySelector('#keyboard').append(button);
    });
  }

  updateButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((item, i) => {
      item.innerHTML = this.keys[i][
        Number(this.lang) + Number(this.letterCase)
      ];
    });
  }

  selectButtonByKeyboard(event) {
    const { code } = event;
    const buttons = document.querySelectorAll('button');

    this.keys.forEach((item, i) => {
      if (code === item[this.keysCode]) {
        buttons[i].classList.add('selected');
      }
    });

    this.checkActiveButtons();
    this.textareaWriterByKeyboard(event);
  }

  unselectButtonByKeyboard(event) {
    const { code } = event;
    const buttons = document.querySelectorAll('button');

    this.keys.forEach((item, i, arr) => {
      if (code === arr[i][this.keysCode]) {
        if (code !== 'CapsLock') {
          buttons[i].classList.remove('selected');
        } else {
          this.checkCapsLockButton();
        }
      }
    });

    this.checkActiveButtons();
  }

  selectButtonByMouseDown(event) {
    const { target } = event;

    target.classList.add('selected');

    this.checkActiveButtons();
    this.textareaWriterByMouse(event);
  }

  unselectButtonByMouseUp(event) {
    const { target } = event;

    if (target.innerHTML !== 'CapsLock') {
      target.classList.remove('selected');
    } else {
      this.checkCapsLockButton();
    }

    this.checkActiveButtons();
  }

  changeLanguage() {
    this.lang = this.lang === 1 ? 3 : 1;
  }

  saveKeyboardOptions() {
    window.sessionStorage.setItem('keyboardLang', this.lang);
  }

  checkActiveButtons() {
    const combinations = ['Shift', 'CapsLock', 'Alt,Shift', 'CapsLock,Shift'];
    const selectedButtons = document.querySelectorAll('.control.selected');
    let selectedButtonsValues = [];

    selectedButtons.forEach(item => {
      selectedButtonsValues.push(item.innerHTML);
    });

    selectedButtonsValues = selectedButtonsValues.sort().join();

    if (this.lastCombination !== selectedButtonsValues) {
      switch (selectedButtonsValues) {
        case combinations[0]: {
          this.letterCase = 1;
          break;
        }
        case combinations[1]: {
          this.letterCase = 1;
          break;
        }
        case combinations[2]: {
          this.changeLanguage();
          break;
        }
        case combinations[3]:
        default: {
          this.letterCase = 0;
          break;
        }
      }
      this.lastCombination = selectedButtonsValues;
    }

    this.updateButtons();
    this.saveKeyboardOptions();
  }

  checkCapsLockButton() {
    const capslock = document.querySelector('.capslock');

    if (this.capsLockCounter === 0) {
      capslock.classList.add('selected');
    } else {
      capslock.classList.remove('selected');
    }

    this.capsLockCounter = this.capsLockCounter === 1 ? 0 : 1;
  }

  writer(object) {
    const textarea = document.querySelector('textarea');

    if (object.classList.contains('writer')) {
      textarea.innerHTML += object.innerHTML;
    } else if (object.classList.contains('tab')) {
      textarea.innerHTML += '\t';
    } else if (object.classList.contains('enter')) {
      textarea.innerHTML += '\n';
    } else if (object.classList.contains('space')) {
      textarea.innerHTML += ' ';
    } else if (object.classList.contains('backspace')) {
      textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    }
  }

  textareaWriterByMouse(event) {
    const { target } = event;

    this.writer(target);
  }

  textareaWriterByKeyboard(event) {
    const { code } = event;
    const buttons = document.querySelectorAll('button');

    this.keys.forEach((item, i) => {
      if (item[this.keysCode] === code) {
        this.writer(buttons[i]);
      }
    });
  }

  deleteDefaultActions(event) {
    event.preventDefault();
  }

  addEventListeners() {
    const keyboard = document.querySelector('#keyboard');

    document.addEventListener('keydown', event => {
      this.deleteDefaultActions(event);
      this.selectButtonByKeyboard(event);
    });

    document.addEventListener('keyup', event => {
      this.deleteDefaultActions(event);
      this.unselectButtonByKeyboard(event);
    });

    keyboard.addEventListener('mousedown', event => {
      this.deleteDefaultActions(event);
      this.selectButtonByMouseDown(event);
    });

    keyboard.addEventListener('mouseup', event => {
      this.deleteDefaultActions(event);
      this.unselectButtonByMouseUp(event);
    });
  }
}

export default function() {
  const virtualKeyboard = new VirtualKeyboard();

  virtualKeyboard.createField();
  virtualKeyboard.createButtons();
  virtualKeyboard.addEventListeners();
}
