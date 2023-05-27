export interface IRootJson {
  data: {
    __schema: IRootJsonSchema;
  };
}

export interface IRootJsonSchema {
  mutationType: {
    name: string;
    description: string | null;
    fields: [
      {
        name: string;
        description: string | null;
        type: {
          name: string | null;
          kind: string | null;
        };
        args: [
          {
            name: string;
          },
        ];
      },
    ];
  } | null;
  queryType: {
    name: string;
    description: string | null;
    fields: [
      {
        name: string;
        description: string | null;
        type: {
          name: string | null;
          kind: string | null;
        };
        args: [
          {
            name: string;
          },
        ];
      },
    ];
  } | null;
}

interface SuspensePromise<T> {
  read(): T;
}

function wrapPromise<T>(promise: Promise<T>): SuspensePromise<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  const suspender = promise.then(
    (r) => {
      result = r;
      status = 'success';
    },
    (e) => {
      result = e;
      status = 'error';
    },
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      throw new Error('Invalid status');
    },
  };
}

const fetchRoot = (url: string) => {
  const body = JSON.stringify({
    query: `
      {
        __schema {
          mutationType {
            name
            description
            fields {
              name
              description
              type {
                name
                kind
              }
              args {
                name
              }
            }
          }
          queryType {
            name
            description
            fields {
              name
              description
              type {
                name
                kind
              }
              args {
                name
              }
            }
          }
        }
      }`,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => response.json())
    .catch((err) => err);
};

export function useFetchDocRoot(url: string) {
  return wrapPromise(fetchRoot(url));
}
