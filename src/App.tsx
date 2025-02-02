import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/index/Index';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;