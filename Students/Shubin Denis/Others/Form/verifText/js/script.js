let text_1 = document.querySelector('.text');
const changeText = () => {
  let str = text_1.textContent;
  text_1.innerText = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
};