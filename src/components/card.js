export {createCard, deleteCard, setLike};
import {deleteCard as deleteCardApi, setLike as setLikeApi, deleteLike} from './api';
import { userId } from './index';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

function createCard(card) {
  const cardNew = cardTemplate.cloneNode(true);
  const deleteBtn = cardNew.querySelector('.card__delete-button');
  const image = cardNew.querySelector('.card__image');
  const likeBtn = cardNew.querySelector('.card__like-button');
  const likeNumber = cardNew.querySelector('.card__like-number');

  image.src = card.link;
  image.alt = card.name;
  
  cardNew.querySelector('.card__title').textContent = card.name;
  cardNew.querySelector('.card__like-button').addEventListener('click', () => card.like(card.id, likeBtn, likeNumber));
  cardNew.querySelector('.card__image').addEventListener('click', card.openImg);
  cardNew.querySelector('.card__like-number').textContent = card.likesList.length;
  cardNew.setAttribute('data-id',`${card.id}`);

  if(card.delete) {
    deleteBtn.addEventListener('click', card.delete);
  }else {
    deleteBtn.classList.add('card__delete-button_disabled');
  }

  if(hasUser(card.likesList, userId)){
    likeBtn.classList.add('card__like-button_is-active');
  }

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

function setLike(id, likeBtn, likeNumber) {
  if(!likeBtn.classList.contains('card__like-button_is-active')){
    setLikeApi(id)
    .then((data)=> {
      likeBtn.classList.add('card__like-button_is-active');
      likeNumber.textContent = data.likes.length;
    })
    .catch((error) => console.log(error));
  }else {
    deleteLike(id)
    .then((data)=> {
      likeBtn.classList.remove('card__like-button_is-active');
      likeNumber.textContent = data.likes.length;
    })
    .catch((error) => console.log(error));
  }
}

const hasUser = (array, id) => {
  return array.some((user) => {
    return user._id === id;
  });
}