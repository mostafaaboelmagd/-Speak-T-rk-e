import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Courses from "@/components/site/Courses";
import Features from "@/components/site/Features";
import Testimonials from "@/components/site/Testimonials"; 
import Banner from "@/components/site/Banner"; 
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Courses />
      <Features />
      <Testimonials />
      <Banner /> 
      <Footer />
    </main>
  );
}
