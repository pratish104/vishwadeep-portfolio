export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "Cybersecurity" | "AI & Networks" | "NLP & AI" | "Machine Learning";
  description: string;
  architecture: string;
  dataflow: string[];
  securitySpecs?: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  technologies: string[];
  github: string;
  liveDemo?: string;
  badge: string;
  accent: string;
  color: string;
}

export const profileData = {
  name: "Vishwadeep Pratap",
  preferredName: "Pratish",
  title: "Computer Engineering Student",
  specialization: "Full-Stack Development • Machine Learning • Cybersecurity",
  summary:
    "Passionate Computer Engineering undergraduate specializing in building resilient cybersecurity tools, deep learning models, and high-performance full-stack web applications.",
  location: "India • Open to Global Remote Roles",
  status: "Available for Internships & Full-Time Roles",
  links: {
    email: "pratapvishwadeep@gmail.com",
    github: "https://github.com/pratish104",
    linkedin: "https://www.linkedin.com/in/vishwadeep-pratap-617745252",
    resume: "/Vishwadeep_Pratap_Resume.pdf",
  },
  stats: [
    { label: "Core Pillars", value: "Full-Stack, ML & Cyber" },
    { label: "Major Systems Built", value: "4 Production Projects" },
    { label: "Primary Languages", value: "Python, TypeScript, SQL" },
    { label: "Environment", value: "Linux / Kali / Cloud" },
  ],
};

export const featuredProjects: ProjectItem[] = [
  {
    id: "forensiq",
    title: "ForensiQ",
    tagline: "Automated Incident Response & Digital Forensics Toolkit",
    category: "Cybersecurity",
    description:
      "A high-performance automated forensics toolkit designed for security analysts to extract volatile system artifacts, identify memory injections, uncover autorun persistence hooks, and reconstruct incident timelines during active breach investigations.",
    architecture:
      "Modular Python engine integrated with Volatility memory analysis, real-time YARA signature matching, and automated forensic report generation.",
    dataflow: [
      "1. Ingestion: Live memory capture dump + volatile RAM acquisition",
      "2. Parsing: Kernel struct parsing & VAD tree walking via Volatility core",
      "3. Detection: YARA signature matching across raw binary streams & hooks",
      "4. Reconstruction: Event log correlation into chronological timeline JSON",
    ],
    securitySpecs: [
      "Volatile RAM Artifact Extraction",
      "Process Injection & Hollow DLL Detection",
      "Registry Autoruns & Hidden Service Scan",
      "Automated Cryptographic Hash Verification (SHA-256)",
    ],
    metrics: [
      { label: "Triage Speedup", value: "85% vs manual inspection" },
      { label: "Extraction Coverage", value: "24+ Artifact Types" },
      { label: "Supported Kernels", value: "Linux & Windows" },
    ],
    features: [
      "Volatile memory artifact extraction & suspicious process detection",
      "Registry & autorun persistence mechanism discovery",
      "Automated system event log timeline reconstruction",
      "YARA pattern matching for adversary signatures & shellcode",
    ],
    technologies: ["Python", "FastAPI", "Kali Linux", "Volatility", "YARA", "Bash", "Linux Internals"],
    github: "https://github.com/pratish104",
    badge: "Active Security Tool",
    accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    color: "#00e5ff",
  },
  {
    id: "shadownet",
    title: "ShadowNet",
    tagline: "AI-Powered Real-Time Network Intrusion & Threat Detection",
    category: "AI & Networks",
    description:
      "An intelligent network defense system utilizing deep neural networks to inspect live packet streams, detect covert exfiltration channels, classify anomalous traffic, and trigger real-time quarantine protocols with sub-millisecond telemetry.",
    architecture:
      "Low-overhead packet capture pipeline with Scapy/Wireshark hooks, PyTorch deep learning classifier, and a live WebSocket telemetry dashboard.",
    dataflow: [
      "1. Sniffing: Promiscuous packet capture stream via Scapy/libpcap driver",
      "2. Disassembly: Flow aggregation, TCP flag matrix, payload entropy scoring",
      "3. Classification: PyTorch multi-layer neural network anomaly evaluation",
      "4. Mitigation: Automatic iptables quarantine trigger + WebSocket broadcast",
    ],
    securitySpecs: [
      "Microsecond Packet Flow Disassembly",
      "Deep Learning Adversarial Vector Classifier",
      "Automated IP & Port Firewall Quarantine",
      "Covert Exfiltration & Port Scan Alerter",
    ],
    metrics: [
      { label: "Detection Latency", value: "< 1.2ms per flow" },
      { label: "Anomaly Accuracy", value: "98.4% Benchmark" },
      { label: "Telemetry Protocol", value: "Real-time WebSockets" },
    ],
    features: [
      "Real-time packet stream inspection & protocol disassembly",
      "Adversarial traffic pattern classification using deep learning",
      "Automated IP/port isolation triggers for identified threats",
      "Real-time telemetry stream with alert level escalation",
    ],
    technologies: ["PyTorch", "Python", "Scapy", "FastAPI", "React", "Tailwind CSS", "WebSockets"],
    github: "https://github.com/pratish104",
    badge: "AI Research Platform",
    accent: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30",
    color: "#818cf8",
  },
  {
    id: "sangrah",
    title: "SANGRAH",
    tagline: "Multilingual NLP Paraphrasing & Language Transformation Engine",
    category: "NLP & AI",
    description:
      "An advanced transformer-based natural language processing platform fine-tuned for semantic paraphrasing and context-aware text transformation across regional Indian languages including Marathi and Hindi.",
    architecture:
      "Fine-tuned sequence-to-sequence transformer pipeline with custom tokenization, optimized for low-latency asynchronous API inference.",
    dataflow: [
      "1. Input: Regional raw text payload (Marathi / Hindi / English)",
      "2. Tokenization: Subword Byte-Pair Encoding with multilingual vocab",
      "3. Generation: Transformer beam search with semantic penalty constraints",
      "4. Quality Check: Cosine similarity verification against original embedding",
    ],
    securitySpecs: [
      "Custom Subword BPE Multilingual Tokenizer",
      "Semantic Drift Penalty Constrained Decoding",
      "High-Throughput Asynchronous FastAPI Inference",
      "Batch Inference Pipeline Optimization",
    ],
    metrics: [
      { label: "Inference Latency", value: "< 85ms" },
      { label: "Semantic Retention", value: "0.92 BLEU/Cosine" },
      { label: "Language Support", value: "Marathi, Hindi, English" },
    ],
    features: [
      "Context-aware multilingual paraphrasing & semantic rewriting",
      "Fine-tuned transformer pipeline for vernacular language NLP",
      "Custom vocabulary tokenization & syntactic preservation validation",
      "Sub-100ms inference response with batch processing support",
    ],
    technologies: ["Python", "PyTorch", "HuggingFace Transformers", "FastAPI", "React", "Tailwind CSS"],
    github: "https://github.com/pratish104",
    badge: "Production NLP Pipeline",
    accent: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
    color: "#f43f5e",
  },
  {
    id: "digipath",
    title: "DigiPath",
    tagline: "Machine Learning Decision Intelligence Platform for Admissions",
    category: "Machine Learning",
    description:
      "An end-to-end data product helping engineering aspirants discover ideal colleges based on admission records, historical rank cutoffs, category distributions, and multi-factor machine learning models.",
    architecture:
      "Comprehensive data preprocessing & cleaning pipeline, Scikit-Learn predictive model, and a responsive student exploration portal.",
    dataflow: [
      "1. Ingestion: Raw multi-year engineering admission PDF & tabular records",
      "2. Cleansing: Missing value imputation, category harmonization, normalization",
      "3. Modeling: Gradient Boosted Trees & KNN multi-criteria ranking engine",
      "4. Delivery: Instant predictive recommendation scoring in interactive UI",
    ],
    securitySpecs: [
      "Automated Inconsistent Dataset Sanitization",
      "Multi-Variable Cutoff Probability Matrix",
      "Client-Side Fast Filter Caching Engine",
      "Responsive Accessible User Workflow",
    ],
    metrics: [
      { label: "Historical Records", value: "50,000+ Admission Rows" },
      { label: "Pipeline Validation", value: "100% Schema Conformance" },
      { label: "Recommendation Time", value: "< 20ms" },
    ],
    features: [
      "Multi-factor admission probability prediction engine",
      "Automated cleaning & validation for inconsistent admission datasets",
      "Interactive filtering by rank, branch, category, and historical trends",
      "Modern accessible student portal with instant recommendation feedback",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "React", "FastAPI", "Tailwind CSS"],
    github: "https://github.com/pratish104/DigiPath-College-Predictor",
    badge: "Deployed Platform",
    accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    color: "#10b981",
  },
];

export const skillCategories = [
  {
    title: "Cybersecurity & Operations",
    description: "Defensive triage, memory forensics & network inspection",
    iconName: "Shield",
    color: "cyan",
    skills: [
      { name: "Kali Linux", level: "Advanced", featured: true },
      { name: "Digital Forensics", level: "Advanced", featured: true },
      { name: "Network Security", level: "Proficient", featured: true },
      { name: "Volatility & Memory Triage", level: "Proficient" },
      { name: "Wireshark & Scapy", level: "Advanced" },
      { name: "YARA Rules & Threat Intel", level: "Proficient" },
    ],
  },
  {
    title: "AI, Machine Learning & NLP",
    description: "Deep learning, transformer architectures & predictive modeling",
    iconName: "Brain",
    color: "emerald",
    skills: [
      { name: "Python", level: "Advanced", featured: true },
      { name: "PyTorch", level: "Advanced", featured: true },
      { name: "Machine Learning", level: "Advanced", featured: true },
      { name: "NLP & Transformers", level: "Proficient", featured: true },
      { name: "Scikit-Learn", level: "Advanced" },
      { name: "Pandas & NumPy", level: "Advanced" },
    ],
  },
  {
    title: "Full-Stack & Systems",
    description: "Modern web architectures, asynchronous APIs & typed frontends",
    iconName: "Layers",
    color: "indigo",
    skills: [
      { name: "React", level: "Advanced", featured: true },
      { name: "FastAPI", level: "Advanced", featured: true },
      { name: "TypeScript", level: "Proficient", featured: true },
      { name: "Tailwind CSS", level: "Advanced", featured: true },
      { name: "SQL & Databases", level: "Advanced" },
      { name: "Node.js & REST APIs", level: "Proficient" },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description: "Linux systems administration, containerization & CI/CD",
    iconName: "Terminal",
    color: "amber",
    skills: [
      { name: "Linux / Bash", level: "Advanced", featured: true },
      { name: "Git & GitHub", level: "Advanced", featured: true },
      { name: "Docker", level: "Proficient" },
      { name: "Vite & Vercel CI/CD", level: "Advanced" },
      { name: "Jupyter Notebooks", level: "Advanced" },
      { name: "Postman & API Testing", level: "Advanced" },
    ],
  },
];

export const experienceTimeline = [
  {
    phase: "01",
    title: "Computer Engineering Foundations",
    period: "Academic Foundation",
    summary:
      "Deep exploration in Computer Engineering core disciplines: Operating Systems, Computer Architecture, Data Structures, Algorithms, Networking protocols, and Database Systems.",
    tags: ["Computer Engineering", "OS & Networking", "Data Structures", "Python & SQL"],
  },
  {
    phase: "02",
    title: "Cybersecurity & Forensic Tooling",
    period: "Security Focus",
    summary:
      "Architected ForensiQ for automated volatile memory extraction and ShadowNet for real-time AI packet inspection and intrusion detection.",
    tags: ["Kali Linux", "Digital Forensics", "Network Security", "Threat Detection"],
  },
  {
    phase: "03",
    title: "AI, NLP & Predictive Intelligence",
    period: "Machine Learning Focus",
    summary:
      "Engineered transformer-based multilingual paraphrasing platform SANGRAH and developed data-driven admission prediction platform DigiPath.",
    tags: ["PyTorch", "HuggingFace", "NLP", "Machine Learning", "FastAPI"],
  },
  {
    phase: "04",
    title: "Full-Stack Systems & Production Architecture",
    period: "Present & Future",
    summary:
      "Building high-performance modern web platforms combining typed React frontends, scalable FastAPI microservices, and production deployment on Vercel.",
    tags: ["React 19", "FastAPI", "TypeScript", "Tailwind CSS", "Vercel"],
  },
];
