import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Index from "./pages/Index";
import About from "./pages/About";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Safeguarding from "./pages/Safeguarding";
import DataProtection from "./pages/DataProtection";
import FinancialTransparency from "./pages/FinancialTransparency";
import ConflictOfInterest from "./pages/ConflictOfInterest";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthYouth from "./pages/AuthYouth";
import AuthStaff from "./pages/AuthStaff";
import Programs from "./pages/programs/Programs";
import SchoolSupport from "./pages/programs/SchoolSupport";
import FootballDevelopment from "./pages/programs/FootballDevelopment";
import Mentorship from "./pages/programs/Mentorship";
import CreativeSkills from "./pages/programs/CreativeSkills";
import SocialIntegration from "./pages/programs/SocialIntegration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { RequireAdmin } from "@/lib/requireAdmin";
import StaffDashboard from "./pages/staff/StaffDashboard";
import { RequireStaff } from "@/lib/requireStaff";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                Loading...
              </div>
            }
          >
            {/* Remove the outer div with Header/Footer since Layout already has them */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/youth" element={<AuthYouth />} />
              <Route path="/auth/staff" element={<AuthStaff />} />
              <Route path="/programs" element={<Programs />} />
              <Route
                path="/programs/school-support"
                element={<SchoolSupport />}
              />
              <Route
                path="/programs/football"
                element={<FootballDevelopment />}
              />
              <Route path="/programs/mentorship" element={<Mentorship />} />
              <Route
                path="/programs/creative-skills"
                element={<CreativeSkills />}
              />
              <Route
                path="/programs/social-integration"
                element={<SocialIntegration />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/safeguarding" element={<Safeguarding />} />
              <Route path="/data-protection" element={<DataProtection />} />
              <Route
                path="/financial-transparency"
                element={<FinancialTransparency />}
              />
              <Route
                path="/conflict-of-interest"
                element={<ConflictOfInterest />}
              />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/staff"
                element={
                  <RequireStaff>
                    <StaffDashboard />
                  </RequireStaff>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;