export {enableValidation, clearValidation};

const enableValidation = (form, config) => {
  addInputListeners(form, config);
}

const addInputListeners = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const btn = formElement.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const input = event.target;
      if(input.validity.patternMismatch){
        input.setCustomValidity(input.dataset.patternErrorMessage);
      }else if(input.validity.valueMissing){
        input.setCustomValidity(input.dataset.missingErrorMessage);
      }else if(input.validity.typeMismatch){
        input.setCustomValidity(input.dataset.typeErrorMessage);
      }else {
        input.setCustomValidity('');
      }
      
      if(!input.validity.valid){
        showInputError(formElement, input, input.validationMessage, config);
        toggleBtn(btn, inputs, config);
      }else {
        hideInputError(formElement, input, config);
        toggleBtn(btn, inputs, config);
      }
    });
  });
}

const showInputError = (formElement, input, errorMessage, config) => {
  const errorArea = formElement.querySelector(`#${input.id}-error`);

  input.classList.add(config.inputErrorClass);
  errorArea.classList.add(config.errorClass);
  errorArea.textContent = errorMessage;
}

const hideInputError = (formElement, input, config) => {
  const errorArea = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorArea.classList.remove(config.errorClass);
}

const toggleBtn = (btn, inputs, config) => {
  if(!isFormInvalid(inputs)){
    btn.disabled = false;
    btn.classList.remove(config.inactiveButtonClass);
  }else {
    btn.disabled = true;
    btn.classList.add(config.inactiveButtonClass);
  }
}

const isFormInvalid = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

const clearValidation = (popup, config) => {
  const inputs = Array.from(popup.querySelectorAll(config.inputSelector));
  if(inputs.length > 0){
    const form = popup.querySelector(config.formSelector);
    inputs.forEach((element)=> hideInputError(form, element, config));
    const btn = popup.querySelector(config.submitButtonSelector);
    toggleBtn(btn, inputs, config);
  }
}