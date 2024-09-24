export {openModal, closeModal, addClose};

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup){
  popup.classList.remove('popup_is-opened');
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