import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import Features from "@/components/landing/Features";
import ApiCatalog from "@/components/landing/ApiCatalog";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import Changelog from "@/components/landing/Changelog";
import Faq from "@/components/landing/Faq";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/landing/AuthModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-brand-purple/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <ApiCatalog />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Changelog />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}
