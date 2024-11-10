export const formatToIDR = (amount) => {
  return `Rp. ${amount.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  })}`;
};

export const avatarURL = (id) => {
  return `https://picsum.photos/seed/${id}/100`;
};
