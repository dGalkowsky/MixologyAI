import TopBar from "./components/TopBar.tsx";
import Hero from "./components/Hero.tsx";
import WhyChooseLight from "./components/WhyChooseLight.tsx";
import Portfolio from "./components/Portfolio.tsx";
import Service from "./components/Service.tsx";
import Process from "./components/Process.tsx";
import Opinions from "./components/Opinions.tsx";
import Footer from "./components/Footer.tsx";


export default function App() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <TopBar />
      <Hero />
      <WhyChooseLight />
      <Portfolio />
      <Service />
      <Process />
      <div className="flex flex-col min-h-[100svh]">
        <Opinions />
        <Footer />
      </div>
    </div>
  );
}