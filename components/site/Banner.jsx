"use client";
import Image from "next/image";
import { Phone, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function Banner({ onOpenRegister }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#06262a] p-8 sm:p-12 md:p-16 shadow-2xl border border-teal-500/30 text-white">
          {/* الخلفية مع تعديل الشفافية لتكون أفتح وأوضح */}
          <div className="absolute inset-0 z-0 opacity-50">
            <Image
              src="/Image .png"
              alt="Speak Türkçe Background"
              fill
              priority
              className="object-cover object-center"
            />
            {/* تدرج لوني يترك جهة الأزرار أفتح وأكثر إضاءة */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#083339]/90 via-[#06262a]/70 to-[#021012]/40" />
          </div>

          {/* إضاءات خلفية ناعمة */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* المحتوى والنصوص */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-teal-200 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>فرصتك المعتمدة لاحتراف اللغة التركية</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.2] tracking-tight text-white drop-shadow-md">
                هل أنت مستعد لإتقان اللغة التركية{" "}
                <span className="text-teal-300 underline decoration-teal-400/50 underline-offset-8">
                  بطلاقة؟
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-100 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0 drop-shadow">
                انضم إلينا اليوم في أكاديمية Speak Türkçe واحصل على متابعة شخصية
                ومنهج معتمد وفق المعايير الأوروبية يأخذ بيدك من الصفر وحتى
                الاحتراف الكامل.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-gray-100">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                  <span>محاضرات تفاعلية أونلاين</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                  <span>مناهج معتمدة CEFR</span>
                </div>
              </div>
            </div>

            {/* الأزرار بوضوح وإضاءة ممتازة */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 w-full pt-4 lg:pt-0">
              {/* زر احجز مقعدك الآن بلون بترولي فاتح وواضح */}
              <a
                href="https://wa.me/201505591825?text=مرحباً،%20أرغب%20في%20التسجيل%20وحجز%20مقعد%20في%20أكاديمية%20Speak%20Türkçe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto lg:w-full px-8 py-4 rounded-2xl bg-[#0d4b53] hover:bg-[#115e68] text-white font-black text-base border border-teal-400/50 shadow-xl shadow-black/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer no-underline"
              >
                <Phone className="w-5 h-5 text-teal-300" />
                <span>احجز مقعدك الآن</span>
                <span dir="ltr" className="text-teal-200 font-bold">
                  +20 150 559 1825
                </span>
              </a>

              {/* زر تصفح الدورات بتأثير زجاجي واضح */}
              <a
                href="#courses"
                className="w-full sm:w-auto lg:w-full px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-base border border-white/30 backdrop-blur-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg"
              >
                <span>تصفح الدورات</span>
                <ArrowLeft className="w-5 h-5 text-teal-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
