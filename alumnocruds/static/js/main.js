

const showSidebar = (toggleId, sidebarId, mainId) =>{
   const toggle = document.getElementById(toggleId),
   sidebar = document.getElementById(sidebarId),
   main = document.getElementById(mainId)

   if(toggle && sidebar && main){
       toggle.addEventListener('click', ()=>{
           /* Show sidebar */
           sidebar.classList.toggle('show-sidebar')
           /* Add padding main */
           main.classList.toggle('main-pd')
       })
   }
}

showSidebar('header-toggle','sidebar', 'main')


 /*=============== LINK ACTIVE ===============*/
 const sidebarLink = document.querySelectorAll('.sidebar__link')
 
 function linkColor(){
     sidebarLink.forEach(l => l.classList.remove('active-link'))
     this.classList.add('active-link')
 }
 
 sidebarLink.forEach(l => l.addEventListener('click', linkColor))


// Con esto obtengo el token csrf
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // ¿Esta cadena de cookie comienza con el nombre que queremos?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');




// Se llama la tabla
 new DataTable('table.display', {
    language: {
      sProcessing:    "Procesando...",
      sLengthMenu:    "Mostrar _MENU_ registros",
      sZeroRecords:   "No se encontraron resultados",
      sEmptyTable:    "Ningún dato disponible en esta tabla",
      sInfo:          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      sInfoEmpty:     "Mostrando registros del 0 al 0 de un total de 0 registros",
      sInfoFiltered:  "(filtrado de un total de _MAX_ registros)",
      sInfoPostFix:   "",
      sSearch:        "Buscar:",
      sUrl:           "",
      sInfoThousands: ",",
      sLoadingRecords: "Cargando...",
      oPaginate: {
        sFirst:    "Primero",
        sLast:     "Último",
        sNext:     "Siguiente",
        sPrevious: "Anterior"
      },
      oAria: {
        sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
        sSortDescending: ": Activar para ordenar la columna de manera descendente"
      },
      

    }
  });
//Abrir y cerrar modal  Crear
  var dialog = document.getElementById('modal');
  document.getElementById('open').onclick = function() {
    dialog.showModal();
  };
  document.getElementById('close').onclick = function() {
    dialog.close();
  };
//Abrir y cerrar modal Editar
  var modalEdit = document.getElementById('editarAlumno');
  document.getElementById('openedit').onclick = function() {
    modalEdit.showModal();
  };
  document.getElementById('closedit').onclick = function() {
    modalEdit.close();
  };

// Esto hace que se muestre el modal de editar
  document.addEventListener('DOMContentLoaded', function() {
    var editButtons = document.querySelectorAll('.editButton');
    editButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var nombre = this.getAttribute('data-nombre');
        var apellido = this.getAttribute('data-apellido');
        var cedula = this.getAttribute('data-cedula');
        var semestre = this.getAttribute('data-semestre');
        
        document.getElementById('nombreCompleto-' + cedula).value = nombre;
        document.getElementById('apellido-' + cedula).value = apellido;
        document.getElementById('cedula-' + cedula).value = cedula;
        document.getElementById('curso-' + cedula).value = semestre;
        
        document.getElementById('modaledit-' + cedula).style.display = 'block';
      });
    });
    
    var closeButtons = document.querySelectorAll('.cerrarmodal');
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var cedula = this.getAttribute('data-cedula');
        document.getElementById('modaledit-' + cedula).style.display = 'none';
      });
    });
  });



//Metodo DELETE de un alumno
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('click', function(event) {
    if (event.target.matches('.deleteButton')) {
      var codigo = event.target.getAttribute('data-codigo');
      let protocol = window.location.protocol;
      let domain = window.location.protocol + '//' + window.location.host;
      let url = domain +  '/alumno/' +'?codigo=' + codigo;
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.setRequestHeader("X-CSRFToken", csrftoken);

      // Muestra la alerta de SweetAlert
      Swal.fire({
        title: 'Borrando...',
        text: 'Por favor espera',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });

      xhr.onload = function() {
        Swal.close();  // Cierra la alerta de SweetAlert
        if (xhr.status === 200) {
          Swal.fire(
            'Deleted!',
            'Alumno eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al eliminar el alumno',
          })
        }
      };
      xhr.send();
    }
  });
});




// Primero, seleccionamos el formulario
const form = document.getElementById('crear');


// Luego, añadimos el controlador de eventos submit
form.addEventListener('submit', function(event) {
  event.preventDefault();

  let formData = new FormData(form);
  dialog.close();
  Swal.fire({
      title: 'Subiendo...',
      allowOutsideClick: false
  });
  Swal.showLoading();

  fetch('./alumno/', {
    method: 'POST',
    headers: {
        'X-CSRFToken': csrftoken
    },
    body: formData
}).then(response => {
 
    if (!response.ok) {
        // Si la respuesta no es exitosa, convertimos la respuesta a JSON y la devolvemos en una promesa rechazada para que pueda ser capturada en el siguiente bloque catch
        return Promise.reject(response.json());
    }

    Swal.close();
    return response.json();
}).then(json => {
    // Mostramos una alerta de éxito
    Swal.fire('¡Éxito!', 'El alumno ha sido creado.', 'success');
    location.reload();  
}).catch(e => {
    if (typeof e.then === 'function') {
        // Si e es una promesa, eso significa que estamos manejando un error del servidor
        e.then(errorMessage => {
            // Mostramos el mensaje de error del servidor en una alerta de SweetAlert
            Swal.fire('¡Error!', errorMessage.error, 'error');
            form.reset();
        });
    } else {
        // Si e no es una promesa, eso significa que estamos manejando un error de red o de programación
        Swal.fire('¡Error!', e.message, 'error');
        form.reset();
    }
});

});


//Buscar Alumno
document.getElementById("buscar").addEventListener("click", function(){
  let codigo = document.getElementById("codigoe").value;
  
  Swal.fire({
      title: 'Buscando...',
      allowOutsideClick: false
  });
  Swal.showLoading();
  modalEdit.close();
  fetch("./alumno/?codigo=" + codigo)
      .then(response => {
          swal.close();
          if (!response.ok) {
            Swal.fire('Alumno no encontrado');
            throw new Error("Alumno no encontrado");
              
          }
          return response.json();
      })
      .then(data => {
        console.log(data);
        document.getElementById("nombree").value = data.nombreCompleto;
        document.getElementById("cedulae").value = data.cedula;
        document.getElementById("semestree").value = data.semestre;
        
        document.getElementById("dia_uno").value = data.dia_uno ? data.dia_uno.split('T')[0] : '';
        document.getElementById("dia_dos").value = data.dia_dos ? data.dia_dos.split('T')[0] : '';

        if (data.NUDO_Y_SUTURA) {
          document.getElementById("Asistencia_NUDO_Y_SUTURA").value = data.Asistencia_NUDO_Y_SUTURA;
          document.getElementById("Asistencia_NUDO_Y_SUTURA").style.display = 'block';
          document.getElementById("Asistencia_NUDO_Y_SUTURAlabel").style.display = 'block';
          document.getElementById("salida_NUDO_Y_SUTURA").value = data.salida_NUDO_Y_SUTURA;
          document.getElementById("salida_NUDO_Y_SUTURA").style.display = 'block';
          document.getElementById("salida_NUDO_Y_SUTURAlabel").style.display = 'block';
      } else {
          document.getElementById("Asistencia_NUDO_Y_SUTURA").style.display = 'none';
          document.getElementById("Asistencia_NUDO_Y_SUTURAlabel").style.display = 'none';
          document.getElementById("salida_NUDO_Y_SUTURA").style.display = 'none';
          document.getElementById("salida_NUDO_Y_SUTURAlabel").style.display = 'none';
      }
      if (data.HEMORRAGIA_Y_FRACTURA) {
          document.getElementById("Asistencia_HEMORRAGIA_Y_FRACTURA").value = data.Asistencia_HEMORRAGIA_Y_FRACTURA;
          document.getElementById("Asistencia_HEMORRAGIA_Y_FRACTURA").style.display = 'block';
          document.getElementById("Asistencia_HEMORRAGIA_Y_FRACTURAlabel").style.display = 'block';
          document.getElementById("salida_HEMORRAGIA_Y_FRACTURA").value = data.salida_HEMORRAGIA_Y_FRACTURA;
          document.getElementById("salida_HEMORRAGIA_Y_FRACTURA").style.display = 'block';
          document.getElementById("salida_HEMORRAGIA_Y_FRACTURAlabel").style.display = 'block';
      } else {
          document.getElementById("Asistencia_HEMORRAGIA_Y_FRACTURA").style.display = 'none';
          document.getElementById("Asistencia_HEMORRAGIA_Y_FRACTURAlabel").style.display = 'none';
          document.getElementById("salida_HEMORRAGIA_Y_FRACTURA").style.display = 'none';
          document.getElementById("salida_HEMORRAGIA_Y_FRACTURAlabel").style.display = 'none';
      }
      if (data.INTUBACION_OROTRAQUEAL) {
          document.getElementById("Asistencia_INTUBACION_OROTRAQUEAL").value = data.Asistencia_INTUBACION_OROTRAQUEAL;
          document.getElementById("Asistencia_INTUBACION_OROTRAQUEAL").style.display = 'block';
          document.getElementById("Asistencia_INTUBACION_OROTRAQUEALlabel").style.display = 'block';
          document.getElementById("salida_INTUBACION_OROTRAQUEAL").value = data.salida_INTUBACION_OROTRAQUEAL;
          document.getElementById("salida_INTUBACION_OROTRAQUEAL").style.display = 'block';
          document.getElementById("salida_INTUBACION_OROTRAQUEALlabel").style.display = 'block';
      } else {
          document.getElementById("Asistencia_INTUBACION_OROTRAQUEAL").style.display = 'none';
          document.getElementById("Asistencia_INTUBACION_OROTRAQUEALlabel").style.display = 'none';
          document.getElementById("salida_INTUBACION_OROTRAQUEAL").style.display = 'none';
          document.getElementById("salida_INTUBACION_OROTRAQUEALlabel").style.display = 'none';
      }
      modalEdit.showModal();
      
    
    })
      .catch(error => {
          swal("Error", error.message, "error"); // Muestra el error con SweetAlert
      });
});
//Put de alumnos
// Primero, obtenemos el formulario por su ID
// Primero, obtenemos el formulario por su ID
const formPut = document.getElementById('editarAlumnoform');

// Luego, añadimos el controlador de eventos submit
formPut.addEventListener('submit', function(event) {
  // Prevenimos el comportamiento por defecto del formulario
  event.preventDefault();

  // Creamos un objeto FormData con los datos del formulario
  let formData = new FormData(formPut);
  modalEdit.close();
    Swal.fire({
      title: 'Actualizando...',
      allowOutsideClick: false
  });
  Swal.showLoading();
  // Realizamos la solicitud fetch
  fetch(formPut.action, {
    method: 'PUT',
    headers: {
      'X-CSRFToken': csrftoken // Añade esta línea
    },
    body: new URLSearchParams(formData)  // Cambia 'formData' a 'new URLSearchParams(formData)'
  })
  .then(response => {
    Swal.close();
    if (!response.ok) {
        // Si la respuesta no es exitosa, convertimos la respuesta a JSON y la devolvemos en una promesa rechazada para que pueda ser capturada en el siguiente bloque catch
        return Promise.reject(response.json());
    }

    // Si la respuesta es exitosa, convertimos la respuesta a JSON
    return response.json();
  })
  .then(json => {
    // Mostramos una alerta de éxito
    Swal.fire('¡Éxito!', 'El alumno ha sido actualizado.', 'success');
    location.reload();  
  })
  .catch(e => {
    if (typeof e.then === 'function') {
        // Si e es una promesa, eso significa que estamos manejando un error del servidor
        e.then(errorMessage => {
            // Mostramos el mensaje de error del servidor en una alerta de SweetAlert
            Swal.fire('¡Error!', errorMessage.error, 'error');
            formPut.reset();
        });
    } else {
        // Si e no es una promesa, eso significa que estamos manejando un error de red o de programación
        Swal.fire('¡Error!', e.message, 'error');
        formPut.reset();
    }
  });
});

// METODO DELETE ALUMNOS
