// import superagent from 'superagent';
import sidebar from './sidebar';
sidebar.init();

const info = (() => {
  const setDevice = () => {
    superagent.get()

  }
  const addEventToButton = () => {
    const button:Element = document.getElementsByTagName('button')[0];
    const teamId:string = document.cookie.split('=')[0];
    button.addEventListener('click', (event) => {
      // setDevice();
    });
  }
  // create output element when device name is set
  const renderOutput = (deviceName:string) => {
    const output:Element = document.createElement('output');
    output.classList.add('deviceResults');
    console.dir(output)
  }
  return {
    init() {
      addEventToButton();
    }
  }
})();

export default info;
