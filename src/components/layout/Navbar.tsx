import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Sistema de Treinamentos
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                {user?.sector}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}