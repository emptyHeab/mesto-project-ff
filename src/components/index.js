import '../pages/index.css';
import {initialCards, createCard, deleteCard, cardsPlace, setLike, addClose, openImg} from './cards.js';
import { openModal, closeModal} from './modal.js';

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
    cardsPlace.append(createCard({name: cardName, link: cardLink}, deleteCard, setLike, openImg));
  });
}

function editBtnHandler() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  editPopup.addEventListener('click', editPopupHandler);  
  editPopup.addEventListener('submit', handleFormSubmit);
  document.addEventListener('keydown', editPopupHandler);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
  evt.target.removeEventListener('submit', handleFormSubmit);
}

function editPopupHandler(evt) {
  addClose(evt, editPopup, editPopupHandler, handleFormSubmit);
}

function addBtnHandler() {
  openModal(newCardPopup);
  newCardPopup.addEventListener('click', newCardPopupHandler);
  document.addEventListener('keydown', newCardPopupHandler);
  newCardPopup.addEventListener('submit', addFormHandler);
}

function addFormHandler(evt) {
  evt.preventDefault();
  cardsPlace.prepend(createCard({name: placeNameInput.value, link: linkInput.value}, deleteCard, setLike, openImg));
  closeModal(newCardPopup);
  addForm.reset();
}

function newCardPopupHandler(evt) {
  addClose(evt, newCardPopup, newCardPopupHandler, addFormHandler);
}

addCards();
profileEditBtn.addEventListener('click', editBtnHandler);
profileAddBtn.addEventListener('click', addBtnHandler);