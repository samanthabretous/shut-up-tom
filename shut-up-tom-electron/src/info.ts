// import superagent from 'superagent';
import sidebar from './sidebar';
sidebar.init();

const info = (() => {
  let main:Element = null;
  let form:Element = null;
  let input:Element = null;
  let button:Element = null;

  const addDevice = (deviceName, teamId) => {
    superagent.post('/sound/device')
    .send({ device_name: deviceName, team_id: teamId })
    .then((success, failure) => {
      console.log(success);
      renderOutput(success.body.deviceName);
    })

  }
  const addEventToButton = () => {
    const teamId:string = document.cookie.split('=')[1];

    button.addEventListener('click', (event) => {
      event.preventDefault()
      addDevice(input.value, teamId);
    });
  }

  // create output element when device name is set
  const renderOutput = (deviceName:string) => {
    const output:Element = document.createElement('output');
    output.classList.add('deviceResults');
    output.innerText = deviceName;
    const dashboardButton:Element = document.createElement('button');
    dashboardButton.classList.add('dashboardButton');
    const dashLink: Element = document.createElement('a');
    dashLink.setAttribute('href', '/dashboard');
    dashLink.innerText = 'Go to dashboard';
    dashboardButton.appendChild(dashLink);
    console.log(dashboardButton)
    main.removeChild(form);
    main.appendChild(output);
    main.appendChild(dashboardButton)
  }
  return {
    init() {
      main = document.getElementsByTagName('main')[0];
      form = document.getElementsByTagName('form')[0];
      input = document.getElementsByTagName('input')[0];
      button = document.getElementsByTagName('button')[0];
      addEventToButton();
    }
  }
})();

info.init();
export default info;
