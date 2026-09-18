export const site = {
  name: "Vishwadeep Pratap",
  positioning: "Data Analyst | Data Scientist | AI/ML Enthusiast",

  links: {
    email: "pratapvishwadeep@gmail.com",
    github: "https://github.com/pratish104",
    linkedin: "https://www.linkedin.com/in/vishwadeep-pratap-617745252",
  },
  resume: "/Vishwadeep_Pratap_Resume.pdf",
};

export const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

export function externalHref(value: string): string | undefined {
  if (!value || value.startsWith("YOUR_")) return undefined;

  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function emailHref(value: string): string | undefined {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? `mailto:${value}`
    : undefined;
}

export const skills = [
  {
    name: "Programming",
    icon: "code",
    description: "The foundation for working with data.",
    items: ["Python", "SQL"],
  },
  {
    name: "Data Analytics",
    icon: "database",
    description: "Make messy data useful and dependable.",
    items: [
      "Pandas",
      "NumPy",
      "Excel",
      "Data Cleaning",
      "Data Validation",
      "Exploratory Data Analysis",
    ],
  },
  {
    name: "Visualization",
    icon: "chart",
    description: "Make the important patterns easy to see.",
    items: ["Power BI", "Matplotlib", "Seaborn", "Dashboards"],
  },
  {
    name: "Data Science / ML",
    icon: "network",
    description: "Explore patterns and predictive approaches.",
    items: [
      "Scikit-learn",
      "Machine Learning",
      "Feature Engineering",
      "Predictive Modeling",
    ],
  },
  {
    name: "AI / NLP",
    icon: "language",
    description: "Experiment with language and intelligent tools.",
    items: [
      "Natural Language Processing",
      "Text Processing",
      "AI-powered applications",
    ],
  },
  {
    name: "Tools",
    icon: "terminal",
    description: "A practical, reproducible project workflow.",
    items: ["Git", "GitHub", "Jupyter Notebook"],
  },
] as const;

export const journey = [
  {
    stage: "Foundations",
    title: "Learning to ask better questions of data",
    description:
      "Building a foundation in Python, SQL, data cleaning, validation, and exploratory analysis. Focusing on understanding the dataset before choosing the technique.",
    tags: ["Python", "SQL", "Data Analytics"],
  },
  {
    stage: "Applied projects",
    title: "Moving from datasets to useful interfaces",
    description:
      "Working on DigiPath and retail sales analysis to connect real-world data processing with filtering, business questions, and clear visual communication.",
    tags: ["DigiPath", "Retail Analytics", "Dashboards"],
  },
  {
    stage: "Current exploration",
    title: "Exploring intelligent, language-aware applications",
    description:
      "Experimenting with machine learning, Marathi NLP through Kosh, AI-powered applications, and the data engineering concepts behind reliable data workflows.",
    tags: ["Machine Learning", "NLP", "Data Engineering concepts"],
  },
] as const;
