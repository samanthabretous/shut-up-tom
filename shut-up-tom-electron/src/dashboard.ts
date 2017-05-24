import request from 'superagent';
import sidebar from './sidebar';

const dashboard =  (() => {
  const showLevel = (targetElement) => {
    console.log(targetElement);
    const level:Element = document.querySelector('.level');
    if (targetElement.id === 'stress') {
      level.innerText = "Library Mode";
    } else if (targetElement.id === 'horn') {
      level.innerText = "It's party time";
    } else {
      level.innerText = "Work day Life";
    }
  };

  const addEventListeners = () => {
    const characters:NodeListOf<Element> = document.querySelectorAll('.character__button-js');
    for(let i = 0; i < characters.length; i++) {
      // click event to choose different sound levels
      characters[i].addEventListener('click', (event) => {
        const activeCharater:Element = document.querySelector('.character__active');
        if(activeCharater) activeCharater.classList.remove('character__active');
        characters[i].classList.add('character__active');
        showLevel(characters[i]);
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
