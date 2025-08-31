export function detectScript(s: string): 'en'|'hi'|'te' {
  if (/[\u0900-\u097F]/.test(s)) return 'hi';
  if (/[\u0C00-\u0C7F]/.test(s)) return 'te';
  return 'en';
}
