import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">Skylar Matthews</h3>
            <p className="text-gray-400">Cloud Engineer</p>
          </div>

          <div className="text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Skylar Matthews. All rights reserved.</p>
            <p className="mt-2">Built with React, TypeScript, and Tailwind CSS. Self-hosted on TrueNAS Scale.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
