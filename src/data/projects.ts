export type PreviewKind = "digipath" | "retail" | "kosh";

export type CaseStudySection = {
  title:
    | "Problem"
    | "Approach"
    | "Data"
    | "Processing"
    | "Solution"
    | "Result / Impact";
  body: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  problem: string;
  functionality: string[];
  technologies: string[];
  github: string;
  demo?: string;
  preview: PreviewKind;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  details: CaseStudySection[];
  stackNote: string;
};

export const projects: Project[] = [
  {
    id: "digipath",
    number: "01",
    title: "DigiPath College Predictor Platform",
    shortTitle: "A clearer path to college.",
    category: "Data Science / Machine Learning / Web Platform",
    description:
      "A student-focused data product for exploring suitable engineering colleges using admission-related data and user inputs.",
    problem:
      "Inconsistent admission datasets make it difficult to explore relevant college options.",
    functionality: [
      "Admission-data preprocessing, cleaning, and validation",
      "Filtering and college-prediction logic",
      "A student-focused exploration interface",
    ],
    technologies: [
      "Data preprocessing",
      "Data validation",
      "Prediction logic",
    ],
    github: "https://github.com/pratish104/DigiPath-College-Predictor",
    preview: "digipath",
    image: {
      src: "/projects/digipath.png",
      alt: "DigiPath AI College Predictor interface showing engineering college recommendations",
      caption: "Actual DigiPath interface · local development build",
    },
    details: [
      {
        title: "Problem",
        body:
          "Students need a practical way to explore engineering college options. Admission-related datasets can be inconsistent, making direct comparison and filtering difficult.",
      },
      {
        title: "Approach",
        body:
          "Treat the project as an end-to-end data product: connect data preparation, validation, filtering, and prediction logic with a student-focused interface.",
      },
      {
        title: "Data",
        body:
          "Engineering admission-related records and student-provided inputs. Specific dataset sources, coverage periods, and licensing details should be added when documented.",
      },
      {
        title: "Processing",
        body:
          "Preprocess and clean the admission data, handle inconsistent records, validate the fields used by the application, and prepare the dataset for filtering and prediction.",
      },
      {
        title: "Solution",
        body:
          "A college exploration platform that brings prepared admission data and user inputs together to help students review suitable engineering college options.",
      },
      {
        title: "Result / Impact",
        body:
          "Intended impact: make college exploration more understandable and useful for students. No prediction-accuracy, adoption, or admission-outcome metrics are claimed.",
      },
    ],
    stackNote:
      "The supplied project description establishes data preprocessing, cleaning, validation, and filtering/prediction logic. Add verified languages, libraries, and deployment details here.",
  },
  {
    id: "retail",
    number: "02",
    title: "Retail Sales Analysis & Dashboard",
    shortTitle: "From transactions to direction.",
    category: "Data Analytics / Business Intelligence",
    description:
      "A retail analytics project that transforms sales data into a clearer view of trends, revenue, and product performance.",
    problem:
      "Raw sales records do not directly reveal which trends and categories deserve attention.",
    functionality: [
      "Data cleaning and exploratory data analysis",
      "Sales, revenue, category, and KPI analysis",
      "Interactive dashboard and business-focused visualizations",
    ],
    technologies: ["Data cleaning", "EDA", "Data visualization"],
    github: "",
    preview: "retail",
    details: [
      {
        title: "Problem",
        body:
          "Retail sales data needs to be cleaned and organized before it can answer practical questions about revenue, sales trends, and product or category performance.",
      },
      {
        title: "Approach",
        body:
          "Start with business questions, prepare the sales dataset, use exploratory analysis to investigate patterns, and present the relevant findings in a dashboard.",
      },
      {
        title: "Data",
        body:
          "Retail sales records. Dataset origin, field definitions, and time coverage are not specified in the supplied project information.",
      },
      {
        title: "Processing",
        body:
          "Clean the data, explore sales and revenue patterns, examine product and category performance, and organize the analysis around relevant KPIs.",
      },
      {
        title: "Solution",
        body:
          "An interactive dashboard that brings sales trends, revenue analysis, category performance, and customer or business insights into a visual workflow.",
      },
      {
        title: "Result / Impact",
        body:
          "Intended impact: make retail performance easier to explore and interpret. The portfolio preview uses illustrative chart shapes, not reported financial results.",
      },
    ],
    stackNote:
      "The project covers data cleaning, exploratory analysis, KPI analysis, and dashboard visualization. Replace this note with the verified analytics and BI tools used.",
  },
  {
    id: "kosh",
    number: "03",
    title: "Kosh Marathi Paraphraser",
    shortTitle: "New expressions. Same meaning.",
    category: "NLP / AI / Marathi Language Technology",
    description:
      "An NLP-focused project exploring Marathi text paraphrasing, language processing, and practical AI experimentation.",
    problem:
      "Paraphrasing requires alternative wording while keeping the original meaning and language context.",
    functionality: [
      "Marathi language and text processing",
      "Text transformation and paraphrasing",
      "Language-focused AI experimentation",
    ],
    technologies: ["NLP", "Text processing", "Marathi"],
    github: "",
    preview: "kosh",
    details: [
      {
        title: "Problem",
        body:
          "Marathi paraphrasing involves producing alternative expressions without losing the intent of the original text. It is a language-specific NLP problem rather than simple word replacement.",
      },
      {
        title: "Approach",
        body:
          "Explore Marathi language processing and text transformation through a focused paraphrasing application.",
      },
      {
        title: "Data",
        body:
          "Marathi text supplied for paraphrasing. Training data, model architecture, and evaluation datasets are not specified and are not assumed here.",
      },
      {
        title: "Processing",
        body:
          "Work with Marathi text inputs and investigate the language-processing steps needed for paraphrasing and meaning-aware text transformation.",
      },
      {
        title: "Solution",
        body:
          "A Marathi paraphrasing project that connects language technology with practical AI experimentation.",
      },
      {
        title: "Result / Impact",
        body:
          "Intended impact: explore more accessible Marathi language tools. No model-quality or usage metrics are claimed; the preview contains editorial sample text, not a measured model output.",
      },
    ],
    stackNote:
      "The supplied scope includes NLP, Marathi language processing, and text transformation. Add the verified model, framework, and application stack when available.",
  },
];
