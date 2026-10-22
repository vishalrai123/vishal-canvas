export type Html = string;

export interface Task {
  meta: {
    taskId: string;
    title: string;
    slug: string;
    category: string;
    tags: string[];
    role: string;
    oneLineSummary: string;
    status: "draft" | "published";
    featured: boolean;
    organization?: string;
    confidential: boolean;
    links: { label: string; url: string }[];
    cover?: string;
  };
  sections: {
    overview: Html | null;
    problem: Html | null;
    objectives: string[] | null;
    approach: { html: Html; phases: string[] } | null;
    tools: string[] | null;
    challenges: { challenge: string; mitigation: string }[] | null;
    outcomes: { deliverables: string[]; value: string[] } | null;
    skills: string[] | null;
    highlights: string[] | null;
    summary: { text: string; html: Html } | null;
  };
}

export interface Profile {
  name: string;
  title: string;
  degree: string;
  headline: string;
  location: string;
  email: string;
  links: { label: string; url: string }[];
  stack: string[];
  summary: string;
  experience: {
    role: string;
    company: string;
    period: string;
    groups: { name: string; items: { lead: string; text: string }[] }[];
  }[];
  achievements: { lead: string; text: string }[];
  education: { school: string; degree: string; period: string }[];
  languages: { name: string; level: string }[];
  competencies: { area: string; items: string[] }[];
}

export interface Ranked {
  name: string;
  tasks: Task[];
}
