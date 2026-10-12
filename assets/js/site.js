/* Portfólio Rafael Dias · scripts compartilhados */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nn = (i) => String(i).padStart(2, '0');
  const CAT = Object.fromEntries(window.CATEGORIAS);
  const C = window.CONTATO;
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- imagens ---------- */
  const IMG = window.IMAGENS;
  const caminho = (pasta, i, mini) => `assets/img/${pasta}/${nn(i)}${mini ? '-t' : ''}.webp`;
  const itens = (pasta) => (IMG[pasta] || []).map(([w, h], k) => ({ src: caminho(pasta, k + 1), mini: caminho(pasta, k + 1, true), w, h }));

  function capa(p) {
    const c = p.capa;
    if (c.video) return { src: `assets/video/${c.src}.webp`, mini: `assets/video/${c.src}.webp`, w: c.w, h: c.h, video: true };
    if (c.arquivo) return { src: `assets/img/${c.src}.webp`, mini: `assets/img/${c.src}-t.webp`, w: c.w, h: c.h };
    const partes = c.src.split('/'); const i = parseInt(partes.pop(), 10); const pasta = partes.join('/');
    const [w, hh] = IMG[pasta][i - 1];
    return { src: caminho(pasta, i), mini: caminho(pasta, i, true), w, h: hh };
  }

  // Garante que nenhuma pasta de imagens aparece em mais de um projeto.
  function checarManifesto() {
    const dono = {};
    for (const p of window.PROJETOS) for (const cap of p.capitulos) {
      const pastas = [cap.pasta, ...(cap.pastas || [])].filter(Boolean);
      for (const pasta of pastas) {
        if (dono[pasta] && dono[pasta] !== p.id) console.error(`Pasta "${pasta}" usada em ${dono[pasta]} e ${p.id}`);
        if (!IMG[pasta]) console.error(`Pasta "${pasta}" não existe no manifesto`);
        dono[pasta] = p.id;
      }
    }
  }

  const titulo = (p) => `${esc(p.titulo)} <b>${esc(p.destaque)}</b>`;
  const tituloLinhas = (p) => `<span class="linha">${esc(p.titulo)}</span><b class="linha">${esc(p.destaque)}</b>`;

  /* ---------- navegação e contato ---------- */
  function nav(atual) {
    const link = (href, txt, id, cls = '') => `<li class="${cls}"><a href="${href}" ${atual === id ? 'aria-current="page"' : ''}>${txt}</a></li>`;
    const el = h(`<header class="nav"><div class="wrap">
      <a class="marca" href="index.html"><span>Rafael</span> <b>Dias</b></a>
      <nav aria-label="Principal"><ul>
        ${link('trabalhos.html', 'Trabalhos', 'trabalhos')}
        ${link('sobre.html', 'Sobre', 'sobre')}
        ${link('#contato', 'Contato', 'contato', 'opc')}
        ${C.curriculo ? `<li><a class="cv" href="${C.curriculo}" download>Currículo</a></li>` : ''}
      </ul></nav></div></header>`);
    document.body.prepend(el);
    const solid = () => el.classList.toggle('solid', scrollY > 30);
    addEventListener('scroll', solid, { passive: true }); solid();
  }

  function contato() {
    const el = h(`<footer class="contato" id="contato">
      <div class="luz" aria-hidden="true"></div>
      <div class="wrap">
        <div class="eyebrow">Contato</div>
        <h2 class="display" style="margin-top:14px"><span class="linha">Vamos criar</span><b class="linha">juntos?</b></h2>
        <dl class="contato-grid">
          <div><dt>E-mail</dt><dd><a href="mailto:${C.email}">${C.email}</a></dd><button class="copiar" type="button" data-copiar="${C.email}">Copiar e-mail</button></div>
          <div><dt>WhatsApp</dt><dd><a href="${C.whatsapp}" target="_blank" rel="noopener">${C.telefone}</a></dd></div>
          <div><dt>Redes</dt><dd><a href="${C.behance}" target="_blank" rel="noopener">Behance</a> &nbsp; <a href="${C.linkedin}" target="_blank" rel="noopener">LinkedIn</a></dd></div>
          <div><dt>Base</dt><dd>${C.cidade}</dd>${C.curriculo ? `<dd><a href="${C.curriculo}" download>Baixar currículo (PDF)</a></dd>` : ''}</div>
        </dl>
        <div class="rodape"><span>© ${new Date().getFullYear()} Rafael Dias · Design gráfico e audiovisual</span><a href="#" onclick="scrollTo({top:0});return false">Voltar ao topo ↑</a></div>
      </div></footer>`);
    document.body.append(el);
    $$('[data-copiar]', el).forEach(b => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copiar); b.textContent = 'Copiado'; }
      catch { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); getSelection().removeAllRanges(); getSelection().addRange(r); b.textContent = 'Selecionado'; }
      setTimeout(() => b.textContent = 'Copiar e-mail', 2000);
    }));
  }

  /* ---------- lightbox ---------- */
  const lb = (() => {
    let lista = [], i = 0, el, img, cont, leg, ultimoFoco;
    function monta() {
      el = h(`<div class="lb" role="dialog" aria-modal="true" aria-label="Visualizador de imagens">
        <header><span class="leg"></span><button type="button" data-f>Fechar ✕</button></header>
        <div class="palco"><img alt=""></div>
        <footer><span class="cont"></span><div class="nav-lb"><button type="button" data-a aria-label="Anterior">←</button><button type="button" data-p aria-label="Próxima">→</button></div></footer></div>`);
      document.body.append(el);
      img = $('img', el); cont = $('.cont', el); leg = $('.leg', el);
      $('[data-f]', el).onclick = fecha; $('[data-a]', el).onclick = () => vai(i - 1); $('[data-p]', el).onclick = () => vai(i + 1);
      el.addEventListener('click', e => { if (e.target.classList.contains('palco')) fecha(); });
      addEventListener('keydown', e => {
        if (!el.classList.contains('aberto')) return;
        if (e.key === 'Escape') fecha(); if (e.key === 'ArrowRight') vai(i + 1); if (e.key === 'ArrowLeft') vai(i - 1);
      });
      let x0 = null;
      el.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
      el.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) vai(i + (dx < 0 ? 1 : -1)); x0 = null; });
    }
    function vai(k) {
      i = (k + lista.length) % lista.length; const it = lista[i];
      img.src = it.src; img.alt = it.alt || '';
      // nunca amplia além do tamanho real do arquivo
      img.style.maxWidth = `min(calc(100% - 2 * var(--gutter)), ${it.w}px)`; img.style.maxHeight = `min(100%, ${it.h}px)`;
      cont.textContent = lista.length > 1 ? `${nn(i + 1)} / ${nn(lista.length)}` : '';
      leg.textContent = it.legenda || '';
      $$('[data-a],[data-p]', el).forEach(b => b.hidden = lista.length < 2);
      const prox = lista[(i + 1) % lista.length]; if (prox) new Image().src = prox.src;
    }
    function abre(l, k = 0) { if (!el) monta(); ultimoFoco = document.activeElement; lista = l; vai(k); el.classList.add('aberto'); document.body.style.overflow = 'hidden'; $('[data-f]', el).focus(); }
    function fecha() { el.classList.remove('aberto'); document.body.style.overflow = ''; img.removeAttribute('src'); ultimoFoco?.focus(); }
    return { abre };
  })();

  /* ---------- HOME ---------- */
  function home() {
    const ol = $('#indice-lista'), previa = $('#previa'), pimg = $('img', previa);
    window.PROJETOS.forEach((p, k) => {
      const c = capa(p);
      const li = h(`<li><a href="projeto.html?p=${p.id}" data-k="${k}">
        <span class="n">${nn(k + 1)}</span><span class="t">${titulo(p)}</span>
        <span class="c">${esc(CAT[p.cat])}</span><span class="y">${esc(p.ano)}</span>
        <span class="mini"><img src="${c.mini}" alt="" loading="lazy" width="${c.w}" height="${c.h}"></span></a></li>`);
      ol.append(li);
    });
    // prévia flutuante no formato real da capa (sem corte)
    const tam = (c) => { const area = 300 * 300 * 1.25; let w = Math.sqrt(area * c.w / c.h); let hh = w * c.h / c.w; if (hh > 420) { hh = 420; w = hh * c.w / c.h; } return [w, hh]; };
    let alvo = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, raf = null, dim = [0, 0];
    const loop = () => { pos.x += (alvo.x - pos.x) * .14; pos.y += (alvo.y - pos.y) * .14; previa.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`; raf = requestAnimationFrame(loop); };
    $$('a', ol).forEach(a => {
      const p = window.PROJETOS[a.dataset.k], c = capa(p);
      a.addEventListener('mouseenter', () => {
        pimg.src = c.mini; dim = tam(c); previa.style.width = dim[0] + 'px'; previa.style.height = dim[1] + 'px';
        previa.classList.add('on'); if (!raf && !reduzMovimento) loop();
        $('#numeral-home').textContent = nn(+a.dataset.k + 1);
      });
      a.addEventListener('mouseleave', () => previa.classList.remove('on'));
      // toque: primeiro mostra a capa, segundo abre o projeto
      a.addEventListener('click', e => {
        if (matchMedia('(hover: hover) and (min-width: 761px)').matches) return;
        if (!a.classList.contains('ativo')) { e.preventDefault(); $$('a.ativo', ol).forEach(x => x.classList.remove('ativo')); a.classList.add('ativo'); }
      });
    });
    addEventListener('mousemove', e => {
      const x = Math.min(innerWidth - dim[0] - 24, e.clientX + 36), y = Math.min(innerHeight - dim[1] - 24, Math.max(24, e.clientY - dim[1] / 2));
      alvo = { x, y }; if (reduzMovimento) previa.style.transform = `translate3d(${x}px,${y}px,0)`;
    }, { passive: true });
  }

  /* ---------- TRABALHOS ---------- */
  function trabalhos() {
    const gal = $('#galeria'), fil = $('#filtros');
    const cats = (p) => p.cats || [p.cat];
    window.PROJETOS.forEach(p => {
      const c = capa(p);
      gal.append(h(`<a class="card" href="projeto.html?p=${p.id}" data-cats="${cats(p).join(' ')}">
        <div class="img"><img src="${c.mini}" alt="${esc(p.titulo + ' · ' + p.destaque)}" loading="lazy" width="${c.w}" height="${c.h}">
        ${c.video ? '<span class="play" aria-hidden="true">▶</span>' : ''}</div>
        <div class="meta"><strong>${esc(p.titulo)} <span>${esc(p.destaque)}</span></strong><small>${esc(CAT[p.cat])}</small></div>
        <p>${esc(p.resumo)}</p></a>`));
    });
    const botoes = [['todos', 'Tudo', window.PROJETOS.length], ...window.CATEGORIAS.map(([k, n]) => [k, n, window.PROJETOS.filter(p => cats(p).includes(k)).length])];
    botoes.forEach(([k, n, q]) => {
      const b = h(`<button type="button" aria-pressed="false" data-k="${k}">${n}<small>${q}</small></button>`);
      b.onclick = () => aplica(k); fil.append(b);
    });
    function aplica(k) {
      $$('button', fil).forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k));
      $$('.card', gal).forEach(c => c.classList.toggle('oculto', k !== 'todos' && !c.dataset.cats.split(' ').includes(k)));
      history.replaceState(null, '', k === 'todos' ? location.pathname : '#' + k);
    }
    const ini = location.hash.slice(1); aplica(CAT[ini] ? ini : 'todos');
  }

  /* ---------- PROJETO ---------- */
  const render = {
    texto: (cap) => `<div class="texto"><div><div class="eyebrow">${esc(cap.titulo)}</div></div>
      <div class="col">${cap.texto.map(t => `<p>${esc(t)}</p>`).join('')}</div></div>`,

    manual: (cap) => {
      const l = itens(cap.pasta);
      return `<div class="manual" data-pasta="${cap.pasta}">
        <div class="palco" role="button" tabindex="0" aria-label="Ampliar página"><img src="${l[0].src}" alt="Página 1 do manual" width="${l[0].w}" height="${l[0].h}"></div>
        <div class="controles"><button class="redondo" data-a aria-label="Página anterior">←</button>
          <span class="cont">01 / ${nn(l.length)}</span><div class="barra"><i style="width:${100 / l.length}%"></i></div>
          <button class="redondo" data-p aria-label="Próxima página">→</button></div>
        <div class="tira">${l.map((it, k) => `<button type="button" data-k="${k}" aria-label="Página ${k + 1}" aria-current="${k === 0}"><img src="${it.mini}" alt="" loading="lazy"></button>`).join('')}</div>
      </div>`;
    },

    carrosseis: (cap) => cap.pastas.map((pasta, j) => {
      const l = itens(pasta);
      return `<div class="carrossel" data-pasta="${pasta}"><h3>${esc(cap.legendas?.[j] || 'Carrossel ' + (j + 1))}<span>${l.length} lâminas</span></h3>
        <div class="trilho">${l.map((it, k) => `<button type="button" data-k="${k}" aria-label="Lâmina ${k + 1}"><img src="${it.mini}" alt="" loading="lazy" width="${it.w}" height="${it.h}"></button>`).join('')}</div></div>`;
    }).join(''),

    posts: (cap) => `<div class="posts">${cap.pastas.map(pasta => {
      const l = itens(pasta);
      return `<button class="post" type="button" data-pasta="${pasta}" aria-label="Abrir post${l.length > 1 ? ' (carrossel com ' + l.length + ' lâminas)' : ''}">
        <img src="${l[0].mini}" alt="" loading="lazy" width="${l[0].w}" height="${l[0].h}">
        ${l.length > 1 ? `<span class="qtd">❐ ${l.length}</span>` : ''}</button>`;
    }).join('')}</div>`,

    youtube: (cap) => {
      const l = itens(cap.pasta).map((it, k) => ({ ...it, k }));
      const hd = l.filter(it => it.w >= 1000), sd = l.filter(it => it.w < 1000);
      const grade = (arr, cls) => `<div class="yt ${cls}" data-pasta="${cap.pasta}">${arr.map(it => `<button type="button" data-k="${it.k}" aria-label="Thumbnail ${it.k + 1}"><img src="${it.w >= 1000 ? it.mini : it.src}" alt="" loading="lazy" width="${it.w}" height="${it.h}"></button>`).join('')}</div>`;
      return grade(hd, '') + (sd.length ? `<p class="subtitulo">Mais thumbnails</p>` + grade(sd, 'compacta') : '');
    },

    videos: (cap) => `<div class="videos ${cap.videos.length > 1 ? 'duplo' : ''}">${cap.videos.map(v => `
      <div class="video"><figure><div class="tela">
        <button class="capa" type="button" data-video="${v.id}" aria-label="Assistir ${esc(v.titulo)}"><img src="assets/video/${v.id}.webp" alt="" loading="lazy"><span aria-hidden="true">▶</span></button>
      </div><figcaption><strong>${esc(v.titulo)}</strong><small>${esc(v.legenda)}</small></figcaption></figure></div>`).join('')}</div>`,

    fotos: (cap) => `<div class="fotos" data-pasta="${cap.pasta}">${itens(cap.pasta).map((it, k) =>
      `<button type="button" data-k="${k}" aria-label="Ampliar foto ${k + 1}"><img src="${it.mini}" alt="" loading="lazy" width="${it.w}" height="${it.h}"></button>`).join('')}</div>`,

    web: (cap) => `<div class="telas">
      <div><div class="janela"><div class="barra-j"><i></i><i></i><i></i><span>${esc(cap.link.replace('https://', ''))}</span></div>
        <div class="rolagem" tabindex="0" aria-label="Página completa, versão desktop"><img src="assets/img/${cap.desktop.src}.webp" alt="Landing page completa no desktop" width="${cap.desktop.w}" height="${cap.desktop.h}" loading="lazy"></div></div>
        <p class="legenda">Desktop · role dentro da janela</p></div>
      <div><div class="celular"><div class="rolagem" tabindex="0" aria-label="Página completa, versão celular"><img src="assets/img/${cap.mobile.src}.webp" alt="Landing page completa no celular" width="${cap.mobile.w}" height="${cap.mobile.h}" loading="lazy"></div></div>
        <p class="legenda">Celular</p></div>
    </div>
    <p style="margin-top:36px;text-align:center"><a class="botao cheio" href="${cap.link}" target="_blank" rel="noopener">Ver a página no ar ↗</a></p>`
  };

  function projeto() {
    const id = new URLSearchParams(location.search).get('p');
    const idx = window.PROJETOS.findIndex(p => p.id === id);
    if (idx < 0) { location.replace('trabalhos.html'); return; }
    const p = window.PROJETOS[idx], prox = window.PROJETOS[(idx + 1) % window.PROJETOS.length];
    document.title = `${p.titulo} ${p.destaque} · Rafael Dias`;
    $('meta[name="description"]')?.setAttribute('content', p.resumo);
    if (p.tema === 'escuro') document.body.classList.add('escuro');
    const main = $('main');
    main.append(h(`<section class="proj-hero"><div class="luz a" aria-hidden="true"></div><div class="numeral" aria-hidden="true">${nn(idx + 1)}</div>
      <div class="wrap">
        <a class="voltar" href="trabalhos.html#${p.cat}">← ${esc(CAT[p.cat])}</a>
        <h1 class="display entra">${tituloLinhas(p)}</h1>
        <p class="lead">${esc(p.resumo)}</p>
        <dl class="ficha">
          <div><dt>Cliente</dt><dd>${esc(p.cliente)}</dd></div>
          <div><dt>Meu papel</dt><dd>${esc(p.papel)}</dd></div>
          ${p.ano ? `<div><dt>Período</dt><dd>${esc(p.ano)}</dd></div>` : ''}
          <div><dt>Entregas</dt><dd><ul>${p.entregas.map(e => `<li>${esc(e)}</li>`).join('')}</ul></dd></div>
        </dl></div></section>`));
    p.capitulos.forEach(cap => {
      const extra = cap.nota ? `<span class="eyebrow">${esc(cap.nota)}</span>` : cap.pastas && cap.tipo === 'posts' ? `<span class="eyebrow">${cap.pastas.length} posts</span>` : cap.tipo === 'youtube' ? `<span class="eyebrow">${itens(cap.pasta).length} thumbnails</span>` : cap.tipo === 'fotos' ? `<span class="eyebrow">${itens(cap.pasta).length} fotografias</span>` : '';
      main.append(h(`<section class="capitulo"><div class="wrap">
        ${cap.tipo === 'texto' ? '' : `<header><h2 class="h2">${esc(cap.titulo)}</h2>${extra}</header>`}
        ${render[cap.tipo](cap)}</div></section>`));
    });
    main.append(h(`<section class="proximo"><div class="wrap"><a href="projeto.html?p=${prox.id}">
      <div class="eyebrow">Próximo projeto</div><div class="display" style="margin-top:12px">${tituloLinhas(prox)}</div></a></div></section>`));
    liga(main);
  }

  // comportamentos dos blocos do projeto
  function liga(raiz) {
    $$('.manual', raiz).forEach(m => {
      const l = itens(m.dataset.pasta), img = $('.palco img', m), cont = $('.cont', m), barra = $('.barra i', m), tira = $('.tira', m);
      let i = 0;
      const vai = (k) => {
        i = (k + l.length) % l.length; img.src = l[i].src; img.alt = `Página ${i + 1} do manual`;
        cont.textContent = `${nn(i + 1)} / ${nn(l.length)}`; barra.style.width = `${(i + 1) / l.length * 100}%`;
        $$('button', tira).forEach((b, j) => b.setAttribute('aria-current', j === i));
        const b = tira.children[i]; tira.scrollTo({ left: b.offsetLeft - tira.clientWidth / 2 + b.clientWidth / 2, behavior: reduzMovimento ? 'auto' : 'smooth' });
        if (l[i + 1]) new Image().src = l[i + 1].src;
      };
      $('[data-a]', m).onclick = () => vai(i - 1); $('[data-p]', m).onclick = () => vai(i + 1);
      $$('button', tira).forEach(b => b.onclick = () => vai(+b.dataset.k));
      const palco = $('.palco', m);
      palco.onclick = () => lb.abre(l.map((it, k) => ({ ...it, legenda: `Página ${k + 1}` })), i);
      palco.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); palco.click(); } if (e.key === 'ArrowRight') vai(i + 1); if (e.key === 'ArrowLeft') vai(i - 1); };
      let x0 = null;
      palco.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
      palco.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { e.preventDefault(); vai(i + (dx < 0 ? 1 : -1)); } x0 = null; });
    });
    $$('.carrossel, .fotos, .yt', raiz).forEach(g => {
      const l = itens(g.dataset.pasta);
      $$('button[data-k]', g).forEach(b => b.onclick = () => lb.abre(l, +b.dataset.k));
    });
    $$('.post', raiz).forEach(b => b.onclick = () => lb.abre(itens(b.dataset.pasta), 0));
    $$('[data-video]', raiz).forEach(b => b.onclick = () => {
      const v = h(`<video controls playsinline preload="metadata" poster="assets/video/${b.dataset.video}.webp"><source src="assets/video/${b.dataset.video}.mp4" type="video/mp4"></video>`);
      $$('video', raiz).forEach(o => o.pause());
      b.replaceWith(v); v.play().catch(() => {});
    });
  }

  /* ---------- SOBRE ---------- */
  function sobre() {
    const r = $('.retrato'); if (!r || reduzMovimento) return;
    const camadas = $$('.camada', r);
    const move = (dx, dy) => camadas.forEach(c => { const f = +c.dataset.prof; c.style.transform = `translate3d(${dx * f}px,${dy * f}px,0)`; });
    r.closest('section').addEventListener('mousemove', e => {
      const b = r.getBoundingClientRect(); move((e.clientX - b.left - b.width / 2) / b.width * 2, (e.clientY - b.top - b.height / 2) / b.height * 2);
    });
    r.closest('section').addEventListener('mouseleave', () => move(0, 0));
    addEventListener('scroll', () => { const b = r.getBoundingClientRect(); const t = (b.top + b.height / 2 - innerHeight / 2) / innerHeight; if (matchMedia('(hover: none)').matches) move(0, t * 2); }, { passive: true });
  }

  /* ---------- início ---------- */
  checarManifesto();
  const pagina = document.body.dataset.pagina;
  nav(pagina);
  ({ home, trabalhos, projeto, sobre })[pagina]?.();
  if (C.curriculo) $$('[data-cv]').forEach(el => { el.hidden = false; $('a', el).href = C.curriculo; });
  contato();
})();
