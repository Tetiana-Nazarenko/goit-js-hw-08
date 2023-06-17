import throttle from 'lodash.throttle';
let form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('submit', saveMessage);

//** */
//const dataForm = {};
// dataForm[evt.target.name] = evt.target.value;
let savedText = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
const { email, message } = form.elements;
outTextInput();

function onTextInput() {
  // console.log(evt.target.name);
  // console.log(evt.target.value);
  savedText = { email: email.value, message: message.value };

  localStorage.setItem('feedback-form-state', JSON.stringify(savedText));
}

function saveMessage(data) {
  data.preventDefault();
  console.log('Отпровляем форму');
  console.log({ email: email.value, message: message.value });
  data.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log('LocalStorage was delete');
}

//*** */

function outTextInput() {
  if (savedText) {
    email.value = savedText.email || '';
    message.value = savedText.message || '';
  }
}
