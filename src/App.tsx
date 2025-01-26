import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/index/Index";
import Register from "./pages/register/Register";
import ModelRegistration from "./pages/register/model/ModelRegistration";
import DesignerRegistration from "./pages/register/designer/DesignerRegistration";
import SponsorRegistration from "./pages/register/sponsor/SponsorRegistration";
import Confirmation from "./pages/confirmation/Confirmation";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/model" element={<ModelRegistration />} />
              <Route path="/register/designer" element={<DesignerRegistration />} />
              <Route path="/register/sponsor" element={<SponsorRegistration />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;