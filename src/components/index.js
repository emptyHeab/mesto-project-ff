import '../pages/index.css';
import {initialCards} from './cards.js';
import { createCard, setLike, deleteCard} from './card.js';
import { openModal, closeModal, isNeedToClose} from './modal.js';

const cardsList = initialCards;

const cardsPlace = document.querySelector('.places__list');

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

const cardImagePopup = document.querySelector('.popup_type_image');
const popupImg = cardImagePopup.querySelector('.popup__image');
const imgPopupCaption = cardImagePopup.querySelector('.popup__caption');

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
  closeModal(newCardPopup);
  addForm.reset();
}

function newCardPopupHandler(evt) {
  if(isNeedToClose(evt)){
    closeModal(newCardPopup);
  }
}

function openImg(evt){
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  imgPopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(cardImagePopup);
}

function cardImagePopupHandler(evt){
  if(isNeedToClose(evt)){
    closeModal(cardImagePopup);
  }
}

addCards();
profileEditBtn.addEventListener('click', editBtnHandler);
editPopup.addEventListener('click', editPopupHandler);  
editForm.addEventListener('submit', addFormSubmitHandler);
profileAddBtn.addEventListener('click', addBtnHandler);
newCardPopup.addEventListener('click', newCardPopupHandler);
addForm.addEventListener('submit', addFormHandler);
cardImagePopup.addEventListener('click', cardImagePopupHandler);