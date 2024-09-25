
export{initialCards, cardsPlace, createCard, deleteCard, setLike, cardImagePopup};

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardsPlace = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;

const cardImagePopup = document.querySelector('.popup_type_image');

function createCard(card) {
  const cardNew = cardTemplate.cloneNode(true);

  const image = cardNew.querySelector('.card__image');
  image.src = card.link;
  image.alt = card.name;
  
  cardNew.querySelector('.card__title').textContent = card.name;
  cardNew.querySelector('.card__like-button').addEventListener('click', card.like);
  cardNew.querySelector('.card__delete-button').addEventListener('click', card.delete);
  cardNew.querySelector('.card__image').addEventListener('click', card.openImg);
  return cardNew;
}

function deleteCard(evt){
  const card = evt.target.closest('.card');
  const name = card.querySelector('.card__title').textContent;
  const link = card.querySelector('.card__image').src;
  const i = initialCards.findIndex(card => 
    card.name === name && card.link === link
  );
  initialCards.splice(i, 1);
  card.remove();
}

function setLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
  
}