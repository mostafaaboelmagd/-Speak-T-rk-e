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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--card-bg)]/30 border-y border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* عنوان القسم */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-color)] mb-4">
            لماذا تختار Speak Türkçe؟
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            نوفر لك بيئة تعليمية متكاملة تضمن لك تجربة فريدة ونتائج ملموسة من الأسبوع الأول.
          </p>
        </div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 flex flex-col items-start"
              >
                {/* حاوية الأيقونة الاحترافية */}
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400 mb-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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