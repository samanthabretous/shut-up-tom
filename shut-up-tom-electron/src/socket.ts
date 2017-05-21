const socket = io.connect(window.location.host);
console.log(window.location)

socket.on('connect', () => {
  console.log('client connected', socket);
});

if (window.location.pathname === '/dashboard') {
  socket.on('updateData', ({ amps }) => {
    console.log(amps);
    const displayReading = document.querySelector('.reading h3');
    displayReading.innerText = `${amps} dps`;
  });
}
