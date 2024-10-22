import '../pages/index.css';
import {getCards} from './cards.js';
import {createCard, setLike, deleteCard} from './card.js';
import {openModal, closeModal, isNeedToClose} from './modal.js';
import { enableValidation } from './validation.js';
import { getUser, updateUser, addCard, updateAvatar } from './api.js';

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
const linkInput = addForm.querySelector('[name=link]');

const cardImagePopup = document.querySelector('.popup_type_image');
const popupImg = cardImagePopup.querySelector('.popup__image');
const imgPopupCaption = cardImagePopup.querySelector('.popup__caption');

const avatarEditPopup = document.querySelector('.popup_type_avatar');
const avatarEditBtn = document.querySelector('.profile__image-overlay');
const avatarEditForm = avatarEditPopup.querySelector('[name=edit-avatar]');
const avatar = document.querySelector('.profile__image');
const avatarEditFormInput = avatarEditForm.querySelector('[name=link]');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addCards = () => {
  Promise.all([getCards(), getUser()])
  .then(([cardsList, user]) => {
  cardsList.forEach(card => {
    const cardName = card.name;
    const cardLink = card.link;
    let deleteFunction = false;
    if(user._id === card.owner._id){
      deleteFunction = deleteCard;
    }
    cardsPlace.append(createCard({name: cardName,
      link: cardLink, 
      openImg: openImg, 
      like: setLike, 
      delete: deleteFunction, 
      likesList: card.likes, 
      id: card._id}));
  })
})
}

const editBtnHandler = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup, validationConfig);
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  setLoader(editForm, true);
  updateUser(nameInput.value, jobInput.value).then(()=> {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
  })
  .catch((error) => console.log(error))
  .finally(()=> {
    setLoader(editForm, false);
  });
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
  setLoader(addForm, true);
  addCard(placeNameInput.value, linkInput.value)
  .then((card) => {
    cardsPlace.prepend(createCard({name: card.name, 
      link: card.link, 
      like: setLike, 
      delete: deleteCard, 
      openImg: openImg,
      likesList: card.likes,
      id: card._id
  }));
      closeModal(newCardPopup);
      addForm.reset();
  })
  .catch((error) => console.log(error))
  .finally(()=> {
    setLoader(addForm, false);
  });
}

const newCardPopupHandler = (evt) => {
  if(isNeedToClose(evt)){
    closeModal(newCardPopup);
    addForm.reset();
  }
  enableValidation(addForm, validationConfig);
}

const openImg = (evt) => {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  imgPopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openModal(cardImagePopup, validationConfig);
}

const cardImagePopupHandler = (evt) => {
  if(isNeedToClose(evt)){
    closeModal(cardImagePopup);
  }
}

const editAvatarBtnHandler = () => {
 openModal(avatarEditPopup, validationConfig);
}

const editAvatarPopupHandler = (evt) => {
  if(isNeedToClose(evt)){
    closeModal(avatarEditPopup);
  }
  enableValidation(avatarEditForm, validationConfig);
}

const editAvatarFormHandler = (evt) => {
  evt.preventDefault();
  const link = avatarEditFormInput.value;
  setLoader(avatarEditForm, true);
  updateAvatar(link).then(() =>  {
    avatar.style.backgroundImage = `url(${link})`;
    closeModal(avatarEditPopup);
    avatarEditForm.reset();
  })
  .catch((error) => console.log(error))
  .finally(() => {
    setLoader(avatarEditForm, false);
  });
}

const initProfile = () => {
  getUser().then((user) =>{
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    avatar.style.backgroundImage =`url(${user.avatar})`;
  })
  .catch((error) => console.log(error));
}

const setLoader = (form, status) => {
  const btn = form.querySelector('.button');
  if(status){
    btn.textContent = 'Сохранение...';
  }else {
    btn.textContent = 'Сохранить';
  }
}

initProfile();
addCards();
profileEditBtn.addEventListener('click', editBtnHandler);
editPopup.addEventListener('click', editPopupHandler);  
editForm.addEventListener('submit', addFormSubmitHandler);
profileAddBtn.addEventListener('click', addBtnHandler);
newCardPopup.addEventListener('click', newCardPopupHandler);
addForm.addEventListener('submit', addFormHandler);
cardImagePopup.addEventListener('click', cardImagePopupHandler);
avatarEditBtn.addEventListener('click', editAvatarBtnHandler);
avatarEditPopup.addEventListener('click', editAvatarPopupHandler);
avatarEditForm.addEventListener('submit', editAvatarFormHandler);