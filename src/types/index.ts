export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  responsibilities: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  skills?: string[];
  logo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
