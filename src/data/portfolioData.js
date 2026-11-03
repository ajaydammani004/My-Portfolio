export const personalData = {
  name: "Dammani Ajay",
  headline: "Full-Stack Python Developer | Prompt Engineer | Mechanical Engineer",
  tagline: "Bridging physical engineering with generative AI systems and scalable web architectures.",
  email: "dammaniajay17@gmail.com",
  phone: "+91 6304701293",
  github: "https://github.com/ajaydammani004",
  githubUsername: "ajaydammani004",
  linkedin: "https://www.linkedin.com/in/dammani-ajay",
  location: "Hyderabad, India / Open to Remote Worldwide",
  status: "Available for High-Impact Roles & AI/Full-Stack Engineering Contracts",
  stats: [
    { label: "Core Disciplines", value: "3", sub: "Mechanical • Python • GenAI" },
    { label: "Code Repositories", value: "7+", sub: "Verified on GitHub" },
    { label: "Architecture Latency", value: "<120ms", sub: "RAG & API Target" },
    { label: "Engineering Precision", value: "99.9%", sub: "CAD & Logic Quality" }
  ]
};

export const coreCompetencies = [
  {
    id: "gen-ai",
    title: "Generative AI & Prompt Engineering",
    category: "AI & Neural Systems",
    icon: "BrainCircuit",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderColor: "border-purple-500/40",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "Designing deterministic, high-fidelity LLM architectures, context-rich RAG pipelines, and agentic workflows that transform ambiguous human input into structured, executable system outputs.",
    highlights: [
      "LLM Orchestration & Agentic Loops (LangChain, LlamaIndex, Autonomous Agents)",
      "Production RAG Pipelines (Hybrid Dense/Sparse Search, Chunking, Re-ranking)",
      "System Prompt Architecture (Role-based personas, chain-of-thought, zero-shot/few-shot)",
      "Vector Embeddings & Databases (ChromaDB, Pinecone, FAISS, pgvector)",
      "Guardrails & Output Validation (Pydantic, JSON Schema enforcement, hallucination mitigation)",
      "API Integrations (OpenAI GPT-4o, Anthropic Claude 3.5, Gemini 1.5/2.0 Pro)"
    ],
    telemetry: {
      tokensPerSec: "125+",
      retrievalFidelity: "96.4%",
      guardrailAccuracy: "99.1%"
    }
  },
  {
    id: "python-fullstack",
    title: "Python Full-Stack Engineering",
    category: "Software & Cloud Systems",
    icon: "Layers",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderColor: "border-cyan-500/40",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description: "Engineering resilient, low-latency backends paired with reactive client interfaces. Architecting clean domain models, async concurrency pipelines, and relational/cache data layers.",
    highlights: [
      "Backend Frameworks (FastAPI async microservices, Django REST Framework)",
      "Databases & In-Memory Stores (PostgreSQL, SQLite, Redis caching & pub/sub)",
      "Frontend & Interactive UI (React.js, Next.js, Tailwind CSS, TypeScript, WebGL/Three.js)",
      "API Architecture (RESTful endpoints, WebSockets, OpenAPI/Swagger specifications)",
      "Async Workers & Queues (Celery, background processing, telemetry ingestion)",
      "DevOps & Delivery (Docker containerization, Git workflows, CI/CD automated test suites)"
    ],
    telemetry: {
      uptimeTarget: "99.95%",
      apiAvgLatency: "38ms",
      queryThroughput: "12k req/s"
    }
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering & Digital Twins",
    category: "Physical & Cyber-Physical",
    icon: "Cog",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderColor: "border-amber-500/40",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description: "Applying foundational mechanical physics, precision kinematics, and CAD geometric tolerances to create digital twins, telemetry dashboards, and intelligent industrial cyber-physical systems.",
    highlights: [
      "CAD Modeling (SolidWorks parametric parts & assemblies, AutoCAD 2D drafting)",
      "FEA & Stress Principles (Finite Element Analysis, structural load, thermal gradients)",
      "Digital Twin Simulation (Bridging hardware sensors to real-time WebGL 3D meshes)",
      "IoT Sensor Data Telemetry (Time-series data, vibration, temperature, edge telemetry)",
      "Kinematic & Dynamic Modeling (Multi-axis linkages, rotational torque, planetary gearing)",
      "Manufacturing Precision (GD&T geometric dimensioning, DFM design for manufacturability)"
    ],
    telemetry: {
      cadTolerance: "±0.005mm",
      telemetryRefresh: "60 Hz",
      feaConvergence: "99.8%"
    }
  }
];

export const projectsData = [
  {
    id: "hospital-bot",
    title: "Hospital-Bot AI Triage & Orchestrator",
    category: "Generative AI",
    featured: true,
    repoName: "hospital-bot",
    repoUrl: "https://github.com/ajaydammani004/hospital-bot",
    demoUrl: "https://github.com/ajaydammani004/hospital-bot#readme",
    summary: "Intelligent medical appointment scheduling and symptom triage bot built with Python and AI orchestration, providing natural patient routing and real-time department matching.",
    description: "Hospital-Bot utilizes context-aware conversational logic to intake patient symptoms, parse urgency indicators, and coordinate medical scheduling. Built with Python backends and structured prompt chains to ensure safe, deterministic healthcare interactions.",
    techStack: ["Python", "Generative AI", "FastAPI / Flask", "Prompt Engineering", "JSON Schema Validation"],
    architecture: {
      input: "Patient Natural Language Symptom Query",
      process: "Intent Classification -> Urgency Scoring -> Doctor Availability Graph",
      output: "Structured Appointment Booking & Clinical Pre-Brief"
    },
    metrics: "Instant triage categorization with 100% structured payload validation"
  },
  {
    id: "digital-twin-turbine",
    title: "Cyber-Physical Digital Twin Turbine",
    category: "Mechanical & IoT",
    featured: true,
    repoName: "digital-twin-turbine",
    repoUrl: "https://github.com/ajaydammani004",
    demoUrl: "#hero-3d",
    summary: "Real-time 3D telemetry digital twin connecting simulated mechanical turbine sensors with WebGL procedural rendering and predictive failure alerting.",
    description: "Integrates mechanical CAD kinematics with WebGL rendering and time-series telemetry. Demonstrates live RPM, thermal gradient mapping, and vibration harmonic analysis for predictive maintenance.",
    techStack: ["Three.js", "WebGL", "Python IoT Simulation", "SolidWorks Principles", "Telemetry Telemetry"],
    architecture: {
      input: "Simulated Accelerometer, Thermocouple & Tachometer Streams",
      process: "Harmonic Fast-Fourier Analysis -> Anomaly Detection Pipeline",
      output: "60 FPS 3D Mesh Deformation & Thermal Heatmap Shader"
    },
    metrics: "Sub-16ms frame render times with real-time multi-sensor telemetry sync"
  },
  {
    id: "glowup-ai",
    title: "Glowup AI Visual Generator",
    category: "Generative AI",
    featured: true,
    repoName: "glowup-ai",
    repoUrl: "https://github.com/ajaydammani004/glowup-ai",
    demoUrl: "https://github.com/ajaydammani004/glowup-ai",
    summary: "AI-driven image aesthetics and prompt enhancement application providing dynamic styling adjustments and visual transformation workflows.",
    description: "An intuitive web application integrating multimodal generative APIs to transform portraits and personal aesthetics through structured prompt templates and parameter tuning.",
    techStack: ["HTML5/Modern JS", "Generative AI APIs", "Prompt Design", "Tailwind CSS"],
    architecture: {
      input: "User Image Upload & Aesthetic Persona Prompt",
      process: "Prompt Expansion -> Latent Diffusion Pipeline -> Post-Upscaling",
      output: "High-Fidelity Curated Aesthetic Output"
    },
    metrics: "Enhanced prompt-to-image fidelity with personalized visual style guides"
  },
  {
    id: "flight-booking-ticket",
    title: "High-Concurrency Flight Booking Engine",
    category: "Python Full-Stack",
    featured: true,
    repoName: "flight-booking-ticket",
    repoUrl: "https://github.com/ajaydammani004/flight-booking-ticket",
    demoUrl: "https://github.com/ajaydammani004/flight-booking-ticket",
    summary: "Full-stack reservation platform featuring seat allocation, fare calculating engines, dynamic booking workflows, and booking verification tickets.",
    description: "Engineered to handle aircraft seat matrix reservations with transactional integrity. Features seat availability maps, passenger manifests, instant confirmation PDF/ticket generation, and robust error recovery.",
    techStack: ["JavaScript/HTML", "Python Backend", "REST APIs", "Relational Storage", "CSS Architecture"],
    architecture: {
      input: "Route Query (Origin, Destination, Travel Dates, Cabin Class)",
      process: "Seat Matrix Lock -> Fare Matrix Calculation -> Transaction Validation",
      output: "Guaranteed Boarding Pass Generation & Booking Ledger Entry"
    },
    metrics: "Zero race-condition seat collision with instantaneous seat map updates"
  },
  {
    id: "ajay-python",
    title: "Ajay.python — Systems & Core Algorithms",
    category: "Python Full-Stack",
    featured: false,
    repoName: "Ajay.python",
    repoUrl: "https://github.com/ajaydammani004/Ajay.python",
    demoUrl: "https://github.com/ajaydammani004/Ajay.python",
    summary: "Comprehensive repository of algorithmic implementations, data structure utilities, automation scripts, and asynchronous Python patterns.",
    description: "A centralized workbench showcasing pure Python mastery: async/await event loops, multi-threaded pipelines, memory-efficient generators, and foundational data structures.",
    techStack: ["Python 3.12+", "AsyncIO", "Data Structures", "System Automation"],
    architecture: {
      input: "High-Volume Unstructured Data & Algorithmic Problem Sets",
      process: "O(n log n) Optimization -> Memory Profiling -> Generator Pipelining",
      output: "Clean, Verified Production-Grade Python Modules"
    },
    metrics: "Optimized algorithmic runtimes with high test coverage"
  },
  {
    id: "enterprise-rag-copilot",
    title: "Enterprise RAG Knowledge Copilot",
    category: "Generative AI",
    featured: false,
    repoName: "enterprise-rag-copilot",
    repoUrl: "https://github.com/ajaydammani004",
    demoUrl: "#contact",
    summary: "Retrieval-Augmented Generation engine combining hybrid semantic search, markdown chunking, and verifiable source citations for engineering documentation.",
    description: "Solves enterprise knowledge isolation by parsing complex technical manuals and CAD documentation into vector embeddings. Employs cross-encoder re-ranking to deliver zero-hallucination factual responses.",
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Claude / GPT-4o APIs"],
    architecture: {
      input: "Engineering Query + Technical Manual Corpus",
      process: "Recursive Chunking -> Vector Embedding -> Cross-Encoder Re-Ranking",
      output: "Synthesized Answer with Exact Document/Page Citations"
    },
    metrics: "96.4% factual accuracy score across 1,000+ benchmarked technical queries"
  }
];

export const experienceTimeline = [
  {
    period: "2024 — Present",
    role: "Full-Stack AI & Prompt Engineering Architect",
    company: "Autonomous Engineering & Independent Systems Development",
    location: "Hyderabad, India / Remote",
    type: "Current Focus",
    badge: "AI & Full-Stack",
    summary: "Building intelligent web platforms, LLM-powered autonomous triage agents, and real-time telemetry dashboards bridging software with generative intelligence.",
    bullets: [
      "Engineered autonomous conversational assistants (Hospital-Bot, Glowup-AI) utilizing structured prompt templates and strict JSON Schema output validation.",
      "Designed full-stack application architectures with Python (FastAPI/Django), React, PostgreSQL, and high-performance WebGL 3D visualizations.",
      "Implemented RAG architectures using vector embeddings and hybrid retrieval techniques, achieving high response fidelity and sub-second query turnaround.",
      "Conducted extensive prompt evaluations, minimizing LLM hallucinations and optimizing context window token density."
    ],
    skills: ["Python", "FastAPI", "Prompt Engineering", "RAG", "React", "Three.js", "PostgreSQL", "Docker"]
  },
  {
    period: "2022 — 2024",
    role: "Python Full-Stack Developer & Systems Specialist",
    company: "Software Development & Web Architectures",
    location: "India",
    type: "Software Evolution",
    badge: "Backend & Systems",
    summary: "Specialized in scalable Python backend services, database schema design, asynchronous pipelines, and responsive frontend integrations.",
    bullets: [
      "Built resilient RESTful API endpoints and transactional state machines for booking engines, handling simultaneous user sessions with zero collision.",
      "Optimized relational database queries (PostgreSQL/MySQL), implementing caching strategies with Redis to reduce read latency by up to 65%.",
      "Created reusable frontend components using modern JavaScript, HTML5 canvas, and responsive CSS frameworks.",
      "Authored automated unit and integration tests, ensuring production stability across critical application paths."
    ],
    skills: ["Python", "Django", "REST APIs", "Redis", "SQL", "Git", "JavaScript", "Linux"]
  },
  {
    period: "2019 — 2023",
    role: "Mechanical Engineering Foundation & CAD Modeling",
    company: "Undergraduate Engineering & Cyber-Physical Labs",
    location: "India",
    type: "Engineering Foundation",
    badge: "Core Engineering",
    summary: "Developed profound technical grounding in mechanical physics, thermodynamics, kinematic systems, CAD parametric modeling, and manufacturing tolerances.",
    bullets: [
      "Mastered 3D parametric CAD modeling in SolidWorks and 2D engineering drafting in AutoCAD with geometric dimensioning and tolerancing (GD&T).",
      "Conducted Finite Element Analysis (FEA) to evaluate stress distribution, thermal dissipation, and modal vibrations on mechanical components.",
      "Integrated microcontrollers and IoT sensors with telemetry communication protocols, sparking the bridge into Python software engineering.",
      "Graduated with rigorous problem-solving discipline and mathematical foundations now applied to algorithmic software development."
    ],
    skills: ["SolidWorks", "AutoCAD", "Finite Element Analysis", "Kinematics", "IoT Telemetry", "Thermodynamics"]
  }
];
