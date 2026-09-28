"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";

const skills = [
  "JavaScript",
  "TypeScript",
  "SQL",
  "Informix",
  "XSQL-Script",
  "XML",
  "FOP",
  "ERP",
  "Data modelling",
  "Debugging",
  "Git",
  "Business logic",
];

const cases = [
  {
    kicker: "ERP · Costs · Business logic",
    title: "Cost allocation & accounting logic",
    text: "Anàlisi i correcció de processos de càlcul de costos, signes, repartiments per unitat i fluxos de documents dins d’un ERP empresarial.",
    tags: ["SQL", "XSQL-Script", "Informix", "Debugging"],
  },
  {
    kicker: "Data · Integrations",
    title: "Cross-document data mapping",
    text: "Resolució de problemes de mapping entre capçaleres, línies i dossiers, treballant amb joins, referències, graelles analítiques i estructures de dades complexes.",
    tags: ["SQL", "ERP", "Data mapping", "Analytical grids"],
  },
  {
    kicker: "Automation · Internal tooling",
    title: "Workflow automation",
    text: "Desenvolupament de lògica per automatitzar processos, reduir operacions manuals i fer més robustos fluxos interns amb validacions i tractament d’errors.",
    tags: ["JavaScript", "XSQL-Script", "Automation", "Business rules"],
  },
];

const experience = [
  {
    period: "Feb. 2025 — Actualitat",
    role: "Developer & IT Consultant",
    company: "Deister Software",
    detail:
      "Desenvolupament i consultoria sobre software empresarial. Treball amb lògica de negoci, ERP, dades, integracions, automatització de processos, debugging i resolució d’incidències en entorns reals.",
  },
  {
    period: "2022 — Actualitat",
    role: "Grau en Enginyeria Informàtica",
    company: "Universitat de Girona · 4t curs",
    detail:
      "Formació en enginyeria del software, sistemes, bases de dades, algoritmes i desenvolupament d’aplicacions, combinada amb experiència professional paral·lela.",
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("jroura2004@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main>
      <header className="nav-shell">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="Jordi Roura">
            JR<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#experience">Experiència</a>
            <a href="#work">Treball</a>
            <a href="#stack">Stack</a>
            <a href="#contact">Contacte</a>
          </div>
        </nav>
      </header>

      <section id="top" className="hero container">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="availability">
            <span className="availability-dot" />
            Software Engineer · Girona / Barcelona
          </div>
          <p className="eyebrow">JORDI ROURA JIMÉNEZ</p>
          <h1>
            Construeixo software
            <br />
            <span>que resol problemes reals.</span>
          </h1>
          <p className="hero-lead">
            Estudiant de 4t d’Enginyeria Informàtica i desenvolupador a Deister
            Software. Especialitzat en software empresarial, lògica de negoci,
            dades, integracions i automatització.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">Veure què faig</a>
            <a
              className="button secondary"
              href="https://www.linkedin.com/in/jordi-roura-b3210a280/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
          <div className="hero-meta">
            <div><strong>1+ any</strong><span>experiència professional</span></div>
            <div><strong>4t GEINF</strong><span>Universitat de Girona</span></div>
            <div><strong>B2</strong><span>anglès</span></div>
          </div>
        </motion.div>

        <motion.div
          className="portrait-wrap"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className="portrait-card">
            <div className="terminal-bar">
              <span />
              <span />
              <span />
            </div>
            <img src="/foto.png" alt="Jordi Roura" className="portrait" />
            <div className="portrait-caption">
              <div>
                <span>focus</span>
                <strong>enterprise software</strong>
              </div>
              <div>
                <span>current</span>
                <strong>Deister Software</strong>
              </div>
            </div>
          </div>
          <div className="code-float code-a">{"SELECT · DEBUG · BUILD"}</div>
          <div className="code-float code-b">{"ERP / DATA / LOGIC"}</div>
        </motion.div>
      </section>

      <section className="marquee" aria-label="Tecnologies">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="section container">
        <SectionTitle eyebrow="01 · EXPERIÈNCIA" title="Experiència real abans d’acabar la carrera." />
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.role}>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section container">
        <SectionTitle
          eyebrow="02 · SELECTED WORK"
          title="No només tecnologies. Problemes que ja he hagut de resoldre."
        />
        <div className="case-grid">
          {cases.map((item, index) => (
            <motion.article
              className="case-card"
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span className="case-number">0{index + 1}</span>
              <p className="case-kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
        <p className="privacy-note">
          Els casos estan descrits de manera anonimitzada per respectar la
          confidencialitat dels projectes i clients.
        </p>
      </section>

      <section id="stack" className="section container">
        <SectionTitle eyebrow="03 · STACK" title="Tecnologia que utilitzo per construir i entendre sistemes." />
        <div className="stack-layout">
          <div className="stack-intro">
            <p>
              Em moc especialment bé quan el problema està entre <strong>codi,
              dades i negoci</strong>: entendre què està passant, trobar l’origen
              d’un error i convertir la solució en una implementació fiable.
            </p>
          </div>
          <div className="stack-grid">
            {[
              ["Development", "JavaScript · TypeScript · XSQL-Script · XML"],
              ["Data", "SQL · Informix · data modelling · queries"],
              ["Enterprise", "ERP · business rules · integrations · reporting"],
              ["Engineering", "Debugging · Git · automation · problem solving"],
            ].map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container about">
        <SectionTitle eyebrow="04 · PERFIL" title="Perfil tècnic amb mentalitat de producte." />
        <div className="about-grid">
          <p className="about-big">
            No m’interessa només “que funcioni”. M’interessa entendre
            <em> per què</em> funciona, què pot fallar i com fer que sigui més
            mantenible.
          </p>
          <div className="about-copy">
            <p>
              Compagino la universitat amb desenvolupament professional, fet que
              m’ha obligat a traslladar conceptes acadèmics a sistemes existents,
              amb dades reals, restriccions, dependències i impacte sobre usuaris.
            </p>
            <p>
              Busco continuar creixent en enginyeria del software, backend,
              dades, arquitectura i producte, treballant en equips on es valori
              el criteri tècnic i l’aprenentatge constant.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">CONTACTE</p>
            <h2>Parlem.</h2>
            <p>
              Obert a projectes, oportunitats i converses sobre software,
              backend, dades i producte.
            </p>
          </div>
          <div className="contact-actions">
            <button onClick={copyEmail} className="button primary">
              {copied ? "Email copiat ✓" : "Copiar email"}
            </button>
            <a
              className="button secondary dark"
              href="mailto:jroura2004@gmail.com"
            >
              jroura2004@gmail.com
            </a>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <span>© {year} Jordi Roura</span>
        <span>Built with Next.js · React · TypeScript · Tailwind · Motion</span>
      </footer>
    </main>
  );
}
