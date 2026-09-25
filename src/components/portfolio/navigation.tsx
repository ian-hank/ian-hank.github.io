import type { RefObject } from "react"
import Image from "next/image"
import { Menu, Moon, Sun, X } from "lucide-react"

import { navItems, profile, type SectionId } from "@/content/portfolio"

type MobileHeaderProps = {
  activeSection: SectionId
  isDarkMode: boolean
  isMenuOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onMenuToggle: () => void
  onSectionOpen: (section: SectionId) => void
  onThemeToggle: () => void
}

export function MobileHeader({
  activeSection,
  isDarkMode,
  isMenuOpen,
  menuButtonRef,
  onMenuToggle,
  onSectionOpen,
  onThemeToggle,
}: MobileHeaderProps) {
  return (
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
          <ThemeButton isDarkMode={isDarkMode} onToggle={onThemeToggle} className="p-1.5" />
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={onMenuToggle}
            className="p-1.5 text-sidebar-foreground transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Portfolio sections" className="border-t border-sidebar-border bg-sidebar">
          <div className="space-y-1 p-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => onSectionOpen(item.id)}
                className={`flex w-full items-center gap-2 rounded px-3 py-2 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeSection === item.id
                    ? "bg-sidebar-accent text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {item.labels.mobile}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

type DesktopSidebarProps = {
  activeSection: SectionId
  isCommandMode: boolean
  isDarkMode: boolean
  onSectionOpen: (section: SectionId) => void
  onThemeToggle: () => void
  selectedSection: SectionId
}

export function DesktopSidebar({
  activeSection,
  isCommandMode,
  isDarkMode,
  onSectionOpen,
  onThemeToggle,
  selectedSection,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden border-r border-sidebar-border bg-sidebar md:flex md:w-56 md:flex-col">
      <div className="border-b border-sidebar-border p-4">
        <div className="relative mb-3 h-30 w-30 overflow-hidden rounded border border-sidebar-border">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            sizes="360px"
            quality={90}
            className="h-full w-full scale-300 object-cover"
          />
        </div>
        <div className="space-y-0.5">
          <div className="text-sm font-bold text-primary">{profile.path}</div>
          <div className="text-xs text-sidebar-foreground">{profile.title}</div>
        </div>
      </div>

      <nav aria-label="Portfolio sections" className="flex-1 p-3">
        <div className="mb-2 px-2 text-xs text-muted-foreground">EXPLORER</div>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSectionOpen(item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeSection === item.id
                    ? "bg-sidebar-accent text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${selectedSection === item.id ? "ring-1 ring-primary/40" : ""}`}
              >
                <span className="w-3 text-muted-foreground">{item.key}</span>
                <span className="flex-1 text-left">{item.labels.desktop}</span>
                {activeSection === item.id && <span aria-hidden="true" className="text-primary">●</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border">
        <div className="flex h-[34px] items-center justify-between bg-sidebar-accent px-3">
          <div className="flex items-center gap-2">
            <div
              aria-live="polite"
              aria-atomic="true"
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                isCommandMode
                  ? "bg-[var(--vim-yellow)] text-[var(--vim-statusline)]"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {isCommandMode ? "COMMAND" : "NORMAL"}
            </div>
            <span className="text-[10px] text-sidebar-foreground">UTF-8</span>
          </div>
          <ThemeButton isDarkMode={isDarkMode} onToggle={onThemeToggle} className="" iconSize="h-3.5 w-3.5" />
        </div>
      </div>
    </aside>
  )
}

type BufferTabsProps = {
  activeSection: SectionId
  onSectionOpen: (section: SectionId) => void
  openBuffers: SectionId[]
}

export function BufferTabs({ activeSection, onSectionOpen, openBuffers }: BufferTabsProps) {
  return (
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
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSectionOpen(buffer)}
            className={`flex items-center gap-2 rounded-t border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive
                ? "border-border bg-card text-primary"
                : "border-transparent bg-muted/40 text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <span>{item.labels.desktop}</span>
            {isActive && <span aria-hidden="true" className="text-muted-foreground">●</span>}
          </button>
        )
      })}
    </div>
  )
}

type ThemeButtonProps = {
  className: string
  iconSize?: string
  isDarkMode: boolean
  onToggle: () => void
}

function ThemeButton({ className, iconSize = "h-4 w-4", isDarkMode, onToggle }: ThemeButtonProps) {
  const Icon = isDarkMode ? Sun : Moon

  return (
    <button
      type="button"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDarkMode}
      onClick={onToggle}
      className={`${className} text-sidebar-foreground transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      <Icon className={iconSize} />
    </button>
  )
}
