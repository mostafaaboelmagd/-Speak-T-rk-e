"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* خلفية جمالية متوهجة خفيفة */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="/Image .png"
          alt="Background Effect"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-color)] leading-tight sm:leading-tight mb-6">
          تحدث التركية بطلاقة مع{" "}
          <span className="bg-gradient-to-r from-[#06262a] via-red-600 to-[#06262a] bg-clip-text text-transparent">
            Speak Türkçe
          </span>
        </h1>

        {/* الوصف التعريفي */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          دورات تفاعلية ومناهج متطورة مصممة خصيصاً للطلاب العرب لتأخذ بيدك من
          الصفر وحتى الاحتراف الكامل وتحدث اللغة بثقة.
        </p>

        {/* أزرار التفاعل (Call to Action) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#courses"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-base shadow-lg shadow-[#06262a]/30 transition-all transform hover:-translate-y-0.5 text-center"
          >
            تصفح المستويات والدورات
          </a>

          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[var(--card-bg)] text-[var(--text-color)] border border-[var(--border-color)] font-bold text-base hover:opacity-90 transition-all text-center shadow-sm"
          >
            مميزات الأكاديمية
          </a>
        </div>

        {/* إحصائيات سريعة تحت الأزرار */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 pt-12 border-t border-[var(--border-color)] w-full max-w-3xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#06262a] mb-1">
              +٥,٠٠٠
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              طالب مستفيد
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#06262a] mb-1">
              مستويات معتمدة
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              من الصفر للاحتراف
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-black text-[#06262a] mb-1">
              دعم مستمر
            </div>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              متابعة تفاعلية
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
