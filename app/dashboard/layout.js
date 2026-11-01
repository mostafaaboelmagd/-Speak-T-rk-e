import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]" dir="rtl">
      {/* الشريط الجانبي الثابت */}
      <Sidebar />
      
      {/* محتوى الصفحة الرئيسي */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}