export function cn(
  ...classes: (string | false | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US') + '+';
}
