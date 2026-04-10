import { Experience, Certification } from '../types';

export const experiences: Experience[] = [
  {
    title: "Cloud Engineer",
    company: "Greenberg Traurig",
    location: "Global",
    duration: "2024 - Present",
    description: "Design, architect, and lead cloud initiatives across a global Azure environment serving 5,200 users, three major firm-wide applications, and 49 offices worldwide. Recognized as the firm's Azure Subject Matter Expert and leader in AI-powered automation, cost optimization, and secure infrastructure design.",
    responsibilities: [
      "Developed Solutions: Delivered a firm-wide digital records onboarding/offboarding tracker and automated cloud resource lifecycle management, eliminating hours of manual work and improving compliance tracking",
      "Infrastructure as Code: Standardized Azure policy deployment using Terraform, enabling rapid rollout of tagging enforcement, resource creation restrictions, and diagnostic configurations across the global environment",
      "Cost Optimization: Implemented budget and anomaly monitoring with automated cost analysis, reducing annual cloud spend by 25% through right-sizing and decommissioning unused assets",
      "Cloud Education & Adoption: Founded and lead GT Learn To Cloud program, engaging ~130 technical staff in cloud training and certification pathways, resulting in 7+ employees earning cloud certifications",
      "Security & Compliance: Partnered with security team to achieve and maintain ISO 27017 cloud security certification for two consecutive years, architecting secure environments and providing compliance evidence for clients"
    ]
  }
];

export const certifications: Certification[] = [
  // Latest Certifications (2025-2026)
  {
    name: "Microsoft Certified: Agentic AI Business Solutions Architect",
    issuer: "Microsoft",
    issued: "Mar 2026",
    expires: "Mar 2027",
    credentialId: "60H770-7A43B8",
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: AI Transformation Leader",
    issuer: "Microsoft",
    issued: "Mar 2026",
    credentialId: "B4AD5D-0797AA",
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: AI Business Professional",
    issuer: "Microsoft",
    issued: "Feb 2026",
    credentialId: "B9AM95-F815DF",
    logo: "microsoft"
  },
  {
    name: "Microsoft 365 Certified: Copilot and Agent Administration Fundamentals",
    issuer: "Microsoft",
    issued: "Feb 2026",
    credentialId: "L53669-B25485",
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Power Platform Fundamentals",
    issuer: "Microsoft",
    issued: "Nov 2025",
    credentialId: "B9PD71-FFB8F4",
    logo: "microsoft"
  },
  {
    name: "Offensive Azure Security Professional",
    issuer: "CloudBreach",
    issued: "Oct 2025",
    credentialId: "68f325b4e7553c60289571c2",
    logo: "cloudbreach"
  },
  {
    name: "Microsoft Certified: Azure Database Administrator Associate",
    issuer: "Microsoft",
    issued: "Sep 2025",
    expires: "Sep 2026",
    credentialId: "59A6FB-8HD26E",
    logo: "microsoft"
  },

  // Active Microsoft Certifications (Current and Valid)
  {
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    issued: "Jan 2024",
    expires: "Jan 2027",
    credentialId: "F8CU30-5957DF",
    skills: ["Artificial Intelligence (AI)", "Azure AI Services", "Machine Learning"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert",
    issuer: "Microsoft",
    issued: "Feb 2023",
    expires: "Feb 2027",
    credentialId: "876C41-577N16",
    skills: ["Azure Architecture", "Cloud Solutions", "Enterprise Design"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Security Engineer Associate",
    issuer: "Microsoft",
    issued: "Apr 2023",
    expires: "Apr 2027",
    credentialId: "45C096-E2R875",
    skills: ["Azure Security", "Identity Management", "Compliance"],
    logo: "microsoft"
  },
  {
    name: "Microsoft 365 Certified: Administrator Expert",
    issuer: "Microsoft",
    issued: "Jul 2022",
    expires: "Jul 2027",
    credentialId: "B7CB0D-C5X291",
    skills: ["Microsoft 365", "Exchange Online", "SharePoint", "Teams"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    issued: "Jul 2023",
    expires: "Jul 2027",
    credentialId: "41E628-XEA0EE",
    skills: ["Azure Development", "App Services", "Functions"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    issued: "Aug 2024",
    expires: "Aug 2026",
    credentialId: "4E42CD-A3CEC5",
    skills: ["Azure DevOps", "CI/CD", "Infrastructure as Code"],
    logo: "microsoft"
  },
  {
    name: "Microsoft 365 Certified: Teams Administrator Associate",
    issuer: "Microsoft",
    issued: "Nov 2021",
    expires: "Nov 2026",
    credentialId: "1B3BWE-759D61",
    skills: ["Microsoft Teams", "Collaboration", "Communication"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Network Engineer Associate",
    issuer: "Microsoft",
    issued: "Dec 2023",
    expires: "Dec 2026",
    credentialId: "6F776B-7C0A47",
    skills: ["Azure Networking", "Virtual Networks", "Load Balancing"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    issued: "Dec 2022",
    expires: "Dec 2026",
    credentialId: "5T4B42-040E75",
    skills: ["Azure Administration", "Resource Management", "Monitoring"],
    logo: "microsoft"
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issued: "Aug 2022",
    credentialId: "6E3E23-1A61C2",
    logo: "microsoft"
  },

  // Other Active Certifications
  {
    name: "KCNA: Kubernetes and Cloud Native Associate",
    issuer: "The Linux Foundation",
    issued: "Oct 2024",
    expires: "Oct 2026",
    logo: "linux-foundation"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issued: "Feb 2024",
    expires: "Feb 2027",
    logo: "aws"
  },
  {
    name: "HashiCorp Certified: Terraform Associate (003)",
    issuer: "HashiCorp",
    issued: "Oct 2023",
    expires: "Sep 2027",
    logo: "hashicorp"
  },
  {
    name: "LE-1: Linux Essentials",
    issuer: "Linux Professional Institute (LPI)",
    issued: "Sep 2023",
    skills: ["Ubuntu", "Linux Server", "CentOS", "Linux Desktop", "Linux System Administration"],
    logo: "lpi"
  },
  {
    name: "CompTIA Network+ ce Certification",
    issuer: "CompTIA",
    issued: "Aug 2023",
    expires: "Aug 2026",
    logo: "comptia"
  },
  {
    name: "PMI Project Management Ready™",
    issuer: "Project Management Institute",
    issued: "Oct 2022",
    logo: "pmi"
  },

  // Training Certifications
  {
    name: "AZ-900 Microsoft Azure Fundamentals",
    issuer: "A Cloud Guru | A Pluralsight Company",
    issued: "Jul 2022",
    logo: "pluralsight"
  },
  {
    name: "MS-101: Microsoft 365 Mobility and Security",
    issuer: "Microsoft",
    issued: "Jul 2022",
    logo: "microsoft"
  },
  {
    name: "Networking Foundations: Networking Basics",
    issuer: "LinkedIn",
    issued: "Jul 2022",
    logo: "linkedin"
  },
  {
    name: "MS-100: Microsoft 365 Identity and Services",
    issuer: "Microsoft",
    issued: "Apr 2022",
    skills: ["Microsoft Azure", "Microsoft Intune", "Microsoft Office"],
    logo: "microsoft"
  }
];

export const appliedSkills: Certification[] = [
  {
    name: "Streamline business workflows with AI chat",
    issuer: "Microsoft Applied Skills",
    issued: "Feb 2026",
    credentialId: "13F54C2C724E5397",
    logo: "microsoft"
  },
  {
    name: "Create and manage canvas apps with Power Apps",
    issuer: "Microsoft Applied Skills",
    issued: "Jan 2026",
    credentialId: "3402A354ECE4CB0C",
    logo: "microsoft"
  },
  {
    name: "Migrate SQL Server workloads to Azure SQL Database",
    issuer: "Microsoft Applied Skills",
    issued: "Dec 2024",
    credentialId: "A1641D392DABFD7",
    logo: "microsoft"
  },
  {
    name: "Secure storage for Azure Files and Azure Blob Storage",
    issuer: "Microsoft Applied Skills",
    issued: "Nov 2023",
    credentialId: "D91F788085F44DFE",
    logo: "microsoft"
  },
];

export const skills = [
  "Microsoft Azure",
  "Amazon Web Services (AWS)",
  "Terraform",
  "Kubernetes",
  "Docker",
  "Azure DevOps",
  "CI/CD Pipelines",
  "PowerShell",
  "Python",
  "Azure OpenAI",
  "Azure Machine Learning Studio",
  "Azure Security Center",
  "Azure Policy",
  "ISO 27017",
  "Azure Virtual Networks",
  "Application Insights",
  "Log Analytics",
  "ARM Templates",
  "Bicep",
  "Azure Functions",
  "Power Automate",
  "Linux Administration",
  "Cloud Architecture Design",
  "Zero Trust Security"
];
