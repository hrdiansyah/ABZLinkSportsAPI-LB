'use strict';
const loopback = require('loopback');
const path = require('path');

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
        // email
    // web hook, after save
    cart.observe('after save', function(context, next) {
        console.log(context);
        if (context.isNewInstance) {
            let cart = context.instance;
        }
        return next();
    });

    cart.afterRemote('create', function(ctx, modelInstance, next) {
    
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
        let renderer = loopback.template(path.resolve(__dirname,'../../server/views/konfirmasi-pesanan.ejs'));
        let myMessage = {heading:"Selamat datang di Java Travel", text:"Terima kasih sudah mendaftar di Java Travel. Berikut pesanan Bapak/Ibu : "};
        let html = renderer(myMessage);

        cart.app.models.Email.send({
            to: "zaki.arozi@gmail.com",
            from: '"Pesanan" <noreply@Abzlinksport.com>',
            subject: 'Konfirmasi pemesanan wisata',
            html: html
          }, function(err, mail) {
            if (err) return console.log(err + '> error sending request for quotation email');
            console.log('> sending request for quotation email to:', mail);
        });
        
    })    

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
