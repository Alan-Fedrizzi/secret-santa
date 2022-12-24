"use strict";

// selecting elements
const buttonRun = document.querySelector(".run");
const buttonSubmit = document.getElementById("form-submit");
const buttonClear = document.getElementById("form-clear");
const container = document.querySelector(".container");
const result = document.querySelector(".section__result");
const inputName = document.getElementById("name");
const inputPassword = document.getElementById("password");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");
const modalButton = document.querySelector(".modal__button");
const buttonClose = document.querySelector(".btn-close");

// participants array
const participants = [
  {
    name: "alan",
  },
  {
    name: "alex",
  },
  {
    name: "beatriz",
  },
  {
    name: "joeci",
  },
  {
    name: "sarah",
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

// generate password
const generatePassword = () => {
  return randomNumber(0, 9999).toString().padStart(4, "0");
};

const draw = function () {
  participants.forEach((_, index) => {
    let number = randomNumber(0, participantsCopy.length - 1);
    while (participants[index].name === participantsCopy[number].name) {
      number = randomNumber(0, participantsCopy.length - 1);
    }
    participants[index].secretSanta = participantsCopy[number].name;
    participantsCopy.splice(number, 1);

    // generate user password
    participants[index].password = generatePassword();
  });
  console.log(participants);
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
    result.innerHTML = "";
    const html = `<p class="result__text">${userArray.name}, você tirou ${userArray.secretSanta}!</p>   `;
    result.insertAdjacentHTML("beforeend", html);
    result.classList.add("visible");
  } else {
    console.log("Senha incorreta 😥");
  }

  return userArray;
};

// modal
const openModal = function () {
  modal.classList.add("show-modal");
};

const closeModal = function () {
  modal.classList.remove("show-modal");
};

// loop array - assign secret santa
buttonRun.addEventListener("click", draw);

// form - checking information
buttonSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const user = inputName.value.toLowerCase();
  const pass = inputPassword.value;
  inputName.value = inputPassword.value = "";

  checkUserPassword(user, pass);

  openModal();
});

buttonClear.addEventListener("click", function (e) {
  e.preventDefault();
  inputName.value = inputPassword.value = "";
});

[modalOverlay, modalButton, buttonClose].forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show-modal")) {
    closeModal();
  }
});
