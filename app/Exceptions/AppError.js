'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

class AppException extends LogicalException {
  constructor(message, status = 500, code) {
    super(message, status, code);
  }
}

module.exports = AppException;
