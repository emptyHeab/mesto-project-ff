export {createCard, deleteCard, setLike};

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

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
  evt.target.closest('.card').remove();
}

function setLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}