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
  | "private-case-study"
  | "in-progress"
  | "planned";

export type PaperStatus = "under-review";
export type WritingStatus = "published";
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
  label: "Live deliverable",
  title: "Voice assistant build for a startup final round",
  detail:
    "A private STT → routing → TTS system being built under a real deadline.",
};

export const thesis: ThesisEntry = {
  title:
    "Energy-Efficient Time Series Classification on IoT Devices with Sensor-Aware Early-Exit Machine Learning",
  summary:
    "My M.S. thesis studies how small devices can stop collecting data once the model is already confident, instead of waiting for the full sensing window every time.",
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
    slug: "music-sentiment-analyzer",
    title: "Music Sentiment Analyzer",
    category: "Applied NLP",
    status: "live",
    summary:
      "A lyrics sentiment system that covers the full stack: data collection, labeling, model training, inference, deployment, and public write-up.",
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
      "This is one of the clearest public proofs of end-to-end ML work in the portfolio.",
    featured: true,
    year: "2022",
  },
  {
    slug: "usbr-dashboard",
    title: "USBR Forecasting Dashboard",
    category: "Applied Forecasting",
    status: "live",
    summary:
      "A forecasting dashboard for the U.S. Bureau of Reclamation that brings sensor, climate, satellite, and operations data into one working system.",
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
      "This shows applied time-series work in the wild, not just offline modeling.",
    featured: true,
    year: "2024",
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
      "A personal algorithm project that turns candlestick histories into symbolic sequences, then uses context trees for next-day prediction and chart similarity.",
    impact:
      "Shows original algorithm design and a real implementation, not just model application.",
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
    slug: "research-rag-assistant",
    title: "Research RAG Assistant",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "A citation-backed retrieval system for papers, notes, and technical documents, built to make retrieval quality visible instead of just wrapping an API.",
    impact:
      "This would make retrieval, evaluation, and low-latency serving visible in one public system.",
    stack: ["RAG", "Vector Search", "Reranking", "FastAPI", "Eval Harness", "Citations"],
    proofLinks: [],
    detail:
      "The finished version should ship with a repo, a small UI, retrieval benchmarks, and a short write-up on design tradeoffs.",
    featured: false,
    year: "Queued",
  },
  {
    slug: "lora-finetuning-lab",
    title: "LoRA Fine-Tuning Lab",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "A parameter-efficient fine-tuning project on a focused domain dataset, comparing the base model against a LoRA-adapted version.",
    impact:
      "Adds visible experience with PEFT, domain adaptation, and the question of when fine-tuning actually helps.",
    stack: ["LoRA", "PEFT", "Hugging Face", "Experiment Tracking", "Evaluation"],
    proofLinks: [],
    detail:
      "The finished version should include dataset curation, training configs, before-and-after evals, and a short quality-versus-cost write-up.",
    featured: false,
    year: "Queued",
  },
  {
    slug: "llm-evals-guardrails",
    title: "LLM Evals & Guardrails Bench",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "A repeatable evaluation harness for LLM workflows, with regression tests, failure cases, prompt-injection checks, and answer-quality scoring.",
    impact:
      "Shows the production side of LLM work: not just making a demo answer once, but checking whether it stays reliable.",
    stack: ["LLM Evals", "Guardrails", "Test Sets", "Failure Analysis", "Prompt Security"],
    proofLinks: [],
    detail:
      "This is one of the cleanest ways to make reliability visible alongside private routing work that cannot yet be shown in full.",
    featured: false,
    year: "Queued",
  },
  {
    slug: "distillation-serving-lab",
    title: "Distillation & Serving Optimization Lab",
    category: "Planned Public Build",
    status: "planned",
    summary:
      "An optimization build that compares a larger teacher setup against a smaller distilled or compressed serving path, with latency, cost, and quality measured side by side.",
    impact:
      "Directly extends the efficient-inference story from the thesis into modern LLM serving.",
    stack: ["Distillation", "Quantization", "vLLM", "Latency Profiling", "Inference Cost"],
    proofLinks: [],
    detail:
      "The goal is not just to compress a model, but to show when compression is worth it and how to serve the result well.",
    featured: false,
    year: "Queued",
  },
];

export const privateProjects: ProjectEntry[] = [
  {
    slug: "nonya-skandha",
    title: "NONYA / Skandha",
    category: "Private AI Systems",
    status: "private-case-study",
    summary:
      "A private routing layer designed to send work to the cheapest model that can still do the job well.",
    impact:
      "This is the clearest bridge between the thesis work and production AI systems: model selection, cost control, async services, and end-to-end ownership.",
    stack: ["Python", "FastAPI", "LLM Routing", "LoRA", "Async Systems", "Model Selection"],
    proofLinks: [
      {
        label: "Request case-study details",
        href: "mailto:lubah.nelson@gmail.com?subject=NONYA%20case%20study%20request",
        kind: "contact",
      },
    ],
    detail:
      "The implementation stays private, but the public framing can still show the problem, your ownership, and the systems thinking behind it.",
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
      "This is live proof of agentic system design under a real deadline, not a toy demo.",
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
      "Keeps the founder thread visible without overpowering the hiring and research story the portfolio needs right now.",
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
      "Shows that small battery-powered devices can stop collecting sensor data as soon as the model is confident, saving energy without giving up much accuracy.",
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
      "Argues that the usual way of ranking time-series similarity measures is too narrow. Using 81 datasets, it builds a benchmark that better reflects how those measures behave in downstream AI tasks.",
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
];

export const aboutIntro =
  "I’m an AI / ML engineer working between research and production. My path runs from a B.A. in Data Science at UC Berkeley to an M.S. in Computer Science at Washington State University, with work across startups, public-sector forecasting, and efficient inference research.";

export const researchIntro =
  "The paper line is all about one question: how much computation do you actually need before a model knows enough to answer well? That question ties together the thesis on sensor-aware early exits, the Random Forest follow-up, and the benchmarking work on time-series similarity.";

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
