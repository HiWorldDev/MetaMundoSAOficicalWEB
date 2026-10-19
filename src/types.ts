export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  award: string;
  tagline: string;
  heroImage: string;
  secondaryImage: string;
  palette: { primary: string; secondary: string; bg: string };
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string; detail: string }[];
  deliverables: string[];
  testimonial: { quote: string; author: string; role: string; company: string };
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  deliverables: string[];
  highlight: string;
  bgAccent: string;
}

export interface AwardItem {
  year: string;
  title: string;
  category: string;
  institution: string;
  project: string;
}

export interface ClientReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
  impact: string;
  avatarBg: string;
}
