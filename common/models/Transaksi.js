'use strict';

module.exports = function(Transaksi) {
    Transaksi.getTransaksiByName = function(name,  callback) {
            new Promise(function(resolve, reject) {
                //find name
                Transaksi.find( {where :{transaksi_name : {like : name}}}, function(err, result){
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

    Transaksi.remoteMethod(
        'getTransaksiByName',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'Transaksi_name', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getTransaksiByName', verb: 'get'},
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
