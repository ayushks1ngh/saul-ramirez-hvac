import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ACRepair from "./pages/ACRepair";
import ACInstallation from "./pages/ACInstallation";
import HeatingRepair from "./pages/HeatingRepair";
import HVACMaintenance from "./pages/HVACMaintenance";
import ServiceAreas from "./pages/ServiceAreas";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return <Routes><Route path="/admin" element={<Admin />} /></Routes>;
  }

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ac-repair" element={<ACRepair />} />
          <Route path="/ac-installation" element={<ACInstallation />} />
          <Route path="/heating-repair" element={<HeatingRepair />} />
          <Route path="/hvac-maintenance" element={<HVACMaintenance />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
