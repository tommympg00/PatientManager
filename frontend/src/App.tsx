import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/routes";

import "./app.css";

export const App = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
