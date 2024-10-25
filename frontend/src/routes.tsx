import { Layout } from "@/components";

import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        element: <div>Home</div>,
        path: "/",
      },
      {
        element: <div>About</div>,
        path: "/about",
      },
    ],
  },
];
