const cards = document.querySelectorAll('.card');
let currentAudio = null;
let currentCard = null;

/* =========================
   ANIMACIÓN AL HACER SCROLL
   ========================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

/* =========================
   CLICK + FLIP + MÚSICA
   ========================= */
cards.forEach(card => {
  card.addEventListener('click', () => {

    // VARIACIÓN 1:
    // Si haces click en la misma tarjeta abierta → se cierra
    if (currentCard === card && card.classList.contains('flip')) {
      stopAudio();
      card.classList.remove('flip');
      currentCard = null;
      return;
    }

    // Cerrar tarjeta anterior
    if (currentCard && currentCard !== card) {
      currentCard.classList.remove('flip');
      stopAudio();
    }

    // Abrir nueva tarjeta
    card.classList.add('flip');
    currentCard = card;

    // Cargar datos
    const audioSrc = card.dataset.audio;
    const title = card.dataset.title;
    const cover = card.dataset.cover;

    // Mostrar info
    card.querySelector('.song-title').textContent = title;
    card.querySelector('.album-cover').src = cover;

    // Reproducir audio
    currentAudio = new Audio(audioSrc);
    currentAudio.volume = 0.7;

    /* VARIACIÓN 2: FADE IN DE AUDIO */
    currentAudio.volume = 0;
    currentAudio.play();
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.05;
        currentAudio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);
  });
});

/* =========================
   FUNCIONES
   ========================= */
function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/* =========================
   ANIMACIÓN TEXTO FINAL
   ========================= */
const finalText = document.querySelector('.final-text');

if (finalText) {
  observer.observe(finalText);
}

/* =========================
   BOTÓN + GALERÍA EXTRA
   ========================= */
const extraButton = document.getElementById('extraButton');
const extraGallery = document.querySelector('.extra-gallery');
const extraAudio = document.getElementById('extraAudio');

if (extraButton) {
  extraButton.addEventListener('click', () => {

    // Mostrar galería
    extraGallery.classList.add('visible');

    // Parar cualquier música anterior
    stopAudio();

    // Reproducir nueva canción
    extraAudio.volume = 0;
    extraAudio.play();

    // Fade in audio
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.05;
        extraAudio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);

    // Desactivar botón
    extraButton.disabled = true;
    extraButton.style.opacity = '0.5';
    extraButton.textContent = 'Ahora ya lo has visto todo';
  });
}
