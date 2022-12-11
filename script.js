"use strict";

// selecting elements
const buttonRun = document.querySelector(".container__run");
const buttonForm = document.querySelector(".form__button");
const container = document.querySelector(".container");
const result = document.querySelector(".result");
const inputName = document.getElementById("name");
const inputPassword = document.getElementById("password");

// participants array
const participants = [
  {
    name: "alan",
    password: "1234",
  },
  {
    name: "alex",
    password: "1234",
  },
  {
    name: "beatriz",
    password: "1234",
  },
  {
    name: "joeci",
    password: "1234",
  },
  {
    name: "sarah",
    password: "1234",
  },
];

// create copy of the participants array
// não pode ser shallow copy...
const participantsCopy = JSON.parse(JSON.stringify(participants));

// functions
// random number
const randomNumber = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const draw = function () {
  participants.forEach((_, index) => {
    let number = randomNumber(0, participantsCopy.length - 1);
    while (participants[index].name === participantsCopy[number].name) {
      number = randomNumber(0, participantsCopy.length - 1);
    }
    participants[index].secretSanta = participantsCopy[number].name;
    participantsCopy.splice(number, 1);

    const html = `<p class="container__text">${participants[index].name} tirou ${participants[index].secretSanta}!</p>   `;
    container.insertAdjacentHTML("beforeend", html);
  });
};

const checkUserPassword = function (user, pass) {
  const [userArray] = participants.filter((obj) => obj.name.includes(user));

  if (!userArray) {
    console.log(
      "Desculpe, mas você não está participando do amigo sercreto 😥"
    );
    return;
  }

  if (userArray.password === pass) {
    const html = `<p class="result__text">${userArray.name}, você tirou ${userArray.secretSanta}!</p>   `;
    result.insertAdjacentHTML("beforeend", html);
  } else {
    console.log("Senha incorreta 😥");
  }

  return userArray;
};

// loop array - assign secret santa
buttonRun.addEventListener("click", draw);

// form - checking information
buttonForm.addEventListener("click", function (e) {
  e.preventDefault();
  const user = inputName.value.toLowerCase();
  const pass = inputPassword.value;

  checkUserPassword(user, pass);
});
