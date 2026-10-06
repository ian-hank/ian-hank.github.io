export type SectionId = "home" | "skills" | "about" | "education" | "hobbies" | "projects"

export type NavItem = {
  id: SectionId
  key: string
  labels: {
    desktop: string
    mobile: string
  }
}

export type Skill = {
  name: string
  years: number
}

export type SkillCategory = {
  name: string
  skills: Skill[]
}

export type TimelineItem = {
  year: string
  title: string
  company: string
  descriptions: string[]
}

export type Hobby = {
  name: string
  descriptions: string[]
}

export type Education = {
  degree: string
  institution: string
  graduationYear: number
}

export type Certification = {
  name: string
  issuer?: string
}

export type Project = {
  name: string
  status: string
  description: string
  technologies: string[]
  links: {
    label: string
    href: string
  }[]
}

export const profile = {
  name: "Ian Hank",
  title: "Full-Stack Software Engineer",
  path: "~/portfolio/ian-hank",
  avatar: "/avatar.jpg",
  links: {
    resume: "/resume.pdf",
    github: "https://github.com/ian-hank",
    linkedin: "https://www.linkedin.com/in/ian-hank/",
    email: "mailto:ianhank@cyphraengineering.com",
  },
}

export const navItems: NavItem[] = [
  { id: "home", key: "1", labels: { desktop: "home.md", mobile: "Home" } },
  { id: "skills", key: "2", labels: { desktop: "skills.ts", mobile: "Skills" } },
  { id: "about", key: "3", labels: { desktop: "experience.json", mobile: "Experience" } },
  { id: "education", key: "4", labels: { desktop: "education.yml", mobile: "Education & Certifications" } },
  { id: "hobbies", key: "5", labels: { desktop: "hobbies.yml", mobile: "Hobbies" } },
  { id: "projects", key: "6", labels: { desktop: "projects.yml", mobile: "Projects" } },
]

export const homeCopy = {
  heading: "Hello!",
  intro: {
    desktop:
      "Welcome to my Vim-inspired portfolio. Use the explorer to browse sections, or press : to enter command mode. Type :help for available commands.",
    mobile:
      "Welcome to my portfolio. Use the menu above to explore my experience, skills, projects, and interests.",
  },
  paragraphs: [
    "I’m a full-stack software engineer working across application development, cloud infrastructure, and platform engineering. Most of my professional work has been in the .NET ecosystem, building backend services in C# and F#. My frontend experience ranges from JavaScript, jQuery, and AJAX to TypeScript, React, and React Native. I also work heavily with cloud infrastructure, particularly containerized AWS environments, Kubernetes, infrastructure as code, GitOps, and automated CI/CD.",
    "I care a lot about how things work under the hood and enjoy digging into lower-level systems when I get the chance. Language design and compiler engineering are areas I’m especially interested in, and most of that work is in C++ and C. I’m always looking for opportunities to keep building those skills and apply them to real problems.",
    "I’m currently open to new software engineering opportunities, technical collaborations, and select development projects. If you’d like to work together or just talk about something interesting, feel free to reach out.",
  ],
  badges: {
    desktop: [":open_to_work", ":open_to_collab"],
    mobile: ["Open to work", "Open to collaboration"],
  },
}

export const commandCopy = {
  placeholder: ":help for commands",
  help: "Press : for command mode · 1–6 to navigate · :help for commands",
  commands: [
    { command: ":home", description: "Open home.md" },
    { command: ":skills", description: "Open skills.ts" },
    { command: ":experience", description: "Open experience.json" },
    { command: ":education", description: "Open education.yml" },
    { command: ":certifications", description: "Open education.yml" },
    { command: ":hobbies", description: "Open hobbies.yml" },
    { command: ":projects", description: "Open projects.yml" },
    { command: ":resume", description: "Open resume.pdf" },
    { command: ":github", description: "Open GitHub" },
    { command: ":linkedin", description: "Open LinkedIn" },
    { command: ":email", description: "Open email client" },
    { command: ":theme", description: "Toggle theme" },
    { command: ":help", description: "Show available commands" },
  ],
}

export const education: Education = {
  degree: "B.S. in Management Information Systems",
  institution: "West Virginia University",
  graduationYear: 2022,
}

export const certifications: Certification[] = [
  { name: "CompTIA Security+", issuer: "CompTIA" },
  { name: "CJIS Certification" },
]

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C#", years: 8 },
      { name: "JavaScript", years: 8 },
      { name: "SQL", years: 8 },
      { name: "C", years: 7 },
      { name: "C++", years: 6 },
      { name: "TypeScript", years: 5 },
      { name: "Python", years: 4 },
      { name: "F#", years: 3 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", years: 5 },
      { name: "React Native", years: 3 },
      { name: "Next.js", years: 3 },
      { name: "Tailwind CSS", years: 3 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: ".NET", years: 8 },
      { name: "ASP.NET Core", years: 8 },
      { name: "Entity Framework Core", years: 8 },
      { name: "Dapper", years: 8 },
      { name: "REST APIs", years: 8 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "SQL Server", years: 8 },
      { name: "PostgreSQL", years: 6 },
      { name: "SQLite", years: 2 },
    ],
  },
  {
    name: "Cloud & Platform",
    skills: [
      { name: "Docker", years: 6 },
      { name: "AWS", years: 4 },
      { name: "Kubernetes", years: 4 },
      { name: "Amazon EKS", years: 4 },
      { name: "Kustomize", years: 4 },
      { name: "IaC / AWS CDK", years: 2 },
    ],
  },
  {
    name: "DevOps & Automation",
    skills: [
      { name: "GitOps", years: 6 },
      { name: "GitLab CI/CD", years: 2 },
      { name: "Argo CD", years: 2 },
      { name: "Ansible", years: 2 },
    ],
  },
  {
    name: "Testing & Quality",
    skills: [
      { name: "xUnit", years: 8 },
      { name: "ESLint", years: 6 },
      { name: "Playwright", years: 1 },
    ],
  },
  {
    name: "Tools & Systems",
    skills: [
      { name: "Git", years: 8 },
      { name: "Linux", years: 8 },
      { name: "VS Code", years: 8 },
      { name: "Neovim", years: 4 },
      { name: "WSL", years: 4 },
    ],
  },
]

export const timeline: TimelineItem[] = [
  {
    year: "Feb 2024 – Present",
    title: "Software Engineer (.NET)",
    company: "JMA Resources | Mechanicsburg, PA",
    descriptions: [
      "Led the migration from manual deployments to an immutable, containerized AWS development environment using CDK, improving deployment consistency, repeatability, and recovery.",
      "Designed and implemented CI/CD pipelines with quality gates, container builds, and automated deployments across self-hosted Windows and Linux runners using Argo CD and EKS.",
      "Rewrote critical data replication routines to use roughly 1/80th the memory of the previous implementation while improving resilience for remote SQL execution and server log replication in intermittent-connectivity environments.",
      "Developed a remote installer and patching solution for application and database upgrades, reducing the need for costly onsite maintenance visits and accelerating field updates.",
    ],
  },
  {
    year: "Jan 2023 – Feb 2024",
    title: "Junior Software Engineer",
    company: "JMA Resources | Mechanicsburg, PA",
    descriptions: [
      "Developed and maintained a cross-platform mobile application with an F# / Giraffe backend and React Native frontend, delivering functionality across iOS and Android.",
      "Designed and implemented backend API endpoints and service layers using a data-first architecture to support scalable, consistent integration between frontend and backend systems.",
      "Integrated Stripe API for in-app purchases and subscription billing, enabling secure payment flows.",
      "Managed cloud hosting and CI/CD workflows across GCP and AWS, and supported Apple App Store release processes including provisioning, code signing, and production updates.",
    ],
  },
  {
    year: "Jul 2022 – Jan 2023",
    title: "Systems Administrator",
    company: "JMA Resources | Mechanicsburg, PA",
    descriptions: [
      "Implemented and maintained security controls aligned with CMMC 2.0 and NIST SP 800-171, supporting organizational certification readiness.",
      "Developed and implemented an endpoint vulnerability-management process in a GCC High Azure environment, including remediation and cloud security hardening.",
      "Standardized and secured endpoint configurations using PowerShell and Intune to improve device consistency, manageability, and security posture.",
    ],
  },
  {
    year: "Mar 2022 – Jul 2022",
    title: "Help Desk Support Specialist",
    company: "JMA Resources",
    descriptions: [
      "Provided IT support in the GCC High Azure Cloud environment.",
      "Created an asset-tracking database for company-managed hardware and equipment.",
      "Maintained and debugged a legacy internal contract-delivery application after assuming ownership of the codebase.",
    ],
  },
]

export const hobbies: Hobby[] = [
  {
    name: "Climbing",
    descriptions: [
      "Bouldering",
      "Sport",
    ],
  },
  {
    name: "Outdoors",
    descriptions: [
      "Hiking",
      "Backpacking",
      "Mountaineering",
    ],
  },
  {
    name: "Instruments",
    descriptions: [
      "Guitar (7+ years)",
      "Piano (4+ years)",
    ],
  },
  {
    name: "Gaming",
    descriptions: [
      "Chess",
      "Counter-Strike",
      "Factorio",
      "Timberborn",
      "Rocket League",
    ],
  },
]

export const projects: Project[] = [
  {
    name: "Portfolio",
    status: "Active",
    description:
      "Personal portfolio site with a Vim-inspired desktop experience and a simplified mobile layout.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ian-hank/ian-hank.github.io",
      },
    ],
  },
  {
    name: "Lindsay",
    status: "In progress",
    description:
      "A statically typed, immutable-first programming language and compiler designed for efficient systems software and resource-constrained environments.",
    technologies: [
      "C++",
      "CMake",
      "x86-64",
      "NASM",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ian-hank",
      },
    ],
  },
  {
    name: "StandupScript",
    status: "In progress",
    description:
      "A domain-specific language for structured standup reports, implemented with a handwritten lexer, parser, AST, and semantic model that produces Markdown and other structured output.",
    technologies: [
      "C++",
      "CMake",
      "EBNF",
      "Markdown",
    ],
    links: [],
  },
]
