const socket = io.connect(window.location.host);

socket.on('connect', () => {
  console.log('client connected', socket);
  socket.emit('add-team', {teamId: document.cookie.split('=')[1]})
});

if (window.location.pathname === '/dashboard') {
  socket.on('updateData', ({ amps }) => {
    console.log(amps);
    const displayReading = document.querySelector('.reading h3');
    displayReading.innerText = `${amps} db`;
  });
}
