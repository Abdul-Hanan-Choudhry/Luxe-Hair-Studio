import React from 'react';
import { User, Star, Award } from 'lucide-react';
import { Staff } from '../types';

interface StaffCardProps {
  staff: Staff;
  onSelect: (staff: Staff) => void;
  isSelected?: boolean;
}

export const StaffCard: React.FC<StaffCardProps> = ({ 
  staff, 
  onSelect, 
  isSelected = false 
}) => {
  return (
    <div
      onClick={() => onSelect(staff)}
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-rose-400 ring-offset-4 shadow-2xl' : ''
      }`}
    >
      <div className="relative">
        <div className="aspect-w-3 aspect-h-4">
          {staff.avatar ? (
            <img
              src={staff.avatar}
              alt={staff.name}
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-80 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
              <User className="h-20 w-20 text-rose-300" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Award className="h-4 w-4 text-rose-500" />
          <span className="text-sm font-medium text-gray-700">Expert</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
            {staff.name}
          </h3>
          <p className="text-rose-600 font-medium text-sm uppercase tracking-wide">
            {staff.title}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-600 ml-2">(4.9)</span>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm">
            Specializing in color transformations and precision cuts
          </p>
        </div>
        
        <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Book with {staff.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};