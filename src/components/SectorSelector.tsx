import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Sector } from '../types/user';

interface SectorSelectorProps {
  value: Sector;
  onChange: (sector: Sector) => void;
}

export function SectorSelector({ value, onChange }: SectorSelectorProps) {
  const sectors: Sector[] = [
    'Comercial',
    'Financeiro',
    'Logística',
    'Projetos',
    'RH',
    'Supply',
    'TI',
  ];

  const currentIndex = sectors.indexOf(value);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : sectors.length - 1;
    onChange(sectors[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < sectors.length - 1 ? currentIndex + 1 : 0;
    onChange(sectors[newIndex]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Setor
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handlePrevious}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <div className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-center">
          {value}
        </div>
        <button
          type="button"
          onClick={handleNext}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}