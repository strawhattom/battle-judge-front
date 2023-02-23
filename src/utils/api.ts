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
export type Response = [boolean, any];

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
    const res = await fetch(`${base}/${path}`, opts);
    if (res.status === 200 || res.status === 201) {
      const result = await res.text();

      return [false, result ? JSON.parse(result) : {}];
    }
    const result = await res.text();
    return [true, result];
  } catch (err) {
    return [true, 'Server error'];
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
