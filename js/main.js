 // Reemplaza con tu URL
 const databaseURL = 'https://bd-dawm-3210b-default-rtdb.firebaseio.com/coleccion.json'; 

let sendData = () => {
    const form = document.getElementById("form"); // Referencia al formulario

    // Obtén los datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
    // new Date().toLocaleString( locales, options )
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })
    .then(result => {
        alert('¡Gracias por contactarnos! Hemos recibido tu información y te responderemos a la brevedad para brindarte la mejor asesoría contable y tributaria.'); // Maneja la respuesta con un mensaje
        form.reset()

        // Actualiza el contador
        getData()
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

let getData = async () => {
    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {
            let numero = Object.keys(data).length; // Cuenta los registros

            const cuenta_total = document.getElementById("contador_form");
            cuenta_total.innerHTML = numero; // Actualiza el contador en el DOM
        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }
 }

let ready = () => {
    console.log('DOM está listo');
    getData();
}

let loaded = (eventLoaded ) => {
    let myform = document.getElementById('form');
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault();
        // Obtiene los valores de cada campo
        const nombre = document.querySelector("#input-name").value;
        const email = document.querySelector("#input-email").value;
        const servicio = document.querySelector("select[name='service']").value;
        const mensaje = document.querySelector("textarea[name='message']").value;
        //Llamada a la función sendData()
     	sendData();
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)
