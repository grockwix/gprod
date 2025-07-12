class Auth {
  constructor(user, pass) {
    this.user = user;
    this.pass = pass;
  }
}

class Connection {
  constructor(service, port, secure, auth) {
    this.service = service;
    this.port = port;
    this.secure = secure;
    this.auth = auth;
  }
}

export { Connection, Auth }