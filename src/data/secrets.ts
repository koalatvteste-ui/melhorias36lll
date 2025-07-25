/**
 * Este objeto guarda os segredos para desbloquear os capítulos.
 * A chave (ex: 1) representa o capítulo que, ao ser concluído,
 * fornece o QR code com este segredo.
 * Este segredo será usado para desbloquear o próximo capítulo (ex: capítulo 2).
 */
export const chapterSecrets: { [key: number]: string } = {
  // Segredo encontrado no final do Capítulo 1 para desbloquear o Capítulo 2
  1: "primeira-viagem-praia-2023",

  // Segredo encontrado no final do Capítulo 2 para desbloquear o Capítulo 3
  2: "o-nome-do-nosso-primeiro-pet",

  // Segredo encontrado no final do Capítulo 3 para desbloquear o Capítulo 4
  3: "restaurante-do-primeiro-encontro",
};

/**
 * Este objeto guarda as dicas que serão mostradas na tela de bloqueio
 * para ajudar a encontrar o QR code correspondente.
 */
export const chapterHints: { [key: number]: string } = {
  // Dica para o QR Code que desbloqueia o Capítulo 2
  2: "Lembre-se do cheiro do mar e da areia nos pés naquele nosso primeiro refúgio juntos...",

  // Dica para o QR Code que desbloqueia o Capítulo 3
  3: "Pense em quem sempre nos recebe com pulos de alegria e enche a casa de pelos e amor.",

  // Dica para o QR Code que desbloqueia o Capítulo 4
  4: "Volte ao lugar onde tudo começou, onde um simples jantar se tornou o prólogo da nossa história.",
};