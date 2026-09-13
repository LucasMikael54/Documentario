const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

let currentIndex = 0;
const gap = 20; // O mesmo gap definido no CSS

function moveCarousel(index) {
  const cardWidth = cards[0].getBoundingClientRect().width;
  
  // Calcula o deslocamento levando em consideração a largura do card e o espaçamento
  const amountToMove = (cardWidth + gap) * index;
  track.style.transform = `translateX(-${amountToMove}px)`;
  
  currentIndex = index;
}

nextButton.addEventListener('click', () => {
  // Descobre quantos cards cabem na tela atualmente
  const cardsInView = Math.round(track.parentElement.clientWidth / cards[0].clientWidth);
  
  let index = currentIndex + 1;
  // Se chegar ao limite de cards restantes, volta para o começo
  if (index > cards.length - cardsInView) {
    index = 0;
  }
  moveCarousel(index);
});

prevButton.addEventListener('click', () => {
  const cardsInView = Math.round(track.parentElement.clientWidth / cards[0].clientWidth);
  
  let index = currentIndex - 1;
  if (index < 0) {
    index = cards.length - cardsInView;
  }
  moveCarousel(index);
});

// Gira sozinho automaticamente a cada 10 segundos (10000ms)
let autoSlide = setInterval(() => {
  nextButton.click();
}, 10000);

// Reinicia o tempo se o usuário clicar manualmente nos botões (evita bugs de clique duplo)
function resetTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    nextButton.click();
  }, 10000);
}

nextButton.addEventListener('click', resetTimer);
prevButton.addEventListener('click', resetTimer);

// Ajusta o cálculo caso o usuário mude o tamanho da janela do navegador
window.addEventListener('resize', () => {
  moveCarousel(0);
});

