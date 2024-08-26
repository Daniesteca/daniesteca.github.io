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
        habilidades[2].classList.add("python");
        habilidades[3].classList.add("mysql");
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

//Descarga cv

const downloadButton = document.querySelector('btn-descargar-cv');

downloadButton.addEventListener('click', () => {
    // Reemplaza 'tu-cv.pdf' con la ruta correcta de tu CV
    const cvLink = 'doc/cv.pdf';

    // Crea un enlace temporal
    const link = document.createElement('a');
    link.href = cvLink;
    link.download = 'cv.pdf'; // Nombre del archivo al descargar

    // Simula un clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});