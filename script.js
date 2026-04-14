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
    'https://drive.google.com/file/d/1geUf3tLHUdM74nhrQlanZqJb5C9_znog/view?usp=sharing',
  Cafeteira:
    'https://drive.google.com/file/d/1-bPc1b_F5_tQvw19WOol92hjjeiA3FRT/view?usp=sharing',
  'Micro-ondas':
    'https://drive.google.com/file/d/1jdsgskSUrOZQSsREPpunLGXa2DZqEB5e/view?usp=sharing',
  'Air Fryer':
    'https://drive.google.com/file/d/1WZPQPegaTCr5iKHJKh5JKPDs0_Cjqz1s/view?usp=sharing',
  'Taças de vinho':
    'https://drive.google.com/file/d/1JqgDMPTeTE3fS6QB8FPKmkQQzAPgwxIx/view?usp=sharing',
  'Tábua de frios':
    'https://drive.google.com/file/d/1WfkVb-Rsym1ZAJo3BfI-XtrTby_yw_p7/view?usp=sharing',
  'Jogo americano':
    'https://drive.google.com/file/d/1whUDHL92mub43Or82KpMAG3R8sAWNYt1/view?usp=sharing',
  Saleiro:
    'https://drive.google.com/file/d/1NYFKKIto2Fzp5W09rkn3qJpsg9ZjkkH7/view?usp=sharing',
  'Utensílios inox dourado':
    'https://drive.google.com/file/d/1N8REmjLAaEAp7igEgio6gbUDwhuJvN5M/view?usp=sharing',
  'Utensílios de cozinha':
    'https://drive.google.com/file/d/1iuFIwKWxLEgoHMh4u8CrdglNjO-8Lub0/view?usp=sharing',
  Açucareiro:
    'https://drive.google.com/file/d/1rzosNqkC_eK3RaG6KqGRWf1msWsfi3hp/view?usp=sharing',
  'Porta manteiga':
    'https://drive.google.com/file/d/1nsfThvI1XK7eJ9X1rHyfHpRnKQWrxU6N/view?usp=sharing',
  'Conjunto de jantar':
    'https://drive.google.com/file/d/1wQ5a8OA9eKi3XYo489QFU5vSOV0cmL8U/view?usp=sharing',
  'Faqueiro 91 peças':
    'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=800&q=80',
  'Jogo de cama':
    'https://drive.google.com/file/d/144ABHpj2Ec96XahsLvj3a4k84wzbnFLG/view?usp=sharing',
  'Jogo de toalhas':
    'https://drive.google.com/file/d/1iF2TsrwX3YPoTiWyb5AOSnr5JY_eoIVJ/view?usp=sharing',
  'Passeio de barco':
    'https://drive.google.com/file/d/1ZFCIGwA_2eXCuta8Xj8z5eZmlua6nnnm/view?usp=sharing',
  'Spa para casal':
    'https://drive.google.com/file/d/1PKkbR91jPCtckJ0gSvKk2mPopFneGBwz/view?usp=sharing',
  Passagens:
    'https://drive.google.com/file/d/1bQiBR7vVmz9wp2qAoe4pi1O-7DwwcKB5/view?usp=sharing',
  'Diária de hotel':
    'https://drive.google.com/file/d/1MIlAUL87_XsixaQc2UpdbNkoirb2Srcd/view?usp=sharing',
  'Jantar romântico':
    'https://drive.google.com/file/d/1csUpdoGuhddbX9vfU2xlfP_M2-MLOO_x/view?usp=sharing',
};

function urlDriveParaImagem(url) {
  if (!url || typeof url !== 'string') return '';
  if (!url.includes('drive.google.com')) return url;

  const matchById = url.match(/[?&]id=([^&]+)/);
  const matchByPath = url.match(/\/file\/d\/([^/]+)/);
  const fileId = matchById?.[1] || matchByPath?.[1];

  if (!fileId) return url;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}

const cardImage = (nome) => urlDriveParaImagem(imagensPorProduto[nome]) || imagemFallback;
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
