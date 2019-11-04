'use strict';

module.exports = function(Product) {
  Product.getProductByName = function(name,  callback) {
    new Promise(function(resolve, reject) {
     //find name
                Product.find( { where :{product_name : { like : name } } }, function(err, result){
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

    Product.remoteMethod(
        'getProductByName',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'password', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getProductByName', verb: 'get'},
        }
    );

};