// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = initialCards;

const cardTemplate = document.querySelector('#card-template').content;

function addCards(list) {
  const place = document.querySelector('.places__list');

  cardList.forEach(card => {
    const cardName = card.name;
    const cardLink = card.link;
    place.append(createCard(cardLink, cardName, deleteCard));
  });
}

function createCard(cardImage, cardTitle, deletFunction) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.card__image').src = cardImage;
  card.querySelector('.card__title').textContent = cardTitle;

  card.querySelector('.card__delete-button').addEventListener('click', deletFunction);
  
  return card;
}

function deleteCard(event){
  event.target.parentElement.remove();
}

addCards();