"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Terminal from "@/components/Terminal";

const skills = [
  "JavaScript",
  "XSQL-Script",
  "SQL",
  "Informix",
  "XML",
  "FOP",
  "ERP",
  "Debugging",
  "Git",
  "Integrations",
  "Automation",
  "TypeScript",
];

const cases = [
  {
    kicker: "INTEGRACIONS · APIs",
    title: "Connectar un ERP amb transportistes",
    problem:
      "Integrar serveis externs dins d'un flux ERP sense convertir els errors de xarxa, autenticació o format en un problema per a l'usuari.",
    contribution:
      "He treballat amb peticions SOAP/JSON, autenticació, tractament de respostes i errors, i amb la lògica necessària perquè la integració encaixi amb el procés de negoci existent.",
    tags: ["SOAP", "JSON", "XSQL-Script", "ERP"],
  },
  {
    kicker: "DOCUMENTS · IMPRESSIÓ",
    title: "De les dades a una etiqueta imprimible",
    problem:
      "Transformar dades del sistema en documents i etiquetes que després s'han de generar, llegir i imprimir de manera fiable.",
    contribution:
      "Generació de PDFs i etiquetes amb codis Code128, formats configurables i fluxos d'impressió amb CUPS, incloent gestió de fallbacks quan alguna peça del procés falla.",
    tags: ["FOP", "XML", "Code128", "CUPS"],
  },
  {
    kicker: "ERP · DADES",
    title: "Seguir una dada fins trobar on es trenca",
    problem:
      "Quan el resultat final no quadra, l'error pot estar en un join, una referència, un signe, una línia o una regla aplicada diversos passos abans.",
    contribution:
      "Debugging de costos i repartiments, joins entre capçaleres/línies/dossiers, data mapping i revisió de traces fins localitzar l'origen real del problema.",
    tags: ["SQL", "Informix", "Debugging", "Data mapping"],
  },
  {
    kicker: "PROCESSOS · AUTOMATITZACIÓ",
    title: "Treure passos manuals del mig",
    problem:
      "Alguns fluxos funcionen, però obliguen a repetir massa passos o depenen de massa comprovacions manuals.",
    contribution:
      "Implementació de lògica, validacions i automatitzacions per fer processos més consistents i reduir punts de fallada evitables.",
    tags: ["JavaScript", "XSQL-Script", "Automation", "Business rules"],
  },
];

const experience = [
  {
    period: "FEB. 2025 — ARA",
    role: "Developer & IT Consultant",
    company: "Deister Software",
    detail:
      "Vaig entrar mentre estudiava i, des de llavors, he anat tocant software empresarial des de bastants angles: lògica de negoci, ERP, dades, integracions, automatització, reporting i debugging. M'he acostumat sobretot a entrar en problemes que no conec d'entrada i anar-los desfent fins que tenen sentit.",
    tags: ["ERP", "SQL / Informix", "XSQL-Script", "JavaScript"],
  },
  {
    period: "2022 — ARA",
    role: "Grau en Enginyeria Informàtica",
    company: "Universitat de Girona · 4t curs",
    detail:
      "La carrera m'ha donat la base d'enginyeria del software, sistemes, bases de dades i algoritmes. Compaginar-la amb la feina m'ha anat bé perquè moltes coses deixen de ser teoria quan després les trobes en un sistema real.",
    tags: ["Software engineering", "Databases", "Systems"],
  },
];

function SectionTitle({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-index">{eyebrow}</span>
        {note && <p className="section-note">{note}</p>}
      </div>
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
            <a href="#work">Feina</a>
            <a href="#stack">Stack</a>
            <a href="#terminal">Terminal</a>
          </div>

          <a className="nav-contact" href="#contact">
            Contacte
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section id="top" className="hero container">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="status-group">
            <span className="status-label">
              <span className="availability-dot" />
              Ara mateix
            </span>
            <span className="status-text">Deister Software + 4t GEINF</span>
          </div>

          <p className="eyebrow">JORDI ROURA · SOFTWARE ENGINEER</p>

          <h1>
            Faig software.
            <br />
            I m&apos;agrada entendre
            <br />
            <span>què passa sota el capó.</span>
          </h1>

          <p className="hero-lead">
            Soc en Jordi. Estudio 4t d&apos;Enginyeria Informàtica a la UdG i
            treballo a Deister Software des de 2025. El que més m&apos;agrada és
            agafar un problema que al principi no quadra i anar estirant del fil
            fins que entenc d&apos;on surt.
          </p>

          <div className="hero-actions">
            <a className="button primary" href="#work">
              Veure en què he treballat
            </a>
            <a
              className="button secondary"
              href="https://github.com/Sklatasang"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/jordi-roura-b3210a280/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">FEINA</span>
              <strong>Deister · des de 2025</strong>
            </div>
            <div>
              <span className="meta-label">ARA</span>
              <strong>4t de GEINF · UdG</strong>
            </div>
            <div>
              <span className="meta-label">IDIOMES</span>
              <strong>CAT · ES · EN B2</strong>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="portrait-wrap"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <div className="portrait-card">
            <div className="window-bar">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="window-title">profile.tsx</span>
              <span className="window-chip">live</span>
            </div>

            <img src="foto.png" alt="Jordi Roura" className="portrait" />

            <div className="portrait-caption">
              <div>
                <span>actualment</span>
                <strong>Developer · Deister</strong>
              </div>
              <div>
                <span>estudiant</span>
                <strong>4t GEINF · UdG</strong>
              </div>
            </div>
          </div>

          <div className="code-float code-a">trace → sql → fix</div>
          <div className="code-float code-b">learning by debugging</div>
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
        <SectionTitle
          eyebrow="01 · EXPERIÈNCIA"
          title="La carrera m'ha donat la base. La feina m'ha obligat a fer-la servir."
          note="Sense barres de skills al 93%. Prefereixo explicar què he fet."
        />

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={item.role}>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-content">
                <div className="timeline-heading">
                  <div>
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                  </div>
                  <span className="timeline-arrow" aria-hidden="true">↘</span>
                </div>
                <p className="timeline-detail">{item.detail}</p>
                <div className="tags timeline-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section container">
        <SectionTitle
          eyebrow="02 · FEINA"
          title="Algunes coses que m'he trobat treballant."
          note="Casos reals explicats sense dades internes ni noms de clients."
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
              <div className="case-topline">
                <span className="case-number">0{index + 1}</span>
                <span className="case-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="case-kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <div className="case-story">
                <div>
                  <span>EL PROBLEMA</span>
                  <p>{item.problem}</p>
                </div>
                <div>
                  <span>QUÈ HI HE FET</span>
                  <p>{item.contribution}</p>
                </div>
              </div>
              <div className="tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="work-proof">
          <div>
            <span className="proof-label">CODI PROFESSIONAL</span>
            <strong>Privat per confidencialitat.</strong>
            <p>Per això explico context, problema, contribució i tecnologia sense inventar captures ni exposar informació interna.</p>
          </div>
          <div>
            <span className="proof-label">CODI QUE SÍ POTS VEURE</span>
            <strong>Aquest portfolio.</strong>
            <p>Next.js, React, TypeScript, Tailwind i la terminal interactiva estan al meu GitHub.</p>
            <a href="https://github.com/Sklatasang/cv_jrj" target="_blank" rel="noreferrer">
              Veure repositori ↗
            </a>
          </div>
        </div>
      </section>

      <section id="stack" className="section container">
        <SectionTitle
          eyebrow="03 · STACK"
          title="El que faig servir de veritat."
          note="Separat entre la feina i aquesta web perquè no sembli que treballo amb tot cada dia."
        />

        <div className="stack-layout">
          <div className="stack-intro">
            <p>
              No intento omplir el portfolio amb cinquanta logos. Em sembla més
              útil poder dir <strong>on</strong> he fet servir cada cosa i
              <strong> per a què</strong>.
            </p>
          </div>

          <div className="stack-grid">
            {[
              ["A la feina", "JavaScript · XSQL-Script · SQL · Informix · XML · FOP"],
              ["Entorn", "ERP · business rules · integrations · reporting"],
              ["Dia a dia", "Git · debugging · traces · data mapping · automation"],
              ["Aquesta web", "Next.js · React · TypeScript · Tailwind · Motion"],
            ].map(([title, text], index) => (
              <article key={title}>
                <span className="stack-number">0{index + 1}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container about">
        <SectionTitle
          eyebrow="04 · COM TREBALLO"
          title="Més de seguir el fil que de fer màgia."
        />

        <div className="about-grid">
          <p className="about-big">
            Si alguna cosa no quadra, em costa deixar-la estar fins que
            <em> entenc d&apos;on surt.</em>
          </p>

          <div className="about-copy">
            <p>
              A la feina m&apos;he acostumat a entrar en codi que no he escrit
              jo, seguir traces, revisar dades i entendre regles de negoci abans
              de decidir on està realment el problema.
            </p>
            <p>
              No em considero expert en tot el que surt aquí —ni vull que el
              portfolio ho sembli—. Prefereixo ensenyar una base sòlida, coses
              que ja he tocat de veritat i moltes ganes de continuar pujant el
              nivell.
            </p>
          </div>
        </div>
      </section>

      <section id="terminal" className="section terminal-section">
        <div className="container">
          <SectionTitle
            eyebrow="05 · PLAYGROUND"
            title="Una manera menys avorrida de llegir el CV."
            note="Sí, funciona. Escriu help i remena."
          />
          <Terminal />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container contact-inner">
          <div>
            <p className="eyebrow">CONTACTE</p>
            <h2>Ens llegim.</h2>
            <p>
              Per feina, un projecte o perquè t&apos;ha cridat l&apos;atenció
              alguna cosa del portfolio. Em pots escriure directament.
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
        <span>Fet amb Next.js · React · TypeScript · Tailwind · Motion</span>
      </footer>
    </main>
  );
}
