"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TerminalEntry = {
  command?: string;
  promptPath?: string;
  lines: string[];
};

type Directory = {
  dirs?: string[];
  files?: Record<string, string[]>;
  hiddenDirs?: string[];
};

const filesystem: Record<string, Directory> = {
  "~": {
    dirs: ["experience", "production-work", "stack"],
    hiddenDirs: [".easter-eggs"],
    files: {
      "README.md": [
        "# jordi-roura",
        "",
        "4t de GEINF · UdG",
        "Developer & IT Consultant · Deister Software",
        "",
        "Aquest portfolio està pensat com una prova del que faig i de com penso,",
        "no com una llista infinita de tecnologies.",
      ],
      "contact.txt": [
        "email    → jroura2004@gmail.com",
        "linkedin → linkedin.com/in/jordi-roura-b3210a280",
        "github   → github.com/Sklatasang",
      ],
    },
  },
  "~/experience": {
    files: {
      "deister.md": [
        "# Deister Software",
        "Developer & IT Consultant · febrer 2025 — actualitat",
        "",
        "ERP, lògica de negoci, dades, integracions, automatització,",
        "reporting i debugging en entorns reals.",
      ],
      "udg.md": [
        "# Universitat de Girona",
        "Grau en Enginyeria Informàtica · 4t curs",
        "",
        "Software engineering, bases de dades, sistemes i algoritmes.",
      ],
    },
  },
  "~/production-work": {
    files: {
      "carrier-integrations.md": [
        "# Integracions amb transportistes",
        "",
        "SOAP / JSON · autenticació · tractament de respostes i errors",
        "Integració dels serveis externs dins del flux ERP existent.",
      ],
      "labels-printing.md": [
        "# Etiquetes i impressió",
        "",
        "PDF · FOP · XML · Code128 · CUPS",
        "Generació de documents i fluxos d'impressió amb fallbacks.",
      ],
      "data-debugging.md": [
        "# Debugging de dades i ERP",
        "",
        "SQL · Informix · joins · costos · signes · data mapping · traces",
        "Seguir una dada fins trobar el punt exacte on deixa de quadrar.",
      ],
      "automation.md": [
        "# Automatització",
        "",
        "JavaScript · XSQL-Script · validacions · business rules",
        "Reduir passos manuals i fer els processos més consistents.",
      ],
    },
  },
  "~/stack": {
    files: {
      "professional.txt": [
        "JavaScript",
        "XSQL-Script",
        "SQL / Informix",
        "XML / FOP",
        "ERP / APIs / SOAP / JSON / CUPS",
        "Git / debugging / traces / automation",
      ],
      "portfolio.txt": [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
        "GitHub Actions",
      ],
    },
  },
  "~/.easter-eggs": {
    files: {
      "README.txt": [
        "Has trobat la carpeta que no sortia amb un ls normal.",
        "",
        "Prova:",
        "cat 42.txt",
        "cat hire-me.sh",
        "cat backup-policy.txt",
      ],
      "42.txt": [
        "42",
        "",
        "Correct answer.",
        "Wrong question.",
      ],
      "hire-me.sh": [
        "#!/bin/sh",
        "",
        "echo \"No cal sudo.\"",
        "echo \"jroura2004@gmail.com\"",
      ],
      "backup-policy.txt": [
        "rm -rf / ?",
        "",
        "No pateixis.",
        "Git existeix per alguna cosa.",
      ],
    },
  },
};

const initialEntries: TerminalEntry[] = [
  {
    lines: [
      "Portfolio shell v4.0",
      "Escriu 'help' per començar.",
      "Si has utilitzat una terminal abans, prova les comandes que esperaries trobar-hi.",
    ],
  },
];

function joinPath(current: string, target: string) {
  if (target === "~" || target === "/") return "~";
  if (target === "..") {
    if (current === "~") return "~";
    return current.split("/").slice(0, -1).join("/") || "~";
  }

  const clean = target.replace(/^\.\//, "").replace(/\/$/, "");
  return current === "~" ? `~/${clean}` : `${current}/${clean}`;
}

export default function Terminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState("~");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(() => `jordi@portfolio:${cwd}$`, [cwd]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }, [entries]);

  const pushEntry = (command: string, lines: string[], promptPath = cwd) => {
    setEntries((current) => [
      ...current,
      {
        command,
        promptPath,
        lines,
      },
    ]);
  };

  const run = (rawCommand: string) => {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    const commandPath = cwd;

    setHistory((current) => [...current, command]);
    setHistoryIndex(-1);
    setValue("");

    if (normalized === "clear") {
      setEntries([]);
      return;
    }

    if (normalized === "help") {
      pushEntry(
        command,
        [
          "Navegació",
          "  pwd              ruta actual",
          "  ls               llista fitxers i carpetes",
          "  ls -a            inclou fitxers ocults",
          "  cd <carpeta>     entra en una carpeta",
          "  cd ..            torna enrere",
          "  cd ~             torna a l'arrel",
          "  cat <fitxer>     llegeix un fitxer",
          "",
          "Altres",
          "  git status",
          "  git log --oneline",
          "  whoami",
          "  clear",
          "",
          "Tip: com en una terminal real, un 'ls' no sempre t'ho ensenya tot.",
        ],
        commandPath,
      );
      return;
    }

    if (normalized === "pwd") {
      pushEntry(command, [cwd], commandPath);
      return;
    }

    if (normalized === "ls" || normalized === "ls -a" || normalized === "ls -la") {
      const directory = filesystem[cwd];
      const showHidden = normalized !== "ls";
      const items = [
        ...(directory.dirs ?? []).map((name) => `${name}/`),
        ...(showHidden ? (directory.hiddenDirs ?? []).map((name) => `${name}/`) : []),
        ...Object.keys(directory.files ?? {}),
      ];

      pushEntry(
        command,
        items.length ? items : ["(directori buit)"],
        commandPath,
      );
      return;
    }

    if (normalized === "cd" || normalized === "cd ~") {
      pushEntry(command, [], commandPath);
      setCwd("~");
      return;
    }

    if (normalized.startsWith("cd ")) {
      const target = command.slice(3).trim();
      const nextPath = joinPath(cwd, target);

      if (filesystem[nextPath]) {
        pushEntry(command, [], commandPath);
        setCwd(nextPath);
      } else {
        pushEntry(
          command,
          [`cd: no such directory: ${target}`, "Prova 'ls' per veure què tens aquí."],
          commandPath,
        );
      }
      return;
    }

    if (normalized.startsWith("cat ")) {
      const filename = command.slice(4).trim();
      const file = filesystem[cwd]?.files?.[filename];

      if (file) {
        pushEntry(command, file, commandPath);
      } else {
        pushEntry(
          command,
          [`cat: ${filename}: No such file`, "Prova 'ls' per veure els fitxers disponibles."],
          commandPath,
        );
      }
      return;
    }

    if (normalized === "whoami") {
      pushEntry(
        command,
        [
          "jordi",
          "developer, student, professional debugger of things that 'should work'.",
        ],
        commandPath,
      );
      return;
    }

    if (normalized === "git status") {
      pushEntry(
        command,
        [
          "On branch main",
          "Your branch is up to date.",
          "",
          "working tree clean",
          "learning tree: never clean",
        ],
        commandPath,
      );
      return;
    }

    if (normalized === "git log" || normalized === "git log --oneline") {
      pushEntry(
        command,
        [
          "5f628f6 structure production case studies",
          "a3c1f25 make work concrete",
          "c3f9ca4 add terminal easter eggs",
          "2025...  start working on production software",
          "2022...  begin GEINF",
        ],
        commandPath,
      );
      return;
    }

    if (normalized === "sudo hire-me") {
      pushEntry(
        command,
        [
          "[sudo] password for recruiter: ********",
          "Permission granted.",
          "",
          "No sudo needed, actually.",
          "→ jroura2004@gmail.com",
        ],
        commandPath,
      );
      return;
    }

    if (normalized === "rm -rf /") {
      pushEntry(
        command,
        [
          "rm: refusing to remove '/'",
          "",
          "A més, aquest portfolio està versionat amb Git.",
        ],
        commandPath,
      );
      return;
    }

    pushEntry(
      command,
      [
        `command not found: ${command}`,
        "Escriu 'help' si vols una pista.",
      ],
      commandPath,
    );
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
        <span className="terminal-title">jordi@portfolio · {cwd}</span>
        <span className="terminal-status">interactive</span>
      </div>

      <div
        ref={scrollRef}
        className="terminal-scroll"
        aria-live="polite"
      >
        {entries.map((entry, index) => (
          <div
            className="terminal-entry"
            key={`${entry.command ?? "intro"}-${index}`}
          >
            {entry.command && (
              <div className="terminal-command">
                <span className="terminal-prompt">
                  jordi@portfolio:{entry.promptPath ?? "~"}$
                </span>
                <span>{entry.command}</span>
              </div>
            )}

            {entry.lines.length > 0 && (
              <div className="terminal-output">
                {entry.lines.map((line, lineIndex) => (
                  <div key={`${line}-${lineIndex}`}>
                    {line || "\u00A0"}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="terminal-input-bar" onSubmit={submit}>
        <label className="sr-only" htmlFor="portfolio-terminal">
          Escriu una comanda
        </label>
        <span className="terminal-prompt">{prompt}</span>
        <div className="terminal-input-wrap">
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
        </div>
      </form>

      <div className="terminal-shortcuts" aria-label="Comandes ràpides">
        <span className="terminal-hint">prova:</span>
        {["help", "ls", "pwd", "git status"].map((command) => (
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
