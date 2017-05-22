import request from 'superagent';
console.log(request);
import sidebar from './sidebar';

const dashboard =  (() => {
  const addEventListeners = () => {
    const characters:NodeListOf<Element> = document.querySelectorAll('.character__button-js');
    for(let i = 0; i < characters.length; i++) {
      // click event to choose different sound levels
      characters[i].addEventListener('click', (event) => {
        const activeCharater:Element = document.querySelector('.character__active');
        activeCharater.classList.remove('character__active')
        characters[i].classList.add('character__active');
        //send out ajax call
      });

      // add class for dialogue animation
      characters[i].addEventListener('mouseover', (event) => {
        characters[i].previousElementSibling.classList.add('character__bubble-animation');
      });
      // remove class for dialogue animation
      characters[i].addEventListener('mouseleave', (event) => {
        characters[i].previousElementSibling.classList.remove('character__bubble-animation');
      });
    }
  }
  return {
    init() {
      addEventListeners();
    }
  }
})();

dashboard.init();
sidebar.init();

export default dashboard;
