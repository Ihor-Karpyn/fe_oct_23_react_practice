const BASE_ENDPOINT = 'http://localhost:5000';

export const gateway = <T>(
  baseEndpoint: string,
  endpoint: string,
  options?: {
    headers?: Record<string, string>,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: any,
  },
): Promise<T> => {
  const url = `${BASE_ENDPOINT}${endpoint}`;

  const {
    headers,
    method = 'GET',
    body,
  } = options || {};

  return fetch(
    url,
    {
      ...options,
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }

      return null;
    });
};

const get = <T>(endpoint: string) => (
  gateway<T>(BASE_ENDPOINT, endpoint)
);

const remove = <T>(endpoint: string) => (
  gateway<T>(BASE_ENDPOINT, endpoint, { method: 'DELETE' })
);

const post = <T>(endpoint: string, body: any) => (
  gateway<T>(BASE_ENDPOINT, endpoint, { method: 'POST', body })
);

const patch = <T>(endpoint: string, body: any) => (
  gateway<T>(BASE_ENDPOINT, endpoint, { method: 'PATCH', body })
);

export const apiClient = {
  get,
  delete: remove,
  post,
  patch,
};
