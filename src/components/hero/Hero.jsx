import React from 'react';
import { motion } from 'framer-motion';
import HeroImg from '../../assets/Ttuckbboki.jpeg';
import PrimaryButton from '../Shared/PrimaryButton';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[600px]">
          {/* Text Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Satisfy Your{' '}
                <span className="text-secondary font-cursive text-5xl md:text-6xl block md:inline">
                  Cravings
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl mx-auto md:mx-0 mb-6">
                Embark on a culinary journey through authentic Korean flavors, 
                where every bite tells a story of tradition and passion.
              </p>
              
              {/* Button Section */}
              <div className="flex justify-center md:justify-start">
                <PrimaryButton />
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative">
              <img 
                src={HeroImg} 
                alt="Ttuckbuoki" 
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-pattern"></div>
      </div>
    </div>
  );
};

export default Hero;
