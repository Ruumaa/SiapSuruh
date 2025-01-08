const API_URL = 'http://localhost:5000/api/auth';

export const register = async (payload) => {
  try {
    // payload = {username, email, password, phone_number, address, role}
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error('Error: Register Failed - ', error.message);
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await fetch(`${API_URL}/login/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // Periksa status HTTP sebelum mengembalikan respons
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed'); // Melempar error
    }

    return await response.json(); // Jika sukses, kembalikan respons JSON
  } catch (error) {
    console.error('Error: Login Failed - ', error.message);
    throw error; // Pastikan error dilempar ke React Query
  }
};

export const loginJasa = async ({ username, password }) => {
  try {
    const response = await fetch(`${API_URL}/login/provider`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    console.error('Error: Login Failed - ', error.message);
  }
};
