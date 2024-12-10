import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Training } from '../types/user';
import { Plus, FileUp, Clock } from 'lucide-react';

export function TrainingList() {
  const user = useAuthStore((state) => state.user);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    attachments: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const training: Training = {
      id: Date.now().toString(),
      ...newTraining,
      sector: user?.sector || 'TI',
      createdAt: new Date().toISOString(),
    };
    setTrainings([...trainings, training]);
    setShowForm(false);
    setNewTraining({
      title: '',
      description: '',
      date: '',
      duration: '',
      attachments: [],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewTraining({
        ...newTraining,
        attachments: [...Array.from(e.target.files)],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Treinamentos - {user?.sector}
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Novo Treinamento
          </button>
        </div>

        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Novo Treinamento</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={newTraining.title}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows={3}
                  value={newTraining.description}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={newTraining.date}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duração (em horas)
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={newTraining.duration}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, duration: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Anexos
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {trainings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhum treinamento cadastrado para este setor.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {trainings.map((training) => (
                <li key={training.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {training.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{training.duration}h</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{training.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {training.attachments.length} anexos
                      </span>
                    </div>
                    <time className="text-sm text-gray-500">
                      {new Date(training.date).toLocaleDateString('pt-BR')}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}