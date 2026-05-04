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
    value: "29–42%",
    label: "End-to-end Raspberry Pi savings",
    detail: "Measured on real hardware in the thesis evaluation.",
  },
  {
    value: "6",
    label: "Datasets in early-exit evaluation",
    detail: "Validated across six health and activity-recognition datasets.",
  },
  {
    value: "30%",
    label: "Forecast accuracy improvement",
    detail: "Achieved in the USBR forecasting dashboard work.",
  },
  {
    value: "92%",
    label: "Deployed BERT system accuracy",
    detail: "Reached in the public Music Sentiment Analyzer shipped with FastAPI, Docker, and Vercel.",
  },
];

export const currentSignal: NowItem = {
  label: "Now building",
  title: "Private voice assistant pipeline",
  detail:
    "Built as an STT → model-routing → TTS loop for a startup final round, with user-facing latency and UX constraints.",
};

export const thesis: ThesisEntry = {
  title:
    "Energy-Efficient Time Series Classification on IoT Devices with Sensor-Aware Early-Exit ML",
  summary:
    "My M.S. thesis asks a systems question: when does a model have enough information to stop collecting sensor data? SEE challenges the usual assumption that better predictions require more data by gating on confidence rather than data completeness.",
  institution: "Washington State University",
  date: "May 2026",
  status: "thesis",
  keyFindings: [
    "Built CNN and Random Forest early-exit variants that cut both sensing and compute.",
    "Saved 50–70% of sensing energy while staying within 2% of full-window accuracy.",
    "Hardware-validated 29–42% end-to-end savings on Raspberry Pi systems with real sensors.",
    "Showed that confidence-aware stopping can beat compute-only optimization for IoT.",
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
  ],
};

export const featuredProjects: ProjectEntry[] = [
  {
    slug: "sensor-aware-early-exit-inference",
    title: "SEE Framework — Sensor-Aware Early-Exit Inference",
    category: "Research · Hardware-Validated Build",
    status: "research",
    summary:
      "Efficient inference research for time-series classifiers that stop sensing or prediction once the model is confident enough, reducing energy use while preserving accuracy.",
    impact:
      "Hardware-validated on Raspberry Pi with 54–65% sensing-energy savings within 3.8 percentage points of simulation, beat compute-only baselines by 6.3× and retrospective baselines by 2–3× where sensing drives most IoT energy use, validated across six health and activity-recognition datasets within 2% accuracy, and cut hyperparameter tuning time by 90% via Bayesian optimization on SLURM/HPC.",
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
    slug: "probformer",
    title: "ProbFormer — Exact Uncertainty for Vision Transformers",
    category: "Research Prototype",
    status: "live",
    summary:
      "Compiled ViT-Base into a tractable probabilistic circuit, enabling closed-form propagation of aleatoric and epistemic uncertainty without Monte Carlo sampling or deep ensembles.",
    impact:
      "Reduced expected calibration error by 40%, lowered negative log-likelihood by 21%, stayed within 0.3 percentage points of standard fine-tuning accuracy, and ran 5× faster than Monte Carlo dropout.",
    stack: [
      "PyTorch",
      "Probabilistic Circuits",
      "Uncertainty Quantification",
      "Vision Transformers",
      "Calibration",
    ],
    proofLinks: [],
    detail:
      "A research prototype that treats uncertainty as something the model should carry analytically, not approximate expensively after the fact.",
    featured: false,
    year: "2024",
  },
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
    slug: "genome-fingerprinting",
    title: "Viral Genome Similarity via Generalized Suffix Trees",
    category: "Algorithm Design",
    status: "live",
    summary:
      "Implemented a C++ generalized suffix tree for viral genome comparison and similarity scoring, using sequence structure instead of full dynamic-programming alignment everywhere.",
    impact:
      "Computed the similarity matrix 28× faster than full Needleman–Wunsch alignment on roughly 30kb SARS-CoV-2 genomes while keeping the algorithm open to CLI and test-driven use.",
    stack: ["C++", "Algorithms", "Computational Genomics", "Sequence Analysis"],
    proofLinks: [],
    detail:
      "Shows algorithmic cost awareness at the sequence level, not only at the model or systems layer.",
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
];

export const papers: PaperEntry[] = [
  {
    slug: "sensor-aware-classifiers",
    displayTitle: "Under-review paper on sensor-aware early exits",
    fullTitle:
      "Double-blind work on confidence-based early exits for energy-aware time-series classification",
    status: "under-review",
    summary:
      "Presents the formal SEE framework: confidence-based gates that stop sensor acquisition early, analysis of the accuracy-energy tradeoff, and empirical validation across six IoT datasets.",
    theme: "Efficient inference · edge sensing · time-series classification",
    year: "2025",
    proofLinks: [],
    featured: true,
  },
  {
    slug: "sequential-early-exit-rf",
    displayTitle: "Under-review paper on early-exit random forests",
    fullTitle:
      "Double-blind work extending sensor-aware early exits to Random Forest decision pipelines",
    status: "under-review",
    summary:
      "Extends the confidence-gating idea to Random Forests, keeping the system interpretable and fast while cutting redundant work in real-time decision pipelines.",
    theme: "Random forests · early exits · real-time systems",
    year: "2026",
    proofLinks: [],
    featured: true,
  },
  {
    slug: "beyond-1nn",
    displayTitle: "Under-review paper on time-series similarity benchmarks",
    fullTitle:
      "Double-blind work on downstream-aware benchmarking for time-series similarity measures",
    status: "under-review",
    summary:
      "Builds an 81-dataset benchmarking pipeline showing that the usual way of ranking time-series similarity measures does not hold up across downstream tasks like classification, clustering, and density analysis.",
    theme: "Benchmarking · similarity learning · downstream evaluation",
    year: "2026",
    proofLinks: [],
    featured: true,
  },
];

export const writings: WritingEntry[] = [
  {
    title: "Let's Talk XAI: A Comparative Analysis of LIME and SHAP",
    date: "January 2025",
    summary:
      "A plain-language companion to the interpretability experiment — what each method does, when local surrogate explanations are enough, and when you want more stable feature attributions.",
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
    title: "Creating a Music Sentiment Analyzer with the Power of Ainize and Open-Source AI",
    date: "June 2022",
    summary:
      "Technical write-up turning the Music Sentiment Analyzer into public proof of applied NLP and end-to-end shipping — from Genius API scraping through BERT fine-tuning, FastAPI, and Vercel deployment.",
    status: "published",
    proofLinks: [
      {
        label: "Read on Medium",
        href: "https://medium.com/@lubah_99345/creating-a-music-sentiment-analyzer-with-power-of-ainize-and-open-source-ai-84e3a277b495",
        kind: "article",
      },
    ],
  },
];

export const aboutIntro =
  "I build AI and ML systems where accuracy, latency, cost, and reliability are design constraints from the start. My work spans LLM routing, efficient inference research, forecasting systems, retrieval and evaluation pipelines, and production AI prototypes.";

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
    label: "Resume PDF",
    href: "/downloads/nelson-lubah-resume.pdf",
    kind: "download",
  },
];
