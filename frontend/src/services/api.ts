import axios, { Method } from 'axios';

const baseURL = 'http://localhost/api';

class APIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function fetch<TResult, TData = undefined>(
  method: Method,
  url: string,
  accessToken?: string,
  data?: TData,
): Promise<TResult> {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: false,
  });

  return axiosInstance({
    url,
    method,
    ...(accessToken ? { headers: { Authorization: accessToken } } : {}),
    data,
    responseType: 'json',
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err && axios.isAxiosError(err)) {
        const { status = 500, data = 'unknown' } =  err.response || {};

        throw new APIError(status || 500, data);
      }

      throw err;
    });
}

type Inspection = {
  user: {
    _id: string;
    nickname: string;
  };
  scopes: string[];
}

type InspectionWithToken = Inspection & { accessToken: string }

export async function getInspect(accessToken: string): Promise<Inspection> {
  return fetch<Inspection>('GET', '/inspect', accessToken);
}

export async function postSignup(body: { nickname: string }): Promise<InspectionWithToken> {
  return fetch<InspectionWithToken, { nickname: string }>('POST', '/signup', undefined, body);
}

export async function postToken(body: { nickname: string }): Promise<InspectionWithToken> {
  return fetch<InspectionWithToken, { nickname: string }>('POST', '/token', undefined, body);
}

export async function putUpdateSelf(accessToken: string, body: { nickname: string }): Promise<{
  user: {
    _id: string;
    nickname: string;
  };
}> {
  return fetch('PUT', '/users/me', accessToken, body);
}

