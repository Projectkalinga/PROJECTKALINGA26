import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Project KALINGA ASCEND',
  description: 'Martian Micro-UAV Mission Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
