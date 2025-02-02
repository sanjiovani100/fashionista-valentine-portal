import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/index/Index';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';

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
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;