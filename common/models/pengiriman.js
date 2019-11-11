'use strict';

module.exports = function(pengiriman) {
    pengiriman.getpengirimanBykurir = function(name,  callback) {
            new Promise(function(resolve, reject) {
                //find name
                pengiriman.find( { where :{ kurir : { like : name } } }, function ( err, result ) {
                    if (err) reject ( err );
                    if (result === null ) {
                        err = new Error ( "User Not Found" );
                        err.statusCode =  404;
                        reject ( err)
                    }
                    resolve(result);
                });
            }).then(function(res) {
                if(!res)callback(err);
                return callback(null, res);
            }).catch(function (err) {
                callback (err);
            });
        };

    pengiriman.remoteMethod(
        'getpengirimanBykurir',
        {
            description : 'get user by kurir',
            accepts: [
                {arg : 'pengiriman_kurir', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getpengirimanBykurir', verb: 'get'},
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
