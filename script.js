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
const modalContainer = document.querySelector(".modal__container");

// participants array
const participants = [
  {
    nameFrom: "alan",
    emailFrom: "alanfedrizzi@gmail.com",
  },
  {
    nameFrom: "alex",
    emailFrom: "alexfedrizzi@gmail.com",
  },
  {
    nameFrom: "beatriz",
    emailFrom: "beatrizferronatofedrizzi@gmail.com",
  },
  {
    nameFrom: "joeci",
    emailFrom: "jobeasa49@gmail.com",
  },
  {
    nameFrom: "sarah",
    emailFrom: "sarah.fedrizzi@gmail.com",
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
    while (participants[index].nameFrom === participantsCopy[number].nameFrom) {
      number = randomNumber(0, participantsCopy.length - 1);
    }
    participants[index].nameTo = participantsCopy[number].nameFrom;
    participants[index].emailTo = participantsCopy[number].emailFrom;
    participantsCopy.splice(number, 1);

    // generate user password
    // participants[index].password = generatePassword();
  });
  console.log(participants);

  // para usar firebase, tenho que criar um projeto angular, para ter o HttpClient!!!!!!!!!!!!!!!
  // https://secret-santa-13883-default-rtdb.europe-west1.firebasedatabase.app/
  // enviar para firebase for storage e conferência

  // enviar email - sendgrid
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
    modalContainer.innerHTML = "";
    // const html = `<p class="result__text">${userArray.name}, você tirou ${userArray.secretSanta}!</p>   `;
    const html = `
      <div class="modal__header">
        <div class="modal__close">
          <button class="btn-close">
            <ion-icon class="btn-close__icon" name="close"></ion-icon>
          </button>
        </div>
        <div class="modal__name-container">
          <h1 class="modal__name">${userArray.name}</h1>
        </div>
      </div>
      <div class="modal__content">
        <div class="modal__text-container">
          <ion-icon class="modal__icon" name="gift-outline"></ion-icon>
          <p class="modal__text">você tirou a</p>
        </div>
        <h2 class="modal__secret-santa">${userArray.secretSanta}!!</h2>
        <button class="modal__button button">
          <svg
            class="modal__ok"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          Ok, entendi
        </button>
      </div>
    `;
    modalContainer.insertAdjacentHTML("beforeend", html);
    openModal();
  } else {
    console.log("Senha incorreta 😥");
  }

  return userArray;
};

// modal
const openModal = function () {
  modal.classList.add("show-modal");

  const modalOverlay = document.querySelector(".modal__overlay");
  const modalButton = document.querySelector(".modal__button");
  const buttonClose = document.querySelector(".btn-close");

  [modalOverlay, modalButton, buttonClose].forEach((element) => {
    element.addEventListener("click", closeModal);
  });
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
});

buttonClear.addEventListener("click", function (e) {
  e.preventDefault();
  inputName.value = inputPassword.value = "";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("show-modal")) {
    closeModal();
  }
});
