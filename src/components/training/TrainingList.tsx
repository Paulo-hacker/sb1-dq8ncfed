import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Training, Sector } from '../../types/user';
import { TrainingCard } from './TrainingCard';
import { TrainingForm } from './TrainingForm';

export function TrainingList() {
  const user = useAuthStore((state) => state.user);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector>(user?.sector || 'TI');
  const [newTraining, setNewTraining] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    attachments: [] as File[],
  });

  const sectors: Sector[] = [
    'Comercial',
    'Financeiro',
    'Logística',
    'Projetos',
    'RH',
    'Supply',
    'TI',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const training: Training = {
      id: Date.now().toString(),
      ...newTraining,
      sector: selectedSector,
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

  const filteredTrainings = trainings.filter(
    training => user?.role === 'admin' || training.sector === user?.sector
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Treinamentos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'admin' 
              ? 'Gerencie todos os treinamentos do sistema'
              : `Gerencie os treinamentos do setor ${user?.sector}`}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Treinamento
        </button>
      </div>

      {user?.role === 'admin' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por setor
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value as Sector)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Todos os setores</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
      )}

      {showForm && (
        <TrainingForm
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          training={newTraining}
          setTraining={setNewTraining}
          isAdmin={user?.role === 'admin'}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainings.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">
              Nenhum treinamento cadastrado{user?.role !== 'admin' && ' para este setor'}.
            </p>
          </div>
        ) : (
          filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))
        )}
      </div>
    </div>
  );
}