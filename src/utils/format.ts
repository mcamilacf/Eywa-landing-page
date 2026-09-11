export function formatCOP(amount: number): string {
  if (!amount) return '$0';
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
