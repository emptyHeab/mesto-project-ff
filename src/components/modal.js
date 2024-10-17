export {openModal, closeModal, escHandler, isNeedToClose};
import { clearValidation } from "./validation";

function openModal(popup, validationConfig) {
  clearValidation(popup, validationConfig);
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', escHandler);
}

function closeModal(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
}

function escHandler(evt) {
  if(evt.key === 'Escape') {
    const d = document.querySelector('.popup_is-opened');
    closeModal(d);
  }
}

function isNeedToClose(evt) {
  if(evt.target.classList.contains('popup__close') ||
  evt.target.classList.contains('popup')){
      return true;
    }
  return false;
}