import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import Router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
