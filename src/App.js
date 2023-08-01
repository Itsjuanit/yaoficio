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
const Home = lazy(() => import("./pages/Home"));
const Workers = lazy(() => import("./pages/Workers"));
const Form = lazy(() => import("./pages/Form"));

function App() {
  return (
    <AnimatePresence>
      <div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
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
    </AnimatePresence>
  );
}

export default App;
