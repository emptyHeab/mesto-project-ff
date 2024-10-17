export {getUser, updateUser, config};

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
  })
  .catch((error) => console.log(error));
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
  })
  .catch((error) => console.log(error));
}

const addCard = (name, link) => {
  fetch(`${config.url}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  then((response) => {
    if(response.ok){
      return response.json();
    }
    return Response.reject(`Ошибка: ${response.status}`);
  })
  .catch((error) => console.log(error));
}