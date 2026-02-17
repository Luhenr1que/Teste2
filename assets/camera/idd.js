export function identificarDocumento(texto) {
  texto = texto.toLowerCase();

  if (texto.includes('passaporte')) return 'Passaporte';
  if (texto.includes('carteira nacional de habilitação') || texto.includes('cnh')) return 'CNH';
  if (texto.includes('registro geral') || texto.includes('rg')) return 'RG';
  if (texto.includes('título de eleitor')) return 'Título de Eleitor';

  return 'Tipo de documento não identificado';
}
