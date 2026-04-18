export interface PseoJob {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  skills: { name: string; description: string }[];
  tips: { title: string; content: string }[];
  sampleSummary: string;
  keywords: string[];
  relatedJobs: string[];
}

export const pseoJobs: PseoJob[] = [
  {
    slug: "prompt-engineer",
    title: "Prompt Engineer",
    metaTitle: "Prompt Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized prompt engineer resume with AI. Get matched keywords, skill suggestions, and professional templates tailored to prompt engineering roles in 2026.",
    skills: [
      {
        name: "LLM Prompt Design",
        description:
          "Craft structured prompts that produce reliable, high-quality outputs from GPT-4, Claude, Gemini, and open-source models. Includes few-shot, chain-of-thought, and system prompt engineering.",
      },
      {
        name: "Evaluation & Benchmarking",
        description:
          "Design evaluation frameworks to measure prompt effectiveness including accuracy, consistency, latency, and cost-per-token. Build automated eval pipelines for prompt regression testing.",
      },
      {
        name: "RAG Architecture",
        description:
          "Implement Retrieval-Augmented Generation systems combining vector databases, embedding models, and LLMs for domain-specific knowledge retrieval with reduced hallucination.",
      },
      {
        name: "Fine-Tuning & RLHF",
        description:
          "Prepare training datasets, configure fine-tuning runs, and implement reinforcement learning from human feedback loops to improve model performance on specialized tasks.",
      },
      {
        name: "AI Safety & Red-Teaming",
        description:
          "Identify vulnerabilities in LLM deployments through adversarial testing, prompt injection detection, and output filtering to ensure safe, production-ready AI applications.",
      },
    ],
    tips: [
      {
        title: "Quantify Your Prompt Impact",
        content:
          "Hiring managers want to see measurable results. Instead of 'Improved prompt quality,' write 'Reduced GPT-4 hallucination rate from 12% to 2.3% across 50K daily queries by implementing structured chain-of-thought prompts with guardrail validation.' Include metrics on cost savings, accuracy improvements, and latency reductions.",
      },
      {
        title: "Showcase Your Model Breadth",
        content:
          "The best prompt engineers work across models, not just one. Highlight experience with both proprietary (GPT-4, Claude, Gemini) and open-source (Llama, Mistral) models. Show that you understand model-specific optimization — what works for Claude may not work for GPT-4.",
      },
      {
        title: "Include Your Evaluation Methodology",
        content:
          "Companies hiring prompt engineers need someone who can measure success. Describe your evaluation frameworks: human evaluation protocols, automated metrics (BLEU, ROUGE, custom rubrics), A/B testing setups for prompt variants, and cost-performance trade-off analysis.",
      },
    ],
    sampleSummary:
      "Prompt engineer with 3+ years building production LLM applications processing 2M+ daily requests. Reduced inference costs by 40% at [Company] through systematic prompt optimization and model routing. Expert in multi-model architectures spanning GPT-4, Claude, and open-source alternatives with deep experience in evaluation frameworks, RAG systems, and AI safety red-teaming.",
    keywords: [
      "prompt engineering",
      "LLM",
      "GPT-4",
      "Claude",
      "chain-of-thought",
      "few-shot learning",
      "RAG",
      "vector database",
      "fine-tuning",
      "RLHF",
      "AI safety",
      "red-teaming",
      "embeddings",
      "token optimization",
      "eval frameworks",
    ],
    relatedJobs: [
      "ai-engineer",
      "ml-engineer",
      "data-engineer",
      "technical-writer",
      "solutions-architect",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    metaTitle: "AI Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized AI engineer resume with targeted skills, keywords, and templates. Stand out to hiring managers at top AI companies in 2026.",
    skills: [
      {
        name: "ML Model Development",
        description:
          "Design, train, and deploy machine learning models using PyTorch, TensorFlow, and JAX. Experience with transformer architectures, CNNs, and reinforcement learning for production applications.",
      },
      {
        name: "MLOps & Model Serving",
        description:
          "Build CI/CD pipelines for ML models using MLflow, Kubeflow, or SageMaker. Manage model versioning, A/B testing in production, and automated retraining pipelines.",
      },
      {
        name: "LLM Application Development",
        description:
          "Build production applications using LLM APIs, including prompt engineering, function calling, agent architectures, and multi-modal AI systems with robust error handling.",
      },
      {
        name: "Data Pipeline Engineering",
        description:
          "Design and maintain data pipelines for ML training using Apache Spark, Airflow, or Dagster. Handle data quality, feature engineering, and dataset versioning at scale.",
      },
      {
        name: "GPU Computing & Optimization",
        description:
          "Optimize model inference on GPU clusters using CUDA, TensorRT, and quantization techniques. Reduce serving costs while maintaining accuracy through model distillation and pruning.",
      },
    ],
    tips: [
      {
        title: "Lead With Production, Not Research",
        content:
          "Unless you're applying to a research lab, companies want AI engineers who ship. Emphasize production deployments: 'Deployed image classification model serving 10M predictions/day with 99.9% uptime on Kubernetes' outweighs 'Researched novel architectures for image classification.'",
      },
      {
        title: "Show Full-Stack ML Capability",
        content:
          "The most valuable AI engineers own the entire ML lifecycle — from data pipeline to model serving. Highlight end-to-end projects where you handled data collection, training, evaluation, deployment, and monitoring. This distinguishes you from pure researchers.",
      },
      {
        title: "Emphasize Cost Awareness",
        content:
          "GPU compute is expensive. Show that you understand cost-performance tradeoffs: model distillation that cut inference costs by 60%, batch processing strategies, spot instance training, or model quantization without significant accuracy loss.",
      },
    ],
    sampleSummary:
      "AI engineer with 4 years building production ML systems processing 50M+ daily predictions. Led the computer vision pipeline at [Company] that reduced manual review time by 75%. Deep expertise in PyTorch, transformer architectures, and MLOps with a track record of deploying models that balance accuracy, latency, and cost at scale.",
    keywords: [
      "artificial intelligence",
      "machine learning",
      "deep learning",
      "PyTorch",
      "TensorFlow",
      "LLM",
      "computer vision",
      "NLP",
      "MLOps",
      "model deployment",
      "GPU optimization",
      "transformer",
      "neural network",
      "inference optimization",
      "AI engineering",
    ],
    relatedJobs: [
      "ml-engineer",
      "prompt-engineer",
      "data-engineer",
      "mlops-engineer",
      "cloud-engineer",
    ],
  },
  {
    slug: "cloud-engineer",
    title: "Cloud Engineer",
    metaTitle: "Cloud Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized cloud engineer resume with industry-specific skills and keywords. Templates designed for AWS, Azure, and GCP roles in 2026.",
    skills: [
      {
        name: "Multi-Cloud Architecture",
        description:
          "Design and implement cloud infrastructure on AWS, Azure, or GCP. Build scalable, fault-tolerant architectures using auto-scaling groups, load balancers, and multi-region deployments.",
      },
      {
        name: "Infrastructure as Code",
        description:
          "Define and manage cloud resources using Terraform, Pulumi, or CloudFormation. Implement GitOps workflows with version-controlled infrastructure and automated drift detection.",
      },
      {
        name: "Container Orchestration",
        description:
          "Deploy and manage containerized applications on Kubernetes (EKS, AKS, GKE) or ECS. Configure service meshes, ingress controllers, and horizontal pod autoscaling for production workloads.",
      },
      {
        name: "Cloud Security",
        description:
          "Implement IAM policies, network security groups, encryption at rest/transit, and compliance frameworks (SOC 2, HIPAA). Conduct security audits and implement zero-trust architectures.",
      },
      {
        name: "Cost Optimization",
        description:
          "Analyze and reduce cloud spend through reserved instances, spot fleet strategies, right-sizing, and resource tagging. Build cost dashboards and implement automated shutdown policies.",
      },
    ],
    tips: [
      {
        title: "Certifications Are Table Stakes",
        content:
          "For cloud engineering roles, certifications matter more than in most tech jobs. List AWS Solutions Architect, Azure Administrator, or GCP Professional Cloud Architect prominently. If you have multiple cloud certifications, you're immediately more competitive for multi-cloud environments.",
      },
      {
        title: "Quantify Scale and Cost Impact",
        content:
          "Cloud engineering is uniquely measurable. Include: infrastructure scale (number of EC2 instances, containers, requests/second), cost savings (reduced monthly cloud spend from $X to $Y), and reliability metrics (uptime percentages, incident reduction rates).",
      },
      {
        title: "Show Migration Experience",
        content:
          "Cloud migration projects are highly valued. Describe the scope (number of services migrated, data volumes), approach (lift-and-shift vs. re-architecture), and outcome (cost reduction, performance improvement, zero-downtime migration).",
      },
    ],
    sampleSummary:
      "AWS-certified cloud engineer with 5 years designing multi-region infrastructure serving 200M+ monthly requests. Led the migration of 40+ microservices from on-premise to AWS at [Company], reducing infrastructure costs by 35% while improving uptime from 99.5% to 99.99%. Expert in Terraform, Kubernetes, and cloud security compliance.",
    keywords: [
      "cloud engineering",
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "Kubernetes",
      "Docker",
      "infrastructure as code",
      "CI/CD",
      "cloud migration",
      "serverless",
      "IAM",
      "cloud security",
      "cost optimization",
      "microservices",
    ],
    relatedJobs: [
      "devops-engineer",
      "sre-engineer",
      "solutions-architect",
      "cybersecurity-analyst",
      "data-engineer",
    ],
  },
  {
    slug: "ml-engineer",
    title: "ML Engineer",
    metaTitle: "ML Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create a standout ML engineer resume with ATS-optimized keywords, skill recommendations, and professional templates for machine learning roles in 2026.",
    skills: [
      {
        name: "Feature Engineering",
        description:
          "Design and implement feature pipelines that transform raw data into high-signal model inputs. Build feature stores using Feast or Tecton for consistent feature serving across training and inference.",
      },
      {
        name: "Experiment Tracking & Reproducibility",
        description:
          "Manage ML experiments using MLflow, Weights & Biases, or Neptune. Ensure reproducibility through deterministic training pipelines, seed management, and dataset versioning.",
      },
      {
        name: "Model Optimization",
        description:
          "Apply hyperparameter tuning (Optuna, Ray Tune), model compression (pruning, quantization, distillation), and architecture search to maximize model performance within compute constraints.",
      },
      {
        name: "Statistical Modeling",
        description:
          "Apply classical ML algorithms (gradient boosting, random forests, SVMs) and statistical methods (Bayesian inference, causal analysis) alongside deep learning for appropriate problem types.",
      },
      {
        name: "Real-Time ML Systems",
        description:
          "Build low-latency prediction services using ONNX Runtime, TorchServe, or custom gRPC servers. Handle streaming data with Kafka, implement online learning, and manage model freshness.",
      },
    ],
    tips: [
      {
        title: "Distinguish Yourself From Data Scientists",
        content:
          "ML engineers build systems; data scientists build models. Emphasize your engineering contributions: production deployment, system reliability, pipeline automation, and serving infrastructure. Mention SLAs you maintained, throughput you achieved, and engineering practices (code review, testing, monitoring) you followed.",
      },
      {
        title: "Show Business Impact, Not Just Model Metrics",
        content:
          "F1 scores and AUC-ROC impress ML teams, but hiring managers want business outcomes. 'Improved fraud detection model precision from 0.82 to 0.94, reducing false positive alerts by 60% and saving the risk team 200 hours/month of manual review' connects technical work to business value.",
      },
      {
        title: "Highlight Your Data Quality Work",
        content:
          "Garbage in, garbage out. Show that you understand data quality: data validation pipelines, anomaly detection in training data, handling class imbalance, and data drift monitoring. This signals maturity and production readiness.",
      },
    ],
    sampleSummary:
      "ML engineer with 4+ years building production machine learning systems. Designed the recommendation engine at [Company] serving 5M+ personalized predictions daily with p99 latency under 50ms. Strong in both classical ML and deep learning, with production experience spanning feature engineering, model optimization, and real-time serving infrastructure.",
    keywords: [
      "machine learning engineer",
      "ML pipeline",
      "feature engineering",
      "model deployment",
      "PyTorch",
      "scikit-learn",
      "MLflow",
      "experiment tracking",
      "model optimization",
      "hyperparameter tuning",
      "real-time inference",
      "data pipeline",
      "A/B testing",
      "model monitoring",
      "production ML",
    ],
    relatedJobs: [
      "ai-engineer",
      "data-engineer",
      "mlops-engineer",
      "prompt-engineer",
      "fullstack-developer",
    ],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    metaTitle: "Cybersecurity Analyst Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized cybersecurity analyst resume with targeted skills, certifications, and keywords. Professional templates for InfoSec roles in 2026.",
    skills: [
      {
        name: "Threat Detection & SIEM",
        description:
          "Monitor and analyze security events using Splunk, CrowdStrike, or Microsoft Sentinel. Build custom detection rules, correlation searches, and automated alert triage workflows to identify threats in real-time.",
      },
      {
        name: "Incident Response",
        description:
          "Lead incident response from detection to post-mortem. Perform digital forensics, containment, eradication, and recovery. Document incidents following NIST frameworks and maintain incident response playbooks.",
      },
      {
        name: "Vulnerability Management",
        description:
          "Conduct vulnerability assessments using Nessus, Qualys, or Rapid7. Manage patching prioritization based on CVSS scores, exploit availability, and asset criticality. Track remediation SLAs across teams.",
      },
      {
        name: "Network Security",
        description:
          "Configure and manage firewalls (Palo Alto, Fortinet), IDS/IPS systems, and network segmentation. Perform packet analysis with Wireshark and implement zero-trust network access policies.",
      },
      {
        name: "Compliance & Risk Assessment",
        description:
          "Conduct risk assessments aligned with NIST CSF, ISO 27001, or CIS benchmarks. Support SOC 2, HIPAA, or PCI-DSS audit preparation with evidence collection and control documentation.",
      },
    ],
    tips: [
      {
        title: "Lead With Certifications",
        content:
          "Cybersecurity is one of the most certification-driven fields. Place CompTIA Security+, CEH, CISSP, or OSCP prominently near the top of your resume. For senior roles, CISSP or CISM is often a hard requirement. If you're studying for one, include 'Expected [date]' — it shows initiative.",
      },
      {
        title: "Quantify Your Defense Impact",
        content:
          "Security work is measurable: 'Reduced mean time to detection from 72 hours to 4 hours through custom SIEM correlation rules' or 'Identified and remediated 340 critical vulnerabilities across 2,000 endpoints within 48-hour SLA.' Incident counts, response times, and vulnerability closure rates all work.",
      },
      {
        title: "Show Both Technical and Communication Skills",
        content:
          "Security analysts must communicate risk to non-technical stakeholders. Highlight experience writing executive security briefings, conducting security awareness training, or presenting risk assessments to board-level audiences. This separates you from purely technical candidates.",
      },
    ],
    sampleSummary:
      "CompTIA Security+ and CEH certified cybersecurity analyst with 3 years of SOC experience. Monitored and triaged 500+ daily security alerts at [Company], reducing false positive rate by 65% through custom Splunk detection rules. Experienced in incident response, vulnerability management, and compliance (SOC 2, HIPAA) with a focus on proactive threat hunting.",
    keywords: [
      "cybersecurity",
      "information security",
      "SIEM",
      "Splunk",
      "incident response",
      "threat detection",
      "vulnerability management",
      "SOC",
      "NIST",
      "ISO 27001",
      "penetration testing",
      "network security",
      "firewall",
      "risk assessment",
      "compliance",
    ],
    relatedJobs: [
      "cloud-engineer",
      "devops-engineer",
      "sre-engineer",
      "solutions-architect",
      "data-engineer",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    metaTitle: "DevOps Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized DevOps engineer resume with CI/CD, Kubernetes, and infrastructure skills. Templates and keywords for DevOps roles in 2026.",
    skills: [
      {
        name: "CI/CD Pipeline Design",
        description:
          "Build and maintain continuous integration and delivery pipelines using GitHub Actions, GitLab CI, Jenkins, or CircleCI. Implement automated testing, security scanning, and deployment gates.",
      },
      {
        name: "Configuration Management",
        description:
          "Automate server provisioning and configuration using Ansible, Chef, or Puppet. Manage configuration drift, implement idempotent playbooks, and maintain environment parity across dev/staging/prod.",
      },
      {
        name: "Monitoring & Observability",
        description:
          "Implement full-stack observability using Prometheus, Grafana, Datadog, or New Relic. Build dashboards, configure alerting rules, and establish SLOs/SLIs for production services.",
      },
      {
        name: "Linux Systems Administration",
        description:
          "Manage Linux servers at scale including kernel tuning, systemd service management, filesystem optimization, and troubleshooting performance bottlenecks using tools like strace, perf, and eBPF.",
      },
      {
        name: "Scripting & Automation",
        description:
          "Write automation scripts in Bash, Python, or Go to eliminate manual operations. Build custom tooling for deployment, log analysis, certificate rotation, and infrastructure provisioning.",
      },
    ],
    tips: [
      {
        title: "Quantify Your Pipeline Impact",
        content:
          "DevOps impact is highly measurable: deployment frequency (daily vs. weekly), lead time for changes (hours vs. days), change failure rate (percentage), and mean time to recovery (minutes vs. hours). Reference DORA metrics where possible — hiring managers recognize these as industry-standard indicators.",
      },
      {
        title: "Show Cross-Team Collaboration",
        content:
          "DevOps is inherently collaborative. Highlight how you worked with development teams to improve their deployment experience, with security to implement DevSecOps practices, or with product to reduce release cycle times. The best DevOps engineers are force multipliers for the entire engineering org.",
      },
      {
        title: "Include Incident War Stories (Tactfully)",
        content:
          "Real-world incident experience is gold. 'Led response to production outage affecting 1M users, identified root cause (cascading database connection exhaustion) within 15 minutes, and implemented connection pooling fix that prevented recurrence' shows composure, debugging ability, and follow-through.",
      },
    ],
    sampleSummary:
      "DevOps engineer with 5 years building CI/CD infrastructure for engineering teams of 50+. Increased deployment frequency from weekly to 15+ daily deploys at [Company] while reducing change failure rate from 12% to 2%. Expert in Kubernetes, Terraform, and GitHub Actions with deep Linux systems knowledge and a passion for developer experience.",
    keywords: [
      "DevOps",
      "CI/CD",
      "Kubernetes",
      "Docker",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "Linux",
      "automation",
      "infrastructure as code",
      "monitoring",
      "Prometheus",
      "Grafana",
      "Ansible",
      "site reliability",
    ],
    relatedJobs: [
      "sre-engineer",
      "cloud-engineer",
      "mlops-engineer",
      "cybersecurity-analyst",
      "fullstack-developer",
    ],
  },
  {
    slug: "mlops-engineer",
    title: "MLOps Engineer",
    metaTitle: "MLOps Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized MLOps engineer resume with specialized skills in ML pipelines, model deployment, and monitoring. Templates for 2026 MLOps roles.",
    skills: [
      {
        name: "ML Pipeline Orchestration",
        description:
          "Design and maintain end-to-end ML pipelines using Kubeflow, Airflow, or Prefect. Automate data ingestion, feature computation, model training, evaluation, and deployment as reproducible workflows.",
      },
      {
        name: "Model Registry & Versioning",
        description:
          "Implement model lifecycle management using MLflow Model Registry, SageMaker Model Registry, or Vertex AI. Track model lineage, manage approval workflows, and automate model promotion across environments.",
      },
      {
        name: "Model Monitoring & Drift Detection",
        description:
          "Build monitoring systems that detect data drift, concept drift, and model degradation in production. Implement automated retraining triggers and performance alerting using Evidently, WhyLabs, or custom solutions.",
      },
      {
        name: "Feature Store Management",
        description:
          "Deploy and manage feature stores (Feast, Tecton, Hopsworks) for consistent feature serving between training and inference. Handle feature freshness, backfilling, and point-in-time correctness.",
      },
      {
        name: "GPU Cluster Management",
        description:
          "Manage GPU compute resources for ML training and inference using Kubernetes with GPU scheduling, NVIDIA Triton Inference Server, and resource quota policies. Optimize GPU utilization and reduce idle compute costs.",
      },
    ],
    tips: [
      {
        title: "Bridge ML and DevOps in Your Resume",
        content:
          "MLOps is the intersection of ML and operations. Your resume should demonstrate fluency in both domains. Show ML knowledge (model types, metrics, training processes) alongside DevOps skills (CI/CD, containers, monitoring). Avoid positioning yourself as purely one or the other.",
      },
      {
        title: "Emphasize Reliability and Scale Metrics",
        content:
          "MLOps is about making ML reliable at scale. Include: model serving latency (p50/p99), prediction throughput, model retraining frequency, pipeline failure rates, and GPU utilization rates. 'Maintained 99.95% uptime for 12 ML models serving 30M daily predictions' speaks volumes.",
      },
      {
        title: "Show Cost Optimization Skills",
        content:
          "ML infrastructure is expensive. Highlight cost savings: 'Reduced monthly GPU spend by 45% through spot instance training, model quantization, and batch inference consolidation.' Companies building ML teams care deeply about sustainable compute costs.",
      },
    ],
    sampleSummary:
      "MLOps engineer with 3+ years building production ML infrastructure. Scaled model serving from 5 to 40+ models at [Company] with automated retraining pipelines and drift detection. Expert in Kubeflow, MLflow, and Kubernetes GPU scheduling with a focus on reliability (99.95% uptime) and cost optimization (reduced GPU spend by 45%).",
    keywords: [
      "MLOps",
      "machine learning operations",
      "ML pipeline",
      "Kubeflow",
      "MLflow",
      "model deployment",
      "model monitoring",
      "feature store",
      "data drift",
      "model registry",
      "GPU computing",
      "Kubernetes",
      "CI/CD for ML",
      "model serving",
      "experiment tracking",
    ],
    relatedJobs: [
      "ml-engineer",
      "devops-engineer",
      "ai-engineer",
      "data-engineer",
      "cloud-engineer",
    ],
  },
  {
    slug: "blockchain-developer",
    title: "Blockchain Developer",
    metaTitle: "Blockchain Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized blockchain developer resume with smart contract, Web3, and DeFi skills. Professional templates for blockchain roles in 2026.",
    skills: [
      {
        name: "Smart Contract Development",
        description:
          "Write, test, and deploy smart contracts in Solidity (Ethereum/L2s) or Rust (Solana). Implement gas optimization patterns, upgrade proxies, and follow security best practices to prevent common vulnerabilities.",
      },
      {
        name: "DeFi Protocol Engineering",
        description:
          "Build decentralized finance protocols including AMMs, lending markets, yield aggregators, and cross-chain bridges. Implement price oracle integrations, liquidation mechanisms, and governance systems.",
      },
      {
        name: "Security Auditing",
        description:
          "Conduct smart contract security reviews using Slither, Mythril, and manual analysis. Identify reentrancy, flash loan attacks, oracle manipulation, and access control vulnerabilities before deployment.",
      },
      {
        name: "Web3 Frontend Integration",
        description:
          "Build dApp frontends using ethers.js/viem, wagmi, and wallet connectors (MetaMask, WalletConnect). Handle transaction lifecycle, error states, and chain-specific UX across multiple networks.",
      },
      {
        name: "Layer 2 & Scaling Solutions",
        description:
          "Deploy on Optimism, Arbitrum, Base, or zkSync. Understand rollup architectures, cross-chain messaging, bridge security models, and L2-specific gas optimization strategies.",
      },
    ],
    tips: [
      {
        title: "Link to On-Chain Proof of Work",
        content:
          "Blockchain is unique: your work is publicly verifiable. Include links to deployed contracts (with Etherscan verification), GitHub repositories with audited code, and any bug bounty payouts or audit reports. Verifiable on-chain work is more convincing than any bullet point.",
      },
      {
        title: "Highlight Security Awareness",
        content:
          "Security is the #1 concern in blockchain. Show that you write secure code: mention audits you've passed, security tools you use, vulnerabilities you've prevented, and your approach to testing (invariant testing with Foundry, formal verification). A security-conscious developer is worth 10 fast developers.",
      },
      {
        title: "Show TVL and User Metrics",
        content:
          "Blockchain projects have transparent success metrics. 'Built the core vault contracts for a protocol reaching $50M TVL' or 'Deployed NFT minting contract used by 15,000 unique wallets' provides undeniable proof of impact that hiring managers can independently verify.",
      },
    ],
    sampleSummary:
      "Blockchain developer with 3 years building production smart contracts on Ethereum and L2s. Core contributor to a DeFi protocol with $30M+ TVL at [Company]. Expert in Solidity gas optimization, security auditing (zero critical findings across 3 professional audits), and full-stack dApp development with React and ethers.js.",
    keywords: [
      "blockchain",
      "Solidity",
      "smart contracts",
      "Ethereum",
      "DeFi",
      "Web3",
      "dApp",
      "EVM",
      "Layer 2",
      "NFT",
      "Hardhat",
      "Foundry",
      "security audit",
      "gas optimization",
      "decentralized",
    ],
    relatedJobs: [
      "fullstack-developer",
      "cybersecurity-analyst",
      "cloud-engineer",
      "solutions-architect",
      "ai-engineer",
    ],
  },
  {
    slug: "sre-engineer",
    title: "SRE Engineer",
    metaTitle: "SRE Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized SRE engineer resume with reliability, observability, and incident management skills. Templates for site reliability engineering roles in 2026.",
    skills: [
      {
        name: "SLO/SLI/SLA Management",
        description:
          "Define and maintain service level objectives based on user-centric reliability indicators. Build error budget tracking dashboards, implement burn-rate alerting, and drive SLO-based decision making across engineering teams.",
      },
      {
        name: "Incident Management",
        description:
          "Lead incident response as incident commander. Implement on-call rotations, escalation policies, and structured post-incident reviews. Build runbooks and automated remediation playbooks to reduce MTTR.",
      },
      {
        name: "Chaos Engineering",
        description:
          "Design and execute chaos experiments using Gremlin, Litmus, or custom failure injection to validate system resilience. Build game days, test disaster recovery procedures, and improve blast radius containment.",
      },
      {
        name: "Distributed Systems Troubleshooting",
        description:
          "Diagnose complex failures in microservice architectures using distributed tracing (Jaeger, Zipkin), log aggregation, and metric correlation. Identify cascading failures, resource contention, and latency bottlenecks.",
      },
      {
        name: "Capacity Planning",
        description:
          "Forecast infrastructure needs based on growth projections and traffic patterns. Build capacity models, implement auto-scaling policies, and manage performance budgets to prevent capacity-related outages.",
      },
    ],
    tips: [
      {
        title: "Frame Everything Through Reliability Metrics",
        content:
          "SRE is measured by reliability outcomes. Every bullet point should connect to a reliability metric: uptime percentages, MTTR improvements, error budget consumption, incident count reduction, or p99 latency improvements. 'Improved service availability from 99.9% to 99.99% (reducing annual downtime from 8.7 hours to 52 minutes)' is the gold standard.",
      },
      {
        title: "Show You Eliminate Toil",
        content:
          "Toil elimination is a core SRE principle. Quantify automation impact: 'Automated 40+ manual operational procedures, reducing on-call toil from 60% to 15% of engineer time.' This shows you understand the SRE philosophy, not just the technical tools.",
      },
      {
        title: "Include Post-Incident Review Experience",
        content:
          "The ability to learn from incidents distinguishes senior SREs. Mention blameless post-mortems you led, systemic improvements you implemented after incidents, and patterns you identified across multiple incidents. This shows organizational impact beyond individual firefighting.",
      },
    ],
    sampleSummary:
      "Site reliability engineer with 4 years maintaining 99.99% uptime for services handling 1B+ daily requests. Reduced MTTR by 70% at [Company] through automated runbooks and improved observability. Expert in SLO-driven engineering, chaos experiments, and building reliable distributed systems on Kubernetes.",
    keywords: [
      "site reliability engineering",
      "SRE",
      "SLO",
      "SLI",
      "incident response",
      "on-call",
      "observability",
      "Prometheus",
      "Grafana",
      "Kubernetes",
      "chaos engineering",
      "toil reduction",
      "distributed systems",
      "post-mortem",
      "capacity planning",
    ],
    relatedJobs: [
      "devops-engineer",
      "cloud-engineer",
      "solutions-architect",
      "cybersecurity-analyst",
      "fullstack-developer",
    ],
  },
  {
    slug: "solutions-architect",
    title: "Solutions Architect",
    metaTitle: "Solutions Architect Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized solutions architect resume with cloud architecture, system design, and stakeholder management skills. Templates for 2026 SA roles.",
    skills: [
      {
        name: "System Design & Architecture",
        description:
          "Design scalable, fault-tolerant system architectures handling millions of requests. Create architecture decision records (ADRs), evaluate trade-offs, and produce technical specifications that guide engineering teams.",
      },
      {
        name: "Cloud Architecture (AWS/Azure/GCP)",
        description:
          "Design cloud-native solutions using managed services, serverless patterns, and multi-region architectures. Hold AWS Solutions Architect Professional, Azure Solutions Architect, or equivalent certification.",
      },
      {
        name: "Technical Pre-Sales",
        description:
          "Translate complex technical capabilities into business value for enterprise clients. Build proof-of-concept implementations, deliver technical presentations, and support RFP responses with architectural proposals.",
      },
      {
        name: "Migration Strategy",
        description:
          "Plan and execute large-scale migrations from on-premise to cloud, monolith to microservices, or between cloud providers. Define migration waves, risk mitigation strategies, and rollback procedures.",
      },
      {
        name: "Integration Architecture",
        description:
          "Design API strategies, event-driven architectures, and data integration patterns connecting heterogeneous systems. Implement API gateways, message queues, and ETL pipelines for enterprise integration scenarios.",
      },
    ],
    tips: [
      {
        title: "Emphasize Business Outcomes, Not Just Technical Decisions",
        content:
          "Solutions architects are hired for business impact, not just technical knowledge. 'Designed a microservices architecture' is technical. 'Designed a microservices architecture that reduced time-to-market for new features from 6 weeks to 5 days, enabling the product team to ship 3x more experiments per quarter' is business impact.",
      },
      {
        title: "Show Breadth and Depth",
        content:
          "List specific technologies you've architected with (not just 'cloud'), but also show breadth across domains: compute, storage, networking, security, data, AI/ML. The best SAs can design across the entire stack and advise on trade-offs between different approaches.",
      },
      {
        title: "Include Architecture Diagrams in Your Portfolio",
        content:
          "Link to a portfolio or GitHub with architecture diagrams (sanitized of proprietary details). Seeing how you think visually about systems is more revealing than bullet points. Use tools like Excalidraw or draw.io to create clean, professional diagrams.",
      },
    ],
    sampleSummary:
      "AWS Solutions Architect Professional with 7 years designing enterprise cloud architectures. Led the cloud migration strategy for [Company]'s $200M revenue platform, reducing infrastructure costs by 40% while improving availability to 99.99%. Combines deep technical expertise across compute, data, and AI services with proven ability to translate technical strategy into executive-level business cases.",
    keywords: [
      "solutions architect",
      "system design",
      "cloud architecture",
      "AWS",
      "Azure",
      "microservices",
      "enterprise architecture",
      "technical pre-sales",
      "migration",
      "API design",
      "scalability",
      "high availability",
      "architecture decision",
      "integration",
      "stakeholder management",
    ],
    relatedJobs: [
      "cloud-engineer",
      "devops-engineer",
      "sre-engineer",
      "fullstack-developer",
      "data-engineer",
    ],
  },
  {
    slug: "technical-writer",
    title: "Technical Writer",
    metaTitle: "Technical Writer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized technical writer resume with documentation, API reference, and content strategy skills. Templates for technical writing roles in 2026.",
    skills: [
      {
        name: "API Documentation",
        description:
          "Write clear, developer-friendly API references using OpenAPI/Swagger specs. Create quickstart guides, authentication walkthroughs, and code samples in multiple languages that reduce time-to-first-API-call.",
      },
      {
        name: "Docs-as-Code Workflows",
        description:
          "Manage documentation using Git, Markdown, and static site generators (Docusaurus, MkDocs, GitBook). Implement CI/CD for docs, automated link checking, and version-controlled documentation alongside code.",
      },
      {
        name: "Information Architecture",
        description:
          "Design documentation site structures, navigation systems, and content taxonomies that help users find answers quickly. Conduct card sorting, analyze search analytics, and optimize content discoverability.",
      },
      {
        name: "Visual Communication",
        description:
          "Create diagrams, flowcharts, and screenshots that complement written documentation. Use tools like Mermaid, draw.io, or Figma to produce clear visual explanations of complex technical concepts.",
      },
      {
        name: "Content Strategy & Analytics",
        description:
          "Define documentation roadmaps aligned with product launches and user needs. Measure documentation effectiveness through page views, time-on-page, search queries, and support ticket deflection rates.",
      },
    ],
    tips: [
      {
        title: "Link to Your Published Work",
        content:
          "Technical writing is a show-don't-tell profession. Include links to live documentation you've written (public docs sites, API references, blog posts). If your work is behind a login, create a portfolio with screenshots and excerpts. Hiring managers will evaluate your writing quality directly.",
      },
      {
        title: "Quantify Documentation Impact",
        content:
          "Documentation reduces support costs and improves developer experience. Quantify it: 'Reduced onboarding time from 2 weeks to 3 days through comprehensive getting-started guides' or 'Decreased support tickets by 35% after launching searchable API reference documentation.'",
      },
      {
        title: "Show Technical Depth",
        content:
          "The best technical writers understand the technology they document. List programming languages you read/write, tools you use for testing code samples, and technical domains you've covered. 'Documented Kubernetes deployment procedures after running the deployments myself in a test environment' shows hands-on credibility.",
      },
    ],
    sampleSummary:
      "Technical writer with 4 years creating developer documentation for SaaS platforms. Authored the API reference and SDK guides at [Company] that serve 10,000+ monthly developers, reducing time-to-first-API-call by 60%. Proficient in docs-as-code workflows (Git, Markdown, Docusaurus), with the technical depth to read code and test documentation accuracy firsthand.",
    keywords: [
      "technical writing",
      "API documentation",
      "developer documentation",
      "docs-as-code",
      "Markdown",
      "content strategy",
      "information architecture",
      "user guides",
      "release notes",
      "knowledge base",
      "DITA",
      "style guide",
      "Docusaurus",
      "developer experience",
      "documentation",
    ],
    relatedJobs: [
      "prompt-engineer",
      "ux-designer",
      "fullstack-developer",
      "solutions-architect",
      "data-engineer",
    ],
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    metaTitle: "Flutter Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized Flutter developer resume with cross-platform, Dart, and mobile development skills. Professional templates for Flutter roles in 2026.",
    skills: [
      {
        name: "Cross-Platform UI Development",
        description:
          "Build pixel-perfect, responsive UIs for iOS, Android, web, and desktop from a single Dart codebase. Implement complex animations, custom painters, and platform-adaptive designs using Material and Cupertino widgets.",
      },
      {
        name: "State Management",
        description:
          "Architect application state using Riverpod, Bloc, or Provider patterns. Handle complex state scenarios including optimistic updates, offline-first data synchronization, and multi-screen state sharing.",
      },
      {
        name: "Platform Integration",
        description:
          "Write platform channels and FFI bindings to integrate native iOS (Swift) and Android (Kotlin) features. Implement camera, biometrics, push notifications, and platform-specific APIs within Flutter apps.",
      },
      {
        name: "Performance Optimization",
        description:
          "Profile and optimize Flutter app performance using DevTools. Reduce jank through widget tree optimization, lazy loading, image caching, and isolate-based computation for heavy processing.",
      },
      {
        name: "Testing & CI/CD",
        description:
          "Write unit, widget, and integration tests using Flutter's testing framework. Set up CI/CD pipelines with Codemagic or GitHub Actions for automated building, testing, and deployment to App Store and Play Store.",
      },
    ],
    tips: [
      {
        title: "Showcase App Store Presence",
        content:
          "Link to apps you've published on the App Store and Google Play. Include download counts, ratings, and active user numbers. 'Built and launched [App] on iOS and Android with 50K+ downloads and 4.7-star rating' is concrete, verifiable proof of your capability.",
      },
      {
        title: "Highlight the Cross-Platform Value",
        content:
          "Companies choose Flutter for cost efficiency. Emphasize the business value: 'Delivered iOS and Android apps simultaneously from one codebase, reducing development time by 40% compared to native approach' or 'Maintained feature parity across 3 platforms with a single development team.'",
      },
      {
        title: "Show Backend Awareness",
        content:
          "The best Flutter developers understand the full picture. Mention REST/GraphQL API integration, Firebase services, local database management (SQLite, Hive), and authentication flows. This positions you as a mobile engineer, not just a UI builder.",
      },
    ],
    sampleSummary:
      "Flutter developer with 3+ years building cross-platform applications with 200K+ combined downloads. Led mobile development at [Company], delivering iOS and Android apps from a single codebase with 4.8-star average rating. Expert in Riverpod state management, platform channel integrations, and CI/CD automation with Codemagic.",
    keywords: [
      "Flutter",
      "Dart",
      "cross-platform",
      "mobile development",
      "iOS",
      "Android",
      "Riverpod",
      "Bloc",
      "state management",
      "widget",
      "Firebase",
      "REST API",
      "app store",
      "material design",
      "responsive UI",
    ],
    relatedJobs: [
      "fullstack-developer",
      "ux-designer",
      "ai-engineer",
      "cloud-engineer",
      "solutions-architect",
    ],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    metaTitle: "Data Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized data engineer resume with ETL, data warehouse, and pipeline skills. Professional templates for data engineering roles in 2026.",
    skills: [
      {
        name: "Data Pipeline Development",
        description:
          "Design and build batch and streaming data pipelines using Apache Spark, Airflow, dbt, or Dagster. Handle data extraction from diverse sources (APIs, databases, event streams) with error handling and retry logic.",
      },
      {
        name: "Data Warehouse Architecture",
        description:
          "Design dimensional models and implement data warehouses on Snowflake, BigQuery, or Redshift. Build star and snowflake schemas, manage slowly changing dimensions, and optimize query performance.",
      },
      {
        name: "Streaming Data Processing",
        description:
          "Build real-time data pipelines using Apache Kafka, Flink, or Kinesis. Implement exactly-once processing, stream windowing, and real-time aggregations for analytics and operational use cases.",
      },
      {
        name: "Data Quality & Governance",
        description:
          "Implement data quality frameworks using Great Expectations, dbt tests, or Monte Carlo. Build data contracts, lineage tracking, and cataloging systems to ensure data reliability and discoverability.",
      },
      {
        name: "SQL & Query Optimization",
        description:
          "Write complex analytical SQL across petabyte-scale datasets. Optimize query performance through partitioning, clustering, materialized views, and query plan analysis for both OLTP and OLAP workloads.",
      },
    ],
    tips: [
      {
        title: "Quantify Data Scale",
        content:
          "Data engineering is about scale. Include numbers: volume (terabytes/petabytes processed daily), velocity (events per second), variety (number of data sources integrated), and pipeline count. 'Built ETL pipelines processing 5TB daily from 40+ sources' is immediately credible.",
      },
      {
        title: "Show Business Enablement",
        content:
          "Data engineers enable downstream users. Highlight how your work enabled business outcomes: 'Built the customer 360 pipeline that powered a recommendation engine generating $2M incremental revenue' or 'Reduced analyst query time from 45 minutes to 30 seconds through materialized views and pre-aggregation.'",
      },
      {
        title: "Include Data Quality Metrics",
        content:
          "Data quality differentiates senior data engineers. Mention data quality scores, SLA compliance rates, pipeline reliability percentages, and freshness guarantees. 'Maintained 99.8% pipeline SLA with <15 minute data freshness across 200+ pipelines' shows operational maturity.",
      },
    ],
    sampleSummary:
      "Data engineer with 4+ years building production data platforms processing 10TB+ daily. Designed the core data warehouse at [Company] serving 200+ analysts and 50+ ML models on Snowflake. Expert in Spark, Airflow, and dbt with a strong focus on data quality (99.8% pipeline SLA) and cost optimization.",
    keywords: [
      "data engineering",
      "ETL",
      "ELT",
      "data pipeline",
      "Apache Spark",
      "Airflow",
      "dbt",
      "Snowflake",
      "BigQuery",
      "Kafka",
      "data warehouse",
      "SQL",
      "data quality",
      "data modeling",
      "streaming data",
    ],
    relatedJobs: [
      "ml-engineer",
      "ai-engineer",
      "cloud-engineer",
      "mlops-engineer",
      "fullstack-developer",
    ],
  },
  {
    slug: "ux-designer",
    title: "UX Designer",
    metaTitle: "UX Designer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized UX designer resume with research, prototyping, and design system skills. Professional templates for UX design roles in 2026.",
    skills: [
      {
        name: "User Research",
        description:
          "Plan and conduct qualitative and quantitative research including user interviews, usability testing, surveys, and A/B experiments. Synthesize findings into actionable insights using affinity diagrams and journey mapping.",
      },
      {
        name: "Interaction Design",
        description:
          "Design intuitive user flows, wireframes, and high-fidelity prototypes in Figma. Create micro-interactions, transition animations, and responsive layouts that guide users through complex tasks effortlessly.",
      },
      {
        name: "Design Systems",
        description:
          "Build and maintain scalable design systems with component libraries, design tokens, and usage guidelines. Ensure consistency across products while enabling rapid iteration for product teams.",
      },
      {
        name: "Accessibility (WCAG)",
        description:
          "Design for WCAG 2.2 AA compliance including color contrast, keyboard navigation, screen reader compatibility, and cognitive accessibility. Conduct accessibility audits and advocate for inclusive design practices.",
      },
      {
        name: "Data-Driven Design",
        description:
          "Use analytics (Mixpanel, Amplitude, Hotjar) to identify UX issues and validate design decisions. Design and analyze A/B tests, funnel analyses, and heatmaps to optimize conversion and task completion rates.",
      },
    ],
    tips: [
      {
        title: "Your Portfolio Is Your Resume",
        content:
          "For UX roles, your portfolio matters more than your resume. But your resume gets you to the portfolio review. Include a prominent portfolio link and make sure each case study shows: the problem, your process, your solution, and measurable results. 'Redesigned onboarding flow, increasing completion rate from 23% to 68%' connects design to business outcomes.",
      },
      {
        title: "Show Process, Not Just Output",
        content:
          "Hiring managers want to see how you think, not just what you made. Mention your research methods, how you involved stakeholders, how you tested hypotheses, and how you iterated based on feedback. 'Conducted 20 user interviews, identified 3 core pain points, prototyped 4 solutions, and validated the winner through unmoderated usability testing' shows rigorous process.",
      },
      {
        title: "Quantify Design Impact",
        content:
          "Designers often skip metrics, but numbers are persuasive. Include: conversion rate improvements, task completion rates, time-on-task reductions, NPS/CSAT changes, support ticket reductions, and accessibility compliance scores. Connect your design work to measurable outcomes wherever possible.",
      },
    ],
    sampleSummary:
      "UX designer with 5 years crafting user experiences for B2B SaaS products serving 500K+ users. Led the redesign of [Company]'s core workflow, reducing task completion time by 40% and increasing user satisfaction (NPS) from 32 to 61. Expert in Figma, user research, and building design systems that scale across product teams.",
    keywords: [
      "UX design",
      "user experience",
      "Figma",
      "user research",
      "usability testing",
      "wireframing",
      "prototyping",
      "design system",
      "interaction design",
      "accessibility",
      "WCAG",
      "information architecture",
      "user interface",
      "A/B testing",
      "design thinking",
    ],
    relatedJobs: [
      "fullstack-developer",
      "technical-writer",
      "flutter-developer",
      "prompt-engineer",
      "solutions-architect",
    ],
  },
  {
    slug: "fullstack-developer",
    title: "Full-Stack Developer",
    metaTitle: "Full-Stack Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized full-stack developer resume with frontend, backend, and DevOps skills. Professional templates for full-stack roles in 2026.",
    skills: [
      {
        name: "Frontend Development",
        description:
          "Build responsive, performant web applications using React, Next.js, or Vue. Implement server-side rendering, client-side state management, and accessible UIs with TypeScript and modern CSS (Tailwind, CSS Modules).",
      },
      {
        name: "Backend API Development",
        description:
          "Design and implement RESTful and GraphQL APIs using Node.js, Python (FastAPI/Django), or Go. Handle authentication, authorization, rate limiting, and API versioning for production services.",
      },
      {
        name: "Database Design",
        description:
          "Design schemas and optimize queries for both relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis, DynamoDB) databases. Implement migrations, indexing strategies, and caching layers for application performance.",
      },
      {
        name: "Cloud Deployment",
        description:
          "Deploy and manage applications on AWS, Vercel, or Railway. Configure CI/CD pipelines, environment management, SSL certificates, and monitoring for production web applications.",
      },
      {
        name: "Testing & Code Quality",
        description:
          "Write comprehensive tests using Jest, Playwright, or pytest. Implement code review practices, linting rules, and type safety with TypeScript or mypy to maintain code quality across growing codebases.",
      },
    ],
    tips: [
      {
        title: "Show Depth on Both Sides",
        content:
          "The biggest full-stack resume mistake is appearing shallow everywhere. Pick 2-3 bullet points that show deep frontend expertise (complex state management, performance optimization, accessibility) and 2-3 that show deep backend expertise (database optimization, API design, scaling challenges). Don't list 20 technologies at surface level.",
      },
      {
        title: "Include End-to-End Project Ownership",
        content:
          "Full-stack developers are valued for end-to-end ownership. Highlight projects where you owned the feature from database schema to deployed UI: 'Built the subscription billing system end-to-end: PostgreSQL schema, Stripe API integration, webhook handling, React dashboard with real-time updates, and Datadog monitoring.'",
      },
      {
        title: "Mention Performance and Scale",
        content:
          "Show that your code runs well at scale. Include: page load times (Core Web Vitals), API response times (p95/p99), concurrent user capacity, and database query optimization results. 'Reduced Largest Contentful Paint from 4.2s to 1.1s through code splitting, image optimization, and SSR caching' demonstrates production awareness.",
      },
    ],
    sampleSummary:
      "Full-stack developer with 5 years building production web applications serving 1M+ monthly users. Led feature development at [Company] across React/Next.js frontend, Node.js APIs, and PostgreSQL, improving page performance by 60% (LCP: 4.2s → 1.1s). Strong in TypeScript, cloud deployment, and end-to-end feature ownership from database to UI.",
    keywords: [
      "full-stack developer",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "REST API",
      "GraphQL",
      "JavaScript",
      "Python",
      "AWS",
      "Docker",
      "CI/CD",
      "responsive design",
      "web development",
    ],
    relatedJobs: [
      "flutter-developer",
      "cloud-engineer",
      "devops-engineer",
      "ux-designer",
      "ai-engineer",
    ],
  },
];

// Additional pSEO jobs (Tier 2 + Tier 3)
pseoJobs.push(
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    metaTitle: "Frontend Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized frontend developer resume with React, TypeScript, and modern web skills. Professional templates for frontend roles in 2026.",
    skills: [
      { name: "Modern React Development", description: "Build performant, type-safe applications with React 19, Next.js App Router, and Server Components. Implement Suspense boundaries, streaming SSR, and React Server Actions for optimal user experience." },
      { name: "Component Architecture", description: "Design reusable component libraries using composition patterns, render props, and headless UI primitives. Build accessible, themeable design systems with shadcn/ui or Radix patterns." },
      { name: "Performance Optimization", description: "Optimize Core Web Vitals (LCP, INP, CLS) through code splitting, image optimization, route prefetching, and bundle analysis. Profile React renders with React DevTools and eliminate unnecessary re-renders." },
      { name: "TypeScript Mastery", description: "Apply advanced TypeScript patterns including discriminated unions, conditional types, generics, and template literal types. Build type-safe APIs from database to UI without runtime errors." },
      { name: "Accessibility (WCAG)", description: "Build WCAG 2.2 AA compliant interfaces with semantic HTML, ARIA patterns, keyboard navigation, and screen reader testing. Audit existing apps with axe and Lighthouse." },
    ],
    tips: [
      { title: "Show Real Production Apps", content: "Hiring managers want to see code that ships, not portfolio toys. Link to live applications you've built or contributed to. 'Maintained the checkout funnel handling $5M monthly GMV' beats 'Built a todo app with React.'" },
      { title: "Quantify UX Improvements", content: "Frontend impact is measurable. Include: Core Web Vitals improvements (LCP from 4s to 1.2s), conversion rate lifts from UX changes, accessibility audit scores, and bundle size reductions. Numbers prove engineering judgment." },
      { title: "Highlight Cross-Functional Work", content: "Senior frontend devs work with designers, backend engineers, and product. Mention design systems you built, API contracts you negotiated, and how you collaborated to ship features end-to-end." },
    ],
    sampleSummary:
      "Frontend developer with 4+ years shipping production React applications used by 800K+ monthly users. Reduced page load time from 3.8s to 0.9s at [Company] through Next.js migration, image optimization, and edge caching. Strong in TypeScript, design systems, and WCAG-compliant component architecture with a focus on developer experience.",
    keywords: ["frontend developer", "React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind", "responsive design", "Core Web Vitals", "accessibility", "design system", "Storybook", "performance", "SSR"],
    relatedJobs: ["fullstack-developer", "ux-designer", "backend-developer", "flutter-developer", "ai-engineer"],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    metaTitle: "Backend Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized backend developer resume with API, database, and distributed systems skills. Professional templates for backend roles in 2026.",
    skills: [
      { name: "API Design & Development", description: "Design RESTful and GraphQL APIs with proper versioning, pagination, rate limiting, and authentication. Document with OpenAPI specs and implement contract testing across services." },
      { name: "Database Engineering", description: "Architect schemas for PostgreSQL, MySQL, and NoSQL stores. Optimize queries through indexing, query plan analysis, and partitioning. Implement read replicas, sharding, and connection pooling at scale." },
      { name: "Distributed Systems", description: "Build event-driven architectures with Kafka, RabbitMQ, or AWS SQS. Implement CQRS, event sourcing, and saga patterns. Handle distributed transactions, idempotency, and eventual consistency." },
      { name: "Caching & Performance", description: "Design multi-layer caching strategies with Redis, Memcached, and CDN. Implement cache invalidation patterns, query result caching, and edge computing for low-latency reads at scale." },
      { name: "Security Engineering", description: "Implement OAuth 2.0, JWT, mTLS, and RBAC systems. Defend against OWASP Top 10 vulnerabilities. Conduct threat modeling and security reviews for new features." },
    ],
    tips: [
      { title: "Lead With Scale Numbers", content: "Backend value is in scale: requests per second handled, database size managed, latency targets achieved, and uptime maintained. 'Built API serving 50M daily requests at p99 latency under 100ms' is immediately credible." },
      { title: "Show Production Debugging Skills", content: "Senior backend engineers debug systems under pressure. Mention war stories: 'Diagnosed cascading failure across 12 microservices in production within 30 minutes by correlating distributed traces, identifying root cause as connection pool exhaustion.'" },
      { title: "Demonstrate Cost Awareness", content: "Backend systems are expensive at scale. Include cost optimizations: 'Reduced database costs by 40% through query optimization and read replica utilization while maintaining sub-50ms p99 latency.'" },
    ],
    sampleSummary:
      "Backend developer with 5+ years building distributed systems handling 1B+ daily requests. Designed the payment processing API at [Company] with 99.99% uptime and p99 latency under 80ms. Expert in Go, PostgreSQL, and event-driven architectures with deep production debugging experience and a security-first mindset.",
    keywords: ["backend developer", "API", "REST", "GraphQL", "Node.js", "Python", "Go", "Java", "PostgreSQL", "Redis", "Kafka", "microservices", "distributed systems", "Docker", "Kubernetes"],
    relatedJobs: ["fullstack-developer", "cloud-engineer", "devops-engineer", "data-engineer", "frontend-developer"],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    metaTitle: "Data Analyst Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized data analyst resume with SQL, Tableau, and analytical skills. Templates for 2026 data analyst roles.",
    skills: [
      { name: "Advanced SQL", description: "Write complex analytical SQL with window functions, CTEs, and recursive queries. Optimize query performance across databases including Snowflake, BigQuery, Redshift, and PostgreSQL." },
      { name: "Data Visualization", description: "Build executive dashboards in Tableau, Power BI, or Looker that drive business decisions. Apply data visualization principles to choose appropriate chart types and tell clear data stories." },
      { name: "Statistical Analysis", description: "Apply statistical methods including hypothesis testing, regression analysis, A/B test design, and significance testing. Communicate uncertainty and confidence intervals to non-technical stakeholders." },
      { name: "Python for Analytics", description: "Use Python (pandas, NumPy, scikit-learn) for data cleaning, transformation, and analysis. Build reproducible analytical workflows in Jupyter notebooks with proper version control." },
      { name: "Business Communication", description: "Translate complex analyses into actionable business recommendations. Build executive presentations that connect data findings to revenue, retention, or efficiency outcomes." },
    ],
    tips: [
      { title: "Show Business Impact, Not Just Tools", content: "Listing 'SQL, Python, Tableau' impresses no one — every analyst lists those. What matters is what you discovered and what changed because of it. 'Identified $1.2M in lost revenue from a checkout funnel issue and partnered with engineering to implement fix' shows analyst-level thinking." },
      { title: "Highlight Stakeholder Collaboration", content: "Junior analysts deliver reports. Senior analysts shape product strategy through data. Mention how you worked with PMs, marketers, or executives — the relationships you built and the decisions you influenced." },
      { title: "Include A/B Test Experience", content: "A/B testing expertise differentiates analysts. Describe experiments you designed: hypothesis, sample size calculations, success metrics, and results. 'Designed and analyzed pricing experiment across 200K users that increased ARPU by 12%' is concrete." },
    ],
    sampleSummary:
      "Data analyst with 3+ years driving business decisions through analytics for a 2M-user SaaS product. Built the executive metrics dashboard at [Company] used by C-suite weekly, identifying $3M in optimization opportunities. Expert in SQL, Python, and experimental design with proven ability to translate findings into product strategy.",
    keywords: ["data analyst", "SQL", "Python", "Tableau", "Power BI", "Looker", "data visualization", "statistical analysis", "A/B testing", "Excel", "business intelligence", "dashboards", "ETL", "data modeling", "analytics"],
    relatedJobs: ["data-engineer", "ml-engineer", "product-manager", "financial-analyst", "marketing-manager"],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    metaTitle: "Product Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized product manager resume highlighting strategy, execution, and outcomes. Templates for 2026 PM roles.",
    skills: [
      { name: "Product Strategy", description: "Define product vision and strategy aligned with business objectives. Conduct market analysis, competitive positioning, and opportunity sizing. Build multi-quarter roadmaps balancing strategic bets and incremental wins." },
      { name: "User Research", description: "Plan and conduct discovery research using interviews, surveys, and behavioral analytics. Synthesize qualitative and quantitative findings into product requirements and prioritization decisions." },
      { name: "Data-Driven Decision Making", description: "Define product metrics (north star, input metrics, guardrails). Design A/B tests, analyze results in tools like Amplitude or Mixpanel, and use data to validate or invalidate product hypotheses." },
      { name: "Stakeholder Management", description: "Align engineering, design, marketing, sales, and executive stakeholders around shared product priorities. Communicate trade-offs, manage expectations, and maintain trust through consistent execution." },
      { name: "Technical Fluency", description: "Engage substantively in technical architecture discussions. Understand API design, database trade-offs, and system constraints well enough to make informed scoping and prioritization decisions." },
    ],
    tips: [
      { title: "Lead With Outcomes, Not Outputs", content: "'Shipped a new feature' is output. 'Increased trial-to-paid conversion from 12% to 19% by redesigning the onboarding flow' is outcome. Senior PM resumes are entirely outcome-focused with metrics that connect to business impact." },
      { title: "Show Cross-Functional Leadership", content: "PMs lead without authority. Highlight how you aligned engineering, design, and go-to-market: 'Led product launch coordinated across 3 engineering teams, design, marketing, and sales, hitting GA date with 99% feature completeness.'" },
      { title: "Include Difficult Decisions", content: "PMs say no constantly. Mention prioritization decisions: 'Killed feature in beta after data showed adoption below threshold, reallocating engineering resources to payments redesign that drove 25% revenue lift.' This shows judgment." },
    ],
    sampleSummary:
      "Product manager with 5 years driving B2B SaaS products from idea to scale. Owned the analytics product line at [Company] generating $8M ARR, leading product strategy, roadmap, and execution across 12 engineers and 3 designers. Strong in user research, experimentation, and translating customer problems into shippable solutions.",
    keywords: ["product manager", "product management", "product strategy", "roadmap", "user research", "A/B testing", "agile", "scrum", "stakeholder management", "data-driven", "OKRs", "MVP", "product analytics", "SaaS", "go-to-market"],
    relatedJobs: ["project-manager", "ux-designer", "data-analyst", "marketing-manager", "fullstack-developer"],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    metaTitle: "Project Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized project manager resume with PMP, agile, and execution skills. Professional templates for project management roles in 2026.",
    skills: [
      { name: "Project Planning & Execution", description: "Define project scope, deliverables, timelines, and resource requirements. Build project plans in MS Project, Smartsheet, or Asana. Manage critical path, dependencies, and milestone tracking." },
      { name: "Agile & Scrum", description: "Lead agile ceremonies including sprint planning, daily standups, retrospectives, and reviews. Coach teams on agile principles, manage backlogs, and track velocity for predictable delivery." },
      { name: "Risk Management", description: "Identify, assess, and mitigate project risks proactively. Build risk registers, develop contingency plans, and communicate risks transparently to executive stakeholders." },
      { name: "Stakeholder Communication", description: "Manage communication across engineering, business, and executive stakeholders. Build status reports, dashboards, and steering committee presentations that drive timely decisions." },
      { name: "Budget & Resource Management", description: "Manage project budgets ($100K to $10M+), track burn rates, and forecast resource needs. Negotiate vendor contracts and manage external resource allocation." },
    ],
    tips: [
      { title: "Quantify Project Scope and Outcomes", content: "Project managers are measured by delivery. Include: project budgets ($X), timelines (delivered ahead of/on schedule), team sizes (managed cross-functional teams of N), and outcomes (launched feature generating $Y revenue or saving Z hours)." },
      { title: "Highlight Difficult Recoveries", content: "Anyone can manage a project that goes smoothly. The best PMs recover from disasters. 'Took over failing 18-month transformation project at month 14, restructured scope, and delivered MVP within 3 months' demonstrates real leadership." },
      { title: "List Certifications Prominently", content: "Project management is certification-driven. Place PMP, PRINCE2, SAFe Agilist, or CSM near the top. For senior roles, PMP is often a hard requirement. If you're studying for one, include 'Expected [date]' to show progression." },
    ],
    sampleSummary:
      "PMP-certified project manager with 7+ years delivering enterprise software projects. Led the digital transformation program at [Company] (15 workstreams, $3M budget, 40+ stakeholders) delivering 6 months ahead of schedule. Expert in agile methodologies, risk management, and executive stakeholder communication.",
    keywords: ["project manager", "PMP", "PRINCE2", "agile", "scrum", "kanban", "project planning", "risk management", "stakeholder management", "budget management", "Jira", "MS Project", "Smartsheet", "PMO", "delivery"],
    relatedJobs: ["product-manager", "solutions-architect", "devops-engineer", "marketing-manager", "hr-manager"],
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    metaTitle: "Financial Analyst Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized financial analyst resume with modeling, FP&A, and analytical skills. Templates for finance roles in 2026.",
    skills: [
      { name: "Financial Modeling", description: "Build complex financial models including DCF, LBO, M&A accretion/dilution, and three-statement models. Apply scenario analysis, sensitivity testing, and Monte Carlo simulation for decision support." },
      { name: "FP&A & Forecasting", description: "Lead annual budgeting, quarterly forecasting, and monthly variance analysis. Build driver-based forecasting models that link operational metrics to financial outcomes." },
      { name: "Advanced Excel & SQL", description: "Master advanced Excel including arrays, Power Query, Power Pivot, and VBA. Write SQL to extract financial data directly from data warehouses and ERP systems for analysis." },
      { name: "Data Visualization", description: "Build executive financial dashboards in Tableau, Power BI, or Looker. Translate complex financial data into clear visualizations that drive C-suite decisions." },
      { name: "Business Partnering", description: "Partner with operating teams (sales, marketing, ops) to provide financial insights, support decision-making, and challenge assumptions in proposed investments and initiatives." },
    ],
    tips: [
      { title: "Quantify Your Modeling Impact", content: "Financial models are means, not ends. What did your models enable? 'Built acquisition model that informed $50M investment decision' or 'Pricing model identified $2M annual margin opportunity through SKU rationalization.' Connect modeling to outcomes." },
      { title: "Show Both Technical and Communication Skills", content: "Senior financial analysts translate numbers for non-financial audiences. Mention executive presentations delivered, board materials prepared, and how you simplified complex financial concepts for operational leaders." },
      { title: "Highlight Process Improvements", content: "Finance teams value efficiency. 'Automated monthly close process from 8 days to 3 days' or 'Built self-service forecasting tool eliminating 20 hours/week of recurring requests.' Show that you scale your impact through systems." },
    ],
    sampleSummary:
      "Financial analyst with 4+ years in FP&A supporting a $500M revenue business unit. Built the long-range planning model used to set company-wide annual targets at [Company]. Expert in financial modeling, SQL-based analytics, and executive presentation. Strong business partner to sales and product leadership with a track record of identifying margin improvement opportunities.",
    keywords: ["financial analyst", "FP&A", "financial modeling", "DCF", "Excel", "VBA", "SQL", "Tableau", "forecasting", "budgeting", "variance analysis", "GAAP", "valuation", "M&A", "business analyst"],
    relatedJobs: ["data-analyst", "accountant", "product-manager", "project-manager", "marketing-manager"],
  },
  {
    slug: "hr-manager",
    title: "HR Manager",
    metaTitle: "HR Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized HR manager resume with talent acquisition, employee relations, and compliance skills. Templates for 2026 HR roles.",
    skills: [
      { name: "Talent Acquisition", description: "Lead full-cycle recruiting from sourcing through offer negotiation. Partner with hiring managers on workforce planning, build inclusive interview processes, and reduce time-to-hire while improving candidate quality." },
      { name: "Employee Relations", description: "Investigate workplace concerns, mediate conflicts, and conduct performance management conversations. Build manager capability through training and coaching on difficult employee conversations." },
      { name: "Compensation & Benefits", description: "Design compensation philosophies, conduct market analysis, and lead annual merit/bonus cycles. Manage benefits programs including health, retirement, and equity in compliance with regulations." },
      { name: "HR Analytics", description: "Build people analytics dashboards tracking headcount, retention, engagement, diversity, and recruiting funnel metrics. Use data to identify trends and drive evidence-based HR strategy." },
      { name: "Compliance & Policy", description: "Maintain compliance with FLSA, FMLA, EEO, ADA, and state-specific employment law. Develop and update employee handbooks, conduct compliance training, and respond to regulatory inquiries." },
    ],
    tips: [
      { title: "Quantify People Outcomes", content: "HR impact is increasingly measurable. Include: voluntary turnover reduction (from X% to Y%), time-to-fill improvements, employee engagement score increases, diversity hiring metrics, and recruiting funnel conversion rates." },
      { title: "Show Strategic Business Partnership", content: "Modern HR is a strategic function, not an administrative one. Highlight how you partnered with business leaders on org design, succession planning, and talent strategy that supported business objectives." },
      { title: "Include Difficult Situations Handled", content: "HR managers navigate complex situations regularly. Mention experiences: 'Led RIF affecting 12% of workforce with zero litigation through transparent communication and respectful execution' or 'Managed harassment investigation reaching satisfactory resolution within 3 weeks.'" },
    ],
    sampleSummary:
      "HR manager with 6+ years building people functions for high-growth SaaS companies. Led HR for a 250-person engineering org at [Company], reducing voluntary turnover from 18% to 9% through manager training and compensation restructuring. SHRM-CP certified with deep expertise in talent acquisition, employee relations, and HR analytics.",
    keywords: ["HR manager", "human resources", "talent acquisition", "employee relations", "compensation", "benefits", "HRIS", "Workday", "performance management", "employee engagement", "DEI", "compliance", "SHRM", "PHR", "onboarding"],
    relatedJobs: ["project-manager", "marketing-manager", "product-manager", "financial-analyst", "data-analyst"],
  },
  {
    slug: "software-engineer",
    title: "Software Engineer",
    metaTitle: "Software Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized software engineer resume with system design, coding, and engineering skills. Templates for 2026 SWE roles.",
    skills: [
      { name: "Software Design & Architecture", description: "Design clean, maintainable, and testable code following SOLID principles. Make architectural decisions about service boundaries, data modeling, and abstraction layers that scale with the codebase." },
      { name: "Algorithms & Data Structures", description: "Apply algorithmic thinking to optimize performance bottlenecks. Choose appropriate data structures for problem characteristics and analyze time/space complexity of design choices." },
      { name: "System Design", description: "Design scalable systems handling millions of users. Reason about trade-offs in consistency vs. availability, sync vs. async, and monolith vs. microservices for production-grade systems." },
      { name: "Code Quality & Testing", description: "Write production-grade code with comprehensive test coverage. Apply TDD where appropriate, implement integration and end-to-end tests, and maintain high code quality through code review." },
      { name: "Cross-Functional Collaboration", description: "Partner effectively with product managers, designers, and other engineers. Communicate technical trade-offs to non-technical stakeholders and contribute to product decisions beyond code." },
    ],
    tips: [
      { title: "Show Engineering Judgment", content: "Senior engineers are paid for judgment, not code volume. Highlight architectural decisions: 'Recommended monolith over microservices for new product line, reducing operational complexity for 4-engineer team while maintaining ability to extract services later.' Trade-off thinking signals seniority." },
      { title: "Include Technical Leadership Without a Manager Title", content: "You don't need to be a manager to show leadership. Mention: technical proposals you authored, junior engineers you mentored, code reviews where you raised the team's standards, and cross-team initiatives you drove." },
      { title: "Quantify Technical Impact", content: "Engineering impact is measurable when you look for it. Include: incidents prevented, system reliability improvements, performance optimizations (latency, throughput), code coverage improvements, and feature velocity changes from architectural changes." },
    ],
    sampleSummary:
      "Software engineer with 6 years building production distributed systems serving 10M+ users. Led the migration to event-driven architecture at [Company], reducing checkout latency by 60% while doubling order throughput. Strong in system design, code quality, and mentoring with experience across Go, Python, and TypeScript stacks.",
    keywords: ["software engineer", "software development", "system design", "algorithms", "data structures", "Python", "Java", "Go", "JavaScript", "distributed systems", "microservices", "API", "database", "git", "code review"],
    relatedJobs: ["fullstack-developer", "backend-developer", "frontend-developer", "cloud-engineer", "ai-engineer"],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    metaTitle: "Marketing Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized marketing manager resume with strategy, growth, and analytics skills. Templates for 2026 marketing roles.",
    skills: [
      { name: "Marketing Strategy", description: "Develop integrated marketing strategies aligned with revenue goals. Conduct competitive analysis, define customer segments, and build multi-channel campaigns across paid, owned, and earned media." },
      { name: "Growth Marketing", description: "Run experiments across acquisition channels (SEO, paid search, social, content, affiliate). Build attribution models, optimize CAC and payback periods, and identify growth levers through data analysis." },
      { name: "Content & SEO", description: "Build content marketing programs that drive organic traffic and conversions. Conduct keyword research, optimize for search intent, and measure content ROI through pipeline attribution." },
      { name: "Marketing Analytics", description: "Build marketing dashboards in GA4, Mixpanel, or Amplitude tracking funnel performance, campaign ROI, and customer journey analytics. Connect marketing activity to revenue outcomes." },
      { name: "Brand & Positioning", description: "Develop brand positioning, messaging frameworks, and visual identity systems. Conduct customer research to validate positioning and brand-build through consistent execution across touchpoints." },
    ],
    tips: [
      { title: "Lead With Pipeline and Revenue Numbers", content: "Marketing managers are measured by pipeline contribution. Include: MQLs/SQLs generated, pipeline sourced ($X), CAC reduction, and revenue attribution. 'Drove 40% of pipeline through demand generation programs' is the language CMOs speak." },
      { title: "Show Channel Diversification", content: "Senior marketers diversify channels. Highlight experience across paid acquisition (Google, Meta, LinkedIn), organic (SEO, content), email, and partnerships. Don't be a one-channel specialist if you want strategic roles." },
      { title: "Include Experimentation Methodology", content: "Marketing is increasingly experimental. Describe how you test: hypothesis frameworks, sample size considerations, statistical significance, and iteration cycles. 'Ran 47 marketing experiments quarterly with 35% lift over baseline' shows rigor." },
    ],
    sampleSummary:
      "Marketing manager with 5+ years driving B2B SaaS growth from $3M to $15M ARR. Built and led the demand generation function at [Company], generating 65% of new business pipeline through integrated campaigns. Expert in performance marketing, content strategy, and marketing analytics with experience across SEO, paid acquisition, and ABM.",
    keywords: ["marketing manager", "growth marketing", "demand generation", "content marketing", "SEO", "SEM", "Google Ads", "Meta Ads", "marketing analytics", "GA4", "HubSpot", "Salesforce", "brand", "campaign management", "ABM"],
    relatedJobs: ["product-manager", "data-analyst", "project-manager", "ux-designer", "hr-manager"],
  },
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    metaTitle: "Registered Nurse Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized registered nurse resume with clinical, patient care, and EMR skills. Professional templates for 2026 nursing roles.",
    skills: [
      { name: "Patient Care & Assessment", description: "Conduct comprehensive patient assessments including vital signs, symptom evaluation, and pain management. Develop and implement individualized care plans across diverse patient populations and acuity levels." },
      { name: "Electronic Health Records (EHR)", description: "Document patient care accurately in Epic, Cerner, or Meditech systems. Maintain HIPAA-compliant documentation supporting clinical decision-making, billing, and quality reporting." },
      { name: "Medication Administration", description: "Safely administer medications via oral, IV, IM, and subcutaneous routes following the Five Rights of medication administration. Monitor for adverse reactions and educate patients on medication regimens." },
      { name: "Critical Thinking & Crisis Response", description: "Recognize early signs of patient deterioration and respond appropriately. Lead rapid response and code situations following ACLS protocols. Triage based on acuity in fast-paced environments." },
      { name: "Interdisciplinary Collaboration", description: "Coordinate care with physicians, specialists, social workers, and discharge planners. Advocate for patient needs in interdisciplinary rounds and family meetings." },
    ],
    tips: [
      { title: "Quantify Patient Care Volume and Outcomes", content: "Nursing impact is concrete. Include: patient load (cared for 8+ patients per shift in med-surg), unit acuity (managed 4-6 ICU patients with ventilators), and quality outcomes (reduced unit fall rate by 30% as charge nurse, achieved 100% medication reconciliation compliance)." },
      { title: "Highlight Specialty Certifications", content: "Nursing is certification-rich. List BLS, ACLS, PALS, CCRN, CEN, or specialty certifications prominently. Magnet hospitals and specialty units actively seek certified nurses, and these certifications often determine eligibility for premium pay." },
      { title: "Include Quality Improvement Work", content: "Beyond bedside care, hospitals value nurses who improve systems. Mention QI projects: 'Led unit-based initiative reducing CAUTI rate by 60% through evidence-based catheter removal protocols' or 'Served on hospital-wide patient experience committee.'" },
    ],
    sampleSummary:
      "BSN-prepared, CCRN-certified registered nurse with 5 years of ICU experience caring for ventilated, hemodynamically unstable patients. Reduced unit pressure injury rate by 40% as ICU shift charge nurse at [Hospital]. Expert in critical care assessment, Epic documentation, and ACLS/PALS-led code response with strong interdisciplinary collaboration skills.",
    keywords: ["registered nurse", "RN", "BSN", "patient care", "Epic", "Cerner", "EHR", "ICU", "med-surg", "BLS", "ACLS", "PALS", "CCRN", "patient assessment", "medication administration"],
    relatedJobs: ["teacher", "hr-manager", "project-manager", "marketing-manager", "accountant"],
  },
  {
    slug: "teacher",
    title: "Teacher",
    metaTitle: "Teacher Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Build an ATS-optimized teacher resume with classroom management, curriculum, and instructional skills. Templates for 2026 teaching roles.",
    skills: [
      { name: "Curriculum Development", description: "Design standards-aligned curriculum and lesson plans incorporating differentiated instruction strategies. Develop assessments measuring student understanding and adjust pacing based on data." },
      { name: "Classroom Management", description: "Establish positive classroom culture through clear expectations, restorative practices, and trauma-informed approaches. Manage diverse learning needs in inclusive classrooms with consistent behavioral systems." },
      { name: "Differentiated Instruction", description: "Adapt instruction for students with IEPs, 504 plans, English language learners, and gifted learners. Implement Universal Design for Learning principles to ensure accessibility for all students." },
      { name: "Educational Technology", description: "Integrate technology tools including Google Classroom, Canvas, Schoology, and digital learning platforms. Use data analytics from assessment platforms to inform instructional decisions." },
      { name: "Family & Community Engagement", description: "Build strong partnerships with families through regular communication, conferences, and home visits. Engage community resources to support student academic and social-emotional development." },
    ],
    tips: [
      { title: "Quantify Student Outcomes", content: "Teaching impact is measurable. Include: average student growth (X% on standardized assessments), proficiency improvements (from Y% to Z% meeting standards), graduation rates, AP exam pass rates, or college acceptance rates for senior advisees." },
      { title: "Highlight Leadership Beyond Teaching", content: "Schools value teacher leaders. Mention: department chair roles, mentoring new teachers, leading curriculum committees, organizing extracurriculars, or piloting school-wide initiatives. Leadership signals readiness for instructional coach or administrator roles." },
      { title: "Include Specific Methodologies", content: "Generic 'used research-based strategies' impresses no one. Name specific approaches: 'Implemented Reading Workshop model with conferring notes for 28 students' or 'Used CGI math problem-solving framework with daily number talks.' Specificity demonstrates expertise." },
    ],
    sampleSummary:
      "Licensed teacher with 7 years of K-5 elementary education experience and a Master's in Curriculum & Instruction. Increased student reading proficiency from 64% to 89% over two years at [School] through structured literacy instruction and small-group differentiation. Department lead for ELA, mentor teacher for two new educators, and integrator of technology in literacy instruction.",
    keywords: ["teacher", "elementary education", "secondary education", "curriculum development", "classroom management", "differentiated instruction", "lesson planning", "IEP", "504", "Google Classroom", "Common Core", "assessment", "literacy", "STEM", "PBIS"],
    relatedJobs: ["registered-nurse", "hr-manager", "project-manager", "marketing-manager", "ux-designer"],
  },
  {
    slug: "accountant",
    title: "Accountant",
    metaTitle: "Accountant Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription:
      "Create an ATS-optimized accountant resume with GAAP, audit, and reporting skills. Templates for 2026 accounting roles.",
    skills: [
      { name: "Financial Reporting (GAAP/IFRS)", description: "Prepare financial statements in accordance with US GAAP or IFRS standards. Lead month-end and quarter-end close processes, journal entries, account reconciliations, and consolidation work." },
      { name: "Audit & Internal Controls", description: "Conduct internal audits, support external audit engagements, and ensure SOX compliance. Document and test internal controls following COSO framework. Identify control gaps and recommend remediation." },
      { name: "Tax Compliance & Planning", description: "Prepare federal, state, and local tax returns for individuals or businesses. Conduct tax research, manage tax provisions, and identify tax planning opportunities to minimize liability legally." },
      { name: "ERP & Accounting Software", description: "Operate enterprise systems including NetSuite, SAP, Oracle, QuickBooks, and Workday Financials. Configure chart of accounts, automate workflows, and extract data for analysis and reporting." },
      { name: "Advanced Excel & Analysis", description: "Build complex analytical models in Excel with Power Query, Power Pivot, and array formulas. Analyze account variances, prepare forecasts, and produce management reports with actionable insights." },
    ],
    tips: [
      { title: "Lead With Certifications and Education", content: "Accounting is credential-driven. Place CPA, CMA, CIA, or EA prominently. List Big 4 audit experience or specific certifications like FRM for finance roles. For senior positions, CPA is often a hard requirement — note 'CPA Eligible' or 'Currently sitting' if in progress." },
      { title: "Quantify Process Improvements", content: "Senior accountants improve processes. Include: 'Reduced month-end close from 8 days to 4 days through journal entry automation' or 'Identified $400K in tax savings through R&D credit analysis' or 'Led NetSuite implementation across 5 entities completing on schedule and under budget.'" },
      { title: "Show Technology Proficiency", content: "Modern accounting is increasingly technical. Mention: SQL for data extraction, Power BI/Tableau for reporting, Python/UiPath for automation, RPA experience, or specific ERP implementation work. Tech-fluent accountants command premium compensation." },
    ],
    sampleSummary:
      "CPA-licensed senior accountant with 5+ years of corporate accounting experience including Big 4 audit background. Led the financial close process at [Company] reducing close time from 9 days to 5 days through automation and process redesign. Expert in US GAAP, SOX compliance, and NetSuite with strong technical proficiency including SQL and Power BI for financial analytics.",
    keywords: ["accountant", "CPA", "GAAP", "IFRS", "financial reporting", "audit", "SOX", "tax", "NetSuite", "SAP", "QuickBooks", "Excel", "general ledger", "month-end close", "reconciliation"],
    relatedJobs: ["financial-analyst", "data-analyst", "project-manager", "hr-manager", "marketing-manager"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    metaTitle: "Data Scientist Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized data scientist resume with ML, statistics, and Python skills. Templates for 2026 data science roles.",
    skills: [
      { name: "Statistical Modeling", description: "Apply hypothesis testing, regression, Bayesian inference, and causal analysis to extract insights from messy data. Communicate uncertainty and statistical significance to non-technical stakeholders." },
      { name: "Machine Learning", description: "Build supervised, unsupervised, and reinforcement learning models using scikit-learn, XGBoost, and PyTorch. Tune hyperparameters with Optuna and validate with cross-validation strategies appropriate to data structure." },
      { name: "Experimentation Design", description: "Design A/B tests with proper sample size calculations, randomization checks, and multiple-testing corrections. Analyze results using frequentist and Bayesian frameworks. Build experimentation platforms used by product teams." },
      { name: "Data Engineering for Analysis", description: "Write production-quality SQL across petabyte-scale warehouses. Build feature pipelines in Spark, dbt, or Pandas. Handle missing data, outliers, and class imbalance with rigorous methodology." },
      { name: "Storytelling with Data", description: "Create executive-ready visualizations using Tableau, Plotly, or matplotlib. Translate complex models into business recommendations. Build interactive dashboards that drive product and strategic decisions." },
    ],
    tips: [
      { title: "Lead With Business Impact", content: "Data scientists who get hired connect models to revenue. 'Built churn prediction model reducing customer attrition by 18%, saving $4M annually' beats 'Achieved 0.92 AUC on holdout set.' Always include the downstream metric your work moved." },
      { title: "Show Production-Grade Work", content: "Notebooks alone don't ship. Mention models you deployed, monitored, and iterated on. Reference experiment platforms you built or extended. Production experience separates senior data scientists from analysts with Python skills." },
      { title: "Demonstrate Statistical Rigor", content: "Hiring managers test for statistical thinking. Show you understand: when not to use ML (sometimes a regression beats a neural net), how to handle confounders in observational data, when correlation does and does not imply causation." },
    ],
    sampleSummary: "Data scientist with 4+ years building production ML systems. Led the recommendation engine redesign at [Company] driving a 23% lift in click-through rate across 5M monthly users. Strong in causal inference, experimental design, and production ML deployment with proven ability to translate ambiguous business problems into measurable outcomes.",
    keywords: ["data scientist", "machine learning", "Python", "R", "SQL", "statistics", "A/B testing", "Pandas", "scikit-learn", "TensorFlow", "PyTorch", "Tableau", "experimentation", "causal inference", "deep learning"],
    relatedJobs: ["ml-engineer", "data-analyst", "data-engineer", "ai-engineer", "product-manager"],
  },
  {
    slug: "mobile-developer",
    title: "Mobile Developer",
    metaTitle: "Mobile Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized mobile developer resume with iOS, Android, and cross-platform skills. Templates for 2026 mobile roles.",
    skills: [
      { name: "iOS Development (Swift)", description: "Build native iOS applications using Swift, SwiftUI, and Combine. Master UIKit for legacy support, implement complex animations with Core Animation, and integrate platform features (HealthKit, ARKit, WidgetKit)." },
      { name: "Android Development (Kotlin)", description: "Develop native Android apps with Kotlin, Jetpack Compose, and Coroutines. Apply Material Design 3, manage app architecture with MVVM/MVI, and integrate Android-specific features (WorkManager, Room, DataStore)." },
      { name: "App Performance Optimization", description: "Profile apps using Xcode Instruments and Android Studio Profiler. Reduce cold-start time, optimize memory footprint, and minimize battery drain. Implement lazy loading, image caching, and view recycling for smooth UI." },
      { name: "App Store Operations", description: "Manage App Store Connect and Google Play Console workflows. Handle app review submissions, beta testing via TestFlight/Play Internal, phased rollouts, and crash report triage." },
      { name: "Mobile Backend Integration", description: "Integrate REST and GraphQL APIs with proper retry logic, caching, and offline support. Implement push notifications (APNs/FCM), deep linking, biometric authentication, and in-app purchases." },
    ],
    tips: [
      { title: "Quantify App Reach", content: "Include user-facing metrics: download counts, MAU/DAU, app store rating, retention curves. 'Maintained 4.7-star rating across 500K+ monthly users' is more credible than 'Built mobile apps.'" },
      { title: "Show Platform Awareness", content: "The best mobile devs understand both iOS and Android conventions even if specializing. Mention the differences you've navigated: HIG vs. Material Design, lifecycle differences, App Store vs. Play Store policies." },
      { title: "Highlight Crash-Free Sessions", content: "Reliability matters in mobile. 'Improved crash-free sessions from 99.2% to 99.85% by implementing structured error handling and Sentry integration' is concrete production work." },
    ],
    sampleSummary: "Mobile developer with 5 years shipping native iOS and Android applications used by 1M+ monthly users. Led the architecture redesign at [Company] reducing app launch time by 60% and improving crash-free sessions to 99.9%. Expert in Swift, Kotlin, and modern declarative UI frameworks (SwiftUI, Jetpack Compose).",
    keywords: ["mobile developer", "iOS", "Android", "Swift", "Kotlin", "SwiftUI", "Jetpack Compose", "UIKit", "Xcode", "Android Studio", "App Store", "Play Store", "mobile architecture", "REST", "push notifications"],
    relatedJobs: ["flutter-developer", "frontend-developer", "fullstack-developer", "ai-engineer", "ux-designer"],
  },
  {
    slug: "game-developer",
    title: "Game Developer",
    metaTitle: "Game Developer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized game developer resume with Unity, Unreal, and C++ skills. Templates for 2026 game industry roles.",
    skills: [
      { name: "Game Engine Mastery", description: "Build production games in Unity (C#) or Unreal Engine (C++/Blueprints). Implement gameplay systems, custom shaders, particle effects, and runtime physics. Optimize for target platforms (PC, console, mobile)." },
      { name: "Gameplay Programming", description: "Design and implement game mechanics, AI behaviors, state machines, and combat systems. Apply design patterns (ECS, observer, command) to maintain code quality across long-running projects." },
      { name: "Graphics & Shaders", description: "Write HLSL/GLSL shaders for custom visual effects. Optimize draw calls, batching, and LOD systems. Understand rendering pipelines, lighting models, and post-processing for art-driven studios." },
      { name: "Multiplayer Networking", description: "Implement client-server and peer-to-peer networking using Mirror, Photon, or Unreal's replication system. Handle latency compensation, anti-cheat, and authoritative server architecture for competitive games." },
      { name: "Performance Profiling", description: "Profile CPU/GPU usage on target hardware. Eliminate frame-rate drops through draw call batching, texture atlasing, and async loading. Hit platform-specific certification requirements." },
    ],
    tips: [
      { title: "Link Shipped Games", content: "Game devs are evaluated on what shipped. Include links to released titles on Steam, App Store, or itch.io. Note your specific contributions ('Owned the inventory system', 'Built the boss AI for chapters 4-7'). Generic 'worked on game' bullets are useless." },
      { title: "Show Cross-Discipline Collaboration", content: "Games are interdisciplinary. Mention how you worked with artists (asset pipeline, performance budget), designers (rapid prototyping, balancing), audio (event triggers, mixing). Engineers who collaborate ship better games." },
      { title: "Include Performance Numbers", content: "Hitting 60fps on a Switch is impressive. Quantify: 'Maintained 60fps on PS5 with 50K-particle scenes by implementing GPU instancing' or 'Reduced load time from 18s to 3s through async streaming.'" },
    ],
    sampleSummary: "Game developer with 6 years of Unity and C# experience shipping 4 commercial titles totaling 2M+ Steam wishlists. Owned the combat and AI systems for [Game] (Mostly Positive on Steam). Strong in gameplay programming, performance optimization (60fps consistent on PS5/Xbox), and shader authoring.",
    keywords: ["game developer", "Unity", "Unreal Engine", "C++", "C#", "gameplay programming", "shaders", "HLSL", "physics", "AI", "networking", "multiplayer", "Steam", "console", "performance optimization"],
    relatedJobs: ["mobile-developer", "ai-engineer", "frontend-developer", "ux-designer", "software-engineer"],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    metaTitle: "QA Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized QA engineer resume with automation, testing frameworks, and CI/CD skills. Templates for 2026 QA roles.",
    skills: [
      { name: "Test Automation", description: "Design and maintain automation frameworks using Playwright, Cypress, Selenium, or Appium. Implement page object models, fixtures, and parallel execution for reliable, fast test suites." },
      { name: "API Testing", description: "Validate REST and GraphQL APIs with Postman, RestAssured, or supertest. Write contract tests using Pact, perform load testing with k6 or JMeter, and verify backwards compatibility across versions." },
      { name: "Test Strategy & Planning", description: "Define test strategies covering functional, performance, security, and accessibility testing. Build test plans aligned with risk and product priorities. Drive shift-left testing practices across engineering teams." },
      { name: "CI/CD Integration", description: "Integrate automated tests into GitHub Actions, GitLab CI, or Jenkins pipelines. Implement quality gates, flaky test detection, and parallel test execution. Build dashboards tracking test health and coverage trends." },
      { name: "Bug Triage & Reporting", description: "Reproduce, isolate, and document bugs with clear repro steps, severity classification, and supporting artifacts. Manage defect lifecycle in Jira or Linear and drive resolution through engineering teams." },
    ],
    tips: [
      { title: "Quantify Bug Impact", content: "QA value is measurable: bugs caught pre-release vs. escaped, automation coverage percentage, reduction in regression cycle time. 'Automated regression suite reduced release validation from 5 days to 4 hours' is concrete value." },
      { title: "Show You Improve Quality, Not Just Find Bugs", content: "Senior QA engineers prevent bugs through process improvement, not just detection. Mention test plan reviews you led, definition-of-done improvements, or developer testing practices you enabled." },
      { title: "Highlight Domain Expertise", content: "QA in fintech ≠ QA in gaming. Mention domains you've tested deeply (payments, healthcare, real-time systems). Domain knowledge often matters more than tool familiarity." },
    ],
    sampleSummary: "QA engineer with 5 years building test automation for B2B SaaS products. Designed and maintained the Cypress automation suite at [Company] covering 850+ test cases with 98% reliability. Reduced regression cycle from 4 days to 6 hours through parallel execution and shift-left testing practices that engineering teams adopted.",
    keywords: ["QA engineer", "test automation", "Playwright", "Cypress", "Selenium", "API testing", "Postman", "load testing", "CI/CD", "regression testing", "test strategy", "bug triage", "Jira", "quality assurance", "shift-left"],
    relatedJobs: ["backend-developer", "frontend-developer", "devops-engineer", "sre-engineer", "fullstack-developer"],
  },
  {
    slug: "network-engineer",
    title: "Network Engineer",
    metaTitle: "Network Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized network engineer resume with routing, switching, and SDN skills. Templates for 2026 networking roles.",
    skills: [
      { name: "Routing & Switching", description: "Configure and troubleshoot Cisco, Juniper, and Arista equipment. Master OSPF, BGP, EIGRP, MPLS, and VRRP protocols. Design redundant network topologies meeting strict availability SLAs." },
      { name: "Network Security", description: "Implement firewall policies (Palo Alto, Fortinet), VPN tunnels (IPsec, SSL), and zero-trust architectures. Configure segmentation, ACLs, and DDoS mitigation for enterprise networks." },
      { name: "SD-WAN & Cloud Networking", description: "Design SD-WAN deployments using Cisco Viptela, VMware VeloCloud, or Versa Networks. Configure cloud networking on AWS (Transit Gateway), Azure (Virtual WAN), or GCP (Cloud Interconnect)." },
      { name: "Network Automation", description: "Automate network operations with Ansible, Python, and Terraform. Build event-driven workflows using NetBox for source-of-truth and tools like Nornir for parallel device configuration." },
      { name: "Monitoring & Troubleshooting", description: "Operate network monitoring tools (SolarWinds, ThousandEyes, LibreNMS). Use packet captures (Wireshark, tcpdump) for L2-L7 troubleshooting. Build dashboards tracking latency, packet loss, and throughput." },
    ],
    tips: [
      { title: "Lead With Certifications", content: "Networking is heavily certification-driven. Place CCNP, CCIE, JNCIP, or CompTIA Network+ near the top. For senior roles, CCIE/JNCIE often differentiate. Cloud networking certs (AWS Advanced Networking, Azure AZ-700) are increasingly valued." },
      { title: "Quantify Reliability and Scale", content: "Network impact is measurable: uptime percentage, latency reductions, BGP convergence times, devices managed. 'Maintained 99.999% uptime across 200+ branch sites' immediately establishes credibility." },
      { title: "Show Automation Maturity", content: "The best network engineers in 2026 automate. Mention specific automation: 'Reduced VLAN provisioning from 4 hours to 5 minutes through Ansible playbooks' shows modern operational practice." },
    ],
    sampleSummary: "CCNP-certified network engineer with 7 years operating enterprise networks supporting 5,000+ users across 50 sites. Led the SD-WAN migration at [Company] reducing WAN costs by 40% while improving application performance. Strong in BGP, MPLS, network automation (Ansible/Python), and cloud networking on AWS.",
    keywords: ["network engineer", "Cisco", "Juniper", "BGP", "OSPF", "MPLS", "SD-WAN", "firewall", "VPN", "Ansible", "Wireshark", "CCNP", "CCIE", "network automation", "cloud networking"],
    relatedJobs: ["cloud-engineer", "devops-engineer", "sre-engineer", "cybersecurity-analyst", "solutions-architect"],
  },
  {
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    metaTitle: "Mechanical Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized mechanical engineer resume with CAD, FEA, and manufacturing skills. Templates for 2026 mechanical engineering roles.",
    skills: [
      { name: "CAD & 3D Modeling", description: "Design parts and assemblies using SolidWorks, CATIA, or Autodesk Inventor. Apply GD&T (geometric dimensioning and tolerancing), manage configurations, and produce manufacturing-ready drawings meeting ASME Y14.5 standards." },
      { name: "Finite Element Analysis", description: "Perform structural, thermal, and fluid simulations using ANSYS, Abaqus, or SolidWorks Simulation. Validate models against physical testing and apply mesh refinement strategies to balance accuracy and compute cost." },
      { name: "Design for Manufacturability", description: "Optimize designs for injection molding, sheet metal, machining, or 3D printing constraints. Collaborate with manufacturing engineers to reduce part count, simplify assembly, and lower per-unit costs." },
      { name: "Materials & Tolerancing", description: "Select materials based on mechanical, thermal, and corrosion requirements. Apply tolerance stack-up analysis to ensure assembly fit and function across manufacturing variation." },
      { name: "Project Management", description: "Lead cross-functional product development teams through stage-gate processes. Manage suppliers, prototyping cycles, and design reviews. Track schedules, budgets, and design risks through milestones." },
    ],
    tips: [
      { title: "Quantify Engineering Outcomes", content: "Connect designs to business outcomes: cost reduction per unit, weight savings, performance improvements, time-to-market acceleration. 'Redesigned bracket assembly reducing weight by 22% and material cost by $4.50 per unit at 100K annual volume' is hireable." },
      { title: "Show Cross-Functional Work", content: "Mechanical engineering is collaborative. Mention work with electrical engineers (thermal management of PCBs), industrial designers (DFM for aesthetic surfaces), or manufacturing (PFMEA, process validation)." },
      { title: "Highlight Validated Designs", content: "Industry hires engineers whose designs survive testing. Mention test plans you authored, validation cycles you owned, and any failure modes you discovered and corrected through design iteration." },
    ],
    sampleSummary: "Mechanical engineer with 6 years designing consumer electronics enclosures and thermal systems. Led the cooling redesign at [Company] reducing CPU thermal throttling by 70% while cutting material costs by 18%. Expert in SolidWorks, ANSYS thermal/structural FEA, and design for high-volume injection molding manufacturing.",
    keywords: ["mechanical engineer", "SolidWorks", "CATIA", "ANSYS", "FEA", "GD&T", "CAD", "design for manufacturability", "injection molding", "thermal analysis", "structural analysis", "tolerance stack", "PFMEA", "product development", "ASME"],
    relatedJobs: ["software-engineer", "project-manager", "product-manager", "data-analyst", "financial-analyst"],
  },
  {
    slug: "electrical-engineer",
    title: "Electrical Engineer",
    metaTitle: "Electrical Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized electrical engineer resume with PCB design, embedded systems, and power skills. Templates for 2026 EE roles.",
    skills: [
      { name: "PCB Design", description: "Design multi-layer PCBs using Altium Designer, KiCad, or Cadence Allegro. Apply signal integrity rules, manage impedance-controlled routing, and ensure DFM compliance with assembly partners." },
      { name: "Embedded Systems", description: "Develop firmware in C/C++ for ARM Cortex-M and RISC-V microcontrollers. Implement RTOS-based architectures (FreeRTOS, Zephyr), peripheral drivers, and communication protocols (I2C, SPI, UART, CAN, USB)." },
      { name: "Analog & Power Electronics", description: "Design analog signal conditioning circuits, switching power supplies, and motor drivers. Apply control theory (PID, state-space) to motor control and sensor fusion applications." },
      { name: "Test & Validation", description: "Use oscilloscopes, logic analyzers, spectrum analyzers, and protocol analyzers for hardware debug. Author test plans for EMC compliance (FCC, CE), thermal testing, and functional validation." },
      { name: "Hardware-Software Integration", description: "Bridge hardware and firmware teams through clear interface definitions. Debug issues spanning both domains using JTAG, SWD, and on-target tracing tools. Design hardware to support easy software validation." },
    ],
    tips: [
      { title: "Highlight Shipped Hardware", content: "Show products that reached market. Include link to product, FCC ID, or design portfolio. 'Designed power management subsystem for [Product] (50K units shipped)' is concrete." },
      { title: "Quantify Engineering Decisions", content: "Show trade-offs you made and their impact: BOM cost reductions, efficiency improvements, EMI compliance margins. 'Redesigned switching supply improving efficiency from 78% to 91% at half the BOM cost' demonstrates engineering depth." },
      { title: "Show Cross-Functional Collaboration", content: "Modern hardware development is interdisciplinary. Mention work with mechanical engineers (thermal/enclosure), firmware engineers (interface design), and manufacturing (DFT, process validation)." },
    ],
    sampleSummary: "Electrical engineer with 5+ years designing IoT hardware shipped to 200K+ end users. Owned the PCB and power architecture for [Product] passing FCC/CE certification on first submission. Expert in Altium Designer, embedded firmware (ARM Cortex-M, FreeRTOS), and switching power supply design with strong cross-functional collaboration with mechanical and firmware teams.",
    keywords: ["electrical engineer", "PCB design", "Altium", "KiCad", "embedded systems", "firmware", "ARM Cortex", "FreeRTOS", "power electronics", "analog circuits", "EMC", "signal integrity", "I2C", "SPI", "schematic"],
    relatedJobs: ["mechanical-engineer", "software-engineer", "ai-engineer", "blockchain-developer", "project-manager"],
  },
  {
    slug: "civil-engineer",
    title: "Civil Engineer",
    metaTitle: "Civil Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized civil engineer resume with structural, transportation, and project management skills. Templates for 2026 civil engineering roles.",
    skills: [
      { name: "Structural Analysis & Design", description: "Design steel, concrete, and timber structures per IBC, AISC, and ACI codes. Use SAP2000, ETABS, or RISA for analysis. Produce permit-ready construction documents with detailed connection design." },
      { name: "AutoCAD & Civil 3D", description: "Produce site plans, grading, drainage, and utility designs in AutoCAD Civil 3D. Apply BIM workflows with Revit Structure for coordinated multi-discipline projects with architects and MEP engineers." },
      { name: "Transportation Engineering", description: "Design roadway alignments, intersections, and traffic signal timing per AASHTO and MUTCD. Conduct traffic studies, signal warrant analyses, and capacity analyses using HCS or Synchro." },
      { name: "Geotechnical & Hydrology", description: "Interpret geotechnical reports for foundation design. Perform stormwater drainage analysis using HEC-HMS or HydroCAD. Design detention basins, swales, and erosion control meeting EPA and local jurisdiction requirements." },
      { name: "Construction Administration", description: "Review contractor submittals, respond to RFIs, and conduct site observations. Manage change orders, payment applications, and project closeout documentation. Coordinate with public agencies for permits and inspections." },
    ],
    tips: [
      { title: "Lead With PE License", content: "Professional Engineer (PE) licensure is the gold standard. List it prominently with state. If working toward licensure (EIT/FE passed), list that too. Senior civil roles often require PE." },
      { title: "Quantify Project Scale", content: "Civil projects are concrete (literally). Include: project values ($X million), square footage, traffic counts (ADT), or capacity served. 'Lead structural engineer for $48M mixed-use development with 350K sq ft commercial' establishes scope." },
      { title: "Show Code Knowledge", content: "Civil work is code-driven. Mention specific codes you've designed to (IBC 2024, AISC 360-22, ASCE 7-22) and any code committee involvement. Updated code knowledge signals current professional engagement." },
    ],
    sampleSummary: "Licensed PE (Civil) with 8 years of structural design experience for commercial and mixed-use projects up to $80M. Led structural engineering for [Project], a 12-story Type IIIA mass timber building completed on schedule and budget. Expert in steel and concrete design per IBC/AISC/ACI codes with strong construction administration background.",
    keywords: ["civil engineer", "PE", "structural engineering", "AutoCAD", "Civil 3D", "Revit", "SAP2000", "ETABS", "AISC", "ACI", "IBC", "stormwater", "transportation engineering", "construction documents", "BIM"],
    relatedJobs: ["mechanical-engineer", "project-manager", "solutions-architect", "financial-analyst", "accountant"],
  },
  {
    slug: "pharmacist",
    title: "Pharmacist",
    metaTitle: "Pharmacist Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized pharmacist resume with clinical, dispensing, and patient counseling skills. Templates for 2026 pharmacy roles.",
    skills: [
      { name: "Clinical Pharmacy Practice", description: "Conduct medication therapy management, drug interaction reviews, and dosing optimization for complex patient populations including pediatrics, geriatrics, and oncology. Participate in interdisciplinary rounds with physicians and nurses." },
      { name: "Medication Dispensing & Compounding", description: "Manage prescription verification, sterile and non-sterile compounding per USP <797>/<800> standards, and DEA-controlled substance documentation. Operate pharmacy automation systems (Pyxis, Omnicell, Pyxis ES)." },
      { name: "Patient Counseling & Immunization", description: "Counsel patients on medication adherence, side effects, and lifestyle modifications. Administer vaccinations (immunizer-certified) including flu, COVID, shingles, and travel immunizations following state and CDC guidelines." },
      { name: "Pharmacy Informatics", description: "Configure CPOE order sets, medication reconciliation workflows, and clinical decision support rules. Operate Epic Willow, Cerner Pharmnet, or Meditech for pharmacy module management." },
      { name: "Regulatory Compliance", description: "Ensure compliance with state Board of Pharmacy regulations, FDA requirements, DEA controlled substance handling, USP standards, and Joint Commission accreditation. Lead inspections and corrective action plans." },
    ],
    tips: [
      { title: "List All Pharmacy Credentials", content: "Pharmacy is credential-heavy. Include: PharmD, state RPh license number (or note 'License #XXX'), board certifications (BCPS, BCOP, BCACP), immunization certification, and residency training (PGY1, PGY2)." },
      { title: "Quantify Patient Impact", content: "Pharmacy outcomes are measurable. Include: prescription volume managed, intervention success rates, immunizations administered, MTM consultations completed. 'Provided 800+ MTM consultations annually with 92% adherence improvement at 90 days' is concrete." },
      { title: "Highlight Specialty Experience", content: "Pharmacy specializations command premium roles. If you have specialty rotation or practice experience (oncology, infectious disease, ambulatory care, pediatrics), highlight it prominently with specific protocols and patient populations served." },
    ],
    sampleSummary: "PharmD, BCPS-certified pharmacist with 6 years of acute care hospital experience including PGY1 residency. Led the antimicrobial stewardship program at [Hospital], reducing inappropriate broad-spectrum antibiotic use by 38% over 18 months. Strong in clinical decision support, sterile compounding, and interdisciplinary collaboration with ICU and oncology teams.",
    keywords: ["pharmacist", "PharmD", "RPh", "BCPS", "MTM", "medication therapy management", "Epic Willow", "Pyxis", "USP 797", "DEA", "immunization", "antimicrobial stewardship", "compounding", "PGY1", "clinical pharmacy"],
    relatedJobs: ["registered-nurse", "data-analyst", "project-manager", "hr-manager", "accountant"],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    metaTitle: "Graphic Designer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized graphic designer resume with brand, typography, and Adobe Suite skills. Templates for 2026 design roles.",
    skills: [
      { name: "Brand Identity Design", description: "Develop logo systems, brand guidelines, color palettes, and typography frameworks. Build comprehensive style guides governing visual identity across digital and print touchpoints." },
      { name: "Adobe Creative Suite", description: "Master Photoshop for image manipulation, Illustrator for vector work, InDesign for print layout, and After Effects for motion graphics. Maintain efficient asset libraries and shared style systems." },
      { name: "Typography & Layout", description: "Apply typographic principles (hierarchy, kerning, leading, contrast) to create readable, expressive layouts. Select and pair typefaces appropriate to brand voice and audience context." },
      { name: "Print & Production", description: "Prepare print-ready files with correct color profiles (CMYK, Pantone), bleed/trim marks, and resolution requirements. Coordinate with print vendors on paper stock, finishes, and binding for premium deliverables." },
      { name: "Digital Design & Web Graphics", description: "Design social media graphics, email templates, web banners, and presentation decks aligned with brand systems. Optimize asset file sizes and export across required formats and resolutions." },
    ],
    tips: [
      { title: "Lead With Portfolio Link", content: "Graphic design is a portfolio-first profession. Place a portfolio URL prominently at the top of your resume. Curate 6-10 strongest pieces showing range. Generic 'creative professional' bullets lose to evidence of actual work." },
      { title: "Show Strategy, Not Just Aesthetics", content: "Senior designers communicate strategy. Mention discovery work, audience research, and rationale behind design choices. 'Redesigned packaging system across 24 SKUs to clarify product hierarchy, contributing to 14% lift in shelf conversion' shows business thinking." },
      { title: "Quantify Brand Impact", content: "Design impact is measurable: brand awareness lifts, conversion improvements, recognition in design awards, social engagement on creative campaigns. Connect creative work to outcomes." },
    ],
    sampleSummary: "Graphic designer with 5 years building visual identity systems for B2B SaaS and consumer brands. Led the brand refresh at [Company] across logo, web, print, and packaging, contributing to 28% lift in branded search volume over 12 months. Expert in Adobe CC, design systems, and cross-functional collaboration with marketing, product, and external print vendors.",
    keywords: ["graphic designer", "brand identity", "Adobe Creative Suite", "Photoshop", "Illustrator", "InDesign", "typography", "logo design", "print design", "brand guidelines", "design systems", "art direction", "Figma", "color theory", "layout"],
    relatedJobs: ["ux-designer", "marketing-manager", "frontend-developer", "technical-writer", "product-manager"],
  },
  {
    slug: "copywriter",
    title: "Copywriter",
    metaTitle: "Copywriter Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized copywriter resume with brand voice, conversion, and content strategy skills. Templates for 2026 copywriting roles.",
    skills: [
      { name: "Conversion Copywriting", description: "Write landing page, email, and ad copy that drives measurable conversions. Apply frameworks (PAS, AIDA, BAB) tested against control variants in A/B experiments. Measure success through CTR, conversion rate, and revenue attribution." },
      { name: "Brand Voice Development", description: "Define and codify brand voice through tone guidelines, vocabulary lists, and example libraries. Maintain voice consistency across writers and channels through editorial standards and review processes." },
      { name: "Long-Form Content & SEO", description: "Write SEO-optimized blog posts, guides, and pillar pages of 1500-3000 words. Conduct keyword research, satisfy search intent, and structure content for featured snippets and AI Overviews." },
      { name: "Email Marketing", description: "Build nurture sequences, lifecycle campaigns, and broadcast emails. Apply segmentation, personalization, and behavior-triggered automation to drive engagement metrics across cohorts." },
      { name: "Content Strategy", description: "Define editorial calendars, content pillars, and distribution plans aligned with marketing objectives. Audit existing content for performance and gaps. Lead writers and freelance contributors to scaled output." },
    ],
    tips: [
      { title: "Lead With Conversion Numbers", content: "Copywriters are paid for results. Include: conversion lift percentages from copy tests, email open/CTR improvements, search rankings achieved. 'Rewrote checkout copy producing a 31% lift in completion rate ($2.3M annualized revenue)' is hireable." },
      { title: "Show Voice Range", content: "The best copywriters adapt to brands. Mention varied brands you've written for (B2B SaaS, DTC consumer, fintech) showing voice flexibility. Generic 'great writing skills' lose to specific examples of voice work." },
      { title: "Include Process and Research", content: "Senior copywriters research before writing. Mention customer interviews, voice-of-customer mining, competitive teardowns, or behavioral analytics you used to inform copy. Process distinguishes writers who consistently win from one-hit wonders." },
    ],
    sampleSummary: "Copywriter with 5+ years writing conversion copy for B2B SaaS companies from $1M to $20M ARR. Owned landing page copy and email lifecycle for [Company], driving a 47% lift in trial conversion through systematic A/B testing across 18 months. Strong in brand voice development, customer research, and growth-stage content strategy.",
    keywords: ["copywriter", "conversion copy", "landing page", "email marketing", "content strategy", "SEO writing", "brand voice", "B2B copy", "DTC copy", "A/B testing", "VOC research", "editorial", "content marketing", "tone of voice", "growth copy"],
    relatedJobs: ["marketing-manager", "ux-designer", "graphic-designer", "product-manager", "technical-writer"],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    metaTitle: "Social Media Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized social media manager resume with content, community, and analytics skills. Templates for 2026 social roles.",
    skills: [
      { name: "Platform Strategy", description: "Develop platform-specific strategies for LinkedIn, X, Instagram, TikTok, and YouTube. Match content format and cadence to algorithm dynamics, audience behavior, and brand objectives." },
      { name: "Content Production", description: "Plan editorial calendars, brief creators, and produce short-form video, static graphics, and long-form posts. Operate Adobe Premiere, CapCut, or Descript for video editing optimized for each platform." },
      { name: "Community Management", description: "Engage audiences through comments, DMs, and conversations. Moderate communities, escalate sensitive issues, and turn support interactions into advocacy. Build relationships with influencers and superfans." },
      { name: "Paid Social Advertising", description: "Plan and execute paid campaigns on Meta, LinkedIn, TikTok, and X Ads. Build audience segments, manage creative testing, and optimize for cost per acquisition through systematic experimentation." },
      { name: "Analytics & Reporting", description: "Track engagement, reach, growth, and attributed conversions across platforms. Build executive dashboards in Sprout Social, Buffer, or native analytics. Translate metrics into actionable strategy adjustments." },
    ],
    tips: [
      { title: "Quantify Audience Growth", content: "Social impact is concrete: follower growth, engagement rate improvements, reach expansion, share of voice gains. 'Grew LinkedIn following from 12K to 87K in 18 months at 8.4% engagement rate (3x industry benchmark)' speaks volumes." },
      { title: "Show Pipeline/Revenue Attribution", content: "Senior social managers tie work to revenue. Mention attributed pipeline, sales calls sourced, or e-commerce revenue. 'Drove $1.2M attributed pipeline through LinkedIn organic and paid programs' separates strategic operators from posters." },
      { title: "Highlight Crisis Management", content: "Social media managers handle crises. Mention how you've managed PR situations, viral negative moments, or sensitive communications. Composure under pressure is highly valued." },
    ],
    sampleSummary: "Social media manager with 4+ years scaling brand presence for B2B SaaS companies. Built and led LinkedIn-first content strategy at [Company] generating $3M attributed pipeline through organic and paid programs. Expert in short-form video production, community building, and creator collaborations with measurable revenue attribution.",
    keywords: ["social media manager", "LinkedIn", "TikTok", "Instagram", "X", "Meta Ads", "content strategy", "community management", "Sprout Social", "Buffer", "creator economy", "paid social", "engagement", "social analytics", "brand voice"],
    relatedJobs: ["marketing-manager", "copywriter", "graphic-designer", "product-manager", "ux-designer"],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    metaTitle: "Business Analyst Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized business analyst resume with requirements, process, and SQL skills. Templates for 2026 BA roles.",
    skills: [
      { name: "Requirements Elicitation", description: "Conduct stakeholder interviews, workshops, and observation sessions to extract functional and non-functional requirements. Document using BRDs, user stories, and acceptance criteria with full traceability." },
      { name: "Process Modeling", description: "Map current-state and future-state processes using BPMN 2.0, swimlanes, and value-stream mapping. Identify bottlenecks, redundancies, and automation opportunities." },
      { name: "Data Analysis", description: "Write analytical SQL across enterprise data warehouses. Build operational dashboards in Tableau or Power BI. Conduct root-cause analysis using statistical techniques to support decision-making." },
      { name: "Solution Design", description: "Translate business needs into solution designs across enterprise systems (Salesforce, SAP, Workday, ServiceNow). Define integrations, data mappings, and configuration requirements with architects and engineers." },
      { name: "Stakeholder Communication", description: "Bridge business and technical teams through clear documentation, presentations, and facilitation. Manage scope through change control, drive sign-offs, and report progress to executive sponsors." },
    ],
    tips: [
      { title: "Quantify Business Outcomes", content: "BAs are evaluated by outcomes, not artifacts. Include: revenue enabled, cost reduced, processes accelerated. 'Led requirements for order-to-cash redesign reducing average DSO from 47 to 31 days, freeing $8M working capital' is hireable." },
      { title: "Show Methodology Range", content: "Modern BAs flex across waterfall and agile. Mention specific methodologies (BABOK, agile, lean) and tools (Jira, Confluence, Lucidchart, Visio). Tool fluency signals readiness." },
      { title: "List Relevant Certifications", content: "Certifications differentiate. Include CBAP, CCBA, PMI-PBA, Six Sigma (Green/Black Belt), or specific platform certifications (Salesforce Admin, Power BI). Target the certs most valued in your industry." },
    ],
    sampleSummary: "CBAP-certified business analyst with 6+ years bridging business and IT for enterprise transformation programs. Led requirements for the $4M ERP modernization at [Company], delivering on schedule with measurable improvements (40% reduction in invoice processing time). Strong in SQL-based analysis, BPMN process modeling, and Salesforce/SAP solution design.",
    keywords: ["business analyst", "BABOK", "CBAP", "requirements gathering", "BPMN", "SQL", "Tableau", "Power BI", "user stories", "Jira", "Confluence", "process improvement", "Salesforce", "SAP", "stakeholder management"],
    relatedJobs: ["data-analyst", "project-manager", "product-manager", "financial-analyst", "marketing-manager"],
  },
  {
    slug: "biomedical-engineer",
    title: "Biomedical Engineer",
    metaTitle: "Biomedical Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Create an ATS-optimized biomedical engineer resume with medical device, regulatory, and design skills. Templates for 2026 biomed roles.",
    skills: [
      { name: "Medical Device Design", description: "Design Class II/III medical devices following ISO 13485 and FDA QSR. Apply Design Controls (Design Inputs, Outputs, Reviews, V&V) producing complete Design History Files supporting 510(k) and PMA submissions." },
      { name: "Regulatory Affairs", description: "Prepare 510(k) submissions, manage FDA correspondence, and coordinate with international regulatory bodies (CE Mark, MDR, PMDA). Maintain technical files and post-market surveillance per applicable regulations." },
      { name: "Verification & Validation", description: "Author V&V plans, design tests for biocompatibility, sterilization, software per IEC 62304, and human factors per IEC 62366. Execute formal V&V protocols with traceability to design inputs." },
      { name: "CAD & Manufacturing", description: "Design device components in SolidWorks meeting biocompatibility, sterilization, and tolerance requirements. Coordinate with contract manufacturers, validate processes (IQ/OQ/PQ), and support technology transfer." },
      { name: "Clinical Collaboration", description: "Partner with physicians, nurses, and clinical specialists during device development. Conduct usability studies, simulated-use testing, and observe clinical procedures to refine device design and instructions for use." },
    ],
    tips: [
      { title: "Show Regulatory Track Record", content: "Cleared submissions are gold. Include: 510(k) numbers received, CE Mark certifications obtained, design files you owned through audit. Specific regulatory wins separate experienced biomed engineers from new graduates." },
      { title: "Quantify Device Impact", content: "Devices have measurable outcomes. Include: units shipped, patients treated, clinical efficacy improvements, design changes that reduced complaints. 'Led design improvement reducing field complaints by 64% over 18 months across 50K installed units' is concrete." },
      { title: "Highlight Cross-Functional Work", content: "Medical device development is multi-disciplinary. Mention work with clinical (KOL collaboration), regulatory (submission strategy), quality (CAPA management), and manufacturing (process validation)." },
    ],
    sampleSummary: "Biomedical engineer with 7 years of Class II medical device development including 3 successful 510(k) clearances. Led R&D for [Device], a minimally invasive surgical instrument now installed in 200+ hospitals worldwide. Expert in ISO 13485 design controls, IEC 62304 software verification, and cross-functional collaboration with clinical KOLs and regulatory teams.",
    keywords: ["biomedical engineer", "medical device", "FDA 510(k)", "ISO 13485", "design controls", "verification", "validation", "IEC 62304", "IEC 62366", "QSR", "CE Mark", "MDR", "biocompatibility", "SolidWorks", "regulatory"],
    relatedJobs: ["mechanical-engineer", "electrical-engineer", "registered-nurse", "pharmacist", "data-analyst"],
  },
  {
    slug: "sales-engineer",
    title: "Sales Engineer",
    metaTitle: "Sales Engineer Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized sales engineer resume with technical pre-sales, demo, and revenue skills. Templates for 2026 SE roles.",
    skills: [
      { name: "Technical Pre-Sales", description: "Lead discovery, demos, and proof-of-concepts for enterprise B2B software deals. Translate complex product capabilities into prospect-specific business value tied to KPIs and ROI." },
      { name: "Solution Architecture", description: "Design integration architectures connecting your product to customer environments (SSO, data pipelines, APIs). Author solution documents for procurement, security, and architecture review boards." },
      { name: "RFP & Security Reviews", description: "Respond to RFPs, security questionnaires (SIG, CAIQ, SOC 2 reports), and procurement processes. Maintain reusable answer libraries and coordinate cross-functional input from product, security, and legal." },
      { name: "Customer Demos & POCs", description: "Build custom demo environments tailored to prospect data and workflows. Run successful POCs with measurable success criteria, technical milestones, and stakeholder management across champions and detractors." },
      { name: "Revenue Influence", description: "Partner with account executives to advance enterprise opportunities through technical validation. Influence pipeline value, deal size, and win rates through technical credibility and consultative selling." },
    ],
    tips: [
      { title: "Lead With Revenue Influenced", content: "Sales engineers are revenue partners. Include: pipeline supported, deals won (with deal sizes), win rate contribution, ARR impact. 'Supported $14M in closed-won enterprise deals last year as primary technical contact' is hireable." },
      { title: "Show Technical Depth", content: "SEs need real technical credibility. Mention specific technologies you implement, integrations you build, and code you write (often Python, SQL, or product SDK). Technical depth separates SEs from sales support." },
      { title: "Highlight Industry Expertise", content: "SEs in fintech ≠ SEs in data infra. Mention industries where you have deep domain knowledge (financial services, healthcare, retail). Domain fluency dramatically accelerates discovery and trust-building with prospects." },
    ],
    sampleSummary: "Senior sales engineer with 6+ years in B2B enterprise SaaS supporting $20M+ annual ACV. Partnered with AEs to close $18M in new business at [Company] (top SE by revenue contribution). Strong in technical discovery, custom POC delivery, and security/procurement workstreams across financial services and healthcare verticals.",
    keywords: ["sales engineer", "pre-sales", "solutions consulting", "POC", "demo", "RFP", "enterprise sales", "technical sales", "SaaS", "API", "integration", "discovery", "ACV", "MEDDIC", "SIG questionnaire"],
    relatedJobs: ["solutions-architect", "product-manager", "marketing-manager", "fullstack-developer", "data-analyst"],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    metaTitle: "Customer Success Manager Resume Builder — ATS-Optimized | ResumeAI",
    metaDescription: "Build an ATS-optimized customer success manager resume with retention, expansion, and adoption skills. Templates for 2026 CSM roles.",
    skills: [
      { name: "Customer Health Management", description: "Build and maintain customer health scores combining product usage, support tickets, NPS, and business outcomes. Identify at-risk accounts early and execute targeted intervention playbooks." },
      { name: "Retention & Expansion", description: "Drive net revenue retention through renewals, upsells, and cross-sells. Build mutual success plans with quarterly business reviews tying product value to customer outcomes." },
      { name: "Onboarding & Adoption", description: "Design and execute onboarding programs reducing time-to-value. Drive feature adoption through targeted enablement, in-app guides (Pendo, Appcues), and customer education programs." },
      { name: "Voice of Customer", description: "Capture and synthesize customer feedback through interviews, advisory boards, and product councils. Influence product roadmap with prioritized customer asks tied to revenue and retention impact." },
      { name: "Cross-Functional Collaboration", description: "Partner with sales (renewal handoffs), product (feature requests), support (escalation management), and marketing (case studies, references) to deliver coordinated customer experiences." },
    ],
    tips: [
      { title: "Lead With NRR and GRR", content: "CSMs are paid for retention. Include: gross revenue retention, net revenue retention, churn percentage, expansion ARR. 'Maintained 124% NRR across $4.2M book of business' immediately establishes credibility." },
      { title: "Quantify Adoption and Outcomes", content: "Show downstream impact: feature adoption percentages, time-to-value reductions, customer-reported outcomes. 'Drove 73% adoption of advanced analytics features across enterprise accounts in Q2' is concrete value." },
      { title: "Highlight Strategic Customer Wins", content: "Logo-level wins matter. Mention specific accounts you saved from churn, expanded significantly, or turned into reference customers. 'Saved $850K Fortune 500 account from competitive displacement through executive advocacy and accelerated roadmap commitments' demonstrates impact." },
    ],
    sampleSummary: "Customer success manager with 5+ years owning enterprise B2B SaaS accounts. Managed $5.5M book of business at [Company] with 121% NRR and 96% gross retention. Strong in executive engagement, adoption strategy, and cross-functional partnership with sales and product teams driving measurable customer outcomes.",
    keywords: ["customer success manager", "CSM", "NRR", "GRR", "retention", "churn", "expansion", "onboarding", "adoption", "QBR", "Gainsight", "Pendo", "renewals", "voice of customer", "B2B SaaS"],
    relatedJobs: ["product-manager", "sales-engineer", "marketing-manager", "project-manager", "hr-manager"],
  },
);



export function getPseoJob(slug: string): PseoJob | undefined {
  return pseoJobs.find((job) => job.slug === slug);
}
