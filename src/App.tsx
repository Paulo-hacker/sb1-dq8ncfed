import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { TrainingList } from './components/training/TrainingList';
import { AuthLayout } from './components/AuthLayout';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/cadastro" element={<RegisterForm />} />
        <Route element={<AuthLayout />}>
          <Route
            path="/treinamentos"
            element={
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <TrainingList />
              </div>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;