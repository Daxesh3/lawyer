import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Images/Logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    localStorage.removeItem('isLogin');
    navigate('/login');
    setShowLogoutConfirm(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black text-white pt-8 pb-3 px-6 flex items-center justify-between w-full">
      {/* Left: Logo */}
      <div className="h-[60px]">
        <Link to="/home" className="block h-full">
          <img src={Logo} alt="Logo" className="h-full object-contain" />
        </Link>
      </div>
      {/* Right: User Info */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 relative">
          {/* Avatar with initials */}
          <div
            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center bg-black text-white font-semibold cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            EB
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Edmund Boyo</span>
            <span className="text-xs text-gray-400">Edmund.Boyo@CliffordChance.com</span>
          </div>
          {/* Dropdown arrow */}
          <svg
            className="w-4 h-4 text-gray-400 ml-1 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>

          {/* Popup Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-gray-700 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
