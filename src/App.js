import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AppFooter from "./components/shared/AppFooter";
import AppHeader from "./components/shared/AppHeader";
import "./css/App.css";
import UseScrollToTop from "./hooks/useScrollToTop";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./css/ThemeMu";
const Home = lazy(() => import("./pages/Home"));
const Workers = lazy(() => import("./pages/Workers"));
const Form = lazy(() => import("./pages/Form"));
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
          <ToastContainer />
          <Router>
            <ScrollToTop />
            <AppHeader />
            <Suspense fallback={""}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="workers" element={<Workers />} />
                <Route path="form" element={<Form />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="login" element={<LoginPage />} />{" "}
              </Routes>
            </Suspense>
            <AppFooter />
          </Router>
          <UseScrollToTop />
        </div>
        <Analytics />
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
