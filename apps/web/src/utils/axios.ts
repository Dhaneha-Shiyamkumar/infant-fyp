import axios from 'axios';

const httpClient = axios.create();

export const addAccessTokenInterceptor = (
  getAccessTokenSilently: any,
  loginWithRedirect: any
) => {
  httpClient.interceptors.request.use(async (config: any) => {
    try {
      const token = await getAccessTokenSilently();
      config.headers!.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      loginWithRedirect();
    }
  });
};

export default httpClient;
