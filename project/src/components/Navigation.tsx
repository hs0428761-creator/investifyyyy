import { Menu, X, Sun, Moon, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/gemini_generated_image_rgs8thrgs8thrgs8.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'basics', label: 'Basics' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'pro', label: 'Pro Level' },
    { id: 'stories', label: 'Success Stories' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={logo} alt="Invest!fy Logo" className="h-12 w-auto object-contain" />
            <span className="text-2xl font-bold text-yellow-400">Invest!fy</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded transition-all ${
                  currentPage === item.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate('login')}
              className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center space-x-1"
              aria-label="Register"
            >
              <UserPlus className="w-4 h-4" />
              <span className="text-sm">Sign Up</span>
            </button>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => onNavigate('login')}
              className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
              aria-label="Register"
            >
              <UserPlus className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900/98">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded transition-all ${
                  currentPage === item.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
