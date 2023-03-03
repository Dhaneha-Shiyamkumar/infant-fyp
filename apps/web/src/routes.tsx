import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import HomePage from './pages/home';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <HomePage /> },
        { element: <Navigate to="/dashboard/app" />, index: true },
      ],
    },
    {
      path: 'login',
      element: <p> login </p>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
