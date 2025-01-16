const API_URL = 'http://localhost:5000/api/auth';

export const register = async ({
  username,
  email,
  password,
  phone_number,
  address,
  role,
}) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      phone_number,
      address,
      role,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Register failed');
  }

  return await response.json();
};

export const loginUser = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/login/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
};

export const loginJasa = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/login/provider`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
};

export const loginAdmin = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/login/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return await response.json();
};
