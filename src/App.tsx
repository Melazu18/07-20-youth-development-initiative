import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import LanguageRouter from "@/routes/LanguageRouter";
import i18n from "@/i18n";
import Team from "./pages/Team";
import Founder from "./pages/Team/Founder";
import Board from "./pages/Team/Board";
import Volunteers from "./pages/Team/Volunteers";

const queryClient = new QueryClient();

function RedirectToLang({ to }: { to: string }) {
  const lang = (i18n.language || "sv").slice(0, 2);
  return <Navigate to={`/${lang}${to}`} replace />;
}

function AppLoading() {
  const { t } = useTranslation();
  return <span>{t("common.loading")}</span>;
}

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
                <AppLoading />
              </div>
            }
          >
            {/* Remove the outer div with Header/Footer since Layout already has them */}
            <Routes>
              <Route path="/:lng" element={<LanguageRouter />}>
                <Route index element={<Index />} />
                <Route path="about" element={<About />} />
                <Route path="activities" element={<Activities />} />
                <Route path="auth" element={<Auth />} />
                <Route path="auth/youth" element={<AuthYouth />} />
                <Route path="auth/staff" element={<AuthStaff />} />
                <Route path="programs" element={<Programs />} />
                <Route
                  path="programs/school-support"
                  element={<SchoolSupport />}
                />
                <Route
                  path="programs/football"
                  element={<FootballDevelopment />}
                />
                <Route path="programs/mentorship" element={<Mentorship />} />
                <Route
                  path="programs/creative-skills"
                  element={<CreativeSkills />}
                />
                <Route
                  path="programs/social-integration"
                  element={<SocialIntegration />}
                />
                <Route path="contact" element={<Contact />} />
                <Route path="safeguarding" element={<Safeguarding />} />
                <Route path="data-protection" element={<DataProtection />} />
                <Route
                  path="financial-transparency"
                  element={<FinancialTransparency />}
                />
                <Route
                  path="conflict-of-interest"
                  element={<ConflictOfInterest />}
                />
                <Route path="team" element={<Team />} />
                <Route path="team/founder" element={<Founder />} />
                <Route path="team/board" element={<Board />} />
                <Route path="team/volunteers" element={<Volunteers />} />

                <Route
                  path="admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboard />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="staff"
                  element={
                    <RequireStaff>
                      <StaffDashboard />
                    </RequireStaff>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/" element={<RedirectToLang to="" />} />
              <Route path="/about" element={<RedirectToLang to="/about" />} />
              <Route
                path="/activities"
                element={<RedirectToLang to="/activities" />}
              />
              <Route path="/auth" element={<RedirectToLang to="/auth" />} />
              <Route
                path="/auth/youth"
                element={<RedirectToLang to="/auth/youth" />}
              />
              <Route
                path="/auth/staff"
                element={<RedirectToLang to="/auth/staff" />}
              />
              <Route
                path="/programs"
                element={<RedirectToLang to="/programs" />}
              />
              <Route
                path="/programs/school-support"
                element={<RedirectToLang to="/programs/school-support" />}
              />
              <Route
                path="/programs/football"
                element={<RedirectToLang to="/programs/football" />}
              />
              <Route
                path="/programs/mentorship"
                element={<RedirectToLang to="/programs/mentorship" />}
              />
              <Route
                path="/programs/creative-skills"
                element={<RedirectToLang to="/programs/creative-skills" />}
              />
              <Route
                path="/programs/social-integration"
                element={<RedirectToLang to="/programs/social-integration" />}
              />
              <Route
                path="/contact"
                element={<RedirectToLang to="/contact" />}
              />
              <Route
                path="/safeguarding"
                element={<RedirectToLang to="/safeguarding" />}
              />
              <Route
                path="/data-protection"
                element={<RedirectToLang to="/data-protection" />}
              />
              <Route
                path="/financial-transparency"
                element={<RedirectToLang to="/financial-transparency" />}
              />
              <Route
                path="/conflict-of-interest"
                element={<RedirectToLang to="/conflict-of-interest" />}
              />
              <Route path="/admin" element={<RedirectToLang to="/admin" />} />
              <Route path="/staff" element={<RedirectToLang to="/staff" />} />
              <Route path="/team" element={<RedirectToLang to="/team" />} />
              <Route
                path="/team/founder"
                element={<RedirectToLang to="/team/founder" />}
              />
              <Route
                path="/team/board"
                element={<RedirectToLang to="/team/board" />}
              />
              <Route
                path="/team/volunteers"
                element={<RedirectToLang to="/team/volunteers" />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
