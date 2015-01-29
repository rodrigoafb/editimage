'strict mode';

editimage.Observer = function(){
    var self = this, callbacks = [];
    
    self.adicionarCallback = function(callback) {

        if (typeof callback === "function") callbacks.push(callback);

    };
    
    self.notificar = function(objeto){
        
        callbacks.forEach(function(callback) {

            callback(objeto);

        });
    };
};
