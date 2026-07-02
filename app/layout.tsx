import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ilmee De Silva | Full-Stack Software Engineer',
  description:
    'Ilmee De Silva is a full-stack software engineer focused on backend systems, APIs, databases, cloud integrations, and practical AI-powered products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `document.documentElement.dataset.theme = localStorage.getItem("theme") || "light";`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.variable}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
