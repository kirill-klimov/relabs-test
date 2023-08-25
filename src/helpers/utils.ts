export async function delay(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
} 

export function formatTimestamp(value: number) {
  const date = new Date(value * 1000);
  const formatted = date.toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return formatted.replace(',', '');
}


export function formatPrice(price: number) {
  if (price < 1000) return price;
  const res = Math.floor(price / 1000);
  return `${res} ${(price - res * 1000).toString().padStart(3, '000')}`;
}