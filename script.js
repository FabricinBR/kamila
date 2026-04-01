const cards = document.querySelectorAll('.produto');
const inputPresente = document.getElementById('presente');
const form = document.getElementById('form-presente');
const modal = document.getElementById('modal-pix');
const fecharModal = document.getElementById('fechar-modal');
const resumoDoacao = document.getElementById('resumo-doacao');

const imagemFallback = 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80';

cards.forEach((card) => {
  const imagem = card.querySelector('img');

  if (!imagem) return;

  imagem.loading = 'lazy';

  imagem.addEventListener('error', () => {
    if (imagem.dataset.fallbackAplicado === 'true') return;

    imagem.dataset.fallbackAplicado = 'true';
    imagem.src = imagemFallback;
  });
});

let presenteSelecionado = '';
let valorSelecionado = '';

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((item) => item.classList.remove('selecionado'));
    card.classList.add('selecionado');

    presenteSelecionado = card.dataset.produto;
    valorSelecionado = card.dataset.valor;
    inputPresente.value = `${presenteSelecionado} - R$ ${valorSelecionado}`;
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  if (!nome || !presenteSelecionado) {
    alert('Preencha seu nome e selecione um presente.');
    return;
  }

  resumoDoacao.textContent = `${nome}, obrigado por presentear com ${presenteSelecionado} no valor de R$ ${valorSelecionado}.`;
  modal.classList.add('ativo');
  modal.setAttribute('aria-hidden', 'false');
});

fecharModal.addEventListener('click', () => {
  modal.classList.remove('ativo');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('ativo')) {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
  }
});
