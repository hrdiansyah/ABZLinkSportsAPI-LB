module.exports = function(containerdsc) {

    containerdsc.getContainerdscByName= function(CONTAINERDSC, callback){
        new Promise (function(resolve, reject){
            //find by name
        containerdsc.find({where:{Name:{like: CONTAINERDSC}}}, function(err, result){
            if(err) reject(err);
            if (result== null){
                err = new Error('Maaf tidak ditemukan');
                err.statusCode=404;
                reject(err);
            }
            resolve(result);
        });
        }).then(function(res){
            if (!res) callback(err);
            return callback(null, res[0]);     
        }).catch(function(err){
            callback(err);
        });
    };
   




   
 


    containerdsc.remoteMethod(
        'getContainerdsc',{
        description : 'get discount by name',
        accepts: [
            {arg : 'name', type : 'string'}
        ],
        returns : {
            arg : 'res', type: 'object', root: true
        },
        http:{path: '/getContainerdscByName', verb: 'get'},
    }
);
};