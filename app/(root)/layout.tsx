'use client';

import { ReactNode, useEffect } from 'react';
import StreamVideoProvider from '@/providers/StreamClientProvider';

const RootLayout = ({ children }: { children: ReactNode }) => {
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      console.log('beforeinstallprompt fired');
      (window as any).deferredPrompt = event;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      <link rel="manifest" href="/manifest.json" />
    </main>
  );
};

export default RootLayout;
