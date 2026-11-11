# Confirmador de presença – Festa infantil

Mini site estático (GitHub Pages) + banco grátis (Supabase).

- `index.html`: página que as famílias abrem pelo link do convite. Elas preenchem o nome e a idade de cada convidado.
- `painel.html`: painel dos pais (com login), dividido em **Não pagantes** (até 5 anos) e **Pagantes** (6 anos ou mais e adultos).
- `config.js`: **o único arquivo que você precisa editar** (nome, data, local e as chaves do banco).

> Sem configurar o banco, o site funciona em **modo demonstração** (salva só no seu navegador), ótimo para testar.

---

## 1. Criar o banco (Supabase, grátis), uns 5 minutos

1. Crie uma conta em https://supabase.com e clique em **New project** (escolha uma senha qualquer para o banco e a região *South America (São Paulo)*).
2. No menu lateral, abra **SQL Editor → New query**, cole todo o conteúdo do arquivo `supabase.sql` e clique em **Run**.
3. Crie o seu login do painel: **Authentication → Users → Add user → Create new user**. Informe seu email e uma senha e marque **Auto Confirm User**.
4. (Recomendado) Em **Authentication → Sign In / Providers**, desligue **Allow new users to sign up**, para ninguém criar conta.
5. Pegue as chaves em **Project Settings → API** (ou **API Keys**):
   - **Project URL** (ex.: `https://abcdefgh.supabase.co`)
   - **anon / publishable key**. Essa chave é pública e pode ir no site. **Nunca** use a `service_role` / `secret`.

## 2. Configurar o site

Abra o `config.js` e preencha:

```js
aniversariante: 'Ravi',
idade: 5,
data: 'Sábado, 12 de dezembro',
horario: '15h às 19h',
local: 'Buffet ...',
confirmarAte: '5 de dezembro',
idadePagante: 6,
supabaseUrl: 'https://SEU-PROJETO.supabase.co',
supabaseKey: 'SUA-CHAVE-ANON-OU-PUBLISHABLE'
```

Quer uma imagem sua no topo (por exemplo, a arte do convite)? Coloque o arquivo numa pasta `img/` e preencha `imagemTopo: 'img/topo.png'`.

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `festa-ravi`) e envie estes arquivos para ele (pode arrastar e soltar em **Add file → Upload files**).
2. No repositório, abra **Settings → Pages**, escolha *Deploy from a branch*, branch **main** e pasta **/ (root)**, e clique em **Save**.
3. Em 1 ou 2 minutos o site estará no ar:
   - Link do convite (coloque no PDF): `https://SEU-USUARIO.github.io/festa-ravi/`
   - Seu painel: `https://SEU-USUARIO.github.io/festa-ravi/painel.html`

## Segurança, em resumo

- As famílias só conseguem **enviar** confirmações. Elas não veem a lista de ninguém.
- Ver e remover convidados exige o login que só você tem.
- Se alguém confirmar errado, remova no painel (botão **Remover**) ou direto no Supabase em **Table Editor → convidados**.
