import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onTextInput, 500));
refs.form.addEventListener('submit', saveMessage);

//** */

const data = {};
outTextInput();
function onTextInput(evt) {
  // console.log(evt.target.name);
  // console.log(evt.target.value);
  data[evt.target.name] = evt.target.value;
  console.log(data);
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}

function saveMessage(data) {
  data.preventDefault();
  //console.log('Отпровляем форму');
  data.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log('LocalStorage was delete');
}

//*** */

function outTextInput() {
  const savedText = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedText) {
    refs.email.value = savedText.email || '';
    refs.message.value = savedText.message || '';
  }
}
