export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "Data Product" | "Data Analytics" | "NLP & AI" | "Systems Engineering";
  description: string;
  architecture: string;
  pipeline: string[];
  features: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  statusLabel: string;
  statusType: "verified-repo" | "interactive-preview" | "research-prototype";
  accentColor: string;
  image?: string;
  metrics: ProjectMetric[];
  problemStatement: string;
  approach: string;
  toolsNote?: string;
}

export const profileData = {
  name: "Vishwadeep Pratap",
  preferredName: "Pratish",
  role: "Data Analyst & Systems Engineer",
  positioning: "DATA × AI × ENGINEERING",
  location: "Navi Mumbai, India",
  summary:
    "Computer Engineering undergraduate with hands-on experience in data processing, data validation, exploratory data analytics, and machine learning systems. Experienced in building dependable data products that bridge raw data pipelines with intuitive user interfaces.",
  status: "Available for Data & Engineering Roles",
  links: {
    email: "pratapvishwadeep@gmail.com",
    github: "https://github.com/pratish104",
    linkedin: "https://www.linkedin.com/in/vishwadeep-pratap-617745252",
    resume: "/Vishwadeep_Pratap_Resume.pdf",
  },
  stats: [
    { label: "Core Discipline", value: "Data Analytics & ML" },
    { label: "Flagship Project", value: "DigiPath Predictor" },
    { label: "Education", value: "MGM College (B.E. 2026)" },
    { label: "Competition Honors", value: "3 Verified Awards" },
  ],
};

export const featuredProjects: ProjectItem[] = [
  {
    id: "digipath",
    title: "DigiPath — Admission Decision Intelligence Platform",
    tagline: "End-to-end college prediction engine turning complex cutoff data into clear student decisions.",
    category: "Data Product",
    description:
      "A data-driven platform engineered for diploma and engineering aspirants to evaluate eligible colleges based on percentage cutoffs, category distributions, branch preferences, and regional quotas. Eliminates confusion caused by unstandardized admission records through an automated validation and filtering pipeline. Also includes scam detection heuristics for job and internship postings.",
    architecture:
      "Modular Python and SQL engine connecting multi-criteria cutoff parsing, percentile threshold validation, and student-focused query filters.",
    pipeline: [
      "1. Ingestion: Processing multi-year engineering and diploma admission cutoff records.",
      "2. Sanitization: Normalizing category classifications, branch names, and quota criteria.",
      "3. Recommendation Logic: Multi-criteria filtering matching student percentile against historical trends.",
      "4. Safety Heuristics: Rule-based verification flag to warn students about fraudulent internship listings.",
    ],
    features: [
      "Multi-factor eligible college prediction based on rank/percentage",
      "Dynamic filtering by city, engineering branch, and quota category",
      "Automated cleaning and validation of inconsistent admission records",
      "Integrated scam and fraud heuristic flags for job/internship listings",
    ],
    technologies: ["Python", "SQL", "Data Preprocessing", "Data Validation", "Algorithm Design", "FastAPI / Flask"],
    github: "https://github.com/pratish104/DigiPath-College-Predictor",
    statusLabel: "Active Project · Verified GitHub",
    statusType: "verified-repo",
    accentColor: "#10b981", // Emerald
    image: "/projects/digipath.png",
    metrics: [
      { label: "Primary Pipeline", value: "Python + SQL" },
      { label: "Filtering Logic", value: "Branch, City, Category" },
      { label: "Safety System", value: "Scam Detection Heuristic" },
    ],
    problemStatement:
      "State admission datasets are scattered across disparate PDFs and tables with inconsistent formatting. Students struggle to identify realistic college options matching their percentile, category, and preferred location.",
    approach:
      "Built a structured data pipeline that cleans and validates admission records, applying multi-parameter eligibility logic to present straightforward recommendations.",
  },
  {
    id: "retail-sales",
    title: "Retail Sales Analysis & BI Dashboard",
    tagline: "Transforming transactional records into executive clarity through exploratory analysis and KPI modeling.",
    category: "Data Analytics",
    description:
      "A rigorous retail analytics case study that uncovers profitability drivers, sales trends, customer segments, and regional margins. Built with R and RStudio for data cleaning and exploratory data analysis (EDA), paired with an interactive Power BI dashboard for visual reporting.",
    architecture:
      "R/RStudio statistical processing pipeline feeding an interactive Power BI business intelligence reporting model.",
    pipeline: [
      "1. Data Cleaning (R): Type transformation, outlier detection, date normalization, and missing record handling.",
      "2. Exploratory Analysis: Evaluating sales trends, order volumes, and regional margin distribution.",
      "3. KPI Modeling: Calculating profit margins, discount impact ratios, and customer segment contributions.",
      "4. Power BI Dashboard: Interactive multi-dimensional visuals for category and time-series drilldowns.",
    ],
    features: [
      "Exploratory Data Analysis (EDA) uncovering regional profit disparities",
      "Comprehensive profit margin and discount sensitivity analysis in R",
      "Interactive Power BI executive dashboard with drill-down filters",
      "Actionable business insights distinguishing revenue drivers from profit leaders",
    ],
    technologies: ["R", "RStudio", "Power BI", "Data Cleaning", "Exploratory Data Analysis (EDA)", "KPI Modeling"],
    statusLabel: "Interactive Case Study · Portfolio Preview",
    statusType: "interactive-preview",
    accentColor: "#6366f1", // Indigo
    metrics: [
      { label: "Analysis Environment", value: "R & RStudio" },
      { label: "Visualization", value: "Power BI Dashboards" },
      { label: "Technique", value: "Exploratory Data Analysis" },
    ],
    problemStatement:
      "Raw transactional records obscure critical business dynamics: high-revenue items frequently generate low or negative net margins due to poorly calibrated discounts.",
    approach:
      "Employed R and RStudio to audit transaction integrity and compute margins, then developed a Power BI reporting suite to expose trends and category performance.",
    toolsNote: "Analyzed strictly using R/RStudio and Power BI.",
  },
  {
    id: "kosh",
    title: "Kosh — Marathi Text Rewriting & Style Transformation",
    tagline: "Context-aware Devanagari natural language platform for Marathi semantic paraphrasing.",
    category: "NLP & AI",
    description:
      "A natural language processing system developed to perform semantic rewriting and stylistic variation for the Marathi language (internally developed under the project code SANGRAH). Focuses on maintaining semantic intent while reshaping phrasing, syntactic structure, and formality.",
    architecture:
      "Python NLP pipeline with Devanagari morphological preprocessing, context preservation scoring, and stylistic rewriting.",
    pipeline: [
      "1. Text Ingestion: Raw Devanagari input parsing and grammatical segmenting.",
      "2. Linguistic Normalization: Context preservation and morphological validation.",
      "3. Style Modulation: Transforming phrasing across formal, concise, and academic tones.",
      "4. Semantic Verification: Validating that the intended core message remains uncorrupted.",
    ],
    features: [
      "Context-aware Marathi text rewriting and linguistic paraphrasing",
      "Tone transformation adapting formal, descriptive, and concise styles",
      "Preservation of Devanagari grammatical agreement and core meaning",
      "Interactive evaluation workbench for regional language NLP",
    ],
    technologies: ["Python", "NLP", "Text Processing", "Marathi Linguistic Modeling", "Devanagari Normalization"],
    statusLabel: "NLP Prototype · Portfolio Preview",
    statusType: "research-prototype",
    accentColor: "#8b5cf6", // Purple/Violet
    metrics: [
      { label: "Target Language", value: "Marathi (Devanagari)" },
      { label: "Core Task", value: "Style Rewrite & Paraphrase" },
      { label: "Architecture", value: "Python NLP Pipeline" },
    ],
    problemStatement:
      "Mainstream text transformation platforms like QuillBot cater predominantly to English. Vernacular Indian languages like Marathi suffer from inaccurate translation and lost grammatical nuance.",
    approach:
      "Engineered a language-specific NLP system tuned for Marathi syntactic structures, enabling faithful stylistic rewriting.",
  },
  {
    id: "forensiq-shadownet",
    title: "Systems Engineering: ForensiQ & ShadowNet",
    tagline: "Incident response volatile memory analysis & real-time network anomaly detection.",
    category: "Systems Engineering",
    description:
      "A dual demonstration of lower-level systems engineering. ForensiQ automates volatile RAM artifact extraction and forensic timeline reconstruction during incident triage. ShadowNet monitors live packet streams with statistical anomaly detection for network defense.",
    architecture:
      "Python systems engine integrated with Linux volatile memory parsers, raw packet telemetry, and automated security reports.",
    pipeline: [
      "1. Memory Triage: Automated extraction of volatile process trees, autorun hooks, and injected DLLs.",
      "2. Packet Telemetry: Live network flow inspection and protocol disassembly.",
      "3. Incident Correlation: Chronological reconstruction of system events and abnormal connection spikes.",
      "4. Analyst Summary: Structured technical outputs for security verification.",
    ],
    features: [
      "Automated volatile RAM artifact extraction and process validation",
      "System event log timeline reconstruction for forensic analysis",
      "Real-time packet capture and flow classification hooks",
      "Hardened Linux scripting and diagnostic automation",
    ],
    technologies: ["Python", "Kali Linux", "Digital Forensics", "Network Security", "Linux Internals", "Bash"],
    github: "https://github.com/pratish104",
    statusLabel: "Security Systems · Verified GitHub",
    statusType: "verified-repo",
    accentColor: "#0ea5e9", // Sky Blue
    metrics: [
      { label: "Focus Areas", value: "Digital Forensics & Network Security" },
      { label: "Tooling", value: "Kali Linux, Python, Memory Parsers" },
      { label: "Verification", value: "Systematic Artifact Extraction" },
    ],
    problemStatement:
      "Manual incident triage is sluggish and error-prone during active system investigations. Extracting volatile memory artifacts and monitoring live network flows requires automated, reliable scripting.",
    approach:
      "Built automated Python-driven forensic utilities that streamline memory analysis, timeline reconstruction, and network telemetry.",
  },
];

export const experienceTimeline = [
  {
    role: "Data Analytics Intern",
    organization: "InAmigos Foundation",
    period: "08/2026 - Present",
    type: "Internship",
    summary:
      "Support data collection, organization, exploratory analysis, and reporting activities across structured organizational datasets. Utilize spreadsheet analytics and data verification methods to identify patterns, clean inconsistencies, and prepare accurate executive outputs following project guidelines.",
    tags: ["Data Collection", "Data Cleaning", "Data Analytics", "Reporting", "Spreadsheets"],
    featured: true,
  },
  {
    role: "Data Entry Intern",
    organization: "CollegeAftermath",
    period: "07/2026 - Present",
    type: "Internship",
    summary:
      "Perform high-precision data entry and maintain organized structured records. Review dataset entries for completeness, internal consistency, and schema accuracy prior to submission while adhering strictly to documentation standards.",
    tags: ["Data Entry", "Data Verification", "Record Management", "Quality Assurance"],
    featured: false,
  },
  {
    role: "Voiceover / Speech Data Recording Assistant",
    organization: "Indika AI Pvt. Ltd",
    period: "10/2022 - 12/2022",
    type: "AI Dataset Training",
    summary:
      "Recorded 100+ standardized speech dataset samples for AI training pipelines under strict acoustic and phonetic quality thresholds. Followed project documentation guidelines and completed assigned data collection objectives within target timelines.",
    tags: ["Speech Data Collection", "AI Training Dataset", "Data Documentation"],
    featured: false,
  },
];

export const educationData = [
  {
    degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
    institution: "MGM College of Engineering & Technology, Panvel",
    period: "Graduation 2026",
    details: "Core focus on Data Structures, Database Management Systems (DBMS), Operating Systems, and Applied Machine Learning.",
    badge: "Current Degree",
  },
  {
    degree: "Higher Secondary Certificate (HSC) — Science",
    institution: "G.N. Khalsa College of Science, Commerce & Arts",
    period: "Completed",
    details: "Score: 78% · Foundation in Mathematics, Statistics, and Physical Sciences.",
    badge: "78%",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Social Service League High School",
    period: "Completed",
    details: "Score: 72% · Academic fundamentals and analytical problem-solving.",
    badge: "72%",
  },
];

export const awardsData = [
  {
    title: "1st Prize — Nexus AI Quiz Competition",
    category: "AI & Machine Learning",
    description: "Awarded first place in an inter-college technical quiz on artificial intelligence, machine learning architectures, algorithmic efficiency, and data science concepts.",
    highlight: "1st Place Winner",
    date: "Nexus Competition",
  },
  {
    title: "1st Prize — IEEE Paper Presentation",
    category: "Technical Research",
    description: "Secured first prize for presenting technical research evaluating modern engineering architectures, methodology clarity, and practical problem resolution.",
    highlight: "1st Place Winner",
    date: "IEEE Event",
  },
  {
    title: "3rd Prize — Pillai HOC TechExpo",
    category: "Project & Innovation Expo",
    description: "Recognized with third prize for demonstrating applied technical innovation, system architecture design, and functional implementation at the TechExpo.",
    highlight: "3rd Place Winner",
    date: "TechExpo",
  },
];

export const skillCategories = [
  {
    title: "Data Analytics & Validation",
    description: "Data cleaning, statistical querying, validation pipelines & reporting",
    skills: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Microsoft Excel",
      "Google Sheets",
      "Data Cleaning",
      "Data Validation",
      "Exploratory Data Analysis (EDA)",
      "Reporting & Documentation",
    ],
    accent: "emerald",
  },
  {
    title: "AI, Machine Learning & NLP",
    description: "Predictive algorithms, natural language processing & linguistic modeling",
    skills: [
      "Machine Learning",
      "Scikit-learn",
      "Natural Language Processing (NLP)",
      "Text Processing",
      "Marathi Language Processing",
      "Devanagari Normalization",
      "PyTorch Fundamentals",
    ],
    accent: "indigo",
  },
  {
    title: "Systems, BI & Engineering",
    description: "Business intelligence, web engineering & operational tooling",
    skills: [
      "R & RStudio",
      "Power BI",
      "FastAPI / Flask",
      "React",
      "Git & GitHub",
      "Linux / Bash",
      "Kali Linux",
      "Jupyter Notebook",
    ],
    accent: "sky",
  },
];

