"use client"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Menu, X } from "lucide-react"
import { HomeText } from "../constants/strings.ts"

// "simple" just removes a lot of the flashy elements and presents the information more clearly
type Mode = "vim" | "simple"

type Section = "home" | "skills" | "about" | "hobbies"

type Skill = {
  name: string,
  years: number,
}

type Timeline = {
  year: string,
  title: string,
  company: string,
  descriptions: string[],
}

type Hobby = {
  name: string,
  descriptions: string[],
}

const skills: Skill = [
  { name: "C#", years: 8 },
]

const timeline: Timeline = [
  {
    year: "2025",
    title: "Contracting Role",
    company: "JMA Resources",
    descriptions: [ "" ],
  },
]

const hobbies: Hobby = [
  { 
    name: "Gaming", 
    descriptions: [ "All kinds of games!" ]
  },
]

export default function Portfolio() {
  const [mode, setMode] = useState<Mode>("vim")
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommandMode, setIsCommandMode] = useState(false)
  const [command, setCommand] = useState("")
  const commandInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVimMode()) {
        if (e.key === ":" && !isCommandMode && document.activeElement?.tagName !== "INPUT") {
          e.preventDefault()
          setIsCommandMode(true)
          setCommand(":")
          setTimeout(() => commandInputRef.current?.focus(), 0)
        } else if (e.key === "Escape" && isCommandMode) {
          setIsCommandMode(false)
          setCommand("")
        } else if (e.key === "Enter" && isCommandMode) {
          executeCommand(command)
          setIsCommandMode(false)
          setCommand("")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCommandMode, command, mode])
  
  const isVimMode: boolean = () => {
    return mode === "vim"
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.replace(":", "").trim()
    const sectionMap: { [key: string]: Section } = {
      "1": "home",
      "2": "skills",
      "3": "about",
      "4": "hobbies",
    }

    if (sectionMap[trimmedCmd]) {
      setActiveSection(sectionMap[trimmedCmd])
    } else if (["home", "skills", "about", "hobbies"].includes(trimmedCmd)) {
      setActiveSection(trimmedCmd as Section)
    }
  }

  type navItem = {
    id: Section,
    label: string,
    key: string,
  }

  const navItems: { id: Section; label: string; key: string }[] = [
    { id: "home",       label: isVimMode() ? "home.md"      : "Home",        key: "1" },
    { id: "skills",     label: isVimMode() ? "skills.ts"    : "Skills",      key: "2" },
    { id: "about",      label: isVimMode() ? "about.json"   : "About",       key: "3" },
    { id: "hobbies",    label: isVimMode() ? "hobbies.yml"  : "Hobbies",     key: "4" },
    { id: "projects",   label: isVimMode() ? "projects.yml" : "Projects",    key: "5" },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <header className="md:hidden sticky top-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            {isVimMode() && (
              <>
                <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">NORMAL</div>
                <span className="text-xs text-sidebar-foreground">~/portfolio/ian-hank</span>
              </>
            )}
            {mode === "simple" && <span className="text-sm font-semibold text-sidebar-foreground">Portfolio</span>}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode(isVimMode() ? "simple" : "vim")}
              className="px-2 py-1 text-[10px] font-mono text-sidebar-foreground hover:text-primary transition-colors border border-sidebar-border rounded"
            >
              {isVimMode() ? "SIMPLE" : "VIM"}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 text-sidebar-foreground hover:text-primary transition-colors"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-sidebar-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="border-t border-sidebar-border bg-sidebar">
            <div className="p-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded text-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {isVimMode() && <span className="text-muted-foreground">{item.key}</span>}
                  <span className={isVimMode() ? "font-mono" : ""}>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      <aside className="hidden md:flex md:flex-col md:w-56 bg-sidebar border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border">
          <img
            src="https://www.realfakephotos.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAlexander-Eichhorn.0acbe755.png&w=2048&q=75"
            alt="Ian Hank"
            className="h-30 w-30 rounded object-cover border border-sidebar-border mb-3"
          />
          <div className="space-y-0.5">
            <div className={`text-sm font-bold ${isVimMode ? "text-primary" : "text-foreground"}`}>
              {isVimMode ? "~/portfolio/ian-hank" : "Ian Hank"}
            </div>
            <div className="text-xs text-sidebar-foreground">Software Engineer</div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          {isVimMode() && <div className="text-xs text-muted-foreground mb-2 px-2">EXPLORER</div>}
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                    isVimMode() ? "font-mono" : ""
                  } ${
                    activeSection === item.id
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  {isVimMode() && <span className="text-muted-foreground w-3">{item.key}</span>}
                  <span className="flex-1 text-left">{item.label}</span>
                  {activeSection === item.id && <span className="text-primary">●</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border">
          <div className="flex items-center justify-between px-3 h-[34px] bg-sidebar-accent">
            <div className="flex items-center gap-2">
              {isVimMode() && (
                <>
                  <div className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded">
                    NORMAL
                  </div>
                  <span className="text-[10px] text-sidebar-foreground">UTF-8</span>
                </>
              )}
              {mode === "simple" && (
                <button
                  onClick={() => setMode("vim")}
                  className="px-2 py-0.5 text-[10px] font-mono text-sidebar-foreground hover:text-primary transition-colors border border-sidebar-border rounded"
                >
                  VIM MODE
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isVimMode() && (
                <button
                  onClick={() => setMode("simple")}
                  className="px-2 py-0.5 text-[10px] font-mono text-sidebar-foreground hover:text-primary transition-colors border border-sidebar-border rounded"
                >
                  SIMPLE
                </button>
              )}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-sidebar-foreground hover:text-primary transition-colors"
              >
                {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {isVimMode() && (
          <div className="hidden md:flex items-center gap-px bg-background border-b border-border px-2 py-1">
            <div className="flex items-center gap-2 px-3 py-1 bg-card border border-border rounded-t text-xs">
              <span className="text-primary font-mono">{navItems.find((n) => n.id === activeSection)?.label}</span>
              <span className="text-muted-foreground">●</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto p-4 md:p-6">
            <Card className={`bg-card border-border shadow-none overflow-hidden ${isVimMode() ? "font-mono" : ""}`}>
              <div className="p-4 md:p-6">
                {activeSection === "home" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {isVimMode() ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-2">
                          <span>1</span>
                          <span className="text-primary">#</span>
                          <span className="text-foreground">README.md</span>
                        </div>
                        <div className="space-y-4 text-sm leading-relaxed pl-6">
                          <div>
                            <span className="text-primary">##</span>{" "}
                            <span className="text-xl font-bold text-foreground">Welcome</span>
                          </div>
                          <p className="text-muted-foreground">
                            <span className="text-primary">{">"}</span>
                            {" "}{HomeText.Block1} 
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-primary">{">"}</span>
                            {" "}{HomeText.Block2} 
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-primary">{">"}</span>
                            {" "}{HomeText.Block3} 
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-primary">{">"}</span>
                            {" "}{HomeText.Block4} 
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge
                              variant="outline"
                              className="text-primary border-primary text-xs font-mono bg-primary/10"
                            >
                              :available
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-accent-foreground border-accent-foreground text-xs font-mono bg-accent-foreground/10"
                            >
                              :open_to_collab
                            </Badge>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
                        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                          <p>{HomeText.Block1}</p>
                          <p>{HomeText.Block2}</p>
                          <p>{HomeText.Block3}</p>
                          <p>{HomeText.Block4}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline" className="text-xs">
                              Available for work
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Open to collaboration
                            </Badge>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeSection === "skills" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {isVimMode() ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-2">
                          <span>1</span>
                          <span className="text-accent-foreground">const</span>
                          <span className="text-foreground">skills</span>
                          <span className="text-primary">=</span>
                          <span className="text-primary">{"{"}</span>
                        </div>
                        <div className="space-y-3 pl-6">
                          {skills.map((skill, index) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-muted-foreground w-5">{index + 2}</span>
                                <span className="text-accent-foreground">{skill.name}:</span>
                                <span className="text-primary">{"{{"}</span>
                                <span className="text-foreground">years:</span>
                                <span className="text-primary font-bold">{skill.years}</span>
                                <span className="text-primary">{"}}"}</span>
                              </div>
                              <div className="flex items-center gap-2 pl-8">
                                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((skill.years / 6) * 100, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground font-mono">{skill.years}y</span>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">{skills.length + 2}</span>
                            <span className="text-primary">{"}"}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-foreground">Skills</h1>
                        <div className="space-y-4">
                          {skills.map((skill) => (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-foreground">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">{skill.years} years</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full transition-all duration-1000"
                                  style={{ width: `${Math.min((skill.years / 6) * 100, 100)}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeSection === "about" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {isVimMode() ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-2">
                          <span>1</span>
                          <span className="text-primary">{"{"}</span>
                          <span className="text-accent-foreground">"timeline"</span>
                          <span className="text-primary">:</span>
                          <span className="text-primary">{"["}</span>
                        </div>
                        <div className="space-y-4 pl-6">
                          {timeline.map((item, index) => (
                            <div
                              key={index}
                              className="relative pl-6 pb-4 border-l-2 border-primary/30 last:border-l-0"
                            >
                              <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-primary" />
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-muted-foreground">{index + 2}</span>
                                  <Badge
                                    variant="outline"
                                    className="text-primary border-primary text-[10px] font-mono"
                                  >
                                    {item.year}
                                  </Badge>
                                  <span className="text-accent-foreground font-semibold">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-2 pl-8">
                                  <span className="text-primary">@</span>
                                  <span className="text-foreground/80">{item.company}</span>
                                </div>
                                <p className="text-muted-foreground pl-8 text-xs leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">{timeline.length + 2}</span>
                            <span className="text-primary">{"}"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-muted-foreground">{timeline.length + 3}</span>
                            <span className="text-primary">{"}"}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-foreground">About Me</h1>
                        <div className="space-y-4">
                          {timeline.map((item, index) => (
                            <div
                              key={index}
                              className="relative pl-6 pb-4 border-l-2 border-primary/30 last:border-l-0"
                            >
                              <div className="absolute left-[-5px] top-0 h-2 w-2 rounded-full bg-primary" />
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {item.year}
                                  </Badge>
                                  <span className="text-sm font-semibold text-foreground">{item.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{item.company}</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeSection === "hobbies" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {isVimMode() ? (
                      <>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border pb-2">
                          <span>1</span>
                          <span className="text-accent-foreground">hobbies:</span>
                        </div>
                        <div className="space-y-3 pl-6">
                          {hobbies.map((hobby, index) => (
                            <div key={hobby.name} className="space-y-1">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-muted-foreground w-5">{index + 2}</span>
                                <span className="text-primary">-</span>
                                <span className="text-accent-foreground font-semibold">{hobby.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs pl-8">
                                <span className="text-primary">:</span>
                                <span className="text-muted-foreground">{hobby.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-foreground">Hobbies</h1>
                        <div className="space-y-3">
                          {hobbies.map((hobby) => (
                            <div key={hobby.name} className="space-y-1">
                              <h3 className="text-sm font-semibold text-foreground">{hobby.name}</h3>
                              <p className="text-sm text-muted-foreground">{hobby.description}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {isVimMode() && (
          <div className="hidden md:block border-t border-border bg-card">
            <div className="flex items-center px-4 h-[34px] text-xs font-mono">
              {isCommandMode ? (
                <>
                  <input
                    ref={commandInputRef}
                    type="text"
                    value={command}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value.startsWith(":")) {
                        setCommand(value)
                      } else {
                        setCommand(":" + value)
                      }
                    }}
                    className="flex-1 bg-transparent text-primary outline-none border-none focus:ring-0"
                    placeholder=":1-4 to navigate, :home, :skills, :about, :hobbies"
                  />
                </>
              ) : (
                <>
                  <span className="text-primary">:</span>
                  <span className="text-muted-foreground ml-2">
                    Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">:</kbd> for command mode, or{" "}
                    <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">1-4</kbd> to navigate
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
