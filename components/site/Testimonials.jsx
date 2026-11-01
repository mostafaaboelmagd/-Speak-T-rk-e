"use client";
import { useState, useEffect } from "react";
import { Star, Send, Sparkles } from "lucide-react";

const academyCoursesList = [
  "المستويات الأكاديمية | Academic Levels",
  "كورس الخلاصة | Turkish Survival",
  "كورس المحادثة | Turkish Conversation",
  "كورس الصحاب | Friends Course",
  "الدروس الخاصة | Private Lessons",
  "اللغة التركية للأطفال | Turkish for Kids"
];

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [reviewsEnabled, setReviewsEnabled] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkReviewsStatus = () => {
      // 1. جلب آراء الطلاب
      const savedReviews = JSON.parse(localStorage.getItem("academy_reviews") || "[]");
      setReviews(savedReviews);

      // 2. جلب حالة التفعيل والتعطيل بدقة تامة ومطابقة نصية ومنطقية
      const statusValue = localStorage.getItem("academy_reviews_enabled");
      if (statusValue !== null) {
        // إذا كانت القيمة النصية false أو تم تخزينها بوولين false
        if (statusValue === "false" || statusValue === false) {
          setReviewsEnabled(false);
        } else {
          setReviewsEnabled(true);
        }
      } else {
        setReviewsEnabled(true);
      }
    };

    // التحقق الفوري عند التحميل
    checkReviewsStatus();

    // الاستماع لحدث التخزين
    window.addEventListener("storage", checkReviewsStatus);

    // فحص دوري كل نصف ثانية لضمان الاستجابة اللحظية الفورية عند تغيير الحالة من الداشبورد
    const interval = setInterval(checkReviewsStatus, 500);

    return () => {
      window.removeEventListener("storage", checkReviewsStatus);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !courseName || !comment) return;

    const newReview = {
      id: Date.now(),
      name: studentName,
      course: courseName,
      comment,
      rating,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("academy_reviews", JSON.stringify(updatedReviews));
    window.dispatchEvent(new Event("storage"));

    setStudentName("");
    setCourseName("");
    setComment("");
    setRating(5);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const approvedReviews = reviews.filter((r) => r.status === "approved");

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* رأس القسم */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06262a]/10 border border-[#06262a]/20 text-[#06262a] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            تجارب حقيقية
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-color)]">
            ماذا يقول طلابنا عن Speak Türkçe؟
          </h2>
        </div>

        {/* شبكة التقييمات المقبولة */}
        {approvedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">"{rev.comment}"</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <h4 className="font-bold text-[#06262a] text-sm">{rev.name}</h4>
                  <span className="text-xs text-gray-400">{rev.course}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm">كن أول من يشارك تجربته مع الأكاديمية!</p>
        )}

        {/* نموذج إرسال الرأي (يظهر فقط إذا كان مفعلاً تماماً) */}
        {reviewsEnabled ? (
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg space-y-6">
            <h3 className="text-xl font-bold text-center text-[#06262a]">شاركنا رأيك في الأكاديمية ✍️</h3>
            
            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold text-center">
                شكرًا لك! تم إرسال رأيك بنجاح وسيتم مراجعته ونشره قريباً.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* اسم الطالب */}
                <input
                  type="text"
                  placeholder="اسمك الكريم *"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#06262a]"
                />
                
                {/* اختيار الكورس (إجباري) */}
                <select
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-700 focus:outline-none focus:border-[#06262a] cursor-pointer"
                >
                  <option value="" disabled>اختر الكورس أو المستوى *</option>
                  {academyCoursesList.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>

                {/* نظام اختيار النجوم تفاعلي */}
                <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold text-gray-600">تقييمك للأكاديمية:</span>
                  <div className="flex items-center gap-2 dir-ltr">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* نص التقييم */}
                <textarea
                  placeholder="اكتب تجربتك ورأيك بكل صراحة... *"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#06262a]"
                />
                
                {/* زر الإرسال */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرأي للمراجعة</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center text-gray-500 text-sm">
            عذراً، استقبال آراء وتقييمات الطلاب موقوف حالياً من قبل الإدارة.
          </div>
        )}

      </div>
    </section>
  );
}