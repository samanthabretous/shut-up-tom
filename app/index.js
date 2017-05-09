const { ipcRenderer } = require('electron');
const io = require('socket.io-client');

const socket = io.connect('http://localhost:2020');
console.log('socket', socket);

socket.on('connect', () => console.log('client connected'));

document.addEventListener('DOMContentLoaded', () => {
  const n = new Notification('You did it!', {
    body: 'Nice work.',
  });
  // Tell the notification to show the menubar popup window on click
  n.onclick = () => { ipcRenderer.send('show-window'); };
});
