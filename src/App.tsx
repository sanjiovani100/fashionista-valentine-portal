import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/index/Index';
import AboutPage from './pages/about/AboutPage';
import ContactPage from './pages/contact/ContactPage';
import DesignersPage from './pages/designers/DesignersPage';
import ModelsPage from './pages/models/ModelsPage';
import EventsPage from './pages/events/EventsPage';
import EventDetailsPage from './pages/events/[id]/EventDetailsPage';
import SponsorsPage from './pages/sponsors/SponsorsPage';
import ModelRegistration from './pages/register/model/ModelRegistration';
import DesignerRegistration from './pages/register/designer/DesignerRegistration';
import SponsorRegistration from './pages/register/sponsor/SponsorRegistration';
import Confirmation from './pages/confirmation/Confirmation';

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
  },
  {
    path: "/designers",
    element: <DesignersPage />,
  },
  {
    path: "/models",
    element: <ModelsPage />,
  },
  {
    path: "/events",
    element: <EventsPage />,
  },
  {
    path: "/events/:id",
    element: <EventDetailsPage />,
  },
  {
    path: "/sponsors",
    element: <SponsorsPage />,
  },
  {
    path: "/register/model",
    element: <ModelRegistration />,
  },
  {
    path: "/register/designer",
    element: <DesignerRegistration />,
  },
  {
    path: "/register/sponsor",
    element: <SponsorRegistration />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
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