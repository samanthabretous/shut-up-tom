import sidebar from './sidebar';
sidebar.init();

const customMessages = (() => {
  let main: Element;
  let ul: Element;
  let input: Element;
  let button: Element;
  const displayMessages = (messages) => {
    const newUl: Element = document.createElement('ul');
    messages.forEach(message => {
      const li: Element = document.createElement('li');
      li.innerText = message;
      newUl.appendChild(li);
    })
    return newUl;
  };
  const addMessage = () => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(input.value)
      superagent.post('/sound/add-message')
      .send({ message: input.value, teamId: document.cookie.split('=')[1] })
      .then((success, failure) => {
        console.log(success.body)
        // input.value = ""
        const newMessages = displayMessages(success.body.messages);
        console.log(ul.parentNode, newMessages, ul)
        ul.parentNode.replaceChild(newMessages, ul)
      });
    })
  };
  return {
    init() {
      main = document.getElementsByTagName('main')[0];
      ul = document.getElementsByTagName('ul')[0];
      input = document.getElementsByTagName('input')[0];
      button = document.getElementsByTagName('button')[0];
      addMessage();
    }
  }
})();

customMessages.init();
export default customMessages;
