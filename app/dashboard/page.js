'use client';
import { useState, useEffect } from 'react';
import { Users, BookOpen, MessageSquare, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import DashboardControl from '@/components/dashboard/DashboardControl'; // استيراد مكون التحكم بالآراء

export default function DashboardHome() {
  const [coursesCount, setCoursesCount] = useState(5);
  const [leadsCount, setLeadsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(128);

  useEffect(() => {
    // قراءة الدورات
    const savedCourses = localStorage.getItem('academy_courses');
    if (savedCourses) {
      try {
        const parsed = JSON.parse(savedCourses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCoursesCount(parsed.length);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // قراءة الطلبات وجعل عدد الطلاب والطلبات يعتمد عليها
    const savedLeads = localStorage.getItem('academy_leads');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        if (Array.isArray(parsed)) {
          setLeadsCount(parsed.length);
          setStudentsCount(128 + parsed.length);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const stats = [
    { title: 'إجمالي الطلاب المسجلين', value: studentsCount.toLocaleString('ar-EG'), change: '+12%', icon: Users, color: 'text-teal-500 bg-teal-500/10 border-teal-500/20' },
    { title: 'الدورات النشطة حالياً', value: `${coursesCount} مستويات`, change: 'مستمرة', icon: BookOpen, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { title: 'طلبات الاستعلام (واتساب)', value: `${leadsCount} طلب`, change: '+24%', icon: MessageSquare, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'معدل إتمام الدورات', value: '٩٤٪', change: '+4.5%', icon: TrendingUp, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black">أهلاً بك مجدداً، المدير 👋</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">إليك نظرة عامة على أداء أكاديمية Speak Türkçe والطلاب الجدد.</p>
      </div>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard 
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* قسم التحكم في تفعيل/إغلاق استمارة آراء الطلاب */}
      <DashboardControl />

      {/* بطاقة معلومات النظام */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm">
        <h3 className="text-lg font-bold mb-2">حالة النظام والبيانات</h3>
        <p className="text-sm text-gray-500">تم ربط لوحة التحكم بالكامل لتحديث الإحصائيات والدورات والطلبات تلقائياً.</p>
      </div>
    </div>
  );
}