// Acesso ao banco (Supabase REST) + modo demonstração
(function () {
  const F = window.FESTA;
  const url = (F.supabaseUrl || '').replace(/\/+$/, '');
  const DEMO = !url || !F.supabaseKey;
  const TOKEN_KEY = 'festa_sessao';
  const DEMO_KEY = 'festa_demo_convidados';

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  async function req(path, opts = {}, token) {
    const headers = Object.assign({ apikey: F.supabaseKey, 'Content-Type': 'application/json' }, opts.headers || {});
    if (token) headers.Authorization = 'Bearer ' + token;
    const r = await fetch(url + path, Object.assign({}, opts, { headers }));
    if (!r.ok) {
      let msg = 'Erro ' + r.status;
      try { const j = await r.json(); msg = j.message || j.msg || j.error_description || msg; } catch (e) {}
      const err = new Error(msg); err.status = r.status; throw err;
    }
    return r.status === 204 ? null : r.json().catch(() => null);
  }

  function demoList() { return store.get(DEMO_KEY) || []; }

  window.DB = {
    demo: DEMO,
    pagante(idade) { return Number(idade) >= F.idadePagante; },

    async confirmar(familia, convidados) {
      const linhas = convidados.map(c => ({ familia, nome: c.nome, idade: c.idade }));
      if (DEMO) {
        const lista = demoList();
        linhas.forEach(l => lista.push(Object.assign({ id: Date.now() + Math.random(), criado_em: new Date().toISOString() }, l)));
        store.set(DEMO_KEY, lista);
        return;
      }
      await req('/rest/v1/convidados', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(linhas) });
    },

    sessao() { return DEMO ? (store.get(TOKEN_KEY) || null) : store.get(TOKEN_KEY); },

    async entrar(email, senha) {
      if (DEMO) { store.set(TOKEN_KEY, { demo: true }); return; }
      const j = await req('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password: senha }) });
      store.set(TOKEN_KEY, { token: j.access_token, expira: Date.now() + (j.expires_in - 60) * 1000 });
    },

    sair() { store.del(TOKEN_KEY); },

    async listar() {
      if (DEMO) return demoList();
      const s = store.get(TOKEN_KEY);
      if (!s || !s.token || Date.now() > s.expira) { this.sair(); const e = new Error('Sessão expirada. Entre de novo.'); e.status = 401; throw e; }
      return req('/rest/v1/convidados?select=*&order=nome.asc', {}, s.token);
    },

    async apagar(id) {
      if (DEMO) { store.set(DEMO_KEY, demoList().filter(c => c.id !== id)); return; }
      const s = store.get(TOKEN_KEY);
      await req('/rest/v1/convidados?id=eq.' + encodeURIComponent(id), { method: 'DELETE' }, s && s.token);
    }
  };

  // Preenche textos da festa em qualquer elemento com data-festa="chave"
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-festa]').forEach(el => { el.textContent = F[el.dataset.festa]; });
    document.querySelectorAll('[data-idade-pagante]').forEach(el => { el.textContent = F.idadePagante; });
    document.querySelectorAll('[data-idade-limite]').forEach(el => { el.textContent = F.idadePagante - 1; });
    if (F.imagemTopo) document.querySelectorAll('.topo-img').forEach(img => { img.src = F.imagemTopo; img.hidden = false; });
    if (DEMO) document.querySelectorAll('.aviso-demo').forEach(el => { el.hidden = false; });
  });
})();
