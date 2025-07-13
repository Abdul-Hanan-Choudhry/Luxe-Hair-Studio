import React from 'react';
import { Clock, DollarSign, Star } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  isSelected?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onSelect, 
  isSelected = false 
}) => {
  return (
    <div
      onClick={() => onSelect(service)}
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        isSelected ? 'ring-4 ring-rose-400 ring-offset-4 shadow-2xl' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-rose-600 text-sm font-semibold px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700">4.9</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{service.duration} min</span>
            </div>
            
            <div className="flex items-center space-x-1 text-emerald-600">
              <DollarSign className="h-4 w-4" />
              <span className="text-lg font-bold">{service.price}</span>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Book This Service
        </button>
      </div>
    </div>
  );
};