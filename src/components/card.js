export {createCard, deleteCard, setLike};
import {deleteCard as deleteCardApi, setLike as setLikeApi, deleteLike, getUser} from './api';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

function createCard(card) {
  const cardNew = cardTemplate.cloneNode(true);
  const deleteBtn = cardNew.querySelector('.card__delete-button');
  const image = cardNew.querySelector('.card__image');
  const likeBtn = cardNew.querySelector('.card__like-button');

  image.src = card.link;
  image.alt = card.name;
  
  cardNew.querySelector('.card__title').textContent = card.name;
  cardNew.querySelector('.card__like-button').addEventListener('click', card.like);
  cardNew.querySelector('.card__image').addEventListener('click', card.openImg);
  cardNew.querySelector('.card__like-number').textContent = card.likesList.length;
  cardNew.setAttribute('data-id',`${card.id}`);

  if(card.delete) {
    deleteBtn.addEventListener('click', card.delete);
  }else {
    deleteBtn.classList.add('card__delete-button_disabled');
  }

  getUser().then((user) => {
    if(hasUser(card.likesList, user._id)){
      likeBtn.classList.add('card__like-button_is-active');
    }
  })
  .catch((error) => console.log(error));

  return cardNew;
}

function deleteCard(evt){
  const card =  evt.target.closest('.card');
  deleteCardApi(card.dataset.id)
  .then(() => {
    card.remove();
  })
  .catch((error) => console.log(error));
}

function setLike(evt) {
  const likeBtn = evt.target;
  const card = likeBtn.closest('.card');

  if(!likeBtn.classList.contains('card__like-button_is-active')){
    setLikeApi(card.dataset.id)
    .then((data)=> {
      likeBtn.classList.add('card__like-button_is-active');
      refreshLikeNumber(card, data.likes.length);
    })
    .catch((error) => console.log(error));
  }else {
    deleteLike(card.dataset.id)
    .then((data)=> {
      likeBtn.classList.remove('card__like-button_is-active');
      refreshLikeNumber(card, data.likes.length);
    })
    .catch((error) => console.log(error));
  }
}

const hasUser = (array, id) => {
  return array.some((user) => {
    return user._id === id;
  });
}

const refreshLikeNumber = (card, number) => {
  const likeNumber = card.querySelector('.card__like-number');
  likeNumber.textContent = number;
}