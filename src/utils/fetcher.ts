export async function fetcher<T>(url: string): Promise<T> {
  const result = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  }).then((res) => res.json());

  return result;
}
