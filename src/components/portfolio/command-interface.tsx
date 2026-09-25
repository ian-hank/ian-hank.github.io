"use client"

import { useEffect, useRef, type RefObject } from "react"
import { X } from "lucide-react"

import { commandCopy } from "@/content/portfolio"

type CommandBarProps = {
  command: string
  inputRef: RefObject<HTMLInputElement | null>
  isCommandMode: boolean
  onCommandChange: (command: string) => void
  statusMessage: string
}

export function CommandBar({
  command,
  inputRef,
  isCommandMode,
  onCommandChange,
  statusMessage,
}: CommandBarProps) {
  return (
    <div className="hidden border-t border-border bg-card md:block">
      <div className="flex h-[34px] items-center px-4 font-mono text-xs">
        {isCommandMode ? (
          <input
            ref={inputRef}
            type="text"
            aria-label="Vim command"
            autoComplete="off"
            spellCheck={false}
            value={command}
            onChange={(event) => onCommandChange(event.target.value)}
            className="flex-1 border-none bg-transparent text-primary outline-none focus:ring-0"
            placeholder={commandCopy.placeholder}
          />
        ) : (
          <>
            <span className="text-primary">:</span>
            <span
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="ml-2 text-muted-foreground"
            >
              {statusMessage === "ready" ? commandCopy.help : statusMessage}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export function CommandHelp({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const dialog = dialogRef.current

    const focusTimeout = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== "Tab" || !dialog) {
        return
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    dialog?.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(focusTimeout)
      dialog?.removeEventListener("keydown", handleKeyDown)
      if (previouslyFocused?.isConnected && previouslyFocused !== document.body) {
        previouslyFocused.focus()
      } else {
        document.getElementById("main-content")?.focus()
      }
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 hidden items-center justify-center bg-background/70 p-6 backdrop-blur-sm md:flex">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-help-title"
        tabIndex={-1}
        className="w-full max-w-2xl overflow-hidden rounded border border-border bg-card font-mono shadow-lg outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div id="command-help-title" className="flex items-center gap-2 text-xs">
            <span className="rounded bg-primary px-1.5 py-0.5 font-bold text-primary-foreground">HELP</span>
            <span className="text-primary">:help</span>
            <span className="text-muted-foreground">command reference</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close help"
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-4 text-xs md:grid-cols-[1fr_1fr]">
          <div className="space-y-2">
            <h2 className="text-accent-foreground">COMMANDS</h2>
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
            <h2 className="text-accent-foreground">NORMAL MODE</h2>
            <div className="space-y-1 text-muted-foreground">
              <HelpShortcut shortcut="j" description="Select next file" />
              <HelpShortcut shortcut="k" description="Select previous file" />
              <HelpShortcut shortcut="Enter" description="Open selected file" />
              <HelpShortcut shortcut="1-6" description="Open file by number" />
              <HelpShortcut shortcut="Esc" description="Close help or command mode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HelpShortcut({ shortcut, description }: { shortcut: string; description: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3">
      <span className="text-primary">{shortcut}</span>
      <span>{description}</span>
    </div>
  )
}
