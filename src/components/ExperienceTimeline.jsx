import React, { useEffect, useRef } from "react";

/**
 * ExperienceTimeline
 * ---------------------------------------------------------------
 * Roles sit on a vertical "flow line" (same visual language as the
 * hero backdrop: faint line, travelling accent pulse, pulsing nodes).
 * Each piece of work is a card with a pulse tracing its border, and
 * cards reveal one after another as they scroll into view.
 */

const Metric = ({ children }) => <strong className="pf-metric">{children}</strong>;

const ROLES = [
  {
    title: "Software Engineer",
    company: "RapiPay",
    dates: "Jul 2025 — Present",
    location: "Noida, UP",
    items: [
      {
        title: "Fault-tolerant multi-provider integration",
        body: (
          <>
            Integrated fetch and payment flows across multiple external providers (BBPS billers), with resilient retry and error handling plus an automated compensating refund path for failed requests, reaching a <Metric>90%</Metric> success rate.
          </>
        ),
      },
      {
        title: "Automated data reconciliation service",
        body: (
          <>
            Built a service that diffs internal records against multiple external partner data sources, service-wise, to surface mismatched or missing entries, replacing manual spreadsheet cross-checking and cutting effort by nearly <Metric>70%</Metric>.
          </>
        ),
      },
      {
        title: "Queue-based transfer processing with deduplication",
        body: (
          <>
            Built a queue-driven service for internal fund transfers that rejects duplicate requests, processes single requests individually and switches to bulk batch processing above a configurable threshold, gated by a maker-checker approval workflow.
          </>
        ),
      },
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "RapiPay",
    dates: "Aug 2024 — Jul 2025",
    location: "Noida, UP",
    items: [
      {
        title: "Idempotent webhook & event processing",
        body: (
          <>
            Applied Redis-backed idempotent webhook handling for real-time error monitoring, with RabbitMQ queue consumers driving instant confirmation alerts. Also built a scheduled QR generation service and a device activation service across POS hardware.
          </>
        ),
      },
    ],
  },
];

const STAGGER_MS = 160;

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll("[data-reveal]");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

function CardBorderPulse({ delay }) {
  return (
    <svg className="pf-xp-border" aria-hidden="true">
      <rect className="pf-xp-border-pulse" pathLength="1000" rx="16" ry="16" style={{ animationDelay: delay }} />
    </svg>
  );
}

export default function ExperienceTimeline() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  let cardIndex = 0;

  return (
    <div className="pf-timeline" ref={rootRef}>
      <span className="pf-timeline-pulse" aria-hidden="true" />

      {ROLES.map((role) => (
        <div className="pf-tl-role" key={role.title}>
          <span className="pf-tl-node" aria-hidden="true" />
          <div className="pf-tl-head pf-reveal" data-reveal>
            <h3 className="pf-tl-title">
              {role.title} <span className="pf-at">@</span> {role.company}
            </h3>
            <p className="pf-tl-meta">
              {role.dates} <span className="pf-eyebrow-sep">·</span> {role.location}
            </p>
          </div>

          <div className="pf-xp-grid">
            {role.items.map((item, i) => {
              cardIndex += 1;
              return (
                <article
                  key={item.title}
                  className="pf-xp-card pf-reveal"
                  data-reveal
                  style={{ "--reveal-delay": `${(i + 1) * STAGGER_MS}ms` }}
                >
                  <CardBorderPulse delay={`${-cardIndex * 1.7}s`} />
                  <p className="pf-xp-index">{String(cardIndex).padStart(2, "0")}</p>
                  <h4 className="pf-xp-title">{item.title}</h4>
                  <p className="pf-xp-body">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
