"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Card } from "@/components/ui/card"
import { navItems, profile, type SectionId } from "@/content/portfolio"
import { useIsMobile } from "@/hooks/use-mobile"

import { CommandBar, CommandHelp } from "./command-interface"
import { BufferTabs, DesktopSidebar, MobileHeader } from "./navigation"
import { SectionContent } from "./sections"

const sectionAliases = navItems.reduce<Record<string, SectionId>>((aliases, item) => {
  aliases[item.key] = item.id
  aliases[item.id] = item.id
  aliases[item.labels.desktop.replace(/\..+$/, "")] = item.id
  aliases[item.labels.mobile.toLowerCase()] = item.id
  return aliases
}, {})

sectionAliases.certifications = "education"
sectionAliases.certs = "education"

export function Portfolio() {
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
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const mainRef = useRef<HTMLElement>(null)

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

  const announce = useCallback((message: string) => {
    setStatusMessage(message)
  }, [])

  const closeHelp = useCallback(() => {
    setIsHelpOpen(false)
    announce("closed help")
  }, [announce])

  const openSection = useCallback((section: SectionId) => {
    setActiveSection(section)
    setSelectedSection(section)
    setOpenBuffers((buffers) => (buffers.includes(section) ? buffers : [...buffers, section]))
    announce(`opened ${navItems.find((item) => item.id === section)?.labels.desktop}`)
  }, [announce])

  const openExternal = useCallback((label: string, href: string) => {
    if (!href || href === "mailto:" || href === "https://www.linkedin.com/") {
      announce(`${label} link not configured`)
      return
    }

    window.open(href, "_blank", "noopener,noreferrer")
    announce(`opened ${label}`)
  }, [announce])

  const executeCommand = useCallback((cmd: string) => {
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
  }, [announce, openExternal, openSection])

  const moveSelectedSection = useCallback((direction: 1 | -1) => {
    const currentIndex = navItems.findIndex((item) => item.id === selectedSection)
    const nextIndex = (currentIndex + direction + navItems.length) % navItems.length
    const nextSection = navItems[nextIndex].id

    setSelectedSection(nextSection)
    announce(`selected ${navItems[nextIndex].labels.desktop}`)
  }, [announce, selectedSection])

  useEffect(() => {
    if (!supportsCommands) {
      const timeout = window.setTimeout(() => {
        setIsCommandMode(false)
        setCommand("")
        setIsHelpOpen(false)
      }, 0)
      return () => window.clearTimeout(timeout)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName

      if (event.key === "Escape" && isHelpOpen) {
        closeHelp()
        return
      }

      if (event.key === ":" && !isCommandMode && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        event.preventDefault()
        setIsCommandMode(true)
        setCommand(":")
        window.setTimeout(() => commandInputRef.current?.focus(), 0)
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
  }, [closeHelp, command, executeCommand, isCommandMode, isHelpOpen, moveSelectedSection, openSection, selectedSection, supportsCommands])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return
      }

      setIsMobileMenuOpen(false)
      window.setTimeout(() => mobileMenuButtonRef.current?.focus(), 0)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen])

  const openMobileSection = (section: SectionId) => {
    openSection(section)
    setIsMobileMenuOpen(false)
    window.setTimeout(() => mainRef.current?.focus(), 0)
  }

  const handleCommandChange = (value: string) => {
    setCommand(value.startsWith(":") ? value : `:${value}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen md:flex-row md:overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <MobileHeader
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        isMenuOpen={isMobileMenuOpen}
        menuButtonRef={mobileMenuButtonRef}
        onMenuToggle={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        onSectionOpen={openMobileSection}
        onThemeToggle={() => setIsDarkMode((isDark) => !isDark)}
      />

      <DesktopSidebar
        activeSection={activeSection}
        isCommandMode={isCommandMode}
        isDarkMode={isDarkMode}
        onSectionOpen={openSection}
        onThemeToggle={() => setIsDarkMode((isDark) => !isDark)}
        selectedSection={selectedSection}
      />

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="flex min-h-0 flex-1 flex-col overflow-hidden focus:outline-none"
      >
        {supportsCommands && (
          <BufferTabs
            activeSection={activeSection}
            onSectionOpen={openSection}
            openBuffers={openBuffers}
          />
        )}

        <div className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl p-4 md:p-6">
            <Card
              className={`overflow-hidden border-border bg-card shadow-none ${
                supportsCommands ? "font-mono" : ""
              }`}
            >
              <div className="p-4 md:p-6">
                <SectionContent activeSection={activeSection} supportsCommands={supportsCommands} />
              </div>
            </Card>
          </div>
        </div>

        {supportsCommands && (
          <CommandBar
            command={command}
            inputRef={commandInputRef}
            isCommandMode={isCommandMode}
            onCommandChange={handleCommandChange}
            statusMessage={statusMessage}
          />
        )}
      </main>

      {supportsCommands && isHelpOpen && <CommandHelp onClose={closeHelp} />}
    </div>
  )
}
