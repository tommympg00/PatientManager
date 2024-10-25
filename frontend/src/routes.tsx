import { RouteObject } from "react-router-dom";

import { Layout } from "@/components";

import { PATHS } from "./config";
import {
  NotFoundScreen,
  PatientDetailScreen,
  PatientsScreen,
} from "./features";

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
