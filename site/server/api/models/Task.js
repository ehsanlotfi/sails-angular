/**
 * Task.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    desc: { type: 'string' },
    date: { type: 'string' },
    user: {
      model: 'User'
    },
    activity:{
      model: 'Activity'
    }
  },

};

