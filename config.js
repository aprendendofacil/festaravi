// ============================================================
//  EDITE AQUI os dados da festa e do banco (Supabase)
// ============================================================
window.FESTA = {
  aniversariante: 'Ravi',
  idade: 4,
  data: 'Quinta-feira, 21 de janeiro de 2027',
  horario: '20h às 23h40',
  local: 'Rapanui Buffet Infantil · Av. Doutor Cristiano Guimarães, 1251 - Planalto, Belo Horizonte - MG, 31720-300',
  confirmarAte: '',  // ex.: '14 de janeiro' (vazio = não mostra prazo)

  // A partir desta idade o convidado é PAGANTE (abaixo dela, não pagante)
  idadePagante: 6,

  // Opcional: caminho de uma imagem sua (ex.: 'img/topo.png') para o topo do site
  imagemTopo: 'img/convite.webp',

  // Supabase → Project Settings → API (ou "API Keys")
  // Deixe vazio para testar em MODO DEMONSTRAÇÃO (salva só no seu navegador)
  supabaseUrl: '',   // ex.: 'https://abcdefgh.supabase.co'
  supabaseKey: ''    // a chave "anon" / "publishable" (é pública, pode ficar aqui)
};
