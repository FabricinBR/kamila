const cards = document.querySelectorAll('.produto');
const inputPresente = document.getElementById('presente');
const form = document.getElementById('form-presente');
const modal = document.getElementById('modal-pix');
const fecharModal = document.getElementById('fechar-modal');
const resumoDoacao = document.getElementById('resumo-doacao');


const categoriaImagem = {
  'Jogo de Panelas': 'cookware kitchen',
  'Air Fryer': 'air fryer kitchen appliance',
  'Geladeira': 'refrigerator kitchen',
  'Micro-ondas': 'microwave oven kitchen',
  'Máquina de Lavar': 'washing machine laundry',
  'Cafeteira': 'coffee maker kitchen',
  'Aparelho de Jantar': 'dinnerware table set',
  'Conjunto de Cama': 'bed linens bedroom',
  'Conjunto de Toalhas': 'bath towels',
  'Smart TV': 'smart tv living room',
  'Jantar Romântico': 'romantic dinner table',
  'Noite de Hotel': 'hotel room'
};

cards.forEach((card) => {
  const imagem = card.querySelector('img');
  const nomeProduto = card.dataset.produto || '';
  const busca = categoriaImagem[nomeProduto] || nomeProduto;

  if (imagem && busca) {
    imagem.src = `https://source.unsplash.com/800x600/?${encodeURIComponent(busca)}`;
  }
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
