import { lazy } from 'react';

import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-componet/Loadable';

const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
