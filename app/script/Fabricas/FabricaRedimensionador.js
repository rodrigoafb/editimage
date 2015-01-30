'use strict';

editimage.fabricaRedimensionadorBase = {
    criar: function(observer, shape){
        return new editimage.Redimensionador(observer, shape);
    }
};

editimage.fabricaRedimensionador = editimage.fabricaRedimensionadorBase;