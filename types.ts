export interface Doctor {
  id: string;
  name: string;
  specialty: string; // e.g., 'Medicine', 'Cardiologist'
  category: string; // For filtering
  degrees: string;
  affiliation: string;
  avatarUrl: string;
  available: boolean;
}

export type Category = 'All' | 'Physician' | 'Orthopedics' | 'Medicine' | 'Cardiologist' | 'Surgeon' | 'Oncology' | 'Others';

export const CATEGORIES: Category[] = [
  'All',
  'Physician',
  'Orthopedics',
  'Medicine',
  'Cardiologist',
  'Surgeon',
  'Oncology',
  'Others'
];