// Shared by server and client code.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/vishal-canvas";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vishalrai123.github.io/vishal-canvas";

export const RESUME_URL = `${BASE_PATH}/resume/vishal-rai-resume.pdf`;

// Top-level scenes on the home page, in order. Experience expands to one scene per CV group.
export const SCENES = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
  { id: "projects", label: "All projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
