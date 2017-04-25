( function () {
  var takePicture = document.querySelector( "#take-picture" ),
      showPicture = document.querySelector( "#show-picture" );

  if ( takePicture && showPicture ) {
    // Establecer eventos
    takePicture.onchange  = function ( event ) {
      // Obtener una referencia a la fotografía tomada o fichero
      var files   = event.target.files,
          file;

      if ( files && files.length > 0 ) {
        file = files[ 0 ];

        try {
          // Crear ObjectURL
          var imgURL  = window.URL.createObjectURL( file );

          // Establecer ObjectURL como img src
          showPicture.src   = imgURL;

          // Revocar ObjectURL
          URL.revokeObjectURL( imgURL );
        } catch ( exception ) {
          try {
            // Regresar a FileReader si createObjectURL no está disponible
            var fileReader    = new fileReader();
            fileReader.onload = function ( event ) {
              showPicture.src = event.target.result;
            };

            fileReader.readAsDataURL( file );
          } catch ( exception ) {
            var error = document.querySelector( "#error" );

            if ( error ) {
              error.innerHTML = "Neither createObjectURL or FileReader are supported";
            }
          }
        }
      }
    }
  }
} )();