export const IDRConverter = (amount) => {
  const numAmount = parseInt(amount);
  return `Rp ${numAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};
