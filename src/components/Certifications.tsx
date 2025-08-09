import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Certification } from '../types';

const Certifications: React.FC = () => {
  const activeCertifications = certifications.filter(cert =>
    !cert.expires || new Date(cert.expires) > new Date()
  );

  const expiredCertifications = certifications.filter(cert =>
    cert.expires && new Date(cert.expires) <= new Date()
  );

  const CertificationCard: React.FC<{ cert: Certification; isExpired?: boolean }> = ({ cert, isExpired = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`glass-effect rounded-xl p-6 ${isExpired ? 'opacity-60' : ''} hover:transform hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Award size={24} className="text-white" />
          </div>
          {isExpired && (
            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
              Expired
            </span>
          )}
        </div>
        {cert.credentialId && (
          <ExternalLink size={16} className="text-gray-400 hover:text-blue-400 cursor-pointer" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
        {cert.name}
      </h3>

      <p className="text-blue-400 font-medium mb-3">{cert.issuer}</p>

      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
        <Calendar size={14} />
        <span>
          Issued: {cert.issued}
          {cert.expires && ` • Expires: ${cert.expires}`}
        </span>
      </div>

      {cert.credentialId && (
        <p className="text-xs text-gray-500 mb-3">
          ID: {cert.credentialId}
        </p>
      )}

      {cert.skills && cert.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {cert.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Continuous learning and validation of cloud expertise
          </p>
        </motion.div>

        {/* Active Certifications */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Active Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCertifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>
        </div>

        {/* Expired Certifications */}
        {expiredCertifications.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Previous Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredCertifications.map((cert, index) => (
                <CertificationCard key={index} cert={cert} isExpired={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
