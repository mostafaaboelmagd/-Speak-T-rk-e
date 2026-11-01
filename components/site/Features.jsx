'use client';
import { 
  GraduationCap, 
  MessageSquareText, 
  UsersRound, 
  Clock, 
  UserCheck, 
  Award 
} from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'مناهج معتمدة دولياً',
    description: 'محتوى تعليمي مصمم وفق معايير CEFR الأوروبية لضمان إتقان اللغة بأسلوب علمي مدروس.',
  },
  {
    icon: MessageSquareText,
    title: 'تركيز على التحدث والطلاقة',
    description: 'جلسات محادثة تفاعلية يومية وممارسات واقعية لتجاوز حاجز الخوف والتحدث بثقة.',
  },
  {
    icon: UserCheck,
    title: 'أساتذة ومدرسون متخصصون',
    description: 'نخبة من المعلمين المتميزين ذوي الخبرة الكبيرة في تدريس اللغة التركية للناطقين بالعربية.',
  },
  {
    icon: Clock,
    title: 'مرونة في المواعيد',
    description: 'جداول دراسية متنوعة تناسب الموظفين والطلاب مع إمكانية الوصول للتسجيلات في أي وقت.',
  },
  {
    icon: UsersRound,
    title: 'مجموعات تفاعلية صغيرة',
    description: 'عدد طلاب محدود في كل فصل لضمان حصول كل طالب على الاهتمام والتطبيق الفردي الكافي.',
  },
  {
    icon: Award,
    title: 'شهادات إتمام المستوي',
    description: 'احصل على شهادة اجتياز لكل مستوى تثبت كفاءتك وتدعم ملفك الأكاديمي والمهني.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* عنوان القسم */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-600 font-bold text-sm tracking-wider uppercase mb-3 inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100">
            مميزات الأكاديمية
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            لماذا تختار Speak Türkçe؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            نوفر لك بيئة تعليمية متكاملة تضمن لك تجربة فريدة ونتائج ملموسة من الأسبوع الأول.
          </p>
        </div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50 hover:border-teal-500/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start overflow-hidden"
              >
                {/* تأثير خلفية مضيئة خفيفة عند الهوفر */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/15 transition-all duration-500 pointer-events-none"></div>

                {/* حاوية الأيقونة الاحترافية */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}