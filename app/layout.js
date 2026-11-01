import { Toaster } from 'react-hot-toast';
import './globals.css'; // تأكد إن السطر ده موجود فوق خالص!

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}