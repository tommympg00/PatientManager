import { Layout } from "@/components";

import { RouteObject } from "react-router-dom";
import {
  NotFoundScreen,
  PatientDetailScreen,
  PatientsScreen,
} from "./features";
import { PATHS } from "./config";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        element: <div>Home</div>,
        path: PATHS.home,
      },
      {
        element: <PatientsScreen />,
        path: PATHS.patients,
      },
      {
        element: <PatientDetailScreen />,
        path: PATHS.patientDetail,
      },
      { path: "*", element: <NotFoundScreen /> },
    ],
  },
];
