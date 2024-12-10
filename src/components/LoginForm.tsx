import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogIn, Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin credentials check
    if (email === 'admin@sistema.com' && password === 'admin123') {
      setUser({
        id: 'admin',
        email: 'admin@sistema.com',
        name: 'Administrador',
        sector: 'TI',
        role: 'admin'
      });
      navigate('/treinamentos');
      return;
    }

    // Regular user login
    setUser({
      id: '1',
      email,
      name: 'Usuário',
      sector: 'TI',
      role: 'user'
    });
    navigate('/treinamentos');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 mb-6">
            <LogIn className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Acesse sua conta
          </h2>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <p>Admin access:</p>
            <p>Email: admin@sistema.com</p>
            <p>Senha: admin123</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/cadastro"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}