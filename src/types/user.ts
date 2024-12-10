export type Sector = 'Comercial' | 'Financeiro' | 'Logística' | 'Projetos' | 'RH' | 'Supply' | 'TI';
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  sector: Sector;
  role: UserRole;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  sector: Sector;
  attachments: File[];
  createdAt: string;
}