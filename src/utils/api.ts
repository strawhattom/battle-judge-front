// const prodUrl = 'https://api.example.com';
// il faut bien mettre le bon endpoint de l'API dans la conf nginx pour le déploiement en prod
const base = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL ?? 'http://localhost/api'
  : 'http://localhost:3000/api';

interface APIProps {
  method: string;
  path: string;
  data?: FormData | object | undefined;
}

interface RequestInitHeader extends RequestInit {
  headers: {
    'Content-Type'?: string;
    'Access-Control-Allow-Origin'?: string;
    Authorization?: string;
  };
}

// Les réponses des requêtes retournes la forme suivante : [vrai ou faux, {données, status}]
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
    opts.headers['Access-Control-Allow-Origin'] = '*';
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
