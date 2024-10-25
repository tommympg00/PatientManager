import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";

import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
