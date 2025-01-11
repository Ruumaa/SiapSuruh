const BASE_URL = 'http://localhost:5000/api';

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      `HTTP error! Status: ${response.status}`,
      `Error data: ${errorData.message}`
    );
    throw new Error(`${errorData.message}`);
  }

  return response.json();
};
