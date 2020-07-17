'use strict';

class SignIn {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:6'
    };
  }
}

module.exports = SignIn;
