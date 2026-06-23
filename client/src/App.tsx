// Generation Faraday UK - v3.1
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import HowItWorks from "./pages/HowItWorks";
import Compare from "./pages/Compare";
import AppPage from "./pages/AppPage";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import Implementation from "./pages/Implementation";
import FundingGuide from "./pages/FundingGuide";
import StaffFeedbackReport from "./pages/StaffFeedbackReport";
import WinterPromo from "./pages/WinterPromo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import RequestQuote from "./pages/RequestQuote";
import CustomerPortal from "./pages/CustomerPortal";
import Bundles from "./pages/Bundles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/products" component={Products} />
      <Route path="/products/:sku" component={ProductDetail} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/compare" component={Compare} />
      <Route path="/app" component={AppPage} />
      <Route path="/resources" component={Resources} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={Blog} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/implementation" component={Implementation} />
      <Route path="/funding-guide" component={FundingGuide} />
      <Route path="/staff-feedback-report" component={StaffFeedbackReport} />
      <Route path="/winter-2026-promo" component={WinterPromo} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/request-quote" component={RequestQuote} />
      <Route path="/customer-portal" component={CustomerPortal} />
      <Route path="/bundles" component={Bundles} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Navbar />
          <Router />
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
