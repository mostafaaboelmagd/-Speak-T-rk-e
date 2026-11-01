"use client";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#06262a] border-t border-[#0b363b] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
        {/* العمود الأول: اللوجو والنبذة التعريفية */}
        <div className="md:col-span-5 space-y-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border border-white/20 bg-white/10">
              <Image
                src="/logo.png"
                alt="Speak Türkçe Logo"
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <span className="text-xl font-black tracking-wide text-white">
              Speak Türkçe
            </span>
          </Link>

          <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
            المنصة الأولى المخصصة لتعلم واحتراف اللغة التركية بأسلوب تفاعلي
            ومناهج معتمدة وفق المعايير الأوروبية (CEFR) من الصفر وحتى الطلاقة.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            معك من الصفر حتى الاحتراف
          </div>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-black tracking-wider uppercase text-teal-300">
            روابط سريعة
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <a
                href="#courses"
                className="hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                المستويات والدورات
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                مميزات الأكاديمية
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                آراء الطلاب
              </a>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: معلومات التواصل */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-sm font-black tracking-wider uppercase text-teal-300">
            تواصل معنا
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <a
                href="https://wa.me/201505591825"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-red-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-teal-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+20 150 559 1825</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-teal-300">
                <Globe className="w-4 h-4" />
              </div>
              <span>محاضرات تفاعلية أونلاين</span>
            </li>
          </ul>
        </div>
      </div>

      {/* الشريط السفلي للحقوق */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© 2026 Speak Türkçe. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">
            سياسة الخصوصية
          </a>
          <a href="#" className="hover:text-white transition-colors">
            شروط الاستخدام
          </a>
        </div>
      </div>
    </footer>
  );
}
