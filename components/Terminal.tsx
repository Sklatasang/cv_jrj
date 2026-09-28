"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

type TerminalEntry = {
  command?: string;
  lines: string[];
};

const commands: Record<string, string[]> = {
  help: [
    "Comandes disponibles:",
    "about      qui soc",
    "work       què faig a la feina",
    "stack      tecnologies que utilitzo",
    "now        què estic fent ara",
    "contact    com contactar-me",
    "whoami     resposta curta",
    "clear      neteja la terminal",
  ],
  about: [
    "Soc en Jordi Roura.",
    "Estudio 4t d'Enginyeria Informàtica a la UdG i treballo a Deister Software.",
    "M'agrada sobretot entendre sistemes, seguir errors fins a l'origen i arreglar coses que no quadren.",
  ],
  work: [
    "Deister Software · Developer & IT Consultant · des de febrer de 2025",
    "ERP, lògica de negoci, SQL/Informix, XSQL-Script, JavaScript, integracions, reporting i debugging.",
    "La major part de la feina: entendre què està passant abans de tocar res.",
  ],
  stack: [
    "feina     → JavaScript · XSQL-Script · SQL · Informix · XML · FOP",
    "entorn    → ERP · business rules · integrations · reporting",
    "dia a dia → Git · debugging · traces · data mapping · automation",
    "portfolio → Next.js · React · TypeScript · Tailwind · Motion",
  ],
  now: [
    "4t de GEINF a la Universitat de Girona.",
    "Treballant a Deister Software.",
    "Intentant sortir de cada problema sabent una mica més que abans.",
  ],
  contact: [
    "email    → jroura2004@gmail.com",
    "linkedin → linkedin.com/in/jordi-roura-b3210a280",
  ],
  whoami: [
    "jordi",
    "software engineer in progress — però ja picant codi en producció.",
  ],
};

const initialEntries: TerminalEntry[] = [
  {
    lines: [
      "Portfolio shell v2.0",
      "Escriu 'help' o prova una de les comandes de sota.",
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
        `No conec la comanda "${command}".`,
        "Prova 'help' per veure què pots escriure.",
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
        {["help", "whoami", "work", "stack", "contact"].map((command) => (
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
