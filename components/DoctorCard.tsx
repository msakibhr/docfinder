import React from 'react';
import { Doctor } from '../types';
import { GraduationCap, MapPin, Stethoscope, Clock } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full bg-slate-50 overflow-hidden border-2 border-slate-100 flex items-center justify-center">
             <img src={doctor.avatarUrl} alt={doctor.name} className="w-full h-full object-cover" />
        </div>
        {doctor.available ? (
           <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Available"></span>
        ) : (
           <span className="absolute bottom-1 right-1 w-4 h-4 bg-gray-400 border-2 border-white rounded-full" title="Unavailable"></span>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">{doctor.name}</h3>
      
      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4 uppercase tracking-wide">
        {doctor.specialty}
      </span>

      <div className="w-full space-y-2 text-sm text-slate-500 mb-6 text-left">
        <div className="flex items-start gap-2">
          <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{doctor.degrees || 'N/A'}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <span className="line-clamp-2">{doctor.affiliation || 'N/A'}</span>
        </div>
      </div>

      <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
        <span>Book Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  );
};