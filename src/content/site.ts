export type EvidenceLinkKind =
  | "repo"
  | "article"
  | "paper-index"
  | "preprint"
  | "linkedin-post"
  | "demo"
  | "download"
  | "contact";

export type ProjectStatus =
  | "live"
  | "research"
  | "private-case-study"
  | "in-progress"
  | "planned";

export type PaperStatus = "under-review";
export type WritingStatus = "published" | "draft";
export type ThesisStatus = "thesis";

export type EvidenceLink = {
  label: string;
  href: string;
  kind: EvidenceLinkKind;
};

export type MetricEntry = {
  value: string;
  label: string;
  detail: string;
};

export type NowItem = {
  label: string;
  title: string;
  detail: string;
};

export type ProjectEntry = {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  impact: string;
  stack: string[];
  proofLinks: EvidenceLink[];
  detail: string;
  featured: boolean;
  year: string;
};

export type PaperEntry = {
  slug: string;
  displayTitle: string;
  fullTitle: string;
  status: PaperStatus;
  summary: string;
  theme: string;
  year: string;
  venue?: string;
  proofLinks: EvidenceLink[];
  featured: boolean;
};

export type ThesisEntry = {
  title: string;
  summary: string;
  institution: string;
  date: string;
  status: ThesisStatus;
  keyFindings: string[];
  downloadAsset: EvidenceLink;
  proofLinks: EvidenceLink[];
};

export type WritingEntry = {
  title: string;
  date: string;
  summary: string;
  status: WritingStatus;
  proofLinks: EvidenceLink[];
};

export const githubProfileUrl = "https://github.com/lyubah";

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "featured", label: "Work" },
  { id: "research", label: "Research" },
  { id: "private-work", label: "Private Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

export const heroMetrics: MetricEntry[] = [
  {
    value: "50–70%",
    label: "Sensing energy savings",
    detail: "Measured across health-monitoring datasets in the thesis evaluation.",
  },
  {
    value: "90%",
    label: "Tuning time reduction",
    detail: "Achieved by replacing manual tuning sweeps with Bayesian optimization on SLURM.",
  },
  {
    value: "81",
    label: "Datasets in the similarity pipeline",
    detail: "End-to-end benchmark pipeline built and debugged for time-series similarity work.",
  },
  {
    value: "92%",
    label: "Public NLP accuracy",
    detail: "Reached on a public BERT sentiment system shipped with FastAPI, Docker, and Vercel.",
  },
];

export const currentSignal: NowItem = {
  label: "Now building",
  title: "Voice assistant pipeline for a startup final round",
  detail:
    "A private STT → model-routing → TTS loop being built under a real deadline.",
};

export const thesis: ThesisEntry = {
  title:
    "Energy-Efficient Time Series Classification on IoT Devices with Sensor-Aware Early-Exit Machine Learning",
  summary:
    "My M.S. thesis asks when an edge model has enough information to stop collecting sensor data, instead of paying the cost of a full sensing window every time.",
  institution: "Washington State University",
  date: "May 2026",
  status: "thesis",
  keyFindings: [
    "Built CNN and Random Forest early-exit variants that cut both sensing and compute.",
    "Saved 50–70% of sensing energy while staying within 2% of full-window accuracy.",
    "Measured 29–42% end-to-end savings on Raspberry Pi hardware with real sensors.",
    "Showed that confidence-aware stopping can beat compute-only optimization for edge IoT systems.",
  ],
  downloadAsset: {
    label: "Download thesis PDF",
    href: "/downloads/nelson-lubah-thesis.pdf",
    kind: "download",
  },
  proofLinks: [
    {
      label: "Download thesis PDF",
      href: "/downloads/nelson-lubah-thesis.pdf",
      kind: "download",
    },
    {
      label: "Read JMLR paper",
      href: "https://www.catalyzex.com/paper/sensor-aware-classifiers-for-energy-efficient",
      kind: "preprint",
    },
  ],
};

export const featuredProjects: ProjectEntry[] = [
  {
    slug: "sensor-aware-early-exit-inference",
    title: "Sensor-Aware Early-Exit Inference",
    category: "Research · Thesis · Hardware-Evaluated",
    status: "research",
    summary:
      "Efficient inference research for time-series classifiers that stop sensing or prediction once the model is confident enough, reducing energy use while preserving accuracy.",
    impact:
      "Measured 50–70% energy savings while staying within 2% accuracy across six health and activity-recognition datasets. Evaluated latency, energy, accuracy, and calibration on Nvidia AGX Xavier and Raspberry Pi hardware. Built modular SLURM/HPC infrastructure that reduced hyperparameter tuning time by 90%.",
    stack: [
      "Efficient Inference",
      "Edge AI",
      "Time Series",
      "PyTorch",
      "Random Forests",
      "Calibration",
      "SLURM/HPC",
    ],
    proofLinks: [
      {
        label: "Thesis PDF",
        href: "/downloads/nelson-lubah-thesis.pdf",
        kind: "download",
      },
      {
        label: "Paper",
        href: "https://www.catalyzex.com/paper/sensor-aware-classifiers-for-energy-efficient",
        kind: "preprint",
      },
    ],
    detail:
      "Problem: battery-powered sensing systems often collect and process a full input window even when a reliable prediction could be made earlier. What I built: sensor-aware early-exit CNN and Random Forest variants, including training, thresholding, ablations, calibration analysis, and hardware evaluation on edge devices.",
    featured: true,
    year: "2024–2026",
  },
  {
    slug: "usbr-dashboard",
    title: "USBR Forecasting Dashboard",
    category: "Applied Forecasting",
    status: "live",
    summary:
      "A forecasting dashboard for the U.S. Bureau of Reclamation that integrates sensor, climate, satellite, and operations data into a live decision-support interface.",
    impact:
      "Improved forecast accuracy by 30% and replaced a slow manual workflow with a live interface.",
    stack: ["Python", "Dash", "Flask", "Plotly", "Pandas", "USGS", "SNOTEL"],
    proofLinks: [
      {
        label: "GitHub repo",
        href: "https://github.com/lyubah/USBR-Dashboard",
        kind: "repo",
      },
    ],
    detail:
      "This is applied forecasting work with real stakeholders, messy public data, and a concrete operational interface.",
    featured: true,
    year: "2024",
  },
  {
    slug: "music-sentiment-analyzer",
    title: "Music Sentiment Analyzer",
    category: "Applied NLP",
    status: "live",
    summary:
      "A full-stack NLP system for lyrics sentiment analysis, covering data collection, weak labeling, model training, inference, deployment, and public write-up.",
    impact:
      "Reached 92% accuracy and shipped through FastAPI, Docker, Ainize, and Vercel.",
    stack: ["Python", "BERT", "FastAPI", "Docker", "OpenAI API", "Vercel"],
    proofLinks: [
      {
        label: "Backend repo",
        href: "https://github.com/lyubah/MusicSentimentAnalysis",
        kind: "repo",
      },
      {
        label: "Frontend repo",
        href: "https://github.com/lyubah/MusicSentimentAnalysisFrontEnd",
        kind: "repo",
      },
      {
        label: "Medium article",
        href: "https://medium.com/@lubah_99345/creating-a-music-sentiment-analyzer-with-power-of-ainize-and-open-source-ai-84e3a277b495",
        kind: "article",
      },
    ],
    detail:
      "An earlier public proof of end-to-end ML work, from data collection and labeling through deployment.",
    featured: true,
    year: "2022",
  },
];

export const experimentProjects: ProjectEntry[] = [
  {
    slug: "supergan",
    title: "SuperGAN for Edge Intelligence",
    category: "Research Prototype",
    status: "live",
    summary:
      "A self-directed experiment on synthetic sensor data for edge activity recognition, especially when classes are rare or sensors drop out.",
    impact:
      "Lifted minority-class recall from 57% to 80%, improved out-of-distribution F1 by 18% under sensor dropout, and retained 92% of baseline accuracy in a differential-privacy variant.",
    stack: ["PyTorch", "Weights & Biases", "GANs", "Sensor Data"],
    proofLinks: [
      {
        label: "GitHub repo",
        href: "https://github.com/lyubah/SuperGAN",
        kind: "repo",
      },
    ],
    detail:
      "A real prototype built to explore synthetic data, privacy, and robustness when signals are sparse or unreliable.",
    featured: false,
    year: "2024",
  },
  {
    slug: "context-trees",
    title: "Context Trees for Stock Prediction",
    category: "Original Algorithm Design",
    status: "live",
    summary:
      "An algorithm exploration that turns candlestick histories into symbolic sequences, then uses context trees for next-step sequence prediction and chart-pattern similarity.",
    impact:
      "Shows original algorithm design, probabilistic sequence modeling, and a full implementation from scratch.",
    stack: ["Algorithms", "Time Series", "Probabilistic Modeling", "Python", "Sequence Modeling"],
    proofLinks: [
      {
        label: "Read project note",
        href: "/downloads/context-trees.pdf",
        kind: "download",
      },
    ],
    detail:
      "Started from curiosity and turned into an original implemented algorithm for prediction and chart similarity.",
    featured: false,
    year: "2026",
  },
  {
    slug: "shap-vs-lime",
    title: "SHAP vs LIME Comparison",
    category: "Interpretability Study",
    status: "live",
    summary:
      "A hands-on comparison of SHAP and LIME across linear and boosted models on the Abalone dataset.",
    impact:
      "Made the tradeoffs concrete: when local surrogate explanations are enough, and when you want more stable feature attributions.",
    stack: ["Python", "SHAP", "LIME", "XGBoost", "scikit-learn", "Explainable AI"],
    proofLinks: [
      {
        label: "Read write-up",
        href: "https://medium.com/@lubah_99345/lets-talk-xai-a-comparative-analysis-of-lime-and-shap-c32b92e65070",
        kind: "article",
      },
      {
        label: "Download project PDF",
        href: "/downloads/xai-comparison.pdf",
        kind: "download",
      },
    ],
    detail:
      "A focused interpretability study that sharpened my sense for when each tool is actually useful.",
    featured: false,
    year: "2024",
  },
];

export const plannedProjects: ProjectEntry[] = [
  {
    slug: "public-model-router-lab",
    title: "Public Model Router Lab",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "A simplified public version of a model-selection system for routing requests across LLMs based on task type, context length, latency constraints, cost estimates, and model capability metadata.",
    impact:
      "Turns private routing work into public evidence for model selection, evaluation, and cost/latency tradeoffs.",
    stack: ["Python", "FastAPI", "LLM Routing", "Model Registry", "Cost Modeling", "Evaluation"],
    proofLinks: [],
    detail:
      "Planned links: repo, write-up, and demo once the public lab is ready.",
    featured: false,
    year: "Building",
  },
  {
    slug: "research-rag-evals-assistant",
    title: "Research RAG + Evals Assistant",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "A retrieval system for technical documents that makes retrieval quality visible through citation-backed answers, hybrid search, reranking, and metrics like Recall@k, MRR, and nDCG.",
    impact:
      "Makes retrieval, reranking, and evaluation concrete in one public system instead of leaving that work behind NDA.",
    stack: ["RAG", "Hybrid Search", "Reranking", "Evals", "Citations", "FastAPI"],
    proofLinks: [],
    detail:
      "Planned links: repo, write-up, and demo once the evaluation loop and citations are working cleanly.",
    featured: false,
    year: "Building",
  },
];

export const privateProjects: ProjectEntry[] = [
  {
    slug: "nonya-skandha",
    title: "Stealth AI Company",
    category: "Private AI Systems · Stealth Company",
    status: "private-case-study",
    summary:
      "Private LLM systems work for a stealth AI company, spanning agent orchestration, evaluation, model routing, and production AI infrastructure.",
    impact:
      "Worked as the sole AI/ML engineer with founders to design systems across cost, latency, quality, and deployment constraints while keeping proprietary model-selection logic private.",
    stack: ["Python", "FastAPI", "LLM Routing", "LoRA", "Async Systems", "Evaluation"],
    proofLinks: [
      {
        label: "Request case-study details",
        href: "mailto:lubah.nelson@gmail.com?subject=NONYA%20case%20study%20request",
        kind: "contact",
      },
    ],
    detail:
      "I work directly with founders on private LLM infrastructure and internal AI systems. The work includes prompt tests, model comparison, routing benchmarks, latency/cost logging, provider integration, and LoRA-based adaptation. NONYA / Skandha is the internal workstream name; the implementation stays private, but the public framing can still show the ownership and systems decisions behind it.",
    featured: true,
    year: "2025–2026",
  },
  {
    slug: "voice-assistant",
    title: "Voice Assistant Deliverable",
    category: "Client Work",
    status: "in-progress",
    summary:
      "A private voice assistant that combines speech-to-text, model routing, and speech synthesis in one user-facing loop.",
    impact:
      "Shows user-facing AI systems work under a real deadline, with routing and interface decisions that matter in practice.",
    stack: ["Speech-to-Text", "TTS", "Agentic Systems", "Routing", "UX"],
    proofLinks: [
      {
        label: "Discuss architecture",
        href: "mailto:lubah.nelson@gmail.com?subject=Voice%20assistant%20architecture%20request",
        kind: "contact",
      },
    ],
    detail:
      "This should read as serious work in motion, with privacy respected and technical specifics shared only when safe.",
    featured: true,
    year: "2026",
  },
  {
    slug: "agentic-ai-company",
    title: "Agentic AI Venture",
    category: "Founder Track",
    status: "in-progress",
    summary:
      "An early company thread focused on turning agentic AI patterns into durable products.",
    impact:
      "Keeps the founder thread visible without overpowering the stronger technical evidence elsewhere in the portfolio.",
    stack: ["Agentic Workflows", "Product Strategy", "System Design", "AI Ops"],
    proofLinks: [
      {
        label: "Start a conversation",
        href: "mailto:lubah.nelson@gmail.com?subject=Agentic%20AI%20venture",
        kind: "contact",
      },
    ],
    detail:
      "This should feel early on purpose: credible, intentional, and still taking shape.",
    featured: false,
    year: "Now",
  },
];

export const papers: PaperEntry[] = [
  {
    slug: "sensor-aware-classifiers",
    displayTitle: "Sensor-Aware Early-Exit Classifiers",
    fullTitle:
      "Sensor-Aware Classifiers for Energy-Efficient Time Series Applications on IoT Devices",
    status: "under-review",
    summary:
      "Shows that small battery-powered devices can stop collecting sensor data as soon as the model is confident, reducing sensing and inference cost without giving up much accuracy.",
    theme: "Edge AI · efficient inference · time-series classification",
    year: "2025",
    venue: "JMLR",
    proofLinks: [
      {
        label: "Read paper",
        href: "https://www.catalyzex.com/paper/sensor-aware-classifiers-for-energy-efficient",
        kind: "preprint",
      },
    ],
    featured: true,
  },
  {
    slug: "sequential-early-exit-rf",
    displayTitle: "Sequential Sensor-Aware RF",
    fullTitle:
      "Sequential and Sensor-Aware Early Exit Random Forests for Real-Time Decision Making",
    status: "under-review",
    summary:
      "Applies the same idea to Random Forests, keeping the system fast and interpretable while cutting redundant work in real-time settings.",
    theme: "Random forests · early exits · real-time decision systems",
    year: "2026",
    venue: "ESWEEK",
    proofLinks: [
      {
        label: "Read paper",
        href: "/downloads/sensor-aware-rf.pdf",
        kind: "download",
      },
    ],
    featured: true,
  },
  {
    slug: "beyond-1nn",
    displayTitle: "Beyond 1-NN Accuracy",
    fullTitle:
      "Beyond 1-NN Accuracy: Objective-Informed Benchmarking of Time Series Similarity Measures",
    status: "under-review",
    summary:
      "Builds an 81-dataset benchmarking pipeline showing that the usual way of ranking time-series similarity measures does not hold up across downstream tasks like classification, clustering, and density analysis.",
    theme: "Benchmarking · similarity learning · 81-dataset evaluation",
    year: "2026",
    venue: "Journal of Time Series Analysis",
    proofLinks: [
      {
        label: "Read paper",
        href: "/downloads/beyond-1nn.pdf",
        kind: "download",
      },
    ],
    featured: true,
  },
];

export const writings: WritingEntry[] = [
  {
    title: "Creating a Music Sentiment Analyzer with the Power of Ainize and Open-Source AI",
    date: "June 2022",
    summary:
      "A technical write-up that turns the Music Sentiment Analyzer into public proof of applied NLP and shipping work.",
    status: "published",
    proofLinks: [
      {
        label: "Read on Medium",
        href: "https://medium.com/@lubah_99345/creating-a-music-sentiment-analyzer-with-power-of-ainize-and-open-source-ai-84e3a277b495",
        kind: "article",
      },
    ],
  },
  {
    title: "Let's Talk XAI: A Comparative Analysis of LIME and SHAP",
    date: "January 2025",
    summary:
      "A plain-language companion to the interpretability experiment, written for a broader audience.",
    status: "published",
    proofLinks: [
      {
        label: "Read on Medium",
        href: "https://medium.com/@lubah_99345/lets-talk-xai-a-comparative-analysis-of-lime-and-shap-c32b92e65070",
        kind: "article",
      },
    ],
  },
  {
    title: "How I Think About LLM Model Routing",
    date: "Draft",
    summary:
      "A planned write-up on model selection, latency/cost tradeoffs, and what changes when routing becomes a systems problem instead of a prompt problem.",
    status: "draft",
    proofLinks: [],
  },
  {
    title: "Why Early-Exit Models Are Really About Information Cost",
    date: "Draft",
    summary:
      "A planned bridge piece connecting edge early exits to the same decision problem that shows up in LLM routing and retrieval.",
    status: "draft",
    proofLinks: [],
  },
];

export const aboutIntro =
  "I started in data science because I liked turning messy information into decisions. Over time I moved closer to the systems layer: how models are trained, evaluated, deployed, and kept efficient under real constraints. I’m finishing an M.S. in Computer Science at Washington State University, where my research focuses on efficient inference for time-series models on edge devices. That same question now shows up in my applied work on LLM routing, retrieval, evaluation, and private AI systems.";

export const researchIntro =
  "My research asks when an AI system has enough information to stop, route, or simplify computation without losing useful accuracy. That question appears in edge sensing, early-exit classifiers, time-series benchmarking, and modern LLM routing.";

export const contactLinks: EvidenceLink[] = [
  {
    label: "Email",
    href: "mailto:lubah.nelson@gmail.com",
    kind: "contact",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lubah-nelson/",
    kind: "contact",
  },
  {
    label: "GitHub",
    href: "https://github.com/lyubah",
    kind: "repo",
  },
  {
    label: "Medium",
    href: "https://medium.com/@lubah_99345",
    kind: "article",
  },
  {
    label: "Resume PDF",
    href: "/downloads/nelson-lubah-resume.pdf",
    kind: "download",
  },
];
