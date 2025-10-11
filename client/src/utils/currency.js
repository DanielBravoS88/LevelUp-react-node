export const moneyCLP = (n = 0) => new Intl.NumberFormat(
  'es-CL',
  { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }
).format(n || 0);
