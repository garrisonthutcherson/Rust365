import type { Metadata } from 'next';
import './globals.css';
import { MainHeader } from '@/components/navigation/MainHeader';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Rust365 | Survival Starts Here',
  description: 'The ultimate directory and community hub for Rust players.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body min-h-screen flex flex-col">
        <FirebaseClientProvider>
          <MainHeader />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border bg-card py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="font-headline text-2xl font-bold text-primary tracking-tighter">RUST365</h2>
                <p className="text-muted-foreground text-sm">© 2025 Rust365. Not affiliated with Facepunch Studios.</p>
              </div>
              <div className="flex gap-8 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Discord</a>
              </div>
            </div>
          </footer>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
