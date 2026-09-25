import { FileText, Github, Linkedin, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  certifications,
  education,
  hobbies,
  homeCopy,
  profile,
  projects,
  skillCategories,
  timeline,
  type SectionId,
} from "@/content/portfolio"

type SectionProps = {
  supportsCommands: boolean
}

export function SectionContent({
  activeSection,
  supportsCommands,
}: SectionProps & { activeSection: SectionId }) {
  switch (activeSection) {
    case "home":
      return <HomeSection supportsCommands={supportsCommands} />
    case "skills":
      return <SkillsSection supportsCommands={supportsCommands} />
    case "about":
      return <ExperienceSection supportsCommands={supportsCommands} />
    case "education":
      return <EducationSection supportsCommands={supportsCommands} />
    case "hobbies":
      return <HobbiesSection supportsCommands={supportsCommands} />
    case "projects":
      return <ProjectsSection supportsCommands={supportsCommands} />
  }
}

function HomeSection({ supportsCommands }: SectionProps) {
  const intro = supportsCommands ? homeCopy.intro.desktop : homeCopy.intro.mobile
  const badges = supportsCommands ? homeCopy.badges.desktop : homeCopy.badges.mobile

  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">{homeCopy.heading}</h1>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {[intro, ...homeCopy.paragraphs].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <BadgeList labels={badges} supportsCommands={supportsCommands} />
        </div>
      </section>
    )
  }

  return (
    <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
      <FileHeader line="1" marker="#" title="README.md" />
      <div className="space-y-4 pl-6 text-sm leading-relaxed">
        <div>
          <span className="text-primary">##</span>{" "}
          <h1 className="inline text-xl font-bold text-foreground">{homeCopy.heading}</h1>
        </div>
        {[intro, ...homeCopy.paragraphs].map((paragraph) => (
          <p key={paragraph} className="text-muted-foreground">
            <span className="text-primary">{">"}</span> {paragraph}
          </p>
        ))}
        <BadgeList labels={badges} supportsCommands={supportsCommands} />
      </div>
    </section>
  )
}

function SkillsSection({ supportsCommands }: SectionProps) {
  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">Skills</h1>
        <div className="space-y-5">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              <h2 className="text-sm font-semibold text-foreground">{category.name}</h2>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillPill key={skill.name} name={skill.name} years={skill.years} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
      <h1 className="sr-only">Skills</h1>
      <FileHeader line="1" marker="export const" title="skills = {" />
      <div className="space-y-5 pl-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.name} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="w-5 text-muted-foreground">{categoryIndex + 2}</span>
              <span className="text-accent-foreground">{toObjectKey(category.name)}:</span>
              <span className="text-primary">[</span>
            </div>
            <div className="space-y-3 pl-12">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-primary">{"{"}</span>
                    <span className="text-accent-foreground">name:</span>
                    <span className="font-bold text-foreground">&quot;{skill.name}&quot;,</span>
                    <span className="text-accent-foreground">years:</span>
                    <span className="font-bold text-primary">{skill.years}</span>
                    <span className="text-primary">{"},"}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pl-8 text-xs">
              <span className="text-primary">],</span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">{skillCategories.length + 2}</span>
          <span className="text-primary">{"}"}</span>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection({ supportsCommands }: SectionProps) {
  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">Experience</h1>
        <TimelineList supportsCommands={supportsCommands} />
      </section>
    )
  }

  return (
    <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
      <h1 className="sr-only">Experience</h1>
      <FileHeader line="1" marker="{" title={'"experience": ['} />
      <TimelineList supportsCommands={supportsCommands} />
    </section>
  )
}

function EducationSection({ supportsCommands }: SectionProps) {
  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-6 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">Education &amp; Certifications</h1>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Education</h2>
          <div className="space-y-1 rounded border border-border bg-background/30 p-3">
            <h3 className="text-base font-semibold text-foreground">{education.degree}</h3>
            <p className="text-sm text-muted-foreground">{education.institution}</p>
            <p className="text-sm text-primary">Graduated {education.graduationYear}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Certifications</h2>
          <ul className="space-y-2">
            {certifications.map((certification) => (
              <li
                key={certification.name}
                className="rounded border border-border bg-background/30 px-3 py-2"
              >
                <span className="text-sm font-semibold text-foreground">{certification.name}</span>
                {certification.issuer && (
                  <span className="ml-2 text-sm text-muted-foreground">{certification.issuer}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section className="animate-in space-y-5 fade-in slide-in-from-bottom-4 duration-300">
      <h1 className="sr-only">Education &amp; Certifications</h1>
      <FileHeader line="1" marker="credentials:" />

      <div className="space-y-5 pl-6 text-xs">
        <div className="space-y-2">
          <h2 className="text-accent-foreground">education:</h2>
          <div className="space-y-1 pl-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-5 text-muted-foreground">2</span>
              <span className="text-primary">-</span>
              <span className="text-accent-foreground">degree:</span>
              <span className="font-semibold text-foreground">{education.degree}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pl-8">
              <span className="text-accent-foreground">institution:</span>
              <span className="text-foreground/80">{education.institution}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pl-8">
              <span className="text-accent-foreground">graduated:</span>
              <span className="font-bold text-primary">{education.graduationYear}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-accent-foreground">certifications:</h2>
          <div className="space-y-2 pl-6">
            {certifications.map((certification, index) => (
              <div key={certification.name} className="flex flex-wrap items-center gap-2">
                <span className="w-5 text-muted-foreground">{index + 3}</span>
                <span className="text-primary">-</span>
                <span className="font-semibold text-foreground">{certification.name}</span>
                {certification.issuer && (
                  <span className="text-muted-foreground">({certification.issuer})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HobbiesSection({ supportsCommands }: SectionProps) {
  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">Hobbies</h1>
        <div className="space-y-3">
          {hobbies.map((hobby) => (
            <div key={hobby.name} className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">{hobby.name}</h3>
              {hobby.descriptions.map((description) => (
                <p key={description} className="text-sm text-muted-foreground">
                  {description}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
      <h1 className="sr-only">Hobbies</h1>
      <FileHeader line="1" marker="hobbies:" />
      <div className="space-y-3 pl-6">
        {hobbies.map((hobby, index) => (
          <div key={hobby.name} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 text-muted-foreground">{index + 2}</span>
              <span className="text-primary">-</span>
              <span className="text-accent-foreground">name:</span>
              <span className="font-semibold text-foreground">{hobby.name}</span>
            </div>
            <div className="flex items-center gap-2 pl-8 text-xs">
              <span className="text-accent-foreground">interests:</span>
            </div>
            {hobby.descriptions.map((description) => (
              <div key={description} className="flex items-center gap-2 pl-12 text-xs">
                <span className="text-primary">-</span>
                <span className="text-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection({ supportsCommands }: SectionProps) {
  if (!supportsCommands) {
    return (
      <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <ProjectList supportsCommands={supportsCommands} />
      </section>
    )
  }

  return (
    <section className="animate-in space-y-4 fade-in slide-in-from-bottom-4 duration-300">
      <h1 className="sr-only">Projects</h1>
      <FileHeader line="1" marker="projects:" />
      <ProjectList supportsCommands={supportsCommands} />
    </section>
  )
}

function FileHeader({ line, marker, title }: { line: string; marker: string; title?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-2 text-xs text-muted-foreground">
      <span>{line}</span>
      <span className="text-primary">{marker}</span>
      {title && <span className="text-foreground">{title}</span>}
    </div>
  )
}

function BadgeList({ labels, supportsCommands }: { labels: string[]; supportsCommands: boolean }) {
  const homeLinks = [
    { label: supportsCommands ? ":resume" : "Resume", href: profile.links.resume, icon: FileText },
    { label: supportsCommands ? ":email" : "Email", href: profile.links.email, icon: Mail },
    { label: supportsCommands ? ":github" : "GitHub", href: profile.links.github, icon: Github },
    { label: supportsCommands ? ":linkedin" : "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  ]

  return (
    <div className={`flex gap-2 pt-2 ${supportsCommands ? "flex-wrap" : "flex-col items-start"}`}>
      {labels.map((label) => (
        <Badge
          key={label}
          variant="outline"
          className={
            supportsCommands
              ? "border-primary bg-primary/10 font-mono text-xs text-primary"
              : "text-xs"
          }
        >
          {label}
        </Badge>
      ))}
      {homeLinks.map(({ label, href, icon: Icon }) => (
        <Badge
          key={href}
          asChild
          variant="outline"
          className={
            supportsCommands
              ? "border-primary bg-primary/10 font-mono text-xs text-primary hover:bg-primary hover:text-primary-foreground"
              : "text-xs"
          }
        >
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
          >
            <Icon aria-hidden="true" />
            {label}
          </a>
        </Badge>
      ))}
    </div>
  )
}

function SkillPill({ name, years }: { name: string; years: number }) {
  return (
    <div className="rounded border border-border px-2 py-1 text-sm text-muted-foreground">
      <span>{name}</span>
      {years > 0 && <span className="ml-1 text-xs">({years}y)</span>}
    </div>
  )
}

function ProjectList({ supportsCommands }: SectionProps) {
  return (
    <div className={supportsCommands ? "space-y-4 pl-6" : "space-y-4"}>
      {projects.map((project, index) => (
        <div
          key={project.name}
          className={
            supportsCommands
              ? "space-y-2 text-xs"
              : "space-y-3 rounded border border-border bg-background/30 p-3"
          }
        >
          {supportsCommands ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-5 text-muted-foreground">{index + 2}</span>
                <span className="text-primary">-</span>
                <span className="text-accent-foreground">name:</span>
                <span className="font-semibold text-foreground">{project.name}</span>
                <Badge variant="outline" className="border-primary font-mono text-[10px] text-primary">
                  {project.status}
                </Badge>
              </div>
              <div className="pl-8 text-muted-foreground">{project.description}</div>
              <YamlList label="technologies" values={project.technologies} />
              <div className="space-y-1 pl-8">
                <div className="text-accent-foreground">links:</div>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block pl-4 text-primary underline-offset-4 hover:underline"
                  >
                    - {link.label}: {link.href}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">{project.name}</h2>
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded border border-border px-2 py-1 text-xs text-muted-foreground">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function YamlList({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="space-y-1 pl-8">
      <div className="text-accent-foreground">{label}:</div>
      {values.map((value) => (
        <div key={value} className="pl-4 text-muted-foreground">
          - {value}
        </div>
      ))}
    </div>
  )
}

function TimelineList({ supportsCommands }: SectionProps) {
  return (
    <div className={supportsCommands ? "space-y-4 pl-6" : "space-y-4"}>
      {timeline.map((item, parentIndex) => (
        <div key={`${item.year}-${item.title}`} className="relative border-l-2 border-primary/30 pb-4 pl-6 last:border-l-0">
          <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-primary" />
          <div className={supportsCommands ? "space-y-1 text-xs" : "space-y-1"}>
            <div className="flex flex-wrap items-center gap-2">
              {supportsCommands && <span className="text-muted-foreground">{parentIndex + 2}</span>}
              <Badge variant="outline" className={supportsCommands ? "border-primary font-mono text-[10px] text-primary" : "text-xs"}>
                {item.year}
              </Badge>
              <span className={`${supportsCommands ? "text-accent-foreground" : "text-foreground"} text-sm font-semibold`}>
                {item.title}
              </span>
            </div>
            <div className={supportsCommands ? "flex items-center gap-2 pl-8" : "text-sm text-muted-foreground"}>
              {supportsCommands && <span className="text-primary">@</span>}
              <span className={supportsCommands ? "text-foreground/80" : ""}>{item.company}</span>
            </div>
            {supportsCommands ? (
              <div className="space-y-1 pl-8">
                {item.descriptions.map((description) => (
                  <p key={description} className="text-xs leading-relaxed text-muted-foreground">
                    - {description}
                  </p>
                ))}
              </div>
            ) : (
              <ul className="space-y-2 pt-2">
                {item.descriptions.map((description) => (
                  <li
                    key={description}
                    className="rounded border border-border bg-background/30 px-3 py-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    {description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
      {supportsCommands && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">{timeline.length + 2}</span>
          <span className="text-primary">{"]}"}</span>
        </div>
      )}
    </div>
  )
}

function toObjectKey(value: string) {
  return value
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_match, character: string) => character.toUpperCase())
    .replace(/^[A-Z]/, (character) => character.toLowerCase())
}
