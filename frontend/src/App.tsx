import './app.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '@/routes';

export const App = () => {
  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
