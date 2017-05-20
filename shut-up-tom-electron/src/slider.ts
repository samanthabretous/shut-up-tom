export default (() => {
  let bar: HTMLElement;
  let slider: HTMLElement;
  let info: HTMLElement;
  const createSliderPosition = (clientX:number) => {
    return ((((clientX - bar.offsetLeft) / bar.offsetWidth)).toFixed(2)); //.toFixed turns number into a string
  }
  const startSlide = (event) => {
    const set_perc:string = createSliderPosition(event.clientX);
    console.log(set_perc)
  	info.innerHTML = `start ${set_perc}%`;
  	bar.addEventListener('mousemove', moveSlide, false);
  	slider.style.width = `${set_perc * 100}%`;
  }
  const moveSlide = (event) => {
    const set_perc:string = createSliderPosition(event.clientX);
  	info.innerHTML = `moving: ${set_perc}%`;
  	slider.style.width = `${set_perc * 100}%`;
  }
  const stopSlide = (event) => {
    const set_perc:string = createSliderPosition(event.clientX);
  	info.innerHTML = `done: ${set_perc}%`;
  	bar.removeEventListener('mousemove', moveSlide, false);
  	slider.style.width = `${set_perc * 100}%`;
  }
  return {
    init () {
      bar = document.querySelector('.slider__container-js');
      slider = document.querySelector('.slider-js');
      info = document.querySelector('.slider__info-js');
      bar.addEventListener('mousedown', startSlide, false);
      bar.addEventListener('mouseup', stopSlide, false);
    }
  }
})();
