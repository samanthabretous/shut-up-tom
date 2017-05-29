class SocketClients {
  constructor() {
    this.clients = {}
  }
  addClient(teamId, socketId) {
    this.clients[teamId] = {
      socket: socketId
    };
  }
  removeClient(socketId) {
    Object.keys(this.clients).forEach(client => {
      console.log(client);
      if(client.socket === socketId) {
        delete clients[client]
        return;
      }
    })
  }
  getClientSocketId(teamId) {
    return this.clients[teamId].socket;
  }
}

module.exports = SocketClients;
