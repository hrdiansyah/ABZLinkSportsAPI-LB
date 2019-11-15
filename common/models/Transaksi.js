'use strict';

module.exports = function(transaksi) {
    transaksi.gettransaksiByName = function(name,  callback) {
            new Promise(function(resolve, reject) {
                //find name
                transaksi.find( {where :{id_customer : {like : name}}}, function(err, result){
                    if (err) reject (err);
                    if (result === null){
                        err = new Error("User Not Found");
                        err.statusCode =  404;
                        reject (err)
                    }
                    resolve(result);
                });
            }).then(function(res) {
                if (!res) callback (err);
                return callback(null, res);
            }).catch(function (err) {
                callback (err);
            });
        };

    transaksi.remoteMethod(
        'gettransaksiByName',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'product_name', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/gettransaksiByName', verb: 'get'},
        }
    );

transaksi.getStatusTransaksi = function(statuss, callback) {
    new Promise(function(resolve, reject) {
            // find name
      transaksi.find({where: {status:  {like:statuss}}}, function(err, result) {
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
      return callback(null, res);
    }).catch(function(err) {
      callback(err);
    });
};
transaksi.remoteMethod(
        'getStatusTransaksi',
    {
      description: 'get status transaksi',
      accepts:[
        {arg: 'statuss', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getStatusTransaksi', verb: 'get'},
    }
    );
};
// Admin.getAdminByName = function(name, callback) {
//     new Promise(function(resolve, reject) {
//         //find name
//         Admin.find( {where :{username : {like : name}}}, function(err, result){
//             if (err) reject (err);
//             if (result === null){
//                 err = new Error("User Not Found");
//                 err.statusCode =  404;
//                 reject (err)
//             }
//             resolve(result);
//         });
//     }).then(function(res) {
//         if (!res) callback (err);
//         return callback(null, res);
//     }).catch(function (err) {
//         callback (err);
//     });
// };
