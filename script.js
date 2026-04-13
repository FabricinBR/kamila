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
    ['Air Fryer Mondial Family AFN-40-BI 4L', 'a partir de R$ 353,31 no Pix.'],
    ['Liquidificador Mondial Turbo Glass L-1400 GI', 'R$ 218,41 no Pix.'],
    ['Cafeteira Elétrica Mondial Dolce Arome C-30-18X', 'R$ 116,99 no Pix.'],
    ['Cafeteira Elétrica Mondial Dolce Arome Thermo C-33JT-24X', 'R$ 260,39 no Pix.'],
    ['Grill e Sanduicheira Mondial Premium S-07', 'R$ 120,81 no Pix.'],
    ['Batedeira Prática Mondial B-44-B 400W', 'R$ 264,74.'],
    ['Pipoqueira Elétrica Mondial Popflix PP-04', 'R$ 244,90.'],
    ['Ferro a Vapor Mondial FVN-01-BL', 'R$ 116,91 no Pix.'],
    ['Panela de Pressão Elétrica Digital Mondial', 'R$ 379,05 no Pix.']
  ],
  'Cozinha e mesa': [
    ['Jogo de Panelas Tramontina Fundo Triplo 3 peças', 'R$ 323,10.'],
    ['Jogo de Panelas Tramontina Solar 6 peças', 'R$ 709,00.'],
    ['Jogo de Panelas Tramontina Allegra 5 peças', 'R$ 409,82.'],
    ['Kit Utensílios de Silicone Wincy 8 peças', 'R$ 169,90.'],
    ['Kit 10 Utensílios de Silicone para cozinha', 'R$ 127,00.'],
    ['Decanter Bohemia Fórum', 'R$ 159,99.'],
    ['Aparelho de Jantar Oxford Ryo Maresia 20 peças', 'a partir de R$ 309,00.']
  ],
  'Cama e banho': [
    ['Jogo de Cama Queen 4 Peças Naturalle', 'R$ 304,90.'],
    ['Jogo de Toalhas Buddemeyer Soul Extra Soft 5 peças', 'R$ 229,90.'],
    ['Travesseiro Buddemeyer Toque de Pluma 50x70 cm', 'R$ 119,90.'],
    ['Kit Edredom Jogo de Cama Dupla Face 6 peças Queen', 'R$ 218,49.'],
    ['Jogo de Toalhas Buddemeyer Fio Penteado Canelado Gigante 5 peças', 'R$ 399,90.'],
    ['Jogo de Toalhas Buddemeyer Florentina Extra Soft 5 peças', 'R$ 159,90.'],
    ['Jogo de Cama Queen 4 peças 200 fios Organique', 'R$ 351,90.'],
    ['Edredom Queen Nobre 1 peça dupla face', 'R$ 329,48.']
  ],
  'Lua de mel': [
    ['✈️ Passagens aéreas', 'R$ 300 a R$ 1.500 (cotas).'],
    ['🏨 Hospedagem (diárias)', 'R$ 250 a R$ 800.'],
    ['🚖 Transfer aeroporto/hotel', 'R$ 200 a R$ 400.'],
    ['💳 Ajuda geral para viagem', 'R$ 200 a R$ 1.000.'],
    ['🍷 Jantar romântico especial', 'R$ 200 a R$ 500.'],
    ['🍾 Noite com vinho/champagne', 'R$ 200 a R$ 400.'],
    ['🌅 Jantar à beira-mar', 'R$ 300 a R$ 600.'],
    ['🍳 Café da manhã especial no hotel', 'R$ 200 a R$ 350.']
  ]
};

const imagemFallback = 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80';
const imagensPorProduto = {
  'Air Fryer Mondial Family AFN-40-BI 4L':
    'https://images.unsplash.com/photo-1585515656973-3c2b3f978f29?auto=format&fit=crop&w=800&q=80',
  'Liquidificador Mondial Turbo Glass L-1400 GI':
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80',
  'Cafeteira Elétrica Mondial Dolce Arome C-30-18X':
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1f26b?auto=format&fit=crop&w=800&q=80',
  'Cafeteira Elétrica Mondial Dolce Arome Thermo C-33JT-24X':
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  'Grill e Sanduicheira Mondial Premium S-07':
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  'Batedeira Prática Mondial B-44-B 400W':
    'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=800&q=80',
  'Pipoqueira Elétrica Mondial Popflix PP-04':
    'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=800&q=80',
  'Ferro a Vapor Mondial FVN-01-BL':
    'https://images.unsplash.com/photo-1599510686580-0cb72c6f5876?auto=format&fit=crop&w=800&q=80',
  'Panela de Pressão Elétrica Digital Mondial':
    'https://images.unsplash.com/photo-1584990347449-ae3b35a4f2a8?auto=format&fit=crop&w=800&q=80',
  'Jogo de Panelas Tramontina Fundo Triplo 3 peças':
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
  'Jogo de Panelas Tramontina Solar 6 peças':
    'https://images.unsplash.com/photo-1584990347449-ae3b35a4f2a8?auto=format&fit=crop&w=800&q=80',
  'Jogo de Panelas Tramontina Allegra 5 peças':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
  'Kit Utensílios de Silicone Wincy 8 peças':
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80',
  'Kit 10 Utensílios de Silicone para cozinha':
    'https://images.unsplash.com/photo-1577048982768-5cb3f10f9f6f?auto=format&fit=crop&w=800&q=80',
  'Decanter Bohemia Fórum':
    'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80',
  'Aparelho de Jantar Oxford Ryo Maresia 20 peças':
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
  'Jogo de Cama Queen 4 Peças Naturalle':
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'Jogo de Toalhas Buddemeyer Soul Extra Soft 5 peças':
    'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80',
  'Travesseiro Buddemeyer Toque de Pluma 50x70 cm':
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
  'Kit Edredom Jogo de Cama Dupla Face 6 peças Queen':
    'https://images.unsplash.com/photo-1616594039964-3cf36f8d5d39?auto=format&fit=crop&w=800&q=80',
  'Jogo de Toalhas Buddemeyer Fio Penteado Canelado Gigante 5 peças':
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  'Jogo de Toalhas Buddemeyer Florentina Extra Soft 5 peças':
    'https://images.unsplash.com/photo-1600369672770-985fd300a37f?auto=format&fit=crop&w=800&q=80',
  'Jogo de Cama Queen 4 peças 200 fios Organique':
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
  'Edredom Queen Nobre 1 peça dupla face':
    'https://images.unsplash.com/photo-1616628182509-6fcb8c6f8d5d?auto=format&fit=crop&w=800&q=80',
  '✈️ Passagens aéreas':
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  '🏨 Hospedagem (diárias)':
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  '🚖 Transfer aeroporto/hotel':
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
  '💳 Ajuda geral para viagem':
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
  '🍷 Jantar romântico especial':
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  '🍾 Noite com vinho/champagne':
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  '🌅 Jantar à beira-mar':
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  '🍳 Café da manhã especial no hotel':
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80'
};
const cardImage = (nome) => imagensPorProduto[nome] || imagemFallback;
const PRECO_FIXO = 'R$ 200,00';

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

  catalogo[categoriaAtual].forEach(([nome]) => {
    const article = document.createElement('article');
    article.className = 'produto';
    article.dataset.produto = nome;
    article.dataset.valor = PRECO_FIXO;

    article.innerHTML = `
      <img src="${cardImage(nome)}" alt="${nome}" loading="lazy" />
      <h3>${nome}</h3>
      <p>${categoriaAtual}</p>
      <strong>${PRECO_FIXO}</strong>
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
