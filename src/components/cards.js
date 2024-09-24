export{initialCards, cardsPlace, createCard, deleteCard, setLike, addClose, openImg};
import {closeModal, openModal} from './modal.js';

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

function createCard(card, deletFunction, likeFunction, openImgFunction) {
  const cardNew = cardTemplate.cloneNode(true);

  const image = cardNew.querySelector('.card__image');
  image.src = card.link;
  image.alt = card.name;
  
  cardNew.querySelector('.card__title').textContent = card.name;
  cardNew.querySelector('.card__like-button').addEventListener('click', likeFunction);
  cardNew.querySelector('.card__delete-button').addEventListener('click', deletFunction);
  cardNew.querySelector('.card__image').addEventListener('click', openImgFunction);
  return cardNew;
}

function deleteCard(event){
  event.target.closest('.card').remove();
}

function setLike(evt) {
  if(evt.target.classList.contains('card__like-button_is-active')){
    evt.target.classList.remove('card__like-button_is-active');
  }else {
    evt.target.classList.add('card__like-button_is-active');
  }
  
}

function openImg(evt){
  const popupImg = cardImagePopup.querySelector('.popup__image');

  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  cardImagePopup.addEventListener('click', imgPopupHandler);
  document.addEventListener('keydown', imgPopupHandler);
  openModal(cardImagePopup);
}

function imgPopupHandler(evt){
  addClose(evt, cardImagePopup, imgPopupHandler);
  document.removeEventListener('keydown', imgPopupHandler);
  cardImagePopup.removeEventListener('click', imgPopupHandler);
}

function addClose(evt, popup, handler, submitHandler) {
  const closeBtn = popup.querySelector('.popup__close');

  if(evt.target === closeBtn || 
    evt.target.classList.contains('popup')||
  evt.key === 'Escape'){
      closeModal(popup);
      document.removeEventListener('keydown', handler);
      popup.removeEventListener('click', handler);
      popup.removeEventListener('submit', submitHandler);
    }
}