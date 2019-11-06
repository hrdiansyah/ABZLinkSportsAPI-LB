/* eslint-disable no-undef */
'use strict';

module.exports = function(Admin) {
  Admin.getAdminByUsername = function(name, callback) {
    new Promise(function(resolve, reject) {
            // find name
      Admin.find({where: {Username: {like: name}}}, function(err, result) {
        if (err) reject(err);
        if (result === null) {
          err = new Error('User not Found');
          err.statusCode = 404;
          reject(err);
        }
        resolve(result);
      });
    }).then(function(res) {
      if (!res) callback(err);
      return callback(null, res[0]);
    }).catch(function(err) {
      callback(err);
    });
  };
  Admin.remoteMethod(
        'getAdminByUsername',
    {
      description: 'get user by name',
      accepts: [
                {arg: 'name', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getAdminByUsername', verb: 'get'},
    }
    );
};
