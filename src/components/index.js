import '../pages/index.css';
import {initialCards} from './cards.js';

const cardsList = initialCards;

const cardTemplate = document.querySelector('#card-template').content;

function addCards(list) {
  const place = document.querySelector('.places__list');

  cardsList.forEach(card => {
    const cardName = card.name;
    const cardLink = card.link;
    place.append(createCard(cardLink, cardName, deleteCard));
  });
}

function createCard(cardImage, cardTitle, deletFunction) {
  const card = cardTemplate.cloneNode(true);

  const image = card.querySelector('.card__image');
  image.src = cardImage;
  image.alt = cardTitle;
  
  card.querySelector('.card__title').textContent = cardTitle;

  card.querySelector('.card__delete-button').addEventListener('click', deletFunction);
  
  return card;
}

function deleteCard(event){
  event.target.closest('.card').remove();
}

addCards();