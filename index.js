const docInput = document.getElementById("input");
const docNewMoveBtn = document.getElementById("newMoveBtn");
const docNextGame = document.getElementById("startGameBtn");

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
  let res;
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
    return (document.getElementById("result").innerHTML =
      "Слишком короткое число");
  if (inputCorrectData(inputNumber))
    return (document.getElementById("result").innerHTML =
      "Число должно состоять из неповторяющихся чисел!");
  if (inputNumber === hiddenNumber)
    return (
      (document.getElementById("result").innerHTML = "ВЫ ПОБЕДИЛИ!"),
      (docNewMoveBtn.disabled = true),
      (docInput.disabled = true)
    );
  return (document.getElementById(
    "result"
  ).innerHTML = `Число ${input.value}: Быков = ${countBulls} Коров = ${countCows}`);
};

let bitness;
let randomNumber;

// функции кнопок
startGameBtn.onclick = function () {
  bitness = document.querySelector('input[name="complexity"]:checked').value;
  randomNumber = getRandomNumber(
    document.querySelector('input[name="complexity"]:checked').value
  );
  console.log(randomNumber);
  docNewMoveBtn.disabled = false;
  docInput.disabled = false;
  docNextGame.disabled = true;
  document.querySelectorAll('input[name="complexity"]:cheked').disabled = true; // тут надо сделать недоступным радио
  return randomNumber;
};

newMoveBtn.onclick = function () {
  let val = docInput.value;
  compariseNumber(val, randomNumber);
  let inputValueArray = docInput.value.split("");
  docInput.value = "";
  return inputValueArray;
};

nextGame.onclick = function () {
  return (
    (docNewMoveBtn.disabled = true),
    (docInput.disabled = true),
    (docNextGame.disabled = false)
  );
};

// функция проверки повторяющихся введенных символов
function inputCorrectData(val) {
  val = val.split("").sort();
  console.log(val);
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