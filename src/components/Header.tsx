import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, User, Menu, Phone, MapPin, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  showAdminLink?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, showAdminLink = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (onMenuClick) onMenuClick();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2 rounded-full">
                <Scissors className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Luxe Hair Studio
                </h1>
                <p className="text-xs text-gray-500 font-medium">PREMIUM HAIR SALON</p>
              </div>
            </button>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation('/services')}
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation('/team')}
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Our Team
              </button>
              <button
                onClick={() => handleNavigation('/gallery')}
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium"
              >
                About
              </button>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-LUXE</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Beverly Hills</span>
                </div>
              </div>
              {showAdminLink && (
                <button
                  onClick={() => handleNavigation('/admin')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              )}
              <button
                onClick={() => handleNavigation('/book')}
                className="hidden lg:block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300"
              >
                Book Now
              </button>
            </nav>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-rose-600 hover:bg-rose-50"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2 rounded-full">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Luxe Hair Studio
                  </h1>
                </div>
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="space-y-4">
              <button
                onClick={() => handleNavigation('/services')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation('/team')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                Our Team
              </button>
              <button
                onClick={() => handleNavigation('/gallery')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
              >
                About
              </button>
              
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-LUXE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Beverly Hills</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleNavigation('/book')}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
                >
                  Book Appointment
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};