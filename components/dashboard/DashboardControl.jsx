"use client";
import { useState, useEffect } from "react";
import { Check, Trash2, ShieldAlert, Star } from "lucide-react";

export default function DashboardControl() {
  const [reviews, setReviews] = useState([]);
  const [reviewsEnabled, setReviewsEnabled] = useState(true);

  // جلب البيانات من localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("academy_reviews") || "[]");
    setReviews(savedReviews);

    const isEnabled = JSON.parse(localStorage.getItem("academy_reviews_enabled") ?? "true");
    setReviewsEnabled(isEnabled);
  }, []);

  // التبديل بين تفعيل وإيقاف نموذج التقييمات للطلاب
  const toggleReviewsStatus = () => {
    const updatedStatus = !reviewsEnabled;
    setReviewsEnabled(updatedStatus);
    localStorage.setItem("academy_reviews_enabled", JSON.stringify(updatedStatus));
  };

  // الموافقة على رأي الطالب ونشره على الموقع
  const approveReview = (id) => {
    const updated = reviews.map((rev) =>
      rev.id === id ? { ...rev, status: "approved" } : rev
    );
    setReviews(updated);
    localStorage.setItem("academy_reviews", JSON.stringify(updated));
  };

  // حذف رأي الطالب نهائياً من الداش بورد والموقع
  const deleteReview = (id) => {
    const updated = reviews.filter((rev) => rev.id !== id);
    setReviews(updated);
    localStorage.setItem("academy_reviews", JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-4xl mx-auto space-y-8" dir="rtl">
      
      {/* مفتاح التحكم في تفعيل التقييمات */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200">
        <div>
          <h3 className="font-bold text-[#06262a] text-lg">استقبال آراء الطلاب</h3>
          <p className="text-xs text-gray-500">عند إيقاف التشغيل، لن يتمكن الطلاب من إرسال آراء جديدة.</p>
        </div>
        <button
          onClick={toggleReviewsStatus}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            reviewsEnabled ? "bg-teal-600 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          {reviewsEnabled ? "مُفعل حالياً" : "مُعطل"}
        </button>
      </div>

      {/* قائمة الآراء في الداش بورد */}
      <div>
        <h4 className="font-black text-xl text-[#06262a] mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-teal-600" />
          <span>آراء الطلاب الواردة ({reviews.length})</span>
        </h4>

        {reviews.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">لا توجد آراء مرسلة حتى الآن.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  rev.status === "approved"
                    ? "bg-teal-50/40 border-teal-200"
                    : "bg-amber-50/40 border-amber-200"
                }`}
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#06262a]">{rev.name}</span>
                    <span className="text-xs text-gray-400">({rev.course || "طالب الأكاديمية"})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rev.status === "approved"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {rev.status === "approved" ? "منشور للموقع" : "قيد المراجعة"}
                    </span>
                  </div>

                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (rev.rating || 5) ? "fill-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed pt-1">{rev.comment}</p>
                </div>

                {/* أزرار الإجراءات (نشر / حذف) */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {rev.status !== "approved" && (
                    <button
                      onClick={() => approveReview(rev.id)}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>موافقة ونشر</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}