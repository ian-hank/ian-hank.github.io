"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  commandCopy,
  hobbies,
  homeCopy,
  navItems,
  profile,
  projects,
  skillCategories,
  timeline,
  type SectionId,
} from "@/content/portfolio"

const sectionAliases = navItems.reduce<Record<string, SectionId>>((aliases, item) => {
  aliases[item.key] = item.id
  aliases[item.id] = item.id
  aliases[item.labels.desktop.replace(/\..+$/, "")] = item.id
  aliases[item.labels.mobile.toLowerCase()] = item.id
  return aliases
}, {})

export default function Portfolio() {
  const isMobile = useIsMobile()
  const supportsCommands = !isMobile
  const [activeSection, setActiveSection] = useState<SectionId>("home")
  const [selectedSection, setSelectedSection] = useState<SectionId>("home")
  const [openBuffers, setOpenBuffers] = useState<SectionId[]>(["home"])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommandMode, setIsCommandMode] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [command, setCommand] = useState("")
  const [statusMessage, setStatusMessage] = useState("ready")
  const commandInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    if (statusMessage === "ready") {
      return
    }

    const timeout = window.setTimeout(() => setStatusMessage("ready"), 4000)
    return () => window.clearTimeout(timeout)
  }, [statusMessage])

  const announce = (message: string) => {
    setStatusMessage(message)
  }

  const openSection = (section: SectionId) => {
    setActiveSection(section)
    setSelectedSection(section)
    setOpenBuffers((buffers) => (buffers.includes(section) ? buffers : [...buffers, section]))
    announce(`opened ${navItems.find((item) => item.id === section)?.labels.desktop}`)
  }

  const openExternal = (label: string, href: string) => {
    if (!href || href === "mailto:" || href === "https://www.linkedin.com/") {
      announce(`${label} link not configured`)
      return
    }

    window.open(href, "_blank", "noopener,noreferrer")
    announce(`opened ${label}`)
  }

  const executeCommand = (cmd: string) => {
    const trimmedCommand = cmd.replace(":", "").trim().toLowerCase()
    const nextSection = sectionAliases[trimmedCommand]

    if (nextSection) {
      openSection(nextSection)
      return
    }

    if (trimmedCommand === "help") {
      setIsHelpOpen(true)
      announce("opened help")
      return
    }

    if (trimmedCommand === "theme") {
      setIsDarkMode((current) => {
        const nextThemeIsDark = !current
        announce(`theme set to ${nextThemeIsDark ? "dark" : "light"}`)
        return nextThemeIsDark
      })
      return
    }

    if (trimmedCommand === "resume") {
      openExternal("resume.pdf", profile.links.resume)
      return
    }

    if (trimmedCommand === "github") {
      openExternal("GitHub", profile.links.github)
      return
    }

    if (trimmedCommand === "linkedin") {
      openExternal("LinkedIn", profile.links.linkedin)
      return
    }

    if (trimmedCommand === "email") {
      openExternal("email", profile.links.email)
      return
    }

    announce(`unknown command: :${trimmedCommand}`)
  }

  const moveSelectedSection = (direction: 1 | -1) => {
    const currentIndex = navItems.findIndex((item) => item.id === selectedSection)
    const nextIndex = (currentIndex + direction + navItems.length) % navItems.length
    const nextSection = navItems[nextIndex].id

    setSelectedSection(nextSection)
    announce(`selected ${navItems[nextIndex].labels.desktop}`)
  }

  useEffect(() => {
    if (!supportsCommands) {
      setIsCommandMode(false)
      setCommand("")
      setIsHelpOpen(false)
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName

      if (event.key === "Escape" && isHelpOpen) {
        setIsHelpOpen(false)
        announce("closed help")
        return
      }

      if (event.key === ":" && !isCommandMode && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault()
        setIsCommandMode(true)
        setCommand(":")
        setTimeout(() => commandInputRef.current?.focus(), 0)
        return
      }

      if (event.key === "Escape" && isCommandMode) {
        setIsCommandMode(false)
        setCommand("")
        return
      }

      if (event.key === "Enter" && isCommandMode) {
        executeCommand(command)
        setIsCommandMode(false)
        setCommand("")
        return
      }

      if (event.key === "j" && !isCommandMode && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault()
        moveSelectedSection(1)
        return
      }

      if (event.key === "k" && !isCommandMode && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault()
        moveSelectedSection(-1)
        return
      }

      if (event.key === "Enter" && !isCommandMode && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault()
        openSection(selectedSection)
        return
      }

      const nextSection = sectionAliases[event.key]
      if (!isCommandMode && nextSection && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        openSection(nextSection)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [command, isCommandMode, isHelpOpen, selectedSection, supportsCommands])

  const getNavLabel = (item: (typeof navItems)[number]) =>
    supportsCommands ? item.labels.desktop : item.labels.mobile

  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen md:flex-row md:overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-sidebar-border bg-sidebar md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">NORMAL</div>
            <div className="min-w-0">
              <div className="truncate font-mono text-xs text-sidebar-foreground">{profile.path}</div>
              <div className="truncate text-xs text-muted-foreground">{profile.title}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 text-sidebar-foreground transition-colors hover:text-primary"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-sidebar-foreground transition-colors hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="border-t border-sidebar-border bg-sidebar">
            <div className="space-y-1 p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    openSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded px-3 py-2 text-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {getNavLabel(item)}
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <aside className="hidden border-r border-sidebar-border bg-sidebar md:flex md:w-56 md:flex-col">
        <div className="border-b border-sidebar-border p-4">
          <div className="mb-3 h-30 w-30 overflow-hidden rounded border border-sidebar-border">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full scale-300 object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <div className="text-sm font-bold text-primary">{profile.path}</div>
            <div className="text-xs text-sidebar-foreground">{profile.title}</div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <div className="mb-2 px-2 text-xs text-muted-foreground">EXPLORER</div>
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => openSection(item.id)}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 font-mono text-xs transition-colors ${
                    activeSection === item.id
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  } ${selectedSection === item.id ? "ring-1 ring-primary/40" : ""}`}
                >
                  <span className="w-3 text-muted-foreground">{item.key}</span>
                  <span className="flex-1 text-left">{item.labels.desktop}</span>
                  {activeSection === item.id && <span className="text-primary">●</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border">
          <div className="flex h-[34px] items-center justify-between bg-sidebar-accent px-3">
            <div className="flex items-center gap-2">
              <div className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                NORMAL
              </div>
              <span className="text-[10px] text-sidebar-foreground">UTF-8</span>
            </div>
            <button
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-sidebar-foreground transition-colors hover:text-primary"
            >
              {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {supportsCommands && (
          <div className="hidden items-center gap-px border-b border-border bg-background px-2 py-1 md:flex">
            {openBuffers.map((buffer) => {
              const item = navItems.find((navItem) => navItem.id === buffer)
              const isActive = activeSection === buffer

              if (!item) {
                return null
              }

              return (
                <button
                  key={buffer}
                  onClick={() => openSection(buffer)}
                  className={`flex items-center gap-2 rounded-t border px-3 py-1 font-mono text-xs transition-colors ${
                    isActive
                      ? "border-border bg-card text-primary"
                      : "border-transparent bg-muted/40 text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span>{item.labels.desktop}</span>
                  {isActive && <span className="text-muted-foreground">●</span>}
                </button>
              )
            })}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl p-4 md:p-6">
            <Card
              className={`overflow-hidden border-border bg-card shadow-none ${
                supportsCommands ? "font-mono" : ""
              }`}
            >
              <div className="p-4 md:p-6">
                {activeSection === "home" && <HomeSection supportsCommands={supportsCommands} />}
                {activeSection === "skills" && <SkillsSection supportsCommands={supportsCommands} />}
                {activeSection === "about" && <AboutSection supportsCommands={supportsCommands} />}
                {activeSection === "hobbies" && <HobbiesSection supportsCommands={supportsCommands} />}
                {activeSection === "projects" && <ProjectsSection supportsCommands={supportsCommands} />}
              </div>
            </Card>
          </div>
        </div>

        {supportsCommands && (
          <div className="hidden border-t border-border bg-card md:block">
            <div className="flex h-[34px] items-center px-4 font-mono text-xs">
              {isCommandMode ? (
                <input
                  ref={commandInputRef}
                  type="text"
                  value={command}
                  onChange={(event) => {
                    const value = event.target.value
                    setCommand(value.startsWith(":") ? value : `:${value}`)
                  }}
                  className="flex-1 border-none bg-transparent text-primary outline-none focus:ring-0"
                  placeholder={commandCopy.placeholder}
                />
              ) : (
                <>
                  <span className="text-primary">:</span>
                  <span className="ml-2 text-muted-foreground">{statusMessage === "ready" ? commandCopy.help : statusMessage}</span>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {supportsCommands && isHelpOpen && <CommandHelp onClose={() => setIsHelpOpen(false)} />}
    </div>
  )
}

function CommandHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 hidden items-center justify-center bg-background/70 p-6 backdrop-blur-sm md:flex">
      <div className="w-full max-w-2xl overflow-hidden rounded border border-border bg-card font-mono shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded bg-primary px-1.5 py-0.5 font-bold text-primary-foreground">HELP</span>
            <span className="text-primary">:help</span>
            <span className="text-muted-foreground">command reference</span>
          </div>
          <button
            aria-label="Close help"
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-4 text-xs md:grid-cols-[1fr_1fr]">
          <div className="space-y-2">
            <div className="text-accent-foreground">COMMANDS</div>
            <div className="space-y-1">
              {commandCopy.commands.map((item) => (
                <div key={item.command} className="grid grid-cols-[7rem_1fr] gap-3">
                  <span className="text-primary">{item.command}</span>
                  <span className="text-muted-foreground">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-accent-foreground">NORMAL MODE</div>
            <div className="space-y-1 text-muted-foreground">
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="text-primary">j</span>
                <span>Select next file</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="text-primary">k</span>
                <span>Select previous file</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="text-primary">Enter</span>
                <span>Open selected file</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="text-primary">1-5</span>
                <span>Open file by number</span>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-3">
                <span className="text-primary">Esc</span>
                <span>Close help or command mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeSection({ supportsCommands }: { supportsCommands: boolean }) {
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
          <span className="text-xl font-bold text-foreground">{homeCopy.heading}</span>
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

function SkillsSection({ supportsCommands }: { supportsCommands: boolean }) {
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
      <FileHeader line="1" marker="export const" title="skills = {" />
      <div className="space-y-5 pl-6">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.name} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="w-5 text-muted-foreground">{categoryIndex + 2}</span>
              <span className="text-accent-foreground">{toObjectKey(category.name)}:</span>
              <span className="text-primary">[</span>
            </div>
            <div className="space-y-3 pl-8">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-primary">{"{"}</span>
                    <span className="text-accent-foreground">name:</span>
                    <span className="text-foreground">&quot;{skill.name}&quot;,</span>
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

function toObjectKey(value: string) {
  return value
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_match, character: string) => character.toUpperCase())
    .replace(/^[A-Z]/, (character) => character.toLowerCase())
}

function AboutSection({ supportsCommands }: { supportsCommands: boolean }) {
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
      <FileHeader line="1" marker="{" title={'"experience": ['} />
      <TimelineList supportsCommands={supportsCommands} />
    </section>
  )
}

function HobbiesSection({ supportsCommands }: { supportsCommands: boolean }) {
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

function ProjectsSection({ supportsCommands }: { supportsCommands: boolean }) {
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
  return (
    <div className="flex flex-wrap gap-2 pt-2">
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

function ProjectList({ supportsCommands }: { supportsCommands: boolean }) {
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

function TimelineList({ supportsCommands }: { supportsCommands: boolean }) {
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
