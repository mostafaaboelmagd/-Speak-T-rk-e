"use client";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const navItems = [
    { id: "home", label: "الرئيسية", href: "/" },
    { id: "courses", label: "المستويات والدورات", href: "#courses" },
    { id: "features", label: "مميزات الأكاديمية", href: "#features" },
    { id: "testimonials", label: "آراء الطلاب", href: "#testimonials" },
  ];

  // ميزة Scroll Spy لتحديد العنصر النشط تلقائياً أثناء التمرير
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const sectionId = item.href.replace("#", "");
        if (sectionId === "/") {
          if (window.scrollY < 300) {
            setActiveNav("home");
          }
          continue;
        }

        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* === شاشات الموبايل: ترتيب متناسق (زر القائمة يمين + الشعار يسار) === */}
        <div className="flex items-center justify-between w-full md:hidden">
          {/* زر القائمة المنسدلة */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-gray-100 text-gray-800 border border-gray-200 text-lg cursor-pointer shadow-sm"
            title="القائمة"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* الشعار واسم الموقع للموبايل */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-black tracking-wide text-[#06262a]">
              Speak Türkçe
            </span>
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm border border-gray-200">
              <Image
                src="/logo.png"
                alt="Speak Türkçe Logo"
                fill
                sizes="36px"
                priority
                className="object-cover"
              />
            </div>
          </Link>
        </div>

        {/* === شاشات الديسكتوب (Desktop) === */}

        {/* 1. الشعار واسم الموقع */}
        <Link href="/" className="hidden md:flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-sm border border-gray-200">
            <Image
              src="/logo.png"
              alt="Speak Türkçe Logo"
              fill
              sizes="44px"
              priority
              className="object-cover"
            />
          </div>
          <span className="text-xl font-black tracking-wide text-[#06262a]">
            Speak Türkçe
          </span>
        </Link>

        {/* 2. روابط التنقل الرئيسية */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 text-sm font-bold text-gray-700">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#06262a] text-white shadow-sm"
                    : "hover:bg-gray-200/60 hover:text-[#06262a]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* 3. أزرار أقصى اليسار */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/201505591825"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-sm shadow-md shadow-[#06262a]/20 transition-all transform hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>تواصل معنا</span>
          </a>
        </div>
      </div>

      {/* القائمة المنسدلة للهواتف المحمولة */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2 text-base font-medium text-gray-800">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-[#06262a] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-gray-100">
              <a
                href="https://wa.me/201505591825"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>تواصل معنا</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}