export type SectionId = "home" | "skills" | "about" | "hobbies" | "projects"

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
  title: "Software Engineer",
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
  { id: "hobbies", key: "4", labels: { desktop: "hobbies.yml", mobile: "Hobbies" } },
  { id: "projects", key: "5", labels: { desktop: "projects.yml", mobile: "Projects" } },
]

export const homeCopy = {
  heading: "Hello!",
  intro: {
    desktop:
      'Welcome to my Vim-inspired portfolio. Navigate using the explorer on the left, or enter command (:) mode to jump between sections using numbers (1-5) or file names like "home", "skills", "experience", "hobbies", and "projects". Type ":help" for the full command list.',
    mobile:
      "Welcome to my portfolio. This experience was designed primarily for desktop to showcase its full functionality. On mobile, you can use the menu above to navigate and explore my work, interests, and background.",
  },
  paragraphs: [
    "I am a full-stack engineer currently working in a cleared contracting role. Most of my professional work has been in the .NET ecosystem. On the backend I build services in C# and F#, and on the frontend I have worked with everything from vanilla JS, jQuery, and AJAX to modern stacks like TypeScript, React, and React Native. I also have experience designing and modernizing cloud infrastructure, particularly with containerized AWS environments, infrastructure as code, and automated CI/CD.",
    "I care a lot about how things work under the hood and enjoy digging into lower-level systems. Language design and compiler engineering are areas I am especially passionate about, and I am looking for opportunities that let me grow and apply those skills. Most of my lower-level work is done in C++17 and C.",
    "I am currently open to new projects and collaborations. If you would like to work together, feel free to reach out.",
  ],
  badges: {
    desktop: [":available", ":open_to_collab"],
    mobile: ["Available for work", "Open to collaboration"],
  },
}

export const commandCopy = {
  placeholder: ":1-5 to navigate, :home, :skills, :experience, :hobbies, :projects",
  help: "Press : for command mode, :help for commands, or 1-5 to navigate",
  commands: [
    { command: ":home", description: "Open home.md" },
    { command: ":skills", description: "Open skills.ts" },
    { command: ":experience", description: "Open experience.json" },
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

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C#", years: 8 },
      { name: "C++", years: 6 },
      { name: "C", years: 7 },
      { name: "F#", years: 3 },
      { name: "TypeScript", years: 5 },
      { name: "JavaScript", years: 8 },
      { name: "SQL", years: 8 },
      { name: "Python", years: 4 },
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
      { name: "PostgreSQL", years: 6 },
      { name: "SQL Server", years: 8 },
      { name: "SQLite", years: 2 },
    ],
  },
  {
    name: "Cloud & Platform",
    skills: [
      { name: "AWS", years: 4 },
      { name: "Docker", years: 6 },
      { name: "Kubernetes", years: 4 },
      { name: "Amazon EKS", years: 4 },
      { name: "Kustomize", years: 4 },
      { name: "Infrastructure as Code", years: 2 },
    ],
  },
  {
    name: "DevOps & Automation",
    skills: [
      { name: "GitLab CI/CD", years: 2 },
      { name: "Argo CD", years: 2 },
      { name: "GitOps", years: 6 },
      { name: "Ansible", years: 2 },
    ],
  },
  {
    name: "Testing & Quality",
    skills: [
      { name: "Playwright", years: 1 },
      { name: "xUnit", years: 8 },
      { name: "ESLint", years: 6 },
    ],
  },
  {
    name: "Tools & Systems",
    skills: [
      { name: "Git", years: 8 },
      { name: "Linux", years: 8 },
      { name: "Neovim", years: 4 },
      { name: "VS Code", years: 8 },
      { name: "WSL", years: 4 },
    ],
  },
]

export const timeline: TimelineItem[] = [
  {
    year: "February, 2024",
    title: "Software Engineer (.NET)",
    company: "JMA Resources | Mechanicsburg, PA",
    descriptions: [
      "Led the migration from manual deployments to an immutable, containerized AWS development environment using CDK, improving deployment consistency, repeatability, and recovery.",
      "Designed and implemented CI/CD pipelines with quality gates, container builds, and automated deployments across self-hosted Windows and Linux runners using Argo CD and EKS.",
      "Rewrote critical data replication routines, reducing memory usage by 8000% and improving resilience for remote SQL execution and server log replication in intermittent-connectivity environments.",
      "Developed a remote installer and patching solution for application and database upgrades, reducing the need for costly onsite maintenance visits and accelerating field updates.",
    ],
  },
  {
    year: "January, 2023 - February, 2024",
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
    year: "July, 2022 - January, 2023",
    title: "Systems Administrator",
    company: "JMA Resources | Mechanicsburg, PA",
    descriptions: [
      "Implemented and maintained security controls aligned with CMMC 2.0 and NIST SP 800-171, supporting organizational certification readiness.",
      "Developed and executed an endpoint and vulnerability response process in a GCC High Azure environment, including remediation and cloud security hardening.",
      "Standardized and secured endpoint configurations using PowerShell and Intune to improve device consistency, manageability, and security posture.",
    ],
  },
  {
    year: "March, 2022",
    title: "Help Desk Support Specialist",
    company: "JMA Resources",
    descriptions: [
      "Provided IT support in the GCC High Azure Cloud environment.",
      "Created an assets database that helped organize and track company-managed assets.",
      "Helped maintain and solve bugs on an internal contract delivery tool written by another developer no longer with the company.",
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
    name: "Chess",
    descriptions: [
      "Rapid",
      "Opening study",
    ],
  },
  {
    name: "Gaming",
    descriptions: [
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
      "A statically typed, immutable-first programming language and compiler focused on efficient systems software and low-power environments.",
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
      "A compiler-style DSL for writing structured standup reports, with a handwritten lexer, parser, AST, and semantic model designed to produce Markdown and other structured output.",
    technologies: [
      "C++",
      "CMake",
      "EBNF",
      "Markdown",
    ],
    links: [],
  },
]