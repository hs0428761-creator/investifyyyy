import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Basics from './pages/Basics';
import Intermediate from './pages/Intermediate';
import ProLevel from './pages/ProLevel';
import SuccessStories from './pages/SuccessStories';
import Auth from './pages/Auth';
import Admin from './pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const renderPage = () => {
    if (isAdmin && currentPage === 'admin') {
      return <Admin onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }

    if (currentPage === 'login') {
      return <Auth onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'basics':
        return <Basics />;
      case 'intermediate':
        return <Intermediate />;
      case 'pro':
        return <ProLevel />;
      case 'stories':
        return <SuccessStories />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-950 text-white">
        {currentPage !== 'login' && currentPage !== 'admin' && (
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        <main>{renderPage()}</main>
        {currentPage !== 'login' && currentPage !== 'admin' && <Chatbot />}
      </div>
    </ThemeProvider>
  );
}

export default App;
