export const AppConfig = {
  name: 'App Name',
  BACKEND_API: import.meta.env.VITE_BACKEND_API ?? 'http://localhost:3333/api',
};
