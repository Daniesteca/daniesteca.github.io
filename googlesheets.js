const scriptURL ='https://script.google.com/macros/s/AKfycbyAgyNS_EmxMxyxf5lI20cC0qiuERbFfYW_5kYFDsauOKIpQCJHIVSU1PKrfR_HHhiICw/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e =>{
    e.preventDefault()
    fetch(scriptURL, {method:'POST', body: new FormData(form)})
    .then(response => alert("Mensaje enviado con exito."))
    .then(()=> { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})
