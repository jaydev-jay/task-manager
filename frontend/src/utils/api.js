const API_URL ="https://task-manager-api-kohl-three.vercel.app";

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
