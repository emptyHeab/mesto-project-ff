import '../pages/index.css';
import {getCards} from './cards.js';
import {createCard, setLike, deleteCard} from './card.js';
import {openModal, closeModal, isNeedToClose} from './modal.js';
import { enableValidation } from './validation.js';
import { getUser, updateUser } from './api.js';

const cardsList = getCards();

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addCards = (list) => {
  list.then((list) => {
    list.forEach(card => {
      const cardName = card.name;
      const cardLink = card.link;
      cardsPlace.append(createCard({name: cardName, link: cardLink, openImg: openImg, like: setLike, delete: deleteCard}));
    });
  })
}

const editBtnHandler = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup, validationConfig);
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  updateUser(nameInput.value, jobInput.value);
  closeModal(editPopup);
}

const editPopupHandler = (evt) => {
  if(isNeedToClose(evt)){
    closeModal(editPopup);
  }
  enableValidation(editForm, validationConfig);
}

const addBtnHandler = () => {
  openModal(newCardPopup, validationConfig);
}

const addFormHandler = (evt) => {
  evt.preventDefault();
  cardsPlace.prepend(createCard({name: placeNameInput.value, link: linkInput.value, like: setLike, delete: deleteCard, openImg: openImg}));
  closeModal(newCardPopup);
  addForm.reset();
}

const newCardPopupHandler = (evt) => {
  if(isNeedToClose(evt)){
    closeModal(newCardPopup);
    addForm.reset();
  }
  enableValidation(addForm, validationConfig);
}

const openImg = (evt) =>{
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  imgPopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(cardImagePopup, validationConfig);
}

const cardImagePopupHandler = (evt) =>{
  if(isNeedToClose(evt)){
    closeModal(cardImagePopup);
  }
}

const initProfile = () =>{
  getUser().then((user) =>{
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
  })
}

initProfile();
addCards(cardsList);
profileEditBtn.addEventListener('click', editBtnHandler);
editPopup.addEventListener('click', editPopupHandler);  
editForm.addEventListener('submit', addFormSubmitHandler);
profileAddBtn.addEventListener('click', addBtnHandler);
newCardPopup.addEventListener('click', newCardPopupHandler);
addForm.addEventListener('submit', addFormHandler);
cardImagePopup.addEventListener('click', cardImagePopupHandler);
getUser();
