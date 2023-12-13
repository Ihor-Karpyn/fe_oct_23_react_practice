const BASE_ENDPOINT = 'https://65796c1df08799dc8046e695.mockapi.io';

export const gateway = <T>(
  baseEndpoint: string,
  endpoint: string,
): Promise<T> => (
    fetch(`${BASE_ENDPOINT}${endpoint}`)
      .then((response) => {
        console.log('---###--------------------###---');
        console.log(response);
        console.log('---###--------------------###---');

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
  );

export const get = <T>(endpoint: string) => (
  gateway<T>(BASE_ENDPOINT, endpoint)
);
