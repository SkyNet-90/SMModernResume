import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-800/50">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building and managing cloud infrastructure at scale
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {exp.title}
                </h3>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between text-blue-400 mb-4">
                  <span className="text-lg font-medium">{exp.company}</span>
                  <span className="text-sm">{exp.duration}</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {exp.description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Key Achievements:</h4>
                <ul className="space-y-3">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Technologies Section */}
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Core Technologies & Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Azure', 'Azure OpenAI', 'Azure Machine Learning Studio', 'Azure DevOps',
                    'Terraform', 'Power Apps', 'Power Automate', 'Cognitive Services',
                    'Azure Policy', 'Log Analytics', 'MLOps', 'ISO 27017 Security Framework'
                  ].map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30 px-3 py-1 rounded-full text-sm font-medium text-blue-300 hover:bg-gradient-to-r hover:from-blue-600/50 hover:to-purple-600/50 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
