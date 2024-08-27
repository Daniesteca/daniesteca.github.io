const scriptURL ='https://script.google.com/macros/s/AKfycbyAgyNS_EmxMxyxf5lI20cC0qiuERbFfYW_5kYFDsauOKIpQCJHIVSU1PKrfR_HHhiICw/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e =>{
    e.preventDefault()
    fetch(scriptURL, {method:'POST', body: new FormData(form)})
    .then(response => alert("Mensaje enviado con exito."))
    .then(()=> { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})

// // Obtener la fecha y hora actual
// const fechaHora = new Date();
// // Formatear la fecha y hora como quieras (ejemplo: YYYY-MM-DD HH:mm:ss)
// const fechaHoraFormateada = fechaHora.toISOString();

// // Asignar la fecha y hora formateada al campo oculto
// document.getElementById('fechaHora').value = fechaHoraFormateada;

const fechaHora = new Date();

const año = fechaHora.getFullYear();
const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
const dia = fechaHora.getDate().toString().padStart(2, '0');
const fechaFormateada = `${año}-${mes}-${dia}`;
document.getElementById('fecha').value = fechaFormateada;

const horas = fechaHora.getHours().toString().padStart(2, '0');
const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
const segundos = fechaHora.getSeconds().toString().padStart(2, '0');
const   
 horaFormateada = `${horas}:${minutos}:${segundos}`;
document.getElementById('hora').value = horaFormateada;