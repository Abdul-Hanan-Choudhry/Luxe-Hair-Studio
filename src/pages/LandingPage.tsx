import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Star, ArrowRight, Scissors, Award, Heart, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury Hair Salon"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Beverly Hills Premier Hair Salon</span>
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Where Beauty
              <span className="block bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Meets Artistry
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Experience the ultimate in luxury hair care with our award-winning stylists
              and premium treatments in the heart of Beverly Hills
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/book')}
                className="group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-rose-500/25 inline-flex items-center space-x-2"
              >
                <span>Book Your Transformation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/gallery')}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                View Our Work
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <div className="text-3xl font-bold">4.9</div>
                <div className="text-sm text-gray-300">Star Rating</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Luxe Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why discerning clients choose Luxe Hair Studio for their most important moments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Scissors className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Master Artistry
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our internationally trained stylists bring decades of experience and cutting-edge techniques to every appointment
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Premium Products
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We exclusively use luxury brands like Olaplex, Kerastase, and L'Oréal Professionnel for exceptional results
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Personalized Care
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every service begins with a detailed consultation to understand your lifestyle and hair goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Gallery */}
      <section id="services" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Signature Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From precision cuts to color transformations, discover our complete range of luxury hair services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => navigate('/book')}>
              <img
                src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Precision Cuts"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Precision Cuts</h3>
                <p className="text-sm text-gray-200">Starting at $125</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => navigate('/book')}>
              <img
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Color Services"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Color Magic</h3>
                <p className="text-sm text-gray-200">Starting at $225</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => navigate('/book')}>
              <img
                src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Bridal Services"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Bridal Beauty</h3>
                <p className="text-sm text-gray-200">Starting at $450</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => navigate('/book')}>
              <img
                src="https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Extensions"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Extensions</h3>
                <p className="text-sm text-gray-200">Starting at $350</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore All Services & Book
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="stylists" className="py-20 bg-gradient-to-br from-gray-50 to-rose-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Artists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of internationally trained stylists brings passion, creativity, and expertise to every appointment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center cursor-pointer" onClick={() => navigate('/book')}>
              <div className="relative mb-6">
                <img
                  src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Isabella Martinez"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Isabella Martinez</h3>
              <p className="text-rose-600 font-medium mb-2">Master Colorist</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">15+ years experience</p>
            </div>

            <div className="group text-center cursor-pointer" onClick={() => navigate('/book')}>
              <div className="relative mb-6">
                <img
                  src="https://images.pexels.com/photos/3992679/pexels-photo-3992679.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Sophia Chen"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sophia Chen</h3>
              <p className="text-rose-600 font-medium mb-2">Senior Stylist</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">Extension Specialist</p>
            </div>

            <div className="group text-center cursor-pointer" onClick={() => navigate('/book')}>
              <div className="relative mb-6">
                <img
                  src="https://images.pexels.com/photos/3992640/pexels-photo-3992640.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Aria Thompson"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aria Thompson</h3>
              <p className="text-rose-600 font-medium mb-2">Bridal Specialist</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">Special Events Expert</p>
            </div>

            <div className="group text-center cursor-pointer" onClick={() => navigate('/book')}>
              <div className="relative mb-6">
                <img
                  src="https://images.pexels.com/photos/3992663/pexels-photo-3992663.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Marcus Rodriguez"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Marcus Rodriguez</h3>
              <p className="text-rose-600 font-medium mb-2">Men's Specialist</p>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">Grooming Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Love Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our satisfied clients about their transformative experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "Isabella completely transformed my hair! The balayage is absolutely stunning and I get compliments everywhere I go. This salon is pure luxury."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Emma Richardson</p>
                  <p className="text-gray-600 text-sm">Fashion Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "The bridal package was perfection! Aria made me feel like a princess on my wedding day. The attention to detail was incredible."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Olivia Martinez</p>
                  <p className="text-gray-600 text-sm">Bride</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "Marcus gave me the best haircut I've ever had. Professional, skilled, and the salon atmosphere is incredibly relaxing. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">James Wilson</p>
                  <p className="text-gray-600 text-sm">Business Executive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Book your appointment today and experience the luxury you deserve
          </p>
          <button
            onClick={() => navigate('/book')}
            className="bg-white text-rose-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Book Your Appointment</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2 rounded-full">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Luxe Hair Studio</span>
                  <p className="text-xs text-gray-400">PREMIUM HAIR SALON</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Beverly Hills' premier destination for luxury hair care and transformative beauty experiences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/services')}>Precision Cuts</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/services')}>Color Services</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/services')}>Bridal Packages</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/services')}>Extensions</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigate('/services')}>Treatments</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li>9876 Rodeo Drive</li>
                <li>Beverly Hills, CA 90210</li>
                <li>(555) 123-LUXE</li>
                <li>hello@luxehairstudio.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Hours</h3>
              <ul className="space-y-3 text-gray-400">
                <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
                <li>Saturday: 8:00 AM - 6:00 PM</li>
                <li>Sunday: 10:00 AM - 5:00 PM</li>
                <li className="text-rose-400 font-medium cursor-pointer" onClick={() => navigate('/book')}>Walk-ins Welcome</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Luxe Hair Studio. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};