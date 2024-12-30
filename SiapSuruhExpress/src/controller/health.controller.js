export const getHealth = (req, res) => {
  try {
    res.status(200).json({ message: 'Health check successful' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
