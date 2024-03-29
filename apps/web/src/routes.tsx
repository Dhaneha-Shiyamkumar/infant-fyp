import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import BlogPage from './pages/blog/blog';
import ChildInformationPage from './pages/child-information';
import HomePage from './pages/dashboard';
import LoginPage from './pages/login';
import SettingsPage from './pages/settings/settings';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <HomePage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'child/:id', element: <ChildInformationPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
