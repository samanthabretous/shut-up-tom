// import { ipcRenderer } from 'electron';
const socket = io.connect();

socket.on('connect', () => {
  console.log('client connected');
});
socket.on('updateData', ({ amps }) => console.log(amps))

// document.addEventListener('DOMContentLoaded', () => {
//   const n = new Notification('You did it!', {
//     body: 'Nice work.',
//   });
//   // Tell the notification to show the menubar popup window on click
//   n.onclick = () => { ipcRenderer.send('show-window'); };
// });
