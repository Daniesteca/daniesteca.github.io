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

/* === CARRUSEL DINÁMICO + FILTROS === */
(function(){
  // selectores
  const filtros = document.querySelectorAll(".filtro-btn");
  const fuenteProyectos = document.querySelectorAll(".fuente-proyectos .proyecto");
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-nav.prev");
  const nextBtn = document.querySelector(".carousel-nav.next");
  const noResults = document.querySelector(".no-results");

  let slides = [];        // array con objetos {node, categories}
  let currentIndex = 0;
  let slideWidth = 0;
  let startX = 0, isDragging = false, currentTranslate = 0, prevTranslate = 0, animationID = 0;

  // inicializar: construir slides desde la fuente
  function buildSlidesArray(){
    slides = [];
    fuenteProyectos.forEach(p => {
      const img = p.querySelector("img")?.getAttribute("src") ?? "";
      const title = p.querySelector(".overlay h3")?.textContent?.trim() ?? "";
      const desc = Array.from(p.querySelectorAll(".overlay p")).map(x => x.textContent.trim()).join(" ");
      const linkEl = p.querySelector(".overlay .nav_links");
      const link = linkEl ? linkEl.getAttribute("href") : null;
      const categories = (p.dataset.category || "").split(/\s+/).filter(Boolean);
      slides.push({ img, title, desc, link, categories });
    });
  }

  function clearTrack(){ track.innerHTML = ""; }

  function renderCarousel(items){
    clearTrack();
    if(items.length === 0){
      noResults.classList.remove("hidden");
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    } else {
      noResults.classList.add("hidden");
    }

    items.forEach(it => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const img = document.createElement("img");
      img.src = it.img;
      img.alt = it.title;

      const content = document.createElement("div");
      content.className = "slide-content";

      const h3 = document.createElement("h3");
      h3.textContent = it.title;

      const p = document.createElement("p");
      p.textContent = it.desc;

      content.appendChild(h3);
      content.appendChild(p);

      if(it.link){
        const a = document.createElement("a");
        a.href = it.link;
        a.target = "_blank";
        a.className = "nav_links";
        a.innerHTML = '<i class="fa-brands fa-github"></i> Repo en GitHub';
        content.appendChild(a);
      }

      slide.appendChild(img);
      slide.appendChild(content);
      track.appendChild(slide);
    });

    // actualizar medidas y botones
    currentIndex = 0;
    updateSlideWidth();
    updateButtons(items.length);
    goToSlide(0, false);
  }

  function updateSlideWidth(){
    const slideNode = track.querySelector(".carousel-slide");
    slideWidth = slideNode ? slideNode.getBoundingClientRect().width + parseInt(getComputedStyle(track).gap || 18) : 0;
  }

  function goToSlide(index, animate = true){
    const maxIndex = Math.max(0, track.children.length - 1);
    currentIndex = Math.min(Math.max(0, index), maxIndex);
    const x = -currentIndex * slideWidth;
    if(!animate) track.style.transition = "none";
    else track.style.transition = "";
    track.style.transform = `translateX(${x}px)`;
    if(!animate) requestAnimationFrame(()=> track.style.transition = "");
    updateButtons(track.children.length);
  }

  function updateButtons(length){
    // deshabilitar si no hay scroll
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= length - 1;
  }

  // filtrado: devuelve items que coinciden con filtro
  function applyFilter(filter){
    const filtered = slides.filter(s => {
      if(filter === "all") return true;
      return s.categories.includes(filter);
    });
    renderCarousel(filtered);
  }

  // eventos filtros
  filtros.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filtro-btn.active").classList.remove("active");
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  // navegación
  prevBtn.addEventListener("click", ()=> goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", ()=> goToSlide(currentIndex + 1));

  // teclado (izq/der)
  window.addEventListener("keydown", (e)=>{
    if(e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    if(e.key === "ArrowRight") goToSlide(currentIndex + 1);
  });

  // SWIPE básico (touch)
  track.addEventListener("touchstart", touchStart);
  track.addEventListener("touchmove", touchMove);
  track.addEventListener("touchend", touchEnd);

  function touchStart(e){
    startX = e.touches[0].clientX;
    isDragging = true;
    prevTranslate = -currentIndex * slideWidth;
  }
  function touchMove(e){
    if(!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    track.style.transform = `translateX(${prevTranslate + diff}px)`;
  }
  function touchEnd(e){
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const moved = endX - startX;
    const threshold = slideWidth * 0.15;
    if(moved > threshold) goToSlide(currentIndex - 1);
    else if(moved < -threshold) goToSlide(currentIndex + 1);
    else goToSlide(currentIndex);
  }

  // recalcular al resize
  window.addEventListener("resize", ()=> {
    updateSlideWidth();
    goToSlide(currentIndex, false);
  });

  // Inicializar todo
  function init(){
    buildSlidesArray();
    // por defecto renderizamos todos (all)
    renderCarousel(slides);
  }

  init();

})();
