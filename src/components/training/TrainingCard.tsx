import React from 'react';
import { Clock, FileUp, Calendar } from 'lucide-react';
import { Training } from '../../types/user';

interface TrainingCardProps {
  training: Training;
}

export function TrainingCard({ training }: TrainingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{training.duration}h</span>
        </div>
      </div>
      
      <p className="mt-2 text-gray-600 line-clamp-2">{training.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FileUp className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {training.attachments.length} anexos
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <time className="text-sm text-gray-500">
              {new Date(training.date).toLocaleDateString('pt-BR')}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}