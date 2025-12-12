
// Items visibles actualmente en el carrusel
let currentItems = [];

let menuVisible = false;

//funcion que oculta o muestra el menu

function mostrarOcultarMenu(){
    if (menuVisible){
        document.getElementById("nav").classList="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList="responsive";
        menuVisible = true;
    }
}
//oculto menu una vez selecciono una opcion
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
//Detecto scrolling para aplicar la animacion de la barra de habilidades
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


  /* === CARRUSEL + FILTROS + TAMAÑO FIJO === */
(function () {
    const track = document.getElementById("carouselTrack");
    const filtros = document.querySelectorAll(".filtro-btn");
    const fuenteProyectos = document.querySelectorAll(".fuente-proyectos .carousel-card");
    const prevBtn = document.querySelector(".carousel-nav.prev");
    const nextBtn = document.querySelector(".carousel-nav.next");
    const noResults = document.querySelector(".no-results");

    let slides = [];
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 3;
    let autoSlideInterval;

    /* -----------------------------------
       EXTRAER SLIDES DESDE FUENTE
    ----------------------------------- */
    function buildSlides() {
        slides = Array.from(fuenteProyectos).map(p => ({
            img: p.querySelector("img")?.src ?? "",
            title: p.querySelector(".overlay h3")?.textContent.trim() ?? "",
            desc: Array.from(p.querySelectorAll(".overlay p"))
                .map(x => x.textContent.trim()).join(" "),
            link: p.querySelector(".overlay .nav_links")?.href ?? null,
            categories: (p.dataset.category || "").split(/\s+/).filter(Boolean)
        }));
    }

    /* -----------------------------------
       RENDERIZAR TARJETAS EN EL CARRUSEL
    ----------------------------------- */
    function renderCarousel(items) {
        track.innerHTML = "";

        if (items.length === 0) {
            noResults.classList.remove("hidden");
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        noResults.classList.add("hidden");

        items.forEach(it => {
            const card = document.createElement("div");
            card.className = "carousel-card";

            card.innerHTML = `
                <img src="${it.img}" alt="${it.title}">
                <div class="slide-content">
                    <h3>${it.title}</h3>
                    <p>${it.desc}</p>
                    ${
                        it.link
                        ? `<a href="${it.link}" target="_blank" class="nav_links">
                              <i class="fa-brands fa-github"></i> Repo en GitHub
                           </a>`
                        : ""
                    }
                </div>
            `;
            track.appendChild(card);
        });

        currentIndex = 0;

        updateSizes();
        updateButtons(items.length);
        goTo(0);
        restartAutoSlide();
        currentItems = items;
    }

    /* -----------------------------------
       FIJAR TAMAÑOS Y CENTRAR SI HAY 1-2
    ----------------------------------- */
    function updateSizes() {
        const cards = track.querySelectorAll(".carousel-card");
        if (cards.length === 0) return;

        cards.forEach(card => {
            card.style.minWidth = "300px";
            card.style.maxWidth = "300px";
            card.style.height = "380px";
        });

        cardWidth = 300 + 20; // ancho + gap
        cardsPerView = 3;

        track.style.width = `${cardsPerView * cardWidth}px`;

        if (cards.length === 1) {
            track.style.justifyContent = "center";
        } else if (cards.length === 2) {
            track.style.justifyContent = "center";
        } else {
            track.style.justifyContent = "flex-start";
        }
    }

    /* -----------------------------------
       NUEVA POSICIÓN DEL CARRUSEL
    ----------------------------------- */
    function goTo(i) {
        const total = track.children.length;
        const maxIndex = Math.max(0, total - cardsPerView);

        currentIndex = Math.max(0, Math.min(i, maxIndex));

        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateButtons(total);
    }

    function updateButtons(total) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= total - cardsPerView;
    }

    /* -----------------------------------
       APLICAR FILTRO
    ----------------------------------- */
    function applyFilter(filter) {
        const result =
            filter === "all"
                ? slides
                : slides.filter(s => s.categories.includes(filter));

        renderCarousel(result);
    }

    filtros.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filtro-btn.active")?.classList.remove("active");
            btn.classList.add("active");
            applyFilter(btn.dataset.filter);
        });
    });

    /* -----------------------------------
       NAVEGACIÓN MANUAL
    ----------------------------------- */
    prevBtn.onclick = () => goTo(currentIndex - 1);
    nextBtn.onclick = () => goTo(currentIndex + 1);

    /* -----------------------------------
       AUTO-SLIDE
    ----------------------------------- */
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const total = track.children.length;
            const maxIndex = Math.max(0, total - cardsPerView);

            if (currentIndex >= maxIndex) {
                goTo(0);
            } else {
                goTo(currentIndex + 1);
            }
        }, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    document.querySelector(".carousel-container").addEventListener("mouseenter", stopAutoSlide);
    document.querySelector(".carousel-container").addEventListener("mouseleave", startAutoSlide);

    /* -----------------------------------
       SWIPE EN MÓVIL
    ----------------------------------- */
    let startX = 0;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", e => {
        let dx = e.changedTouches[0].clientX - startX;

        if (dx > 50) goTo(currentIndex - 1);
        if (dx < -50) goTo(currentIndex + 1);

        restartAutoSlide();
    });

    /* -----------------------------------
       RESIZE
    ----------------------------------- */
    window.addEventListener("resize", () => {
        updateSizes();
        goTo(currentIndex);
    });

    /* -----------------------------------
   CLICK EN TARJETAS → ABRIR POPUP
    ----------------------------------- */

    track.addEventListener("click", function (e) {
    const card = e.target.closest(".carousel-card");
    if (!card) return;

    const nodes = Array.from(track.children);
    const index = nodes.indexOf(card);
    if (index < 0 || !currentItems[index]) return;

    stopAutoSlide?.();
    abrirPopup(currentItems, index);
});

    /* -----------------------------------
       INIT
    ----------------------------------- */
    function init() {
        buildSlides();
        renderCarousel(slides);
        startAutoSlide();
    }

    init();
    
})();



/* ============================================================
   POPUP DE DETALLE + NAVEGACIÓN ENTRE PROYECTOS (ADAPTADO)
   ============================================================ */

const popup = document.getElementById("popupProyecto");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupLink = document.getElementById("popupLink");
const popupCloseBtn = document.querySelector(".popup-close");

const btnPrev = document.querySelector(".popup-prev");
const btnNext = document.querySelector(".popup-next");

let popupIndex = 0;           // índice del proyecto dentro de currentItems
let popupItems = [];          // array actual del carrusel (filtrado o no)

/* Mostrar proyecto según índice */
function mostrarProyecto(i) {
    const p = popupItems[i];
    if (!p) return;

    popupImg.src = p.img;
    popupTitle.textContent = p.title;
    popupDesc.textContent = p.desc;
    popupLink.href = p.link ?? "#";
}

/* Abrir popup: recibe (array, índice) */
function abrirPopup(items, index) {
    popupItems = items;
    popupIndex = index;

    mostrarProyecto(popupIndex);

    popup.classList.remove("hidden");
    popup.classList.add("active");
}

/* Navegación dentro del popup */
btnPrev.addEventListener("click", () => {
    popupIndex = (popupIndex - 1 + popupItems.length) % popupItems.length;
    mostrarProyecto(popupIndex);
});

btnNext.addEventListener("click", () => {
    popupIndex = (popupIndex + 1) % popupItems.length;
    mostrarProyecto(popupIndex);
});

/* Cerrar */
function cerrarPopup() {
    popup.classList.remove("active");
    popup.classList.add("hidden");
}

if (popupCloseBtn) popupCloseBtn.addEventListener("click", cerrarPopup);

popup.addEventListener("click", (e) => {
    if (e.target === popup) cerrarPopup();
});
