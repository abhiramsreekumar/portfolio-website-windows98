export const resumeData = {
  about: {
    name: "Abhiram Sreekumar",
    title: "DevOps Engineer",
    location: "Thiruvananthapuram, KL",
    email: "abhiram@randomsasi.in",
    website: "abhiram.randomsasi.in",
    linkedin: "linkedin.com/in/abhiramrs",
    github: "github.com/abhiramsreekumar",
    summary: "Passionate DevOps Engineer with a focus on automation, security, and scalable cloud architectures. Certified in Kubernetes and AWS."
  },
  experience: [
    {
      role: "DevOps Engineer 2",
      company: "Oracle",
      location: "Trivandrum, KL",
      period: "February 2025 - Present",
      bullets: [
        "Designed a Python-based Vault authentication service using Oracle Cloud IAM, eliminating CLI dependency.",
        "Managed multi-region OKE clusters across all environments, deploying apps via GitOps with Helm and Argo CD.",
        "Optimized GitLab CI pipelines replacing third-party services with OCI resources.",
        "Created dynamic Jenkins pipelines managing 500+ microservices for automated dependency updates and MRs."
      ]
    },
    {
      role: "DevOps Engineer",
      company: "Qburst",
      location: "Trivandrum, KL",
      period: "July 2023 - January 2025",
      bullets: [
        "Set up Dockerized web servers & Nginx reverse proxy with SSL mapping.",
        "Developed comprehensive Terraform boilerplate templates for 6 common AWS architectures.",
        "Implemented IAC workflows leveraging AWS ECS for fully automated demo instance provisioning and destruction.",
        "Implemented Prometheus/Grafana stack in EKS for monitoring.",
        "Migrated live application to a scalable AWS architecture with zero downtime."
      ]
    }
  ],
  projects: [
    {
      name: "Lockenv",
      link: "pypi.org/project/lockenv",
      description: "Developed and published a CI/CD friendly Python pip package for encrypting environment variables safely in code repositories."
    }
  ],
  education: {
    degree: "B.Tech in Computer Science",
    university: "Kerala Technological University",
    period: "Aug 2019 - Jun 2023"
  },
  skills: {
    languages: ["Python", "Bash", "SQL", "JavaScript"],
    tools: ["Terraform", "Helm", "Nginx", "Kubernetes", "Istio", "AWS ECS", "Docker", "Gitlab CI", "Github Actions", "Jenkins", "Git", "Prometheus", "Grafana"],
    cloud: ["AWS", "Oracle Cloud", "Azure", "GCP"]
  },
  certifications: [
    "Certified Kubernetes Administrator (CKA)",
    "AWS Certified Solutions Architect – Associate",
    "Professional Cloud DevOps Engineer (Google Cloud)"
  ]
};
