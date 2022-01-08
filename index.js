const docInput = document.getElementById("input");
const docNewMoveBtn = document.getElementById("newMoveBtn");
const docNextGame = document.getElementById("startGameBtn");
const modal = document.getElementById("myModal");
const docResult = document.getElementById("result");

let doc = "";
// генерация случайного числа с проверкой уникальности цифр
function getRandomNumber(bitness) {
  let randomUnicNumber = [];
  let i = 0;
  loop: while (i < bitness) {
    let elNum = Math.floor(Math.random() * 9);
    if (i == 0 && elNum == 0) continue loop;
    if (find(randomUnicNumber, elNum)) {
      randomUnicNumber[i] = elNum;
      i++;
    }
  }
  return randomUnicNumber.join("");
}
// проверяем вхождение в массив
function find(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value) return false;
  }
  return true;
}
//проверка введенного числа и сгенерированного
const compariseNumber = (inputNumber, hiddenNumber) => {
  let countBulls = 0;
  let countCows = 0;
  for (let i = 0; i < bitness; i++) {
    if (inputNumber[i] === hiddenNumber[i]) {
      countBulls++;
    }
    if (
      inputNumber[i] !== hiddenNumber[i] &&
      hiddenNumber.includes(inputNumber[i])
    ) {
      countCows++;
    }
  }
  if (inputNumber.length < hiddenNumber.length)
    return (docResult.innerHTML = "Слишком короткое число");
  document.get;
  if (inputCorrectData(inputNumber))
    return (docResult.innerHTML =
      "<p>" +
      "Число должно состоять" +
      "</p>" +
      "<p>" +
      "из неповторяющихся чисел!" +
      "</p>");
  if (inputNumber === hiddenNumber)
    return (
      (document.getElementById(
        "win-text"
      ).innerHTML = `ВЫ ПОБЕДИЛИ! Загаданное компьютером число ${hiddenNumber}`),
      (modal.style.display = "block"),
      (docNewMoveBtn.disabled = true),
      (docInput.disabled = true)
    );
  doc +=
    "<div>" +
    `Число ${input.value}: Быков = ${countBulls} Коров = ${countCows} ` +
    "</div>";

  return (docResult.innerHTML = doc);
};

let bitness;
let randomNumber;

// функции кнопок
startGameBtn.onclick = function () {
  bitness = document.querySelector('input[name="complexity"]:checked').value;
  randomNumber = getRandomNumber(
    document.querySelector('input[name="complexity"]:checked').value
  );
  docNewMoveBtn.disabled = false;
  docInput.disabled = false;
  docNextGame.disabled = true;
  enableRadio(false);
  return randomNumber;
};

newMoveBtn.onclick = function () {
  let val = docInput.value;
  compariseNumber(val, randomNumber);
  let inputValueArray = docInput.value.split("");
  docInput.value = "";
  docNewMoveBtn.style.shadow = "0";
  return inputValueArray;
};

nextGame.onclick = function () {
  return (
    (doc = ""),
    (document.getElementById("result").innerHTML = doc),
    (docNewMoveBtn.disabled = true),
    (docInput.disabled = true),
    (docNextGame.disabled = false),
    enableRadio(true)
  );
};

// функция проверки повторяющихся введенных символов
function inputCorrectData(val) {
  val = val.split("").sort();
  for (let i = 0; i < val.length; i++) {
    if (val[i] !== val[i + 1]) continue;
    return true;
  }
}
// Количество символов в инпуте
input.onkeypress = function () {
  return this.value.length < bitness;
};
// Ввод только цифр(type="number" позволяет ввести константу "e")
input.onkeydown = function (e) {
  return !/^\D$/.test(e.key);
};

// Получить элемент <span>, который закрывает модальный
var span = document.getElementsByClassName("close")[0];

// Закрытие модального окна на <span> (x)
span.onclick = function () {
  modal.style.display = "none";
};

// Закрытие модального окна в любом месте
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Доступность выбора разрядности чисел
function enableRadio(enabled) {
  var buttons = document.getElementsByClassName("custom-radio");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = !enabled;
  }
}
