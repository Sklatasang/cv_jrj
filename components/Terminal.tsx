"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

type TerminalEntry = {
  command?: string;
  lines: string[];
};

const commands: Record<string, string[]> = {
  help: [
    "Comandes:",
    "about        qui soc",
    "work         feina real que he fet",
    "stack        tecnologies amb context",
    "now          què estic fent ara",
    "contact      com trobar-me",
    "ls           què hi ha per aquí",
    "git status   estat actual",
    "clear        neteja la terminal",
    "",
    "Pista: hi ha alguna comanda que no surt aquí.",
  ],
  about: [
    "Jordi Roura.",
    "4t d'Enginyeria Informàtica a la UdG + Developer & IT Consultant a Deister Software.",
    "M'agrada especialment seguir errors, entendre dades i regles de negoci i trobar el punt exacte on una cosa deixa de quadrar.",
  ],
  work: [
    "Feina de producció, no tutorials:",
    "• integracions de transportistes amb SOAP/JSON i autenticació",
    "• generació d'etiquetes/PDF amb Code128 i formats configurables",
    "• fluxos d'impressió amb CUPS i gestió de fallbacks",
    "• ERP, costos, signes, joins, data mapping i automatització",
    "",
    "El codi professional és privat; al portfolio explico el problema, l'enfocament i la tecnologia sense exposar dades internes.",
  ],
  stack: [
    "professional → JavaScript · XSQL-Script · SQL · Informix · XML · FOP",
    "systems      → ERP · APIs · SOAP/JSON · CUPS · reporting",
    "everyday     → Git · debugging · traces · data mapping · automation",
    "portfolio    → Next.js · React · TypeScript · Tailwind · Motion",
  ],
  now: [
    "Treballant a Deister Software des de febrer de 2025.",
    "Cursant 4t de GEINF a la Universitat de Girona.",
    "Objectiu: continuar guanyant profunditat en software, backend, dades i arquitectura.",
  ],
  contact: [
    "email    → jroura2004@gmail.com",
    "linkedin → linkedin.com/in/jordi-roura-b3210a280",
    "github   → github.com/Sklatasang",
  ],
  ls: [
    "about.md",
    "experience/",
    "production-work/",
    "stack.json",
    "contact.txt",
    ".easter-eggs",
  ],
  "cat readme.md": [
    "# jordi-roura",
    "",
    "No soc expert en tot el que surt aquí.",
    "Sí que ho he tocat, ho he hagut d'entendre i m'hi he barallat quan alguna cosa fallava.",
    "",
    "Aquest portfolio també és part de la prova: React, TypeScript, Next.js i una mica de massa entusiasme amb la terminal.",
  ],
  "git status": [
    "On branch main",
    "Your branch is up to date.",
    "",
    "working tree clean",
    "learning tree: never clean",
  ],
  "git log": [
    "319586b  refine portfolio UI",
    "981ca2e  make copy sound like a human",
    "70d43e1  add interactive terminal",
    "2025...   start working on real software",
    "2022...   begin GEINF",
  ],
  "git log --oneline": [
    "319586b refine portfolio UI",
    "981ca2e humanize copy",
    "70d43e1 add terminal",
    "2025... start Deister",
    "2022... start GEINF",
  ],
  "sudo hire-me": [
    "[sudo] password for recruiter: ********",
    "Permission granted.",
    "",
    "No sudo needed, actually.",
    "→ jroura2004@gmail.com",
  ],
  "rm -rf /": [
    "Nice try.",
    "This portfolio has backups. Probably.",
  ],
  "42": [
    "Correct answer.",
    "Wrong question.",
  ],
};

const initialEntries: TerminalEntry[] = [
  {
    lines: [
      "Portfolio shell v3.0",
      "Escriu 'help'. O prova coses que escriuries en una terminal de veritat.",
    ],
  },
];

export default function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();

    if (normalized === "clear") {
      setEntries([]);
      setHistory((current) => [...current, command]);
      setHistoryIndex(-1);
      setValue("");
      return;
    }

    const lines =
      commands[normalized] ??
      [
        `command not found: ${command}`,
        "Prova 'help'. Si tens curiositat, prova també alguna comanda típica de git o unix.",
      ];

    setEntries((current) => [...current, { command, lines }]);
    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setValue("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!history.length) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        historyIndex < 0
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < 0) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }

      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    }
  };

  return (
    <div className="terminal-shell" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-topbar">
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal-title">jordi@portfolio: ~</span>
        <span className="terminal-status">interactive</span>
      </div>

      <div className="terminal-body" aria-live="polite">
        {entries.map((entry, index) => (
          <div className="terminal-entry" key={`${entry.command ?? "intro"}-${index}`}>
            {entry.command && (
              <div className="terminal-command">
                <span className="terminal-prompt">jordi@portfolio:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            <div className="terminal-output">
              {entry.lines.map((line, lineIndex) => (
                <div key={`${line}-${lineIndex}`}>{line || "\u00A0"}</div>
              ))}
            </div>
          </div>
        ))}

        <form className="terminal-input-row" onSubmit={submit}>
          <label className="sr-only" htmlFor="portfolio-terminal">
            Escriu una comanda
          </label>
          <span className="terminal-prompt">jordi@portfolio:~$</span>
          <input
            id="portfolio-terminal"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal interactiva"
          />
          <span className="terminal-cursor" aria-hidden="true" />
        </form>
      </div>

      <div className="terminal-shortcuts" aria-label="Comandes ràpides">
        {["help", "about", "work", "stack", "git status"].map((command) => (
          <button
            key={command}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              run(command);
            }}
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
