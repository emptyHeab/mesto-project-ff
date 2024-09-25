import '../pages/index.css';
import {initialCards, createCard, deleteCard, cardsPlace, setLike, cardImagePopup} from './cards.js';
import { openModal, closeModal, escHandler} from './modal.js';

const cardsList = initialCards;

const profileEditBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const profileAddBtn = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const editForm = document.querySelector('[name=edit-profile]');
const nameInput = editForm.querySelector('[name=name]');
const jobInput = editForm.querySelector('[name=description]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const addForm = document.querySelector('[name=new-place]');
const placeNameInput = addForm.querySelector('[name=place-name]');
const linkInput = addForm.querySelector('[name=link');

function addCards(list) {
  cardsList.forEach(card => {
    const cardName = card.name;
    const cardLink = card.link;
    cardsPlace.append(createCard({name: cardName, link: cardLink, openImg: openImg, like: setLike, delete: deleteCard}));
  });
}

function editBtnHandler() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

function editPopupHandler(evt) {
  if(isNeedToClose(evt)){
    closeModal(editPopup);
  }
}

function addBtnHandler() {
  openModal(newCardPopup);
}

function addFormHandler(evt) {
  evt.preventDefault();
  cardsPlace.prepend(createCard({name: placeNameInput.value, link: linkInput.value, like: setLike, delete: deleteCard, openImg: openImg}));
  initialCards.unshift({name: placeNameInput.value, link: linkInput.value});
  closeModal(newCardPopup);
  addForm.reset();
}

function newCardPopupHandler(evt) {
  if(isNeedToClose(evt)){
    closeModal(newCardPopup);
  }
}

function openImg(evt){
  const popupImg = cardImagePopup.querySelector('.popup__image');
  const popupCaption = cardImagePopup.querySelector('.popup__caption');

  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(cardImagePopup);
}

function cardImagePopupHandler(evt){
  if(isNeedToClose(evt)){
    closeModal(cardImagePopup);
  }
}

function isNeedToClose(evt) {
  if(evt.target.classList.contains('popup__close') ||
  evt.target.classList.contains('popup')){
      return true;
    }
  return false;
}

addCards();
profileEditBtn.addEventListener('click', editBtnHandler);
editPopup.addEventListener('click', editPopupHandler);  
editPopup.addEventListener('submit', addFormSubmitHandler);
profileAddBtn.addEventListener('click', addBtnHandler);
newCardPopup.addEventListener('click', newCardPopupHandler);
newCardPopup.addEventListener('submit', addFormHandler);
cardImagePopup.addEventListener('click', cardImagePopupHandler);