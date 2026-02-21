import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '../data';
import {
    Cloud,
    Server,
    Code2,
    Shield,
    Terminal,
    Cpu,
    LucideIcon
} from 'lucide-react';

// Skill categories with icons
const skillCategories = {
    'Cloud Platforms': {
        icon: Cloud,
        skills: ['Microsoft Azure', 'Amazon Web Services (AWS)'],
        color: 'from-blue-500 to-cyan-500'
    },
    'Infrastructure & DevOps': {
        icon: Server,
        skills: ['Terraform', 'Kubernetes', 'Docker', 'Azure DevOps', 'CI/CD Pipelines', 'Infrastructure as Code'],
        color: 'from-green-500 to-emerald-500'
    },
    'AI & Machine Learning': {
        icon: Code2,
        skills: ['Azure OpenAI', 'Azure Machine Learning Studio', 'Cognitive Services', 'MLOps', 'Power Automate'],
        color: 'from-purple-500 to-pink-500'
    },
    'Security & Compliance': {
        icon: Shield,
        skills: ['Azure Security Center', 'Azure Policy', 'ISO 27017', 'Identity Management', 'Zero Trust Architecture', 'Conditional Access'],
        color: 'from-red-500 to-orange-500'
    },
    'Networking & Monitoring': {
        icon: Cpu,
        skills: ['Azure Virtual Networks', 'VPN Gateways', 'Load Balancers', 'Application Insights', 'Log Analytics', 'Network Security Groups'],
        color: 'from-indigo-500 to-blue-500'
    },
    'Programming & Automation': {
        icon: Terminal,
        skills: ['PowerShell', 'Python', 'ARM Templates', 'Bicep', 'Azure Functions', 'Logic Apps'],
        color: 'from-yellow-500 to-amber-500'
    }
};

interface SkillBadgeProps {
    skill: string;
    index: number;
    categoryColor: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, index, categoryColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
            }}
            className={`bg-gradient-to-r ${categoryColor} p-[1px] rounded-lg`}
        >
            <div className="bg-gray-800 rounded-lg px-4 py-2 h-full">
                <span className="text-white font-medium text-sm">{skill}</span>
            </div>
        </motion.div>
    );
};

interface SkillCategoryProps {
    title: string;
    icon: LucideIcon;
    skills: string[];
    color: string;
    delay: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon: Icon, skills, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-6"
        >
            <div className="flex items-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mr-4`}>
                    <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                    <SkillBadge
                        key={skill}
                        skill={skill}
                        index={index}
                        categoryColor={color}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const Skills: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();

    // Floating skill bubbles for background animation
    const floatingSkills = ['Azure', 'AWS', 'K8s', 'Docker', 'Python', 'Terraform'];

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            {/* Background floating elements */}
            <div className="absolute inset-0 z-0">
                {floatingSkills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0 }}
                        animate={shouldReduceMotion ? { opacity: 0.15 } : {
                            opacity: [0.1, 0.3, 0.1],
                            x: [0, 100, -50, 0],
                            y: [0, -80, 50, 0]
                        }}
                        transition={{
                            duration: 20,
                            repeat: shouldReduceMotion ? 0 : Infinity,
                            delay: index * 3,
                            ease: "linear"
                        }}
                        className={`absolute text-4xl font-bold text-blue-500/10 pointer-events-none`}
                        style={{
                            left: `${10 + index * 15}%`,
                            top: `${20 + (index % 3) * 20}%`
                        }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>

            <div className="container-max section-padding relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gradient-text">Technical Skills</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Expertise across cloud platforms, infrastructure automation, and modern development practices
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {Object.entries(skillCategories).map(([category, data], index) => (
                        <SkillCategory
                            key={category}
                            title={category}
                            icon={data.icon}
                            skills={data.skills}
                            color={data.color}
                            delay={index * 0.2}
                        />
                    ))}
                </div>

                {/* Technology stack overview */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Technology Ecosystem</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1 }}
                                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-purple-600 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
