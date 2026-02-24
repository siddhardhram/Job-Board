/**
 * Mock data used in demo mode (no backend keys set).
 * Jobs posted via the UI in the same session are pushed into MOCK_JOBS.
 */

export const MOCK_COMPANIES = [
    { id: 1, name: "Google", logo_url: "/companies/google.webp" },
    { id: 2, name: "Microsoft", logo_url: "/companies/microsoft.webp" },
    { id: 3, name: "Amazon", logo_url: "/companies/amazon.svg" },
    { id: 4, name: "Meta", logo_url: "/companies/meta.svg" },
    { id: 5, name: "Netflix", logo_url: "/companies/netflix.png" },
    { id: 6, name: "IBM", logo_url: "/companies/ibm.svg" },
    { id: 7, name: "Atlassian", logo_url: "/companies/atlassian.svg" },
    { id: 8, name: "Uber", logo_url: "/companies/uber.svg" },
    { id: 9, name: "Flipkart", logo_url: "/companies/flipkart.svg" },
    { id: 10, name: "Swiggy", logo_url: "/companies/swiggy.svg" },
    { id: 11, name: "Infosys", logo_url: "/companies/infosys.svg" },
    { id: 12, name: "TCS", logo_url: "/companies/tcs.svg" },
    { id: 13, name: "Wipro", logo_url: "/companies/wipro.svg" },
    { id: 14, name: "Razorpay", logo_url: "/companies/razorpay.svg" },
    { id: 15, name: "Zomato", logo_url: "/companies/zomato.svg" },
    { id: 16, name: "Zepto", logo_url: "/companies/zepto.svg" },
    { id: 17, name: "Groww", logo_url: "/companies/groww.svg" },
    { id: 18, name: "CRED", logo_url: "/companies/cred.svg" },
    { id: 19, name: "PhonePe", logo_url: "/companies/phonepe.svg" },
    { id: 20, name: "Paytm", logo_url: "/companies/paytm.svg" },
];

const co = (id) => MOCK_COMPANIES.find((c) => c.id === id);

export const MOCK_JOBS = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        description:
            "Build cutting-edge web apps that serve millions worldwide. You'll lead UI architecture decisions, mentor junior devs, and drive adoption of modern frontend practices.",
        location: "Karnataka",
        company_id: 1,
        company: co(1),
        requirements:
            "- 5+ years React/Next.js\n- TypeScript proficiency\n- GraphQL / REST APIs\n- Strong CSS / Tailwind skills\n- Experience with CI/CD pipelines",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 2,
        title: "Backend Engineer – Node.js",
        description:
            "Design and build scalable microservices powering Azure's global cloud platform. Work closely with SRE and product teams to deliver high-availability systems.",
        location: "Maharashtra",
        company_id: 2,
        company: co(2),
        requirements:
            "- 4+ years Node.js / Express\n- PostgreSQL & Redis\n- Docker & Kubernetes\n- REST + gRPC\n- Azure / AWS experience preferred",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 3,
        title: "Data Engineer",
        description:
            "Own end-to-end data pipelines for Amazon's supply-chain analytics platform. Process petabytes of data daily to uncover actionable business insights.",
        location: "Telangana",
        company_id: 3,
        company: co(3),
        requirements:
            "- Python / Spark / Hadoop\n- Redshift / Snowflake\n- Airflow or similar\n- Strong SQL skills\n- 3+ years experience",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 4,
        title: "Machine Learning Engineer",
        description:
            "Research and ship ML models at scale for Meta's content recommendation systems. Work at the intersection of research and production systems.",
        location: "Delhi",
        company_id: 4,
        company: co(4),
        requirements:
            "- PyTorch / TensorFlow\n- MLOps & model serving\n- Strong math fundamentals\n- Publications a plus\n- 4+ years experience",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 5,
        title: "DevOps / Platform Engineer",
        description:
            "Run Netflix's global streaming infrastructure. You'll own reliability, deployment automation, and observability for services handling 100M+ concurrent streams.",
        location: "Karnataka",
        company_id: 5,
        company: co(5),
        requirements:
            "- Kubernetes / Helm\n- Terraform / Pulumi\n- Prometheus / Grafana / ELK\n- Strong Linux / Bash\n- 3+ years DevOps experience",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 6,
        title: "Full-Stack Developer",
        description:
            "Join IBM's Consulting division to build enterprise web apps for Fortune 500 clients. Both backend (Java / Go) and frontend (React) work required.",
        location: "Tamil Nadu",
        company_id: 6,
        company: co(6),
        requirements:
            "- React + Node.js or Java Spring\n- SQL & NoSQL databases\n- Cloud (AWS / Azure / GCP)\n- REST API design\n- 3+ years full-stack",
        isOpen: false,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 7,
        title: "Product Designer (UI/UX)",
        description:
            "Shape the experience for Atlassian's suite of collaboration tools. Work with engineers and PMs to create intuitive, accessible, and beautiful product interfaces.",
        location: "Maharashtra",
        company_id: 7,
        company: co(7),
        requirements:
            "- Figma expert\n- Design systems experience\n- User research & usability testing\n- Motion / interaction design\n- Portfolio required",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 8,
        title: "Mobile Developer – React Native",
        description:
            "Build Uber's driver and rider apps used by 5M+ people in India. Own features end-to-end from design collaboration to production release.",
        location: "Telangana",
        company_id: 8,
        company: co(8),
        requirements:
            "- React Native (iOS + Android)\n- Redux / Zustand\n- Maps & location APIs\n- CI/CD for mobile (Fastlane)\n- 3+ years mobile dev",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 9,
        title: "Android Developer",
        description:
            "Develop and ship high-quality Android features for Google Pay serving 100M+ users across India.",
        location: "Karnataka",
        company_id: 1,
        company: co(1),
        requirements:
            "- Kotlin / Jetpack Compose\n- MVVM + Clean Architecture\n- Coroutines & Flow\n- 4+ years Android dev",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 10,
        title: "Security Engineer",
        description:
            "Protect Microsoft Azure's cloud infrastructure. Conduct threat modelling, pen-testing, and build automated security tooling for the platform team.",
        location: "Gujarat",
        company_id: 2,
        company: co(2),
        requirements:
            "- Penetration testing\n- SIEM / SOC experience\n- Cloud security (CIS / NIST)\n- Python scripting\n- Certified (OSCP / CEH) preferred",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 11,
        title: "Site Reliability Engineer",
        description:
            "Keep Amazon's e-commerce platform running at 99.99% uptime during peak traffic events like Prime Day. Automate toil and drive reliability improvements.",
        location: "Maharashtra",
        company_id: 3,
        company: co(3),
        requirements:
            "- SLI / SLO / Error budgets\n- Kubernetes & AWS\n- Observability stack\n- On-call experience\n- 4+ years SRE",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 12,
        title: "iOS Developer",
        description:
            "Build features for the Meta AI iOS app, now with 50M users in India. Focus on performance, smooth animations, and delightful micro-interactions.",
        location: "Delhi",
        company_id: 4,
        company: co(4),
        requirements:
            "- Swift / SwiftUI\n- UIKit for legacy components\n- App Store deployment\n- Instruments & profiling\n- 3+ years iOS",
        isOpen: false,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    // ── Indian tech companies ─────────────────────────────────────────────────
    {
        id: 13,
        title: "Senior Software Engineer – Commerce",
        description:
            "Own critical checkout and payments flows at Flipkart. Work on distributed systems handling millions of concurrent orders during Big Billion Days.",
        location: "Karnataka",
        company_id: 9,
        company: co(9),
        requirements:
            "- Java / Go microservices\n- Kafka & gRPC\n- High-scale distributed systems\n- 4+ years backend\n- B.Tech / MSc CS preferred",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 14,
        title: "Backend Engineer – Logistics",
        description:
            "Build real-time dispatch and routing algorithms that power Swiggy's 10-minute delivery promise across 500+ cities in India.",
        location: "Karnataka",
        company_id: 10,
        company: co(10),
        requirements:
            "- Node.js / Python\n- PostgreSQL & Redis\n- Real-time systems\n- Geospatial data\n- 3+ years experience",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 15,
        title: "Cloud Architect",
        description:
            "Lead cloud transformation projects for Infosys enterprise clients migrating to AWS and Azure. Hands-on architecture, governance and cost optimisation.",
        location: "Tamil Nadu",
        company_id: 11,
        company: co(11),
        requirements:
            "- AWS Solutions Architect Professional\n- Azure / GCP familiarity\n- IaC (Terraform / CDK)\n- FinOps experience\n- 7+ years cloud",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 16,
        title: "Java Developer – Banking Domain",
        description:
            "Develop and maintain core banking microservices for TCS BaNCS, one of the world's leading core banking platforms.",
        location: "Maharashtra",
        company_id: 12,
        company: co(12),
        requirements:
            "- Java 17+ & Spring Boot\n- Microservices / REST\n- Oracle / PostgreSQL\n- Banking domain knowledge a plus\n- 3-6 years Java",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 17,
        title: "Data Scientist",
        description:
            "Drive personalization and fraud-detection models at Wipro's AI center of excellence. Work end-to-end from data wrangling to model deployment.",
        location: "Karnataka",
        company_id: 13,
        company: co(13),
        requirements:
            "- Python (scikit-learn, XGBoost, PyTorch)\n- SQL & big data (Spark)\n- MLflow / Kubeflow\n- Strong statistics\n- 3+ years DS",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 18,
        title: "SDK Engineer – Payments",
        description:
            "Build and maintain Razorpay's client-side payment SDKs (Web, iOS, Android) used by 8M+ businesses across India.",
        location: "Karnataka",
        company_id: 14,
        company: co(14),
        requirements:
            "- Expertise in JS / TypeScript\n- Native iOS (Swift) or Android (Kotlin)\n- API design & documentation\n- PCI-DSS awareness\n- 4+ years SDK/library dev",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 19,
        title: "Senior Frontend Engineer – Consumer",
        description:
            "Own the restaurant discovery and menu experience on Zomato's web and mobile apps. Build fast, beautiful interfaces that delight millions of hungry users.",
        location: "Delhi",
        company_id: 15,
        company: co(15),
        requirements:
            "- React / Next.js\n- Performance optimisation (Core Web Vitals)\n- TypeScript\n- Design system experience\n- 4+ years frontend",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 20,
        title: "Supply Chain Engineer",
        description:
            "Solve hard logistics problems at Zepto — the company running India's fastest grocery delivery network. Build systems that optimise dark-store operations.",
        location: "Maharashtra",
        company_id: 16,
        company: co(16),
        requirements:
            "- Python / Go\n- Operations research basics\n- PostgreSQL & Redis\n- API design\n- 2+ years backend",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 21,
        title: "Investment Product Engineer",
        description:
            "Build the next generation of mutual fund and stock-investing features at Groww, serving 10M+ young investors. End-to-end ownership from backend to React Native UI.",
        location: "Karnataka",
        company_id: 17,
        company: co(17),
        requirements:
            "- React Native or React\n- Java / Go backend\n- Financial domain understanding\n- 3+ years product engineering",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 22,
        title: "Backend Engineer – FinTech",
        description:
            "Power CRED's credit card management and rewards platform. Work on high-assurance financial flows with a strong emphasis on reliability and security.",
        location: "Karnataka",
        company_id: 18,
        company: co(18),
        requirements:
            "- Golang or Java\n- PostgreSQL & Kafka\n- PCI/SOC2 awareness\n- Event-driven architecture\n- 3-5 years fintech backend",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 23,
        title: "Platform Engineer – UPI",
        description:
            "Scale PhonePe's UPI infrastructure handling 2B+ monthly transactions. Join the team that moves real money for 500M+ users every day.",
        location: "Karnataka",
        company_id: 19,
        company: co(19),
        requirements:
            "- Java / Kotlin\n- Spring Boot microservices\n- High-throughput messaging (Kafka)\n- Payments / UPI internals preferred\n- 4+ years",
        isOpen: true,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
    {
        id: 24,
        title: "SDE II – Wallet & Payments",
        description:
            "Build and maintain critical wallet and payment gateway services at Paytm, one of India's largest digital payments platforms.",
        location: "Uttar Pradesh",
        company_id: 20,
        company: co(20),
        requirements:
            "- Java / Go\n- Microservices & REST\n- MySQL & Redis\n- Payments domain knowledge\n- 3+ years SDE",
        isOpen: false,
        recruiter_id: "demo-recruiter",
        applications: [],
        saved: [],
    },
];

/* ── saved jobs store (local state within a session) ── */
let _savedJobs = [];
let _nextId = MOCK_JOBS.length + 1;

/* Public mutators called by the mock fetch layer */
export const getMockSavedJobs = () => _savedJobs;
export const toggleMockSave = (job_id) => {
    const idx = _savedJobs.findIndex((s) => s.job?.id === job_id);
    if (idx >= 0) {
        _savedJobs.splice(idx, 1);
        return [];          // unsaved
    }
    const job = MOCK_JOBS.find((j) => j.id === job_id);
    if (job) {
        const entry = { id: Date.now(), job };
        _savedJobs.push(entry);
        return [entry];     // saved
    }
    return [];
};

export const addMockJob = (jobData) => {
    const company = MOCK_COMPANIES.find((c) => c.id === Number(jobData.company_id));
    const newJob = {
        ...jobData,
        id: _nextId++,
        company: company || { name: "Unknown", logo_url: "" },
        applications: [],
        saved: [],
    };
    MOCK_JOBS.unshift(newJob);   // prepend so it shows up first
    return [newJob];
};
