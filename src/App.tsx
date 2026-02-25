import TopBar from "./components/TopBar.tsx";
import HeroOrange from "./components/HeroOrange.tsx";
import WhyChooseLight from "./components/WhyChooseLight.tsx";
import PortfolioLight from "./components/PortfolioLight.tsx";
import ServicesDark from "./components/ServicesDark.tsx";
import ProcessLight from "./components/ProcessLight.tsx";
import TestimonialsDark from "./components/TestimonialsDark.tsx";
import PricingLight from "./components/PircingLight.tsx";
import FaqLight from "./components/FaqLight.tsx";
import BlogLight from "./components/BlogLight.tsx";
import ContactOrange from "./components/ContactOrange.tsx";
import FooterDark from "./components/FooterDark.tsx";
/* import StripeDivider from "./components/ui/StripeDivider.tsx"; */

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <TopBar />
      <HeroOrange />
      <WhyChooseLight />
      <PortfolioLight />
      <ServicesDark />
      <ProcessLight />
      <TestimonialsDark />
      <PricingLight />
      <FaqLight />
      <BlogLight />
      <ContactOrange />

      <FooterDark />
    </div>
  );
}