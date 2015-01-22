(function() {

		var editores = document.querySelectorAll('.editimage');

		var countEditores = editores.length,
			idEditor;

		for (var i = 0; i < countEditores; i++) {

			idEditor = editores[i].getAttribute('id')

			if (idEditor) {
				editimage.inicializar(idEditor);
			}
		};

	})();