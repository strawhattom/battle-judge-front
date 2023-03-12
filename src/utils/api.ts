const base = `http://localhost:3000`;

interface APIProps {
  method: string;
  path: string;
  data?: FormData | object | undefined;
}

interface RequestInitHeader extends RequestInit {
  headers: {
    'Content-Type'?: string;
    Authorization?: string;
  };
}

// http request returns error: true or false, response: string or object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response = [
  boolean,
  {
    data: string | object;
    status: number;
  }
];

async function send({ method, path, data }: APIProps): Promise<Response> {
  const opts: RequestInitHeader = { method, headers: {} };

  if (!(data instanceof FormData)) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  } else {
    opts.body = data;
  }

  const token = localStorage.getItem('jwt');

  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    console.log(`${method} ${base}/${path}`, opts);

    // TODO: fetch show error if unauthorized
    const res = await fetch(`${base}/${path}`, opts);
    const { status } = res;
    if (status === 200 || status === 201) {
      const result = await res.text();

      return [
        false,
        result
          ? {
              data: JSON.parse(result),
              status
            }
          : {
              data: null,
              status
            }
      ];
    }
    const result = await res.text();
    return [
      true,
      {
        data: result,
        status
      }
    ];
  } catch (err) {
    return [
      true,
      {
        data: 'Server error',
        status: 500
      }
    ];
  }
}

export function get(path: string) {
  return send({ method: 'GET', path });
}

export function del(path: string) {
  return send({ method: 'DELETE', path });
}

export function post(path: string, data: object) {
  return send({ method: 'POST', path, data });
}

export function patch(path: string, data: object) {
  return send({ method: 'PATCH', path, data });
}

export function put(path: string, data: object) {
  return send({ method: 'PUT', path, data });
}
