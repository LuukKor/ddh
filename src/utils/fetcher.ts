type IAPIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function fetcher<T>(url: string, method: IAPIMethod = 'GET', body = {}): Promise<T> {
  const headers: HeadersInit = {
    accept: 'application/json',
  }

  if (method === 'POST') {
    headers.method = 'POST';
    headers.body = JSON.stringify(body);
  }

  const result = await fetch(url, {
    headers: headers
  }).then((res) => res.json());

  return result;
}
