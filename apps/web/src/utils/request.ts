/* eslint-disable import/no-cycle */
import { isArray } from 'lodash';
import { toast } from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { AppConfig } from '../config';
import httpClient from './axios';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

const parseJSON = async (response: AxiosResponse) => {
  if (response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.data;
  }
  return response;
};

export async function request(
  _metadata: any,
  data: any,
  isSecure = true,
  isFormData = false,
  url: string = AppConfig.BACKEND_API
): Promise<any> {
  const metadata = { ..._metadata };
  const pathTokens = metadata.path.split(':');
  if (metadata.path.indexOf(':') !== 0) {
    pathTokens.shift();
  }
  pathTokens.forEach((token: string) => {
    metadata.path = metadata.path.replace(`:${token}`, `${data[token]}`);
  });

  console.log(url);
  const backEndUrl = `${url}/${metadata.path}`;

  const formData = new FormData();
  if (isFormData) {
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
  }

  const config = {
    method: metadata.method,
    url: backEndUrl,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      ...(!isFormData && {
        'Content-Type': 'application/json',
      }),
    },
    data: isFormData ? formData : JSON.stringify(data),
  };

  const response = await httpClient(config)
    .then(async (response: any) => {
      return response;
    })
    .catch((error: { response: { data: any } }) => {
      const data = error.response?.data;
      const apiMessage = data.message ?? 'Something went wrong';
      toast.error(
        isArray(apiMessage) ? data.message.join(', ') : data.message,
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
    });

  return parseJSON(response!);
}
