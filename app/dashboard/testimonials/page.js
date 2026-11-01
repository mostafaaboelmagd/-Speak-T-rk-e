'use client';
import { useState } from 'react';
import { Plus, Star, Trash2, CheckCircle2, X } from 'lucide-react';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'فاطمة الزهراء', course: 'A1 - المستوى المبتدئ الأول', rating: 5, comment: 'أكاديمية رائعة جداً، الشرح مبسط والأسلوب ممتاز في توصيل المعلومة.', status: 'منشور' },
    { id: 2, name: 'عمر الفاروق', course: 'B1 - المستوى المتوسط الأول', rating: 5, comment: 'استفدت كثيراً في المحادثة واللغة التركية أصبحت أسهل بكثير بفضل الأستاذة.', status: 'منشور' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', course: '', rating: '5', comment: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.comment) return;
    
    setTestimonials([...testimonials, { id: Date.now(), ...newTestimonial, rating: Number(newTestimonial.rating), status: 'منشور' }]);
    setNewTestimonial({ name: '', course: '', rating: '5', comment: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTestimonials(testimonials.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'منشور' ? 'معلق' : 'منشور'
        };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* رأس الصفحة وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">إدارة آراء الطلاب</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحكم في تقييمات وآراء الطلاب الظاهرة في الموقع الرئيسي.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          إضافة رأي جديد
        </button>
      </div>

      {/* جدول الآراء */}
      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b border-[var(--border-color)] text-gray-400 text-xs uppercase">
                <th className="p-4 font-bold">اسم الطالب</th>
                <th className="p-4 font-bold">الدورة / المستوى</th>
                <th className="p-4 font-bold">التقييم</th>
                <th className="p-4 font-bold">التعليق</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-gray-600 dark:text-gray-300">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--bg-color)]/50 transition-colors">
                  <td className="p-4 font-bold text-[var(--text-color)]">{item.name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold">
                      {item.course}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-gray-500 dark:text-gray-400">{item.comment}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        item.status === 'منشور' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.status}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة رأي جديد (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 sm:p-8 shadow-2xl text-[var(--text-color)]">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-gray-500 hover:text-[var(--text-color)] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black">إضافة رأي طالب جديد</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">أدخل تفاصيل تقييم الطالب ليظهر في قسم الآراء بالموقع.</p>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">اسم الطالب</label>
                <input 
                  type="text" 
                  required
                  placeholder="محمد علي"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">الدورة / المستوى</label>
                <input 
                  type="text" 
                  required
                  placeholder="A1 - المستوى المبتدئ الأول"
                  value={newTestimonial.course}
                  onChange={(e) => setNewTestimonial({...newTestimonial, course: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">التقييم (من 5)</label>
                <select 
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({...newTestimonial, rating: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500"
                >
                  <option value="5">5 نجوم - ممتاز</option>
                  <option value="4">4 نجوم - جيد جداً</option>
                  <option value="3">3 نجوم - جيد</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">نص الرأي أو التقييم</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="اكتب رأي الطالب هنا..."
                  value={newTestimonial.comment}
                  onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-teal-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all cursor-pointer"
              >
                حفظ ونشر التقييم
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}