 // Reemplaza con tu URL
 const databaseURL = 'https://prueba-8edf3-default-rtdb.firebaseio.com/coleccion.json'; 

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
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

let ready = () => {
    console.log('DOM está listo')
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
