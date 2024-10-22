export {getUser, updateUser, addCard, deleteCard, setLike, deleteLike, updateAvatar, config};

const config = {
  url: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: 'dba1b99f-ca5f-417b-b98b-fc50170d3d2c',
    'Content-Type': 'application/json'
  }
}

const getUser = () => {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then((response) => {
   if(response.ok){
    return response.json();
   }
   return Response.reject(`Ошибка: ${response.status}`);
  });
}

const updateUser = (name, about) => {
  return fetch(`${config.url}/users/me`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}

const addCard = (name, link) => {
  return fetch(`${config.url}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}

const deleteCard = (id) => {
  return fetch(`${config.url}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}

const setLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}

const deleteLike = (id) => {
  return fetch(`${config.url}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}

const updateAvatar = (avatarLink) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarLink}`
    })
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  });
}