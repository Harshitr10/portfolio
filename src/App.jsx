import React, { useEffect, useState } from "react";
import TechBackdrop from "./components/TechBackdrop.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import ScatteredTechStack, { SKILL_ICONS, SKILL_BADGES } from "./components/ScatteredTechStack.jsx";

const RESUME_URL = "/Harshit_Rai_Resume.pdf";

const skillGroups = [
  { label: "Languages", items: ["Java", "JavaScript", "TypeScript", "SQL"] },
  {
    label: "Backend & messaging",
    items: [
      "Spring Boot", "Spring Batch", "RabbitMQ", "Kafka", "Redis",
      "Node.js", "Express.js", "NestJS", "REST APIs", "Microservices", "JUnit", "Mockito",
    ],
  },
  { label: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { label: "Cloud & DevOps", items: ["AWS EC2", "AWS S3", "Linux", "Git"] },
  { label: "AI / ML", items: ["Spring AI", "LLM integration", "RAG", "pgvector"] },
];

const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export default function App() {
  const active = useActiveSection(NAV_IDS);

  return (
    <div style={{ width: "100%", background: "var(--bg)" }}>
      {/* HERO */}
      <header className="pf-hero">
        <TechBackdrop />

        <div className="pf-wrap pf-hero-content">
          <div className="pf-hero-grid">
            <div className="pf-hero-text">
              <p className="pf-eyebrow pf-in pf-in-1">
                Backend Engineer <span className="pf-eyebrow-sep">/</span> Concurrency &amp; Distributed Systems
              </p>
              <h1 className="pf-name pf-in pf-in-2">Harshit Rai</h1>
              <p className="pf-tagline pf-in pf-in-3">
                Building concurrent backend systems that stay{" "}
                <span className="pf-gradient-text">correct under load</span>.
              </p>
              <p className="pf-lede pf-in pf-in-3">
                Two years owning distributed backend services end-to-end — worker pools, message queues, idempotent handlers, and retries that keep state consistent when everything runs at once.
              </p>

              <div className="pf-meta pf-in pf-in-4">
                <p className="pf-meta-role">
                  Software Engineer <span className="pf-at">@</span> RapiPay
                </p>
                <p className="pf-meta-line">Java · Spring Boot · Node.js · RabbitMQ · Kafka · Redis</p>
                <p className="pf-meta-line pf-meta-muted">Concurrency · Message Queues · Distributed Systems</p>
              </div>

              <div className="pf-cta pf-in pf-in-5">
                <a className="pf-btn pf-btn-primary" href="#experience">
                  View experience
                </a>
                <a className="pf-btn pf-btn-ghost" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                  Download résumé
                </a>
              </div>
            </div>

            <div className="pf-portrait pf-in pf-in-6">
              <div className="pf-portrait-panel" />
              <img src="/photo.png" alt="Harshit Rai" />
            </div>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="pf-nav" aria-label="Sections">
        <div className="pf-wrap pf-nav-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`pf-nav-link${active === item.id ? " is-active" : ""}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* EXPERIENCE */}
      <section id="experience" className="pf-wrap" style={{ paddingBlock: "clamp(56px, 8vw, 96px)", borderTop: "1px solid var(--line)" }}>
        <h2 style={sectionTitleStyle}>Experience</h2>

        <ExperienceTimeline />
      </section>

      {/* PROJECTS */}
      <section id="projects" className="pf-wrap" style={{ paddingBlock: "clamp(56px, 8vw, 96px)", borderTop: "1px solid var(--line)" }}>
        <h2 style={sectionTitleStyle}>Projects</h2>

        <div className="pf-grid-2">
        <div className="pf-card">
          <p style={caseTitleStyle}>Concurrent queue-processing engine</p>
          <p style={caseMetaStyle}>RapiPay · Company project · Team of 2</p>
          <ul style={listStyle}>
            <li style={liStyle}>
              <strong>Distributed transaction processing engine</strong> — designed a pipeline that divides transaction load across concurrent workers, enforcing idempotency, thread safety, and per-provider rate limits at intake. Priority-based queue routing cut average processing latency by <strong style={{ color: "var(--accent)" }}>20%</strong> and reduced upstream rate-limit errors by <strong style={{ color: "var(--accent)" }}>60%</strong>.
            </li>
            <li style={{ ...liStyle, marginBottom: 0 }}>
              <strong>State machine &amp; event-driven processing</strong> — enforced transaction state through an onHold / active / inactive state machine to safely park in-flight transactions pending upstream checks, publishing state-change events to Kafka for downstream consumers.
            </li>
          </ul>
        </div>

        <div className="pf-card">
          <p style={caseTitleStyle}>AI-based fraud detection engine</p>
          <p style={caseMetaStyle}>Individual project</p>
          <ul style={listStyle}>
            <li style={liStyle}>
              <strong>Rule-based scoring engine</strong> — a configurable, deterministic engine scoring transactions in real time across amount, velocity, time-of-day, and channel-novelty checks, classifying risk into LOW / MEDIUM / HIGH bands.
            </li>
            <li style={{ ...liStyle, marginBottom: 0 }}>
              <strong>RAG-based risk explanation</strong> — a Retrieval-Augmented Generation pipeline using pgvector to retrieve semantically similar historical fraud cases, grounding LLM-generated risk explanations (via Spring AI) in confirmed precedent rather than unguided inference.
            </li>
          </ul>
        </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="pf-skills" style={{ paddingBlock: "clamp(56px, 8vw, 96px)", borderTop: "1px solid var(--line)" }}>
        <ScatteredTechStack accent="#FF4368" opacity={0.1} icons={SKILL_ICONS} badges={SKILL_BADGES} />
        <div className="pf-wrap pf-skills-content">
        <h2 style={sectionTitleStyle}>Skills</h2>
        <div className="pf-skill-grid">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", margin: "0 0 12px" }}>{group.label}</p>
            <div className="pf-tag">
              {group.items.map((item) => (
                <span key={item} className="pf-tag-item">{item}</span>
              ))}
            </div>
          </div>
        ))}
        </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="pf-wrap" style={{ paddingBlock: "clamp(56px, 8vw, 96px)", borderTop: "1px solid var(--line)" }}>
        <h2 style={sectionTitleStyle}>Education</h2>
        <div className="pf-entry-head">
          <p style={{ fontWeight: 700, margin: "0 0 4px" }}>B.Tech, Computer Science — KIET Group of Institutions</p>
          <p style={dateStyle}>2021 — 2025</p>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.92rem", margin: 0 }}>Ghaziabad, UP · CGPA 7.72</p>
      </section>

      {/* CONTACT */}
      <footer id="contact" style={{ background: "var(--panel)", borderTop: "1px solid var(--line)", marginTop: 44, padding: "72px 0 80px" }}>
        <div className="pf-wrap">
          <h2 style={{ ...sectionTitleStyle, color: "var(--ink)" }}>Get in touch</h2>
          <p style={{ maxWidth: "50ch", margin: "0 0 26px", color: "#C9C6BF" }}>
            Open to backend SDE roles, especially work on concurrent and distributed systems.
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, fontFamily: "var(--font-mono)", fontSize: 14.5 }}>
            <ContactRow label="Email" href="mailto:raiharshit900@gmail.com" text="raiharshit900@gmail.com" />
            <ContactRow label="LinkedIn" href="https://linkedin.com/in/harshitr10" text="linkedin.com/in/harshitr10" external />
            <ContactRow label="GitHub" href="https://github.com/Harshitr10" text="github.com/Harshitr10" external />
            <ContactRow label="Résumé" href={RESUME_URL} text="Download" external last />
          </ul>
        </div>
      </footer>
    </div>
  );
}

function ContactRow({ label, href, text, external, last }) {
  return (
    <li style={{ marginBottom: last ? 0 : 12, display: "flex", gap: 14 }}>
      <span style={{ color: "#857F76", width: 76, flexShrink: 0, display: "inline-block" }}>{label}</span>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{ color: "var(--ink)" }}
      >
        {text}
      </a>
    </li>
  );
}

const sectionTitleStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)",
  letterSpacing: "-0.02em",
  margin: "0 0 36px",
};
const dateStyle = { fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap" };
const listStyle = { margin: 0, paddingLeft: 18 };
const liStyle = { marginBottom: 12, maxWidth: "90ch", lineHeight: 1.65 };
const caseTitleStyle = { fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, margin: "0 0 6px" };
const caseMetaStyle = { fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--muted)", margin: "0 0 12px" };
