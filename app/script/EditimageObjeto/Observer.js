'strict mode';

editimage.Observer = function(){
    var self = this, callbacks = [];
    
    self.adicionarCallback = function(callback) {

        if (typeof callback === "function") callbacks.push(callback);

    };
    
    self.notificar = function(){
        
        callbacks.forEach(function(callback) {

            callback();

        });
    };
};
