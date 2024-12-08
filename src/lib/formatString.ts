export function formatString(input: string): string {
  return input
    .normalize("NFD") // Normaliza a string para decompor caracteres especiais
    .toLowerCase() // Converte para minúsculas
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos e diacríticos
    .replace(/--+/g, "-") // Substitui múltiplos hífens por um único
    .trim(); // Remove espaços em branco extras 
}