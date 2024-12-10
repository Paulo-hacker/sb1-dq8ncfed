import React from 'react';
import { X } from 'lucide-react';
import { Training, Sector } from '../../types/user';

interface TrainingFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  training: Partial<Training>;
  setTraining: (training: Partial<Training>) => void;
  isAdmin: boolean;
  selectedSector: Sector;
  onSectorChange: (sector: Sector) => void;
}

export function TrainingForm({
  onSubmit,
  onClose,
  training,
  setTraining,
  isAdmin,
  selectedSector,
  onSectorChange,
}: TrainingFormProps) {
  const sectors: Sector[] = [
    'Comercial',
    'Financeiro',
    'Logística',
    'Projetos',
    'RH',
    'Supply',
    'TI',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTraining({
        ...training,
        attachments: [...Array.from(e.target.files)],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Novo Treinamento</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Setor
              </label>
              <select
                value={selectedSector}
                onChange={(e) => onSectorChange(e.target.value as Sector)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={training.title || ''}
              onChange={(e) =>
                setTraining({ ...training, title: e.target.value })
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
              value={training.description || ''}
              onChange={(e) =>
                setTraining({ ...training, description: e.target.value })
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
                value={training.date || ''}
                onChange={(e) =>
                  setTraining({ ...training, date: e.target.value })
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
                value={training.duration || ''}
                onChange={(e) =>
                  setTraining({ ...training, duration: e.target.value })
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
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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
    </div>
  );
}