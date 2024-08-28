let menuVisible = false;
//funcion que ocultya o muestra el menu

function mostrarOcultarMenu(){
    if (menuVisible){
        document.getElementById("nav").classList="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto menu una vez selecciono una opcion
    document.getElementById("nav").classList="";
    menuVisible = false;
}

//funcion para aplicar las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("htmlcss");
        habilidades[1].classList.add("javascript");
        habilidades[2].classList.add("mysql");
        habilidades[3].classList.add("python");
        habilidades[4].classList.add("comunicacion");
        habilidades[5].classList.add("trabajoequipo");
        habilidades[6].classList.add("creatividad");
        habilidades[7].classList.add("dedicacion");
    }
}
//detecto scrolling para aplicar la animacion de la barra de habilidades
window.onscroll =function(){
    efectoHabilidades();
}


//copiar email

function copiarEmail(){
    let email=document.getElementById("emailText");
    let button=document.getElementById("botonCopiar");

    navigator.clipboard.writeText(email.textContent);
    button.textContent='Copiado';
}

//descargar cv
function abrirEnNuevaPestaña() {
    
    window.open('https://www.canva.com/design/DAGPJB4DYwM/I5X3It_i4xrTCKvdo3Oq6w/view?utm_content=DAGPJB4DYwM&utm_campaign=designshare&utm_medium=link&utm_source=editor', '_blank');
  }