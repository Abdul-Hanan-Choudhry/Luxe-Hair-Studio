import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Heart, Users, Clock, ArrowRight, Star, Scissors } from 'lucide-react';
import { Header } from '../components/Header';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const achievements = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as Beverly Hills\' Best Hair Salon 3 years running'
    },
    {
      icon: Users,
      title: '5000+ Happy Clients',
      description: 'Trusted by celebrities, influencers, and discerning clients'
    },
    {
      icon: Clock,
      title: '15+ Years Experience',
      description: 'Over a decade of excellence in luxury hair care'
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Every cut, color, and style is crafted with love and artistry'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We never compromise on quality. Every service is delivered with meticulous attention to detail and the highest standards of craftsmanship.'
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of trends and continuously invest in the latest techniques, tools, and premium products to deliver cutting-edge results.'
    },
    {
      title: 'Personalization',
      description: 'Every client is unique. We take time to understand your lifestyle, preferences, and hair goals to create a truly personalized experience.'
    },
    {
      title: 'Luxury',
      description: 'From our elegant salon environment to our premium product selection, we create an atmosphere of sophistication and indulgence.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Luxe Hair Studio
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto">
            Where artistry meets luxury in the heart of Beverly Hills
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in 2009 with a vision to redefine luxury hair care, Luxe Hair Studio has become 
                  Beverly Hills' premier destination for discerning clients who demand nothing but the best.
                </p>
                <p>
                  Our journey began with a simple belief: that every person deserves to feel beautiful, 
                  confident, and pampered. What started as a small boutique salon has grown into a 
                  renowned establishment, trusted by celebrities, influencers, and style-conscious 
                  individuals from around the world.
                </p>
                <p>
                  Today, we continue to push the boundaries of hair artistry, combining time-honored 
                  techniques with cutting-edge innovations to create transformative experiences that 
                  go beyond just a haircut or color service.
                </p>
              </div>
              <button
                onClick={() => navigate('/book')}
                className="mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2"
              >
                <span>Experience the Difference</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxe Hair Studio Interior"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-rose-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-3 rounded-full">
                    <Scissors className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">15+</p>
                    <p className="text-sm text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Luxe Hair Studio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has earned us recognition and the trust of thousands of satisfied clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Luxe Hair Studio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl border border-rose-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our valued clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "Absolutely incredible experience! The attention to detail and level of service 
                exceeded all my expectations. I've never felt more beautiful."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">Fashion Designer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "The team at Luxe Hair Studio are true artists. They transformed my vision 
                into reality and the results were beyond what I could have imagined."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Emily Chen</p>
                  <p className="text-gray-600 text-sm">Entrepreneur</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                "From the moment I walked in, I felt like royalty. The luxury experience 
                and exceptional results keep me coming back every time."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Michael Rodriguez</p>
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
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join thousands of satisfied clients and discover what makes Luxe Hair Studio special
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
    </div>
  );
};