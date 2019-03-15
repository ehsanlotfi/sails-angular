/**
 * Document.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: { type: 'string'},
    class: { type: 'string'},
    formNumber: { type: 'string'},
    status: { type: 'string'},
    date: { type: 'string' },
 	  count: { type: 'number'},
    user: {
      model: 'User'
    },
  },

};

