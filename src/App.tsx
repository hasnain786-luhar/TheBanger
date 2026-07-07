import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuotesPage } from './pages/QuotesPage';
import { QuoteEditorPage } from './pages/QuoteEditorPage';
import { ClientsPage } from './pages/ClientsPage';
import { ProposalBuilderPage } from './pages/ProposalBuilderPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppLayout } from './components/layout/AppLayout';

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'quotes'
  | 'quote-editor'
  | 'clients'
  | 'proposal-builder'
  | 'templates'
  | 'analytics'
  | 'settings';

const appPages: Page[] = ['dashboard', 'quotes', 'quote-editor', 'clients', 'proposal-builder', 'templates', 'analytics', 'settings'];

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const isAppPage = appPages.includes(page);

  if (isAppPage) {
    return (
      <AppLayout
        currentPage={page}
        onNavigate={setPage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      >
        {page === 'dashboard' && <DashboardPage onNavigate={setPage} />}
        {page === 'quotes' && <QuotesPage onNavigate={setPage} />}
        {page === 'quote-editor' && <QuoteEditorPage onNavigate={setPage} />}
        {page === 'clients' && <ClientsPage onNavigate={setPage} />}
        {page === 'proposal-builder' && <ProposalBuilderPage onNavigate={setPage} />}
        {page === 'templates' && <TemplatesPage onNavigate={setPage} />}
        {page === 'analytics' && <AnalyticsPage />}
        {page === 'settings' && <SettingsPage />}
      </AppLayout>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      {page === 'landing' && <LandingPage onNavigate={setPage} />}
      {page === 'login' && <LoginPage onNavigate={setPage} />}
      {page === 'register' && <RegisterPage onNavigate={setPage} />}
    </div>
  );
}
