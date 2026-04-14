const inputPresente = document.getElementById('presente');
const form = document.getElementById('form-presente');
const modal = document.getElementById('modal-pix');
const fecharModal = document.getElementById('fechar-modal');
const resumoDoacao = document.getElementById('resumo-doacao');
const produtosContainer = document.getElementById('produtos');
const abas = document.querySelectorAll('.aba');
const contadorTotal = document.getElementById('contador-total');
const listaEscolhidos = document.getElementById('lista-escolhidos');
const dadosPagamento = document.getElementById('dados-pagamento');

const catalogo = {
  'Eletroportáteis': [
    ['Liquidificador', 200],
    ['Cafeteira', 250],
    ['Micro-ondas', 600],
    ['Air Fryer', 400]
  ],
  'Cozinha e mesa': [
    ['Taças de vinho', 200],
    ['Tábua de frios', 630],
    ['Jogo americano', 178],
    ['Saleiro', 148],
    ['Utensílios inox dourado', 239],
    ['Utensílios de cozinha', 150],
    ['Açucareiro', 100],
    ['Porta manteiga', 156],
    ['Conjunto de jantar', 145],
    ['Faqueiro 91 peças', 370]
  ],
  'Cama e banho': [
    ['Jogo de cama', 200],
    ['Jogo de toalhas', 190]
  ],
  'Lua de mel': [
    ['Passeio de barco', 500],
    ['Spa para casal', 300],
    ['Passagens', 800],
    ['Diária de hotel', 300]
  ]
};

const imagemFallback = 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80';
const imagensPorProduto = {
  Liquidificador:
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
  Cafeteira:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  'Micro-ondas':
    'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
  'Air Fryer':
    'https://images.unsplash.com/photo-1585515656973-3c2b3f978f29?auto=format&fit=crop&w=800&q=80',
  'Taças de vinho':
    'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80',
  'Tábua de frios':
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'Jogo americano':
    'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80',
  Saleiro:
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  'Utensílios inox dourado':
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  'Utensílios de cozinha':
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  Açucareiro:
    'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=800&q=80',
  'Porta manteiga':
    'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
  'Conjunto de jantar':
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
  'Faqueiro 91 peças':
    'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=800&q=80',
  'Jogo de cama':
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'Jogo de toalhas':
    'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80',
  'Passeio de barco':
    'https://images.unsplash.com/photo-1562281302-809108fd533c?auto=format&fit=crop&w=800&q=80',
  'Spa para casal':
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  Passagens:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  'Diária de hotel':
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
};
const cardImage = (nome) => imagensPorProduto[nome] || imagemFallback;
const formatarPreco = (valor) =>
  `R$ ${Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

let presenteSelecionado = '';
let valorSelecionado = '';
let categoriaAtual = 'Eletroportáteis';
const presentesConfirmados = {};
let totalEscolhas = 0;

function renderizarContabilizador() {
  contadorTotal.textContent = `Total de escolhas: ${totalEscolhas}`;
  listaEscolhidos.innerHTML = '';

  Object.entries(presentesConfirmados)
    .sort(([, infoA], [, infoB]) => infoB.quantidade - infoA.quantidade)
    .forEach(([nomePresente, info]) => {
      const detalhes = info.confirmacoes
        .map(({ nomeConvidado, valor }) => `${nomeConvidado} (${valor})`)
        .join(' • ');

      const item = document.createElement('li');
      item.textContent = `${nomePresente} — ${info.quantidade} escolha${info.quantidade > 1 ? 's' : ''} | Confirmado por: ${detalhes}`;
      listaEscolhidos.appendChild(item);
    });
}

function fecharModalPix() {
  modal.classList.remove('ativo');
  modal.setAttribute('aria-hidden', 'true');
}

function abrirModalPix() {
  modal.classList.add('ativo');
  modal.setAttribute('aria-hidden', 'false');
}

function montarCards() {
  produtosContainer.innerHTML = '';

  catalogo[categoriaAtual].forEach(([nome, valor]) => {
    const valorFormatado = formatarPreco(valor);
    const article = document.createElement('article');
    article.className = 'produto';
    article.dataset.produto = nome;
    article.dataset.valor = valorFormatado;

    article.innerHTML = `
      <img src="${cardImage(nome)}" alt="${nome}" loading="lazy" />
      <h3>${nome}</h3>
      <p>${categoriaAtual}</p>
      <strong>${valorFormatado}</strong>
    `;

    const imagem = article.querySelector('img');
    imagem.addEventListener('error', () => {
      if (imagem.dataset.fallbackAplicado === 'true') return;
      imagem.dataset.fallbackAplicado = 'true';
      imagem.src = imagemFallback;
    });

    article.addEventListener('click', () => {
      document.querySelectorAll('.produto').forEach((item) => item.classList.remove('selecionado'));
      article.classList.add('selecionado');

      presenteSelecionado = article.dataset.produto;
      valorSelecionado = article.dataset.valor;
      inputPresente.value = `${presenteSelecionado} - ${valorSelecionado}`;
      dadosPagamento.classList.remove('oculto');
    });

    produtosContainer.appendChild(article);
  });
}

abas.forEach((aba) => {
  aba.addEventListener('click', () => {
    abas.forEach((item) => {
      item.classList.remove('ativa');
      item.setAttribute('aria-selected', 'false');
    });

    aba.classList.add('ativa');
    aba.setAttribute('aria-selected', 'true');
    categoriaAtual = aba.dataset.categoria;
    presenteSelecionado = '';
    valorSelecionado = '';
    inputPresente.value = '';
    dadosPagamento.classList.add('oculto');
    montarCards();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();

  if (!nome || !presenteSelecionado) {
    alert('Preencha seu nome e selecione um presente.');
    return;
  }

  resumoDoacao.textContent = `${nome}, obrigado por presentear com ${presenteSelecionado} no valor de ${valorSelecionado}`;
  abrirModalPix();

  if (!presentesConfirmados[presenteSelecionado]) {
    presentesConfirmados[presenteSelecionado] = {
      quantidade: 0,
      confirmacoes: []
    };
  }

  presentesConfirmados[presenteSelecionado].quantidade += 1;
  presentesConfirmados[presenteSelecionado].confirmacoes.push({
    nomeConvidado: nome,
    valor: valorSelecionado
  });

  totalEscolhas += 1;
  renderizarContabilizador();
});

fecharModal.addEventListener('click', fecharModalPix);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    fecharModalPix();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('ativo')) {
    fecharModalPix();
  }
});

montarCards();
renderizarContabilizador();
