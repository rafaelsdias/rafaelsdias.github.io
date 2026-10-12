// Fonte única dos projetos. Cada projeto aponta só para as próprias pastas em assets/img (ou assets/video).
// Nenhuma pasta aparece em mais de um projeto; site.js confere isso ao carregar (veja checarManifesto).

window.CONTATO = {
  nome: 'Rafael Dias',
  email: 'dias.rafael@outlook.com',
  telefone: '(11) 98144-5826',
  whatsapp: 'https://wa.me/5511981445826?text=' + encodeURIComponent('Olá, Rafael! Vi seu portfólio e gostaria de conversar.'),
  behance: 'https://be.net/diasrafael',
  linkedin: 'https://www.linkedin.com/in/rafaeldias-designer/',
  cidade: 'Santo André · SP',
  curriculo: 'assets/cv/rafael-dias-curriculo.pdf' // gerado por tools/gerar-curriculo.sh
};

window.CATEGORIAS = [
  ['branding', 'Branding'],
  ['social', 'Social media'],
  ['youtube', 'YouTube'],
  ['video', 'Vídeo'],
  ['foto', 'Fotografia'],
  ['web', 'Web']
];

const faixa = (de, ate, pular = []) => {
  const r = [];
  for (let i = de; i <= ate; i++) if (!pular.includes(i)) r.push('instagram/' + String(i).padStart(2, '0'));
  return r;
};

window.PROJETOS = [
  {
    id: 'bluebank',
    titulo: 'BlueBank', destaque: 'Identidade visual',
    resumo: 'Identidade visual e manual de marca para um banco digital.',
    cat: 'branding', ano: '2025', cliente: 'BlueBank',
    papel: 'Designer responsável da equipe (Analista de Design Gráfico Sênior)',
    entregas: ['Logotipo e símbolo', 'Paleta e tipografia', 'Grid e direção de fotografia', 'App e social', 'Papelaria e brindes', 'Mídia exterior'],
    capa: { src: 'bluebank/manual/21' },
    tema: 'claro',
    capitulos: [
      { tipo: 'texto', titulo: 'O projeto',
        texto: [
          'No BlueBank, desenvolvi a identidade visual e o manual de marca, conduzi a direção de arte dos materiais e orientei a equipe de design para manter o padrão e a unidade visual da marca em todos os pontos de contato.',
          'O símbolo radial e o azul intenso são o centro do sistema. A partir deles, o manual define construção do logotipo, paleta, a dupla tipográfica Source Sans 3 e Source Serif 4, grid, direção de fotografia e as aplicações, do aplicativo ao metrô.'
        ] },
      { tipo: 'manual', titulo: 'Manual de marca', pasta: 'bluebank/manual', nota: 'Versão resumida do manual' }
    ]
  },
  {
    id: 'a-casa-ink',
    titulo: 'A Casa Ink', destaque: 'Marca e redes sociais',
    resumo: 'Brandbook e templates de carrossel para um estúdio de tatuagem em São Paulo.',
    cat: 'branding', cats: ['branding', 'social'], ano: '2025', cliente: 'A Casa Ink · Tattoo Studio',
    papel: 'Identidade visual, brandbook e templates para Instagram',
    entregas: ['Logotipo e versões', 'Tipografia Raleway e Unna', 'Paleta CMYK', 'Papelaria e embalagens', 'Vestuário', 'Templates de carrossel'],
    capa: { src: 'casa-ink/manual/04' },
    tema: 'escuro',
    capitulos: [
      { tipo: 'texto', titulo: 'O projeto',
        texto: [
          'Um projeto só, com duas entregas que se completam: o brandbook da marca e os templates de carrossel que levam essa marca para o Instagram do estúdio.',
          'A moldura quadrada aberta do logotipo vira o elemento que assina fotos, peças e embalagens. A paleta parte do CMYK, as cores da tinta, sobre preto e branco, com manchas de tinta como textura de aplicação.'
        ] },
      { tipo: 'manual', titulo: 'Capítulo 1 · Brandbook', pasta: 'casa-ink/manual', nota: '39 páginas' },
      { tipo: 'carrosseis', titulo: 'Capítulo 2 · Templates de carrossel', pastas: ['casa-ink/carrossel-01', 'casa-ink/carrossel-02'],
        legendas: ['Carrossel "Como cuidar da sua nova tattoo"', 'Carrossel 2'] }
    ]
  },
  {
    id: 'camila-rezende',
    titulo: 'Camila Rezende', destaque: 'Nutrição',
    resumo: 'Landing page conceitual para nutricionista, com foco em agendamento pelo WhatsApp.',
    cat: 'web', ano: '2026', cliente: 'Projeto conceitual',
    papel: 'Design, copy e desenvolvimento',
    entregas: ['Landing page responsiva', '8 seções', 'CTA para WhatsApp', 'Publicada no GitHub Pages'],
    capa: { src: 'camila/desktop-hero', w: 1440, h: 900, arquivo: true },
    tema: 'claro',
    capitulos: [
      { tipo: 'texto', titulo: 'O projeto',
        texto: [
          'Projeto conceitual de landing page para uma nutricionista que atende mulheres cansadas de dietas restritivas. A página conduz do problema ao método, apresenta a profissional, explica o acompanhamento e termina num convite direto para conversar pelo WhatsApp.',
          'Hero com proposta de valor, identificação com a dor, método em três pilares, bio, processo em quatro etapas, depoimentos, perguntas frequentes e CTA final. Tudo pensado primeiro para o celular.'
        ] },
      { tipo: 'web', titulo: 'A página', link: 'https://rafaelsdias.github.io/camila-rezende-nutricao/',
        desktop: { src: 'camila/desktop-full', w: 1200, h: 3734 }, mobile: { src: 'camila/mobile-full', w: 500, h: 6600 } }
    ]
  },
  {
    id: 'cm-capital-social',
    titulo: 'CM Capital', destaque: 'Social media',
    resumo: 'Posts e carrosséis de Instagram para uma corretora de investimentos.',
    cat: 'social', ano: '2019–2023', cliente: 'CM Capital Markets',
    papel: 'Criação de peças para redes sociais (Analista de Design Gráfico Pleno II)',
    entregas: ['Carrosséis educativos', 'Posts de produto', 'Datas e calendário', 'Conteúdo editorial'],
    capa: { src: 'instagram/14/01' },
    tema: 'claro',
    capitulos: [{ tipo: 'posts', titulo: 'Posts e carrosséis', pastas: faixa(1, 28, [21]) }]
  },
  {
    id: 'master-social',
    titulo: 'Master Corretora', destaque: 'Social media',
    resumo: 'Posts e carrosséis de Instagram, do lançamento da corretora ao conteúdo para traders.',
    cat: 'social', ano: '2023–2025', cliente: 'Master Corretora',
    papel: 'Criação de peças para redes sociais',
    entregas: ['Lançamento da marca', 'Carrosséis educativos', 'Produto e plataforma', 'Datas comemorativas'],
    capa: { src: 'instagram/30/01' },
    tema: 'escuro',
    capitulos: [{ tipo: 'posts', titulo: 'Posts e carrosséis', pastas: faixa(29, 38) }]
  },
  {
    id: 'thumbnails-youtube',
    titulo: 'Thumbnails', destaque: 'YouTube',
    resumo: 'Thumbnails para os canais da CM Capital no YouTube, como o Giro da CM.',
    cat: 'youtube', ano: '2019–2023', cliente: 'CM Capital Markets',
    papel: 'Criação e manipulação de imagem',
    entregas: ['Thumbnails de notícias', 'Séries e programas ao vivo', 'Conteúdo educativo'],
    capa: { src: 'youtube/35' },
    tema: 'escuro',
    capitulos: [{ tipo: 'youtube', titulo: 'Thumbnails', pasta: 'youtube' }]
  },
  {
    id: 'cm-capital-vinhetas',
    titulo: 'CM Capital', destaque: 'Vinhetas',
    resumo: 'Vinhetas de abertura dos programas Morning Call e Giro da CM.',
    cat: 'video', ano: '2019–2023', cliente: 'CM Capital Markets',
    papel: 'Motion graphics e edição',
    entregas: ['Vinheta Morning Call', 'Vinheta Giro da CM'],
    capa: { src: 'morning-call-cm-capital', video: true, w: 1280, h: 720 },
    tema: 'escuro',
    capitulos: [{ tipo: 'videos', titulo: 'Vinhetas', videos: [
      { id: 'morning-call-cm-capital', titulo: 'Morning Call', legenda: 'Vinheta de abertura' },
      { id: 'giro-da-cm', titulo: 'Giro da CM', legenda: 'Vinheta de abertura' }
    ] }]
  },
  {
    id: 'master-video',
    titulo: 'Master Corretora', destaque: 'Vídeo',
    resumo: 'Vídeo hero institucional e vinheta do Morning Call.',
    cat: 'video', ano: '2023–2025', cliente: 'Master Corretora',
    papel: 'Edição, motion graphics e finalização',
    entregas: ['Vídeo hero institucional', 'Vinheta Morning Call'],
    capa: { src: 'video-hero-master', video: true, w: 1280, h: 720 },
    tema: 'escuro',
    capitulos: [{ tipo: 'videos', titulo: 'Vídeos', videos: [
      { id: 'video-hero-master', titulo: 'Vídeo hero', legenda: 'Institucional' },
      { id: 'morning-call-master', titulo: 'Morning Call', legenda: 'Vinheta de abertura' }
    ] }]
  },
  {
    id: 'eplus-day',
    titulo: 'e-Plus Day', destaque: 'Same day edit',
    resumo: 'Vídeo editado no mesmo dia do e-Plus Day, evento da CM Capital na Bolsa de Valores de São Paulo.',
    cat: 'video', ano: '2019–2023', cliente: 'CM Capital Markets · evento na B3',
    papel: 'Captação e edição no mesmo dia',
    entregas: ['Same day edit'],
    capa: { src: 'same-day-edit-eplus-day', video: true, w: 1280, h: 720 },
    tema: 'escuro',
    capitulos: [{ tipo: 'videos', titulo: 'Vídeo', videos: [
      { id: 'same-day-edit-eplus-day', titulo: 'Same Day Edit', legenda: 'Evento na Bolsa de Valores de São Paulo' }
    ] }]
  },
  {
    id: 'don-marco',
    titulo: 'Don Marco', destaque: 'Pizzaria',
    resumo: 'Fotografia gastronômica e de bastidores: da massa aberta à mão à pizza na mesa.',
    cat: 'foto', ano: '', cliente: 'Don Marco Pizzaria',
    papel: 'Fotografia e tratamento',
    entregas: ['Produto', 'Processo', 'Retrato'],
    capa: { src: 'foto/don-marco/01' },
    tema: 'escuro',
    capitulos: [{ tipo: 'fotos', titulo: 'Ensaio', pasta: 'foto/don-marco' }]
  },
  {
    id: 'all-in-burger',
    titulo: 'All In', destaque: 'Burger',
    resumo: 'Fotografia de produto com luz dramática, fogo e fumaça.',
    cat: 'foto', ano: '', cliente: 'All In Burger',
    papel: 'Fotografia e tratamento',
    entregas: ['Produto', 'Still', 'Ambiente'],
    capa: { src: 'foto/all-in-burger/02' },
    tema: 'escuro',
    capitulos: [{ tipo: 'fotos', titulo: 'Ensaio', pasta: 'foto/all-in-burger' }]
  },
  {
    id: 'fotografia-outros',
    titulo: 'Outros', destaque: 'olhares',
    resumo: 'Retrato, eventos, automóveis e cidade.',
    cat: 'foto', ano: '', cliente: 'Diversos',
    papel: 'Fotografia e tratamento',
    entregas: ['Retrato', 'Eventos', 'Automóveis', 'Cidade'],
    capa: { src: 'foto/outros/06' },
    tema: 'escuro',
    capitulos: [{ tipo: 'fotos', titulo: 'Fotografias', pasta: 'foto/outros' }]
  }
];

