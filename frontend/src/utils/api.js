const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(path, method = 'GET', token, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    'auth': token,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const res = await fetch(`${API_URL}${path}`, options);
  return res.json();
}
