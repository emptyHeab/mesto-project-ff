(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{J:()=>h});var t={url:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"dba1b99f-ca5f-417b-b98b-fc50170d3d2c","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Response.reject("Ошибка: ".concat(e.status))},r=document.querySelector("#card-template").content.querySelector(".places__item");function o(e){var t=r.cloneNode(!0),n=t.querySelector(".card__delete-button"),o=t.querySelector(".card__image"),c=t.querySelector(".card__like-button"),a=t.querySelector(".card__like-number");return o.src=e.link,o.alt=e.name,t.querySelector(".card__title").textContent=e.name,t.querySelector(".card__like-button").addEventListener("click",(function(){return e.like(e.id,c,a)})),t.querySelector(".card__image").addEventListener("click",e.openImg),t.querySelector(".card__like-number").textContent=e.likesList.length,t.setAttribute("data-id","".concat(e.id)),e.delete?n.addEventListener("click",e.delete):n.classList.add("card__delete-button_disabled"),i(e.likesList,h)&&c.classList.add("card__like-button_is-active"),t}function c(e){var r,o=e.target.closest(".card");(r=o.dataset.id,fetch("".concat(t.url,"/cards/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return n(e)}))).then((function(){o.remove()})).catch((function(e){return console.log(e)}))}function a(e,r,o){r.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(t.url,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return n(e)}))}(e).then((function(e){r.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(t.url,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return n(e)}))}(e).then((function(e){r.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}var i=function(e,t){return e.some((function(e){return e._id===t}))};function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function d(e){return!(!e.target.classList.contains("popup__close")&&!e.target.classList.contains("popup"))}var f=function(e,t,n,r){var o=e.querySelector("#".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n},p=function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.setCustomValidity(""),t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass)},m=function(e,t,n){y(t)?(e.disabled=!0,e.classList.add(n.inactiveButtonClass)):(e.disabled=!1,e.classList.remove(n.inactiveButtonClass))},y=function(e){return e.some((function(e){return!e.validity.valid}))},_=function(e,t,n){var r=Array.from(t.querySelectorAll(n.inputSelector));r.forEach((function(e){return p(t,e,n)}));var o=e.querySelector(n.submitButtonSelector);m(o,r,n)};function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var h,S=document.querySelector(".places__list"),b=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit"),k=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),L=document.querySelector("[name=edit-profile]"),E=L.querySelector("[name=name]"),C=L.querySelector("[name=description]"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),j=document.querySelector("[name=new-place]"),w=j.querySelector("[name=place-name]"),O=j.querySelector("[name=link]"),T=document.querySelector(".popup_type_image"),I=T.querySelector(".popup__image"),M=T.querySelector(".popup__caption"),P=document.querySelector(".popup_type_avatar"),B=document.querySelector(".profile__image-overlay"),D=P.querySelector("[name=edit-avatar]"),V=document.querySelector(".profile__image"),J=D.querySelector("[name=link]"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},H=function(e){I.src=e.target.src,I.alt=e.target.alt,M.textContent=e.target.closest(".card").querySelector(".card__title").textContent,u(T)},U=function(e,t){e.querySelector(".button").textContent=t?"Сохранение...":"Сохранить"};Promise.all([fetch("".concat(t.url,"/cards"),{method:"GET",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){return console.log(e)})),fetch("".concat(t.url,"/users/me"),{headers:t.headers}).then((function(e){return n(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=r[0],u=r[1];h=u._id,function(e){x.textContent=e.name,A.textContent=e.about,V.style.backgroundImage="url(".concat(e.avatar,")")}(u),i.forEach((function(e){var t=e.name,n=e.link,r=!1;u._id===e.owner._id&&(r=c),S.append(o({name:t,link:n,openImg:H,like:a,delete:r,likesList:e.likes,id:e._id}))}))})).catch((function(e){return console.log(e)})),b.addEventListener("click",(function(){E.value=x.textContent,C.value=A.textContent,u(g),_(g,L,N)})),g.addEventListener("click",(function(e){d(e)&&l(g)})),L.addEventListener("submit",(function(e){var r,o;e.preventDefault(),U(L,!0),(r=E.value,o=C.value,fetch("".concat(t.url,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return n(e)}))).then((function(){x.textContent=E.value,A.textContent=C.value,l(g)})).catch((function(e){return console.log(e)})).finally((function(){U(L,!1)}))})),k.addEventListener("click",(function(){u(q),_(q,j,N)})),q.addEventListener("click",(function(e){d(e)&&(l(q),j.reset())})),j.addEventListener("submit",(function(e){var r,i;e.preventDefault(),U(j,!0),(r=w.value,i=O.value,fetch("".concat(t.url,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:i})}).then((function(e){return n(e)}))).then((function(e){S.prepend(o({name:e.name,link:e.link,like:a,delete:c,openImg:H,likesList:e.likes,id:e._id})),l(q),j.reset()})).catch((function(e){return console.log(e)})).finally((function(){U(j,!1)}))})),T.addEventListener("click",(function(e){d(e)&&l(T)})),B.addEventListener("click",(function(){u(P),_(P,D,N)})),P.addEventListener("click",(function(e){d(e)&&(l(P),D.reset())})),D.addEventListener("submit",(function(e){e.preventDefault();var r,o=J.value;U(D,!0),(r=o,fetch("".concat(t.url,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:"".concat(r)})}).then((function(e){return n(e)}))).then((function(){V.style.backgroundImage="url(".concat(o,")"),l(P),D.reset()})).catch((function(e){return console.log(e)})).finally((function(){U(D,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(o){var c=o.target;c.validity.patternMismatch?c.setCustomValidity(c.dataset.patternErrorMessage):c.validity.valueMissing?c.setCustomValidity(c.dataset.missingErrorMessage):c.validity.typeMismatch?c.setCustomValidity(c.dataset.typeErrorMessage):c.setCustomValidity(""),c.validity.valid?p(e,c,t):f(e,c,c.validationMessage,t),m(r,n,t)}))}))}(t,e)}))}(N)})();