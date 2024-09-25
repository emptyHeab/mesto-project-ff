export {openModal, closeModal, escHandler};

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
}

function closeModal(popup){
  popup.classList.remove('popup_is-opened');
}

function escHandler(evt) {
  if(evt.key === 'Escape') {
    const d = document.querySelector('.popup_is-opened');
    closeModal(d);
  }
}