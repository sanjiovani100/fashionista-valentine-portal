import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CloudinaryProvider } from './integrations/cloudinary/CloudinaryProvider';
import Index from "./pages/index/Index";
import ModelsPage from "./pages/models/ModelsPage";
import DesignersPage from "./pages/designers/DesignersPage";
import SponsorsPage from "./pages/sponsors/SponsorsPage";
import EventsPage from "./pages/events/EventsPage";
import AboutPage from "./pages/about/AboutPage";
import Confirmation from "./pages/confirmation/Confirmation";
import ContactPage from "./pages/contact/ContactPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CloudinaryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailsPage />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/designers" element={<DesignersPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Redirect old registration routes to new paths */}
              <Route path="/register/model" element={<Navigate to="/models" replace />} />
              <Route path="/register/designer" element={<Navigate to="/designers" replace />} />
              <Route path="/register/sponsor" element={<Navigate to="/sponsors" replace />} />
              <Route path="/register/*" element={<Navigate to="/" replace />} />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CloudinaryProvider>
    </QueryClientProvider>
  );
};

export default App;


