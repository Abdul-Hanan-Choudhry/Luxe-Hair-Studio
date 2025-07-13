import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Share2, Eye } from 'lucide-react';
import { Header } from '../components/Header';

export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Color Transformations',
    'Precision Cuts',
    'Bridal Styles',
    'Extensions',
    'Men\'s Grooming'
  ];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Precision Cuts',
      title: 'Modern Bob Cut',
      description: 'Sleek and sophisticated bob with precision layers'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Color Transformations',
      title: 'Balayage Highlights',
      description: 'Natural sun-kissed balayage with dimensional color'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bridal Styles',
      title: 'Elegant Updo',
      description: 'Romantic bridal updo with delicate details'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Extensions',
      title: 'Volume Extensions',
      description: 'Seamless tape-in extensions for added length and volume'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Men\'s Grooming',
      title: 'Classic Fade',
      description: 'Modern fade with textured styling'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/3993465/pexels-photo-3993465.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Color Transformations',
      title: 'Platinum Blonde',
      description: 'Complete color transformation to platinum blonde'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Precision Cuts',
      title: 'Layered Waves',
      description: 'Soft layered cut with natural waves'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Color Transformations',
      title: 'Ombre Style',
      description: 'Gradient ombre from dark to light'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Bridal Styles',
      title: 'Boho Braids',
      description: 'Bohemian-inspired braided bridal style'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto">
            Explore our stunning transformations and get inspired for your next look
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-rose-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  {category === 'all' ? 'All Styles' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-rose-600 text-sm font-semibold px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {image.description}
                  </p>
                  <button
                    onClick={() => navigate('/book')}
                    className="text-rose-600 font-semibold hover:text-rose-700 transition-colors flex items-center space-x-1"
                  >
                    <span>Book Similar Style</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Love What You See?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Book your appointment and let our experts create your perfect look
          </p>
          <button
            onClick={() => navigate('/book')}
            className="bg-white text-rose-600 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center space-x-2 mx-auto"
          >
            <span>Book Your Transformation</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};