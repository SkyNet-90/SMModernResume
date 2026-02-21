import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Calendar, TrendingUp, Star } from 'lucide-react';
import { certifications } from '../data';

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration * 60); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [end, duration]);

    return (
        <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {prefix}{count}{suffix}
        </span>
    );
};

interface StatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: number;
    suffix?: string;
    prefix?: string;
    description: string;
    delay: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, suffix = '', prefix = '', description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
            }}
            className="glass-effect rounded-2xl p-6 text-center group hover:border-blue-500/30 transition-all duration-300"
        >
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25"
            >
                {icon}
            </motion.div>

            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

            <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={value} suffix={suffix} prefix={prefix} duration={2.5} />
            </div>

            <p className="text-gray-400 text-sm">{description}</p>
        </motion.div>
    );
};

const CertificationStats: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();

    // Derive certification stats from data
    const totalCerts = certifications.length;
    const microsoftCerts = certifications.filter(c => c.issuer === 'Microsoft' || c.issuer === 'Microsoft Applied Skills').length;
    const yearsOfCertification = 10; // 10+ years of professional development and certifications
    const expertLevelCerts = certifications.filter(c => c.name.toLowerCase().includes('expert')).length;

    return (
        <section id="stats" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
            <div className="container-max section-padding">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gradient-text">Certification Journey</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Continuous learning and professional development in cloud technologies
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatsCard
                        icon={<Award size={28} className="text-white" />}
                        title="Total Certifications"
                        value={totalCerts}
                        suffix="+"
                        description="Active certifications across multiple cloud platforms"
                        delay={0}
                    />

                    <StatsCard
                        icon={<Star size={28} className="text-white" />}
                        title="Microsoft Certified"
                        value={microsoftCerts}
                        description="Azure and Microsoft 365 certifications"
                        delay={0.2}
                    />

                    <StatsCard
                        icon={<TrendingUp size={28} className="text-white" />}
                        title="Years Learning"
                        value={yearsOfCertification}
                        suffix="+"
                        description="Continuous professional development"
                        delay={0.4}
                    />

                    <StatsCard
                        icon={<Calendar size={28} className="text-white" />}
                        title="Expert Level"
                        value={expertLevelCerts}
                        description="Advanced and expert-level certifications"
                        delay={0.6}
                    />
                </div>

                {/* Scrolling Certification Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <h3 className="text-2xl font-bold text-center text-white mb-8">Featured Certifications</h3>

                    <div className="relative overflow-hidden">
                        <motion.div
                            animate={shouldReduceMotion ? {} : { x: [0, -2000] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            className="flex space-x-8 whitespace-nowrap"
                        >
                            {/* First set of badges */}
                            {[
                                "Azure Solutions Architect Expert",
                                "Azure AI Engineer Associate",
                                "DevOps Engineer Expert",
                                "Azure Security Engineer",
                                "AWS Cloud Practitioner",
                                "Terraform Associate",
                                "Azure Administrator",
                                "Kubernetes KCNA"
                            ].map((cert, index) => (
                                <div
                                    key={index}
                                    className="glass-effect rounded-lg px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 whitespace-nowrap"
                                >
                                    <span className="text-blue-300 font-medium">{cert}</span>
                                </div>
                            ))}

                            {/* Duplicate set for seamless loop */}
                            {[
                                "Azure Solutions Architect Expert",
                                "Azure AI Engineer Associate",
                                "DevOps Engineer Expert",
                                "Azure Security Engineer",
                                "AWS Cloud Practitioner",
                                "Terraform Associate",
                                "Azure Administrator",
                                "Kubernetes KCNA"
                            ].map((cert, index) => (
                                <div
                                    key={`duplicate-${index}`}
                                    className="glass-effect rounded-lg px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 whitespace-nowrap"
                                >
                                    <span className="text-blue-300 font-medium">{cert}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Achievement Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="glass-effect rounded-2xl p-8 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30">
                        <h3 className="text-2xl font-bold text-white mb-4">Latest Achievement</h3>
                        <p className="text-green-400 text-lg mb-2">Microsoft Certified</p>
                        <p className="text-white font-semibold">Microsoft 365 Certified: Copilot and Agent Administration Fundamentals</p>
                        <p className="text-gray-400 text-sm mt-2">Earned February 2026</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CertificationStats;
