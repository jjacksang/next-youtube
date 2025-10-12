interface FetcherResponse<T> extends Response {
  data: T;
}

export const serverFetcher = <T>(
  input: string | URL | Request,
  init?: RequestInit | undefined,
) => {
  return fetch(input, init) as Promise<FetcherResponse<T>>;
};

export const clientFetcher = <T>(
  input: string | URL | Request,
  init?: RequestInit | undefined,
) => {
  return fetch(input, init) as Promise<FetcherResponse<T>>;
};
export const parseJson = async <T>(data: FetcherResponse<T>) => {
  const parsedData = await data.json();
  return parsedData as T;
};
