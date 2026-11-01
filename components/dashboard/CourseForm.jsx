"use client";
import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export default function CourseForm({ isOpen, onClose, onAdd }) {
  const [courseData, setCourseData] = useState({
    title: "",            // مثل: كورس الخلاصة | Turkish Survival
    badge: "",            // مثل: شائع ومهم
    offers: [""],         // ماذا يقدم البرنامج؟ (قائمة من النقاط)
    system: "",           // نظام البرنامج
    target: "",           // الفئة المستهدفة
    buttonText: "",       // نص زر التسجيل مثل (اكتشف كورس الخلاصة)
  });

  // إضافة نقطة جديدة في قسم "ماذا يقدم البرنامج؟"
  const handleAddOffer = () => {
    setCourseData({ ...courseData, offers: [...courseData.offers, ""] });
  };

  // تعديل نقطة محددة
  const handleOfferChange = (index, value) => {
    const updatedOffers = [...courseData.offers];
    updatedOffers[index] = value;
    setCourseData({ ...courseData, offers: updatedOffers });
  };

  // حذف نقطة
  const handleRemoveOffer = (index) => {
    const updatedOffers = courseData.offers.filter((_, i) => i !== index);
    setCourseData({ ...courseData, offers: updatedOffers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseData.title) return;

    // تنظيف النقاط الفارغة
    const cleanedData = {
      ...courseData,
      id: Date.now(),
      offers: courseData.offers.filter((item) => item.trim() !== ""),
    };

    onAdd(cleanedData);
    
    // إعادة تعيين النموذج
    setCourseData({
      title: "",
      badge: "",
      offers: [""],
      system: "",
      target: "",
      buttonText: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-[#06262a] border border-gray-100 dark:border-white/10 p-6 sm:p-8 shadow-2xl text-gray-800 dark:text-white max-h-[90vh] overflow-y-auto">
        
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 border-b border-gray-100 dark:border-white/10 pb-4">
          <h3 className="text-xl font-black text-[#06262a] dark:text-teal-300">إضافة بيانات تفاصيل الكورس</h3>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">أدخل التفاصيل لتظهر بدقة داخل النافذة المنبثقة للطلاب.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* عنوان الكورس والشارة */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-200">عنوان الكورس الرئيسي *</label>
              <input 
                type="text" 
                required
                placeholder="مثال: كورس الخلاصة | Turkish Survival"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-200">الشارة (Badge)</label>
              <input 
                type="text" 
                placeholder="مثال: شائع ومهم"
                value={courseData.badge}
                onChange={(e) => setCourseData({ ...courseData, badge: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* ماذا يقدم البرنامج؟ (قائمة نقاط ديناميكية) */}
          <div className="space-y-3 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-teal-600 dark:text-teal-300">ماذا يقدم البرنامج؟ (نقاط الإنجاز)</label>
              <button
                type="button"
                onClick={handleAddOffer}
                className="px-3 py-1 rounded-lg bg-teal-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-teal-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة نقطة</span>
              </button>
            </div>

            {courseData.offers.map((offer, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`النقطة رقم ${index + 1} (مثال: التدريب على التواصل في المطاعم...)`}
                  value={offer}
                  onChange={(e) => handleOfferChange(index, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 text-xs focus:outline-none focus:border-teal-500"
                />
                {courseData.offers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOffer(index)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* نظام البرنامج */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-200">نظام البرنامج</label>
            <textarea 
              rows={2}
              placeholder="مثال: جزآن، يتكوّن كل جزء من 8 محاضرات، مع تدريبات عملية وممارسة مستمرة."
              value={courseData.system}
              onChange={(e) => setCourseData({ ...courseData, system: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* الفئة المستهدفة */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-200">الفئة المستهدفة</label>
            <textarea 
              rows={2}
              placeholder="مثال: المبتدئون من الصفر، والمسافرون إلى تركيا، والمقيمون فيها..."
              value={courseData.target}
              onChange={(e) => setCourseData({ ...courseData, target: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* نص زر التسجيل */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-200">نص زر التسجيل السفلي</label>
            <input 
              type="text" 
              placeholder="مثال: اكتشف كورس الخلاصة (سجّل الآن)"
              value={courseData.buttonText}
              onChange={(e) => setCourseData({ ...courseData, buttonText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* زر الحفظ */}
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-[#06262a] hover:bg-[#0b363b] text-white font-bold text-sm shadow-xl transition-all cursor-pointer mt-4"
          >
            حفظ وإضافة بيانات النافذة
          </button>

        </form>
      </div>
    </div>
  );
}