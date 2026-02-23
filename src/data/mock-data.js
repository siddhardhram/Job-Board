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
