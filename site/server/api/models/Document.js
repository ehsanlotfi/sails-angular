/**
 * Document.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    code: { type: 'string'},
    status: { type: 'string'},
    user: {
      model: 'User'
    },
  },

};

