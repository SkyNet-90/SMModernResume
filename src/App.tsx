import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import CertificationStats from './components/CertificationStats';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <CertificationStats />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
