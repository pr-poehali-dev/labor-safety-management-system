
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import DocumentsManager from "./pages/DocumentsManager";
import EventsManager from "./pages/EventsManager";
import EventsCalendar from "./pages/EventsCalendar";
import ReportsPage from "./pages/ReportsPage";
import TrainingManager from "./pages/TrainingManager";
import SoutManager from "./pages/SoutManager";
import SizManager from "./pages/SizManager";
import MedicalManager from "./pages/MedicalManager";
import IncidentsManager from "./pages/IncidentsManager";
import ControlManager from "./pages/ControlManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute>
                  <SuperAdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/documents"
              element={
                <ProtectedRoute>
                  <DocumentsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <EventsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/calendar"
              element={
                <ProtectedRoute>
                  <EventsCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/training"
              element={
                <ProtectedRoute>
                  <TrainingManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sout"
              element={
                <ProtectedRoute>
                  <SoutManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/siz"
              element={
                <ProtectedRoute>
                  <SizManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/medical"
              element={
                <ProtectedRoute>
                  <MedicalManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/incidents"
              element={
                <ProtectedRoute>
                  <IncidentsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/control"
              element={
                <ProtectedRoute>
                  <ControlManager />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;