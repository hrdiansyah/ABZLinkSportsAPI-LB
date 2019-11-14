'use strict';

module.exports = function(cart) {
    cart.getcartById_customer = function(name,  callback) {
            new Promise(function(resolve, reject) {
                //find name
                cart.find( {where :{id_customer : {like : name}}}, function(err, result){
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

    cart.remoteMethod(
        'getcartById_customer',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'id_customer', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getcartById_customer', verb: 'get'},
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
