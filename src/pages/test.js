'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Search, Shield, Zap, Globe, ChevronDown } from 'lucide-react';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

import * as meshAnimation from '../public/meshAnimation.json';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface Product {
  icon: React.ElementType;
  title: string;
  status: string;
  description: string;
}

const SoranaLanding: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: meshAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsModalOpen(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const teamMembers: TeamMember[] = [
    { name: 'yaz', role: 'ceo', bio: 'founder of plawlabs, building his second privacy-first search engine. leading the revolution to take back control of the web.' },
    { name: 'nik', role: 'head of industrial', bio: 'leading the tech and product development. about to drop out of harvard because he believes in sorana that much.' },
    { name: 'omar', role: 'head of web & ui', bio: 'crafting the slick, minimal, and intuitive interface for sorana\'s users. making the user experience seamless and magical.' },
    { name: 'kyrie', role: 'head of marketing', bio: 'telling the world why sorana matters, in a way that gets people hooked.' },
    { name: 'kerem', role: 'financial advisor', bio: 'keeping the financials smart while we take over the internet.' }
  ];

  const products: Product[] = [
    { 
      icon: Search, 
      title: 'sorana engine', 
      status: 'already in alpha', 
      description: 'the decentralized search engine where users own their data and get real, human-driven results. no ads, no seo tricks, no tracking.'
    },
    { 
      icon: Globe, 
      title: 'sorana nexus', 
      status: 'coming soon', 
      description: 'the decentralized browser built for privacy, with no ads, no trackers, and no censorship. the only browser you\'ll need to browse safely and freely.'
    },
    { 
      icon: Zap, 
      title: 'sorana orbit', 
      status: 'in development', 
      description: 'the decentralized satellite mesh network that delivers true global internet, free from isp control. powered by the people, for the people.'
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <Lottie options={lottieOptions} />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-neon-green">sorana</a>
          <div className="hidden md:flex space-x-4">
            <a href="#why" className="hover:text-neon-green transition-colors">Why Sorana</a>
            <a href="#team" className="hover:text-neon-green transition-colors">Team</a>
            <a href="#products" className="hover:text-neon-green transition-colors">Products</a>
            <a href="#join" className="hover:text-neon-green transition-colors">Join Alpha</a>
          </div>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          be the web. own the web.
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          the decentralized search engine that lets you own your data, contribute to the network, and earn from it. no ads. no middlemen. just a better, freer internet.
        </motion.p>
        <motion.button 
          className="bg-neon-green text-black text-xl py-3 px-8 rounded-full hover:scale-105 transition-transform duration-200 animate-pulse"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
        >
          join the alpha
        </motion.button>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={32} className="text-neon-green" />
        </motion.div>
      </section>

      <section id="why" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">what's wrong with today's internet?</h2>
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            <div className="flex-1 p-8 bg-gray-800 rounded-lg mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-4">The Dead Internet</h3>
              <p>the internet today is controlled by corporations. every search you make is tracked, every click is sold, and you're shown what they want you to see. the web isn't free anymore—it's manipulated by seo, clickbait, and ads.</p>
            </div>
            <div className="flex-1 p-8 bg-neon-green text-black rounded-lg">
              <h3 className="text-2xl font-bold mb-4">The Sorana Solution</h3>
              <p>decentralized, human-driven, authentic results. take back control of your data and contribute to a free and open internet.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">the squad making it happen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4"></div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-neon-green mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">you're not just being tracked, you're being robbed.</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12">
            corporations don't just steal your data—they make billions off your searches, while you get nothing in return. with sorana's srt (sorana reward token), you take back control. every search, every contribution is yours to own, and you get paid for it. this is the future of the web.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Search, title: 'own your data, earn from it', description: 'every search you make helps power sorana, and you get rewarded with srt tokens. no more letting companies profit from your data—you earn the value you create.' },
              { icon: Zap, title: 'decentralized power', description: 'there are no middlemen. with srt, you have a real stake in the network and the future of the web. you\'re not just using sorana—you\'re building it.' },
              { icon: Shield, title: 'private, secure, limitless', description: 'sorana\'s mesh-to-earn system ensures that your data is private, secure, and yours. there are no limits on what you can earn—it\'s tied directly to your contribution, not capped like other reward systems.' }
            ].map((point, index) => (
              <motion.div 
                key={point.title}
                className="text-center p-6 bg-black rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <point.icon className="w-16 h-16 text-neon-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                <p>{point.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-neon-green mb-8">
              why let corporations steal your data when you can own the web and get paid for it?
            </p>
            <motion.button 
              className="bg-neon-green text-black text-xl py-3 px-8 rounded-full hover:scale-105 transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
            >
              join the alpha now
            </motion.button>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">the sorana ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div 
                key={product.title}
                className="text-center p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <product.icon className="w-16 h-16 text-neon-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-neon-green mb-4">{product.status}</p>
                <p>{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">why sorana is unlike anything else</h2>
          <div className="max-w-3xl mx-auto">
            {[
              { title: 'you control your data', description: 'no ads, no tracking, no bs. you own your data, and you get paid for it.' },
              { title: 'decentralized power', description: 'our system is blockchain-powered and decentralized. no corporate control or manipulation.' },
              { title: 'earn real value', description: 'every contribution you make to sorana helps the network grow, and you earn tokens for it. srt tokens give you real ownership in the future of the web.' }
            ].map((point, index) => (
              <motion.div 
                key={point.title}
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-2">{point.title}</h3>
                <p>{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">join the sorana alpha</h2>
          <p className="text-xl text-center mb-8">be part of the movement that's taking back the web. your feedback and contributions will help shape sorana for the world.</p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-neon-green"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <motion.button 
              type="submit"
              className="w-full bg-neon-green text-black text-xl py-3 rounded-full hover:bg-opacity-90 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'sign up for early access'}
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-neon-green mb-2">sorana</h3>
              <p className="text-gray-400">Decentralizing the web, one search at a time.</p>
            </div>
            <nav className="w-full md:w-1/3 mb-6 md:mb-0">
              <ul className="flex flex-wrap justify-center md:justify-end">
                <li><a href="#" className="text-gray-400 hover:text-neon-green mx-3">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-green mx-3">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-green mx-3">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-green mx-3">Roadmap</a></li>
                <li><a href="#" className="text-gray-400 hover:text-neon-green mx-3">Contact</a></li>
              </ul>
            </nav>
            <div className="w-full md:w-1/3 text-center md:text-right">
              <p className="text-gray-400">&copy; 2024 Sorana. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gray-900 p-8 rounded-lg max-w-md text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-4">Thank you for joining!</h3>
              <p className="mb-6">We're excited to have you on board. You'll be among the first to experience the future of the web.</p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-neon-green text-black py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoranaLanding;
