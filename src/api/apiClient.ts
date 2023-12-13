const BASE_ENDPOINT = 'https://65796c1df08799dc8046e695.mockapi.io';

export const get = <T>(endpoint: string): Promise<T> => (
  fetch(`${BASE_ENDPOINT}/${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
);
