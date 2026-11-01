"use client";
import { useState, useEffect } from "react";
import { Sparkles, ArrowLeft, CheckCircle2, Target, Clock, X } from "lucide-react";
import PriceModal from "./PriceModal";

const defaultAcademyCourses = [
  {
    id: "academic-levels",
    level: "01",
    title: "المستويات الأكاديمية | Academic Levels",
    shortDesc: "برنامج تعليمي متكامل لتعلّم اللغة التركية من المستوى المبتدئ إلى المتقدم، وفق منهج أكاديمي منظّم يشمل جميع المستويات من A1 إلى C1، ويجمع بين القواعد والمفردات والمهارات اللغوية الأربع.",
    target: "المبتدئون من الصفر، والراغبون في تطوير مستواهم باللغة التركية حتى المستوى المتقدم C1.",
    ctaText: "استكشف المستويات",
    badge: "منهج متكامل",
    details: [
      "منهج أكاديمي منظّم وفق المستويات A1 – A2 – B1 – B2 – C1.",
      "تطوير مهارات الاستماع والتحدث والقراءة والكتابة بصورة متوازنة.",
      "تعلّم القواعد والمفردات وتطبيقها في مواقف ومحادثات متنوعة.",
      "محاضرات تفاعلية تجمع بين الشرح والممارسة العملية.",
      "تدريبات وواجبات واختبارات دورية لقياس التقدّم.",
      "متابعة مستمرة لمساعدة الطالب على تطوير مستواه."
    ]
  },
  {
    id: "turkish-survival",
    level: "02",
    title: "كورس الخلاصة | Turkish Survival",
    shortDesc: "برنامج عملي مكثّف لتعلّم المحادثات والتعبيرات الأكثر استخدامًا في الحياة اليومية داخل تركيا، يساعدك على التعامل مع المواقف المختلفة والتواصل بثقة، حتى إن كنت تبدأ من الصفر.",
    target: "المبتدئون من الصفر، والمسافرون إلى تركيا، والمقيمون فيها، وكل من يحتاج إلى اللغة التركية للتواصل في الحياة اليومية.",
    system: "جزآن، يتكوّن كل جزء من 8 محاضرات، مع تدريبات عملية وممارسة مستمرة.",
    ctaText: "اكتشف كورس الخلاصة",
    badge: "شائع ومهم",
    details: [
      "التدريب على التواصل في المطاعم والمتاجر والمواصلات والفنادق والأماكن العامة.",
      "فهم الأسئلة والردود الشائعة والاستجابة لها بصورة مناسبة.",
      "التعبير عن الاحتياجات والطلبات والاستفسار عن الخدمات المختلفة.",
      "التعامل مع المواقف اليومية غير المتوقعة وطلب المساعدة وتوضيح المشكلات.",
      "تعلّم التعبيرات المتداولة في المجتمع التركي واستخدامها بصورة طبيعية.",
      "اكتساب الثقة في التواصل اليومي وتقليل الاعتماد على الترجمة."
    ]
  },
  {
    id: "turkish-conversation",
    level: "03",
    title: "كورس المحادثة | Turkish Conversation",
    shortDesc: "برنامج تدريبي متخصّص في تطوير مهارات المحادثة باللغة التركية وفق المستوى الأكاديمي للطالب، من خلال مناقشات وتدريبات تفاعلية تساعد على استخدام اللغة بطلاقة وثقة أكبر.",
    target: "الطلاب الذين يمتلكون معرفة سابقة باللغة التركية ويرغبون في تطوير مهارات المحادثة وفق مستواهم.",
    system: "8 محاضرات تفاعلية، مدة كل محاضرة ساعتان، ضمن مجموعات مناسبة للمستوى الأكاديمي.",
    ctaText: "طوّر مهارات المحادثة",
    badge: "الأكثر طلباً",
    details: [
      "تطوير الطلاقة وتحسين النطق والقدرة على التحدث بصورة طبيعية.",
      "توظيف القواعد والمفردات المكتسبة في محادثات ومناقشات واقعية.",
      "تحسين سرعة الاستجابة وفهم الأسئلة وإدارة الحوار.",
      "تطوير القدرة على التعبير عن الأفكار والآراء والتجارب الشخصية.",
      "ممارسة موضوعات متنوعة تتناسب مع المستوى الأكاديمي للطالب.",
      "تصحيح الأخطاء الشائعة وزيادة الثقة أثناء التحدث باللغة التركية."
    ]
  },
  {
    id: "friends-course",
    level: "04",
    title: "كورس الصحاب | Friends Course",
    shortDesc: "تعلّم اللغة التركية مع أصدقائك في مجموعة خاصة من شخصين أو ثلاثة، من خلال برنامج تعليمي يناسب مستواكم وأهدافكم، مع مرونة في اختيار المواعيد وتجربة تعليمية أكثر تفاعلًا.",
    target: "الأصدقاء الذين يرغبون في تعلّم اللغة التركية معًا ضمن مجموعة تعليمية خاصة.",
    system: "شخصان أو ثلاثة في المجموعة مع مواعيد مرنة وأسعار خاصة حسب العدد.",
    ctaText: "احجز مع أصدقائك",
    badge: "مجموعات خاصة",
    details: [
      "مجموعات خاصة تضم شخصين أو ثلاثة أشخاص.",
      "اختيار البرنامج المناسب، سواء المستويات الأكاديمية أو المحادثة.",
      "إمكانية تنسيق مواعيد الدراسة بما يناسب المشاركين.",
      "محاضرات تفاعلية تتيح فرصة أكبر للمشاركة والتدريب.",
      "متابعة مستمرة وأنشطة مشتركة تساعد على تطوير المهارات.",
      "رسوم دراسية خاصة تختلف حسب عدد المشاركين."
    ]
  },
  {
    id: "private-lessons",
    level: "05",
    title: "الدروس الخاصة | Private Lessons",
    shortDesc: "برنامج تعليمي فردي مصمّم خصيصًا وفق مستواك وأهدافك، يمنحك فرصة تعلّم اللغة التركية بالسرعة المناسبة لك، مع التركيز على احتياجاتك ومتابعة شخصية مستمرة.",
    target: "الطلاب الذين يفضّلون الدراسة الفردية أو يحتاجون إلى برنامج تعليمي مخصّص.",
    ctaText: "احجز دروسك الخاصة",
    badge: "خاص ومكثف",
    details: [
      "محاضرات فردية مباشرة مع المدرّس.",
      "خطة دراسية مخصّصة وفق مستوى الطالب وأهدافه.",
      "التركيز على المهارات التي يحتاج الطالب إلى تطويرها.",
      "مرونة في تحديد المواعيد وسرعة التقدّم.",
      "تدريبات فردية وتقييم مستمر للمستوى.",
      "إمكانية التركيز على المحادثة أو الدراسة الأكاديمية وفق هدف الطالب."
    ]
  },
  {
    id: "turkish-for-kids",
    level: "06",
    title: "اللغة التركية للأطفال | Turkish for Kids",
    shortDesc: "برنامج تعليمي تفاعلي لتعليم الأطفال اللغة التركية بطريقة مبسّطة وممتعة، من خلال الأنشطة والألعاب التعليمية والمحادثات المناسبة لأعمارهم ومستوياتهم.",
    target: "الأطفال الراغبون في تعلّم اللغة التركية من البداية أو تطوير مهاراتهم.",
    ctaText: "اكتشف برنامج الأطفال",
    badge: "للصغار",
    details: [
      "تعلّم الحروف والأصوات والمفردات الأساسية.",
      "اكتساب التعبيرات والجمل المستخدمة في الحياة اليومية.",
      "تطوير مهارات الاستماع والنطق والتحدث بصورة تدريجية.",
      "أنشطة وألعاب تعليمية تساعد على تثبيت المعلومات.",
      "تدريبات ومحادثات بسيطة تشجّع الطفل على استخدام اللغة.",
      "محتوى تعليمي يراعي عمر الطفل ومستواه وقدرته على الاستيعاب."
    ]
  }
];

export default function Courses() {
  const [courses, setCourses] = useState(defaultAcademyCourses);
  const [selectedDetailsCourse, setSelectedDetailsCourse] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedRegisterCourseTitle, setSelectedRegisterCourseTitle] = useState("");

  // جلب الكورسات المضافة من الداش بورد عبر الـ localStorage دمجها مع الافتراضية
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("academy_courses") || "[]");
    if (savedCourses.length > 0) {
      // تنسيق الكورسات المضافة لتتطابق مع هيكلية العرض
      const formattedSavedCourses = savedCourses.map((c, index) => ({
        id: c.id || `custom-${index}`,
        level: c.level || `0${defaultAcademyCourses.length + index + 1}`,
        title: c.title,
        shortDesc: c.description || c.shortDesc || "برنامج تدريبي مميز لتطوير مهارات اللغة التركية.",
        target: c.target || c.targetAudience || "جميع الراغبين في التعلم.",
        system: c.system || c.studySystem || "",
        ctaText: c.buttonText || "سجّل الآن",
        badge: c.badge || "جديد",
        details: c.offers || c.details || ["دراسة تفاعلية", "متابعة مستمرة"]
      }));
      setCourses([...defaultAcademyCourses, ...formattedSavedCourses]);
    }
  }, []);

  const handleOpenDetails = (course) => {
    setSelectedDetailsCourse(course);
  };

  const handleOpenRegister = (courseTitle) => {
    setSelectedRegisterCourseTitle(courseTitle);
    setSelectedDetailsCourse(null);
    setIsRegisterModalOpen(true);
  };

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* رأس القسم */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06262a]/10 border border-[#06262a]/20 text-[#06262a] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            برامج ودورات معتمدة
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-color)] mb-4">
            برامجنا التعليمية 
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            اكتشف برامجنا التعليمية المتنوعة، المصمّمة لتناسب مختلف المستويات والأهداف، سواء كنت تبدأ تعلّم اللغة التركية من الصفر، أو تسعى إلى تطوير مهاراتك والتواصل بثقة وطلاقة.
          </p>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="group rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 shadow-sm hover:border-[#06262a]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3.5 py-1 rounded-xl text-white font-black text-sm bg-[#06262a] shadow-sm">
                    {course.level}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {course.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[var(--text-color)] mb-3 group-hover:text-red-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  {course.shortDesc}
                </p>
              </div>

              <div>
                <button 
                  onClick={() => handleOpenDetails(course)}
                  className="w-full py-3 rounded-xl bg-[#06262a] text-white font-bold text-sm hover:bg-[#0b363b] shadow-md shadow-[#06262a]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>عرض التفاصيل</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* نافذة التفاصيل Modal (Form) */}
      {selectedDetailsCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto" dir="rtl">
            
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelectedDetailsCourse(null)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* العنوان والشارة */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-md bg-red-50 text-red-600 font-bold text-xs mb-2">
                {selectedDetailsCourse.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#06262a]">
                {selectedDetailsCourse.title}
              </h3>
            </div>

            {/* ماذا يقدم البرنامج */}
            <div className="mb-6">
              <h4 className="text-sm font-black text-[#06262a] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>ماذا يقدّم البرنامج؟</span>
              </h4>
              <ul className="space-y-2.5">
                {selectedDetailsCourse.details && selectedDetailsCourse.details.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* نظام البرنامج إن وجد */}
            {selectedDetailsCourse.system && (
              <div className="mb-6 p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                <h4 className="text-xs font-black text-teal-900 mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>نظام البرنامج:</span>
                </h4>
                <p className="text-xs text-teal-800 font-medium">
                  {selectedDetailsCourse.system}
                </p>
              </div>
            )}

            {/* الفئة المستهدفة */}
            {selectedDetailsCourse.target && (
              <div className="mb-8 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-xs font-black text-[#06262a] mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-red-600" />
                  <span>الفئة المستهدفة:</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedDetailsCourse.target}
                </p>
              </div>
            )}

            {/* زر التسجيل داخل النافذة باللون البترولي */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleOpenRegister(selectedDetailsCourse.title)}
                className="w-full py-3.5 rounded-xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-sm shadow-lg shadow-[#06262a]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{selectedDetailsCourse.ctaText} (سجّل الآن)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* نافذة التسجيل وحساب الواتساب */}
      <PriceModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
        courseLevel={selectedRegisterCourseTitle} 
      />
    </section>
  );
}