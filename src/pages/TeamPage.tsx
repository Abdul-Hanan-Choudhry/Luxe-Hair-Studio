import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Award, Calendar, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { staffAPI } from '../services/api';
import { Staff } from '../types';

export const TeamPage: React.FC = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data = await staffAPI.getStaff();
        setStaff(data);
      } catch (error) {
        console.error('Error loading staff:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStaff();
  }, []);

  const handleBookWithStylist = (staffMember: Staff) => {
    // Store selected staff and navigate to booking
    localStorage.setItem('selectedStaff', JSON.stringify(staffMember));
    navigate('/book');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meet Our Artists
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto">
            Our internationally trained stylists bring passion, creativity, and expertise to every appointment
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              World-Class Talent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each member of our team is carefully selected for their exceptional skills, artistic vision, and commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
            {staff.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-6 right-6 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Award className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-gray-700">Expert</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-rose-600 font-semibold text-lg uppercase tracking-wide mb-3">
                      {member.title}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {member.experience && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{member.experience}+ years experience</span>
                      </div>
                    </div>
                  )}

                  {/* Working Hours */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Availability</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(member.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize text-gray-600">{day.slice(0, 3)}</span>
                          <span className={hours.isWorking ? 'text-green-600' : 'text-red-500'}>
                            {hours.isWorking ? `${hours.start}-${hours.end}` : 'Closed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleBookWithStylist(member)}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Book with {member.name.split(' ')[0]}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team Excellence
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak to our commitment to quality
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-rose-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Combined Years Experience</div>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-rose-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Industry Certifications</div>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-rose-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Client Satisfaction Rate</div>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Continuing Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Meet Your Perfect Stylist?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Book a consultation and let our experts help you achieve your dream look
          </p>
          <button
            onClick={() => navigate('/book')}
            className="bg-white text-rose-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Book Your Consultation</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};