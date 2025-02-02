import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/index';
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

export default router;
