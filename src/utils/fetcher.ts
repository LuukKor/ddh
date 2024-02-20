type IAPIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface IAPIOptions {
  headers: HeadersInit
  method?: IAPIMethod,
  body?: string
}

export async function fetcher<T>(url: string, method: IAPIMethod = 'GET', body = {}): Promise<T> {
  const options: IAPIOptions = {
    headers: {
      accept: 'application/json',
    }
  }

  if (method === 'POST') {
    options.method = 'POST'
    options.body = JSON.stringify(body)
  }

  const result = await fetch(url, options).then((res) => res.json());

  return result;
}
