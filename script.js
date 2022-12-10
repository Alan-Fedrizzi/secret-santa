"use strict";

// selecting elements
const buttonRun = document.querySelector(".container__run");
const buttonForm = document.querySelector(".form__button");
const container = document.querySelector(".container");
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
    console.log(participants);

    const html = `<p class="container__text">${participants[index].name} tirou ${participants[index].secretSanta}!</p>   `;
    container.insertAdjacentHTML("beforeend", html);
  });
};

// loop array - assign secret santa
buttonRun.addEventListener("click", draw);

// form - checking information
buttonForm.addEventListener("click", function (e) {
  e.preventDefault();
  const name = inputName.value.toLowerCase();
  const password = inputPassword.value.toLowerCase();

  participants.every((_, index) => {
    if (name === participants[index].name) {
      console.log(name);
      console.log(participants[index].name);
      // return false;
    } else {
      console.log("Vc não está participando do amigo secreto 😥");
      // return false;
    }
  });
  // loop the array procurando pelo .name, se é igual, testa a senha, se a senha for igual, mostra quem pegou
  // se encontrar o nome e a senha não, mensagem de senha errada.
  // se não encontrar nome, nome inválido..
});
