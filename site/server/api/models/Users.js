/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string'},
    LastName: { type: 'string' },
    code: { type: 'number' },
    pass: { type: 'string' },
    role: { type: 'string' },
    salary: { type: 'string' },
    hash: { type: 'string' }
  }
  
};

