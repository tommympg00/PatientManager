import { RouteObject } from 'react-router-dom';

import { Layout } from '@/components';

import { PATHS } from './config';
import { NotFoundScreen, PatientsScreen } from './features';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        element: <PatientsScreen />,
        path: PATHS.home,
      },
      { path: '*', element: <NotFoundScreen /> },
    ],
  },
];
