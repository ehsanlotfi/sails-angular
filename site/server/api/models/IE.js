/**
 * IE.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    entryTime: { type: 'string'},
    exitTime: { type: 'string'},
    walk: { type: 'number'},
    check: { type: 'boolean'},
    user: {
      model: 'User'
    },
  },

};

