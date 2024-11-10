 // Reemplaza con tu URL
 const databaseURL = 'https://bd-dawm-3210b-default-rtdb.firebaseio.com/coleccion.json'; 

let sendData = () => {
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
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()

        // Recuperación de datos
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

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            numero = 0;
            for (const clave in data) {
                numero++;
            }

            alert("Cantidad de subs: "+numero)
            // END

            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            const tbody = document.getElementById("subscribers");
            tbody.innerHTML = '';
            

            // Itera sobre los datos para construir las filas de la tabla
            Object.keys(data).forEach((key, index) => {
                const item = data[key];

                // Crea una nueva fila
                const row = document.createElement("tr");

                // Crea y agrega las celdas de la fila
                const cellIndex = document.createElement("td");
                cellIndex.textContent = index + 1;
                row.appendChild(cellIndex);

                const cellDay = document.createElement("td");
                cellDay.textContent = item.saved;
                row.appendChild(cellDay);

                const cellEmail = document.createElement("td");
                cellEmail.textContent = item.email;
                row.appendChild(cellEmail);

                // Añade la fila al tbody
                tbody.appendChild(row);
            });
            // END

        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }
 }

let ready = () => {
    console.log('DOM está listo');
    //getData();
}

let loaded = (eventLoaded ) => {
    let myform = document.getElementById('form');
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault();
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;
        if  (emailText.length === 0) {
            emailElement.focus()
            /*
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 10000,
                    easing: "linear",
                }
            )*/
            emailElement.animate(
                [
                    { transform: "translateX(0) rotate(0deg) scale(1)" },
                    { transform: "translateX(50px) rotate(10deg) scale(1.2)" },
                    { transform: "translateX(-50px) rotate(-10deg) scale(0.8)" },
                    { transform: "translateX(0) rotate(0deg) scale(1)" }
                ],
                {
                    duration: 100,
                    easing: "linear",
                    iterations: Infinity // Repite la animación indefinidamente
                }
            );
            return ;
        }

        //Llamada a la función sendData()
     	sendData();
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)
