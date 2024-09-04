import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AppFooter from "./components/shared/AppFooter";
import AppHeader from "./components/shared/AppHeader";
import "./css/App.css";
import UseScrollToTop from "./hooks/useScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/login/ProtectedRoute"; // Importa el componente de ruta protegida

const Home = lazy(() => import("./pages/Home"));
const Workers = lazy(() => import("./pages/Workers"));
const Form = lazy(() => import("./pages/Form"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <AnimatePresence>
      <div className="bg-secondary-light dark:bg-primary-dark transition duration-300">
        <ToastContainer />
        <Router>
          <ScrollToTop />
          <AppHeader />
          <Suspense fallback={""}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="workers" element={<Workers />} />
              <Route path="form" element={<Form />} />
              <Route path="login" element={<LoginPage />} />

              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>
            </Routes>
          </Suspense>
          <AppFooter />
        </Router>
        <UseScrollToTop />
      </div>
      <Analytics />
    </AnimatePresence>
  );
}

export default App;
