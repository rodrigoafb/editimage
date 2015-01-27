'use strict';

editimage.fabricaRedimensionadorBase = {
    criar: function(shape){
        return new editimage.Redimensionador(shape);
    }
};

editimage.fabricaRedimensionador = editimage.fabricaRedimensionadorBase;