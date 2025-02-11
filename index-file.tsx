import React from 'react';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

// Importazione dinamica del componente principale
const AISecurityGuardianDemo = dynamic(
  () => import('./ai-security-guardian-demo-it'),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    ),
    ssr: false // Disabilita il server-side rendering per questo componente
  }
);

// Metadati della pagina
export const metadata: Metadata = {
  title: 'AI Security Guardian - Sistema di Monitoraggio Sicurezza',
  description: 'Demo di un sistema di monitoraggio della sicurezza basato su AI con analisi in tempo reale, reporting e formazione.',
  keywords: [
    'sicurezza informatica',
    'monitoraggio',
    'intelligenza artificiale',
    'cybersecurity',
    'formazione',
    'dashboard'
  ].join(', '),
};

// Layout principale della pagina
const AISecurityGuardianPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <AISecurityGuardianDemo />
      </main>
      
      {/* Footer opzionale */}
      <footer className="border-t mt-12 py-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} AI Security Guardian. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default AISecurityGuardianPage;