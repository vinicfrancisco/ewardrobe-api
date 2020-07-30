'use strict';

class CreateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|string',
      nickname: 'required|string',
      email: `required|email|unique:users,email`,
      genre: 'required|string',
      password: 'required|min:6'
    };
  }
}

module.exports = CreateUser;
