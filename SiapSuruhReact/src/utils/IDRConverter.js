export const IDRConverter = (amount) =>
  `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
