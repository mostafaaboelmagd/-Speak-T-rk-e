'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Clock, Award } from 'lucide-react';
import CourseForm from '@/components/dashboard/CourseForm';

export default function CoursesManagement() {
  const [courses, setCourses] = useState([
    { id: 1, level: 'A1', title: 'المستوى المبتدئ الأول', duration: '٦ أسابيع', lessons: '٢٤ درس', badge: 'الأساس' },
    { id: 2, level: 'A2', title: 'المستوى المبتدئ الثاني', duration: '٦ أسابيع', lessons: '٢٤ درس', badge: 'شائع' },
    { id: 3, level: 'B1', title: 'المستوى المتوسط الأول', duration: '٨ أسابيع', lessons: '٣٢ درس', badge: 'الأكثر طلباً' },
    { id: 4, level: 'B2', title: 'المستوى المتوسط الثاني', duration: '٨ أسابيع', lessons: '٣٢ درس', badge: 'متقدم' },
    { id: 5, level: 'C1', title: 'المستوى الاحترافي', duration: '١٠ أسابيع', lessons: '٤٠ درس', badge: 'احترافي' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // استرجاع الدورات المحفوظة محلياً عند تحميل الصفحة
  useEffect(() => {
    const saved = localStorage.getItem('academy_courses');
    if (saved) {
      try {
        setCourses(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // دالة إضافة كورس جديد وحفظه في التخزين المحلي
  const handleAddCourse = (newCourse) => {
    const courseWithId = { id: Date.now(), ...newCourse };
    const updatedCourses = [courseWithId, ...courses];
    setCourses(updatedCourses);
    localStorage.setItem('academy_courses', JSON.stringify(updatedCourses));
  };

  // دالة حذف الكورس وتحديث التخزين
  const handleDeleteCourse = (id) => {
    const updatedCourses = courses.filter((c) => c.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem('academy_courses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="space-y-6">
      
      {/* رأس الصفحة وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-color)]">إدارة الدورات والمستويات</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحكم في محتوى المستويات التعليمية الظاهرة في الموقع الرئيسي.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          إضافة مستوى جديد
        </button>
      </div>

      {/* جدول الدورات والمستويات */}
      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b border-[var(--border-color)] text-gray-400 text-xs uppercase">
                <th className="p-4 font-bold">المستوى</th>
                <th className="p-4 font-bold">عنوان الكورس</th>
                <th className="p-4 font-bold">المدة الزمنية</th>
                <th className="p-4 font-bold">عدد الدروس</th>
                <th className="p-4 font-bold">الشارة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-gray-600 dark:text-gray-300">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-[var(--bg-color)]/50 transition-colors">
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-xl bg-teal-500/10 text-teal-500 border border-teal-500/20 font-black text-xs">
                      {course.level}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[var(--text-color)]">{course.title}</td>
                  <td className="p-4 flex items-center gap-1.5 text-gray-500 pt-5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {course.duration}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      {course.lessons}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] text-xs font-bold text-teal-600 dark:text-teal-400">
                      {course.badge}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة الفورم المنبثقة لإضافة دورة جديدة */}
      <CourseForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCourse}
      />

    </div>
  );
}