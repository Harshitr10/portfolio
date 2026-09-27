import React from "react";

/**
 * TechBackdrop
 * ---------------------------------------------------------------
 * Subtle "engineered" hero background: a faint grid, a few
 * transaction-flow lines with travelling pulses, pulsing nodes, and
 * small API/code fragments. Everything sits at low contrast so it
 * never competes with the name or photo, and animation stops for
 * visitors who prefer reduced motion.
 */

const SNIPPETS = [
  { text: "executor.submit(task)", top: 9, left: 58 },
  { text: "200 OK", top: 16, left: 86 },
  { text: "{ }", top: 30, left: 4 },
  { text: "ConcurrentHashMap<K, V>", top: 88, left: 52 },
  { text: "idempotency-key: 7f3a…c9", top: 93, left: 6 },
  { text: "</>", top: 72, left: 93 },
  { text: "retry(3, backoff)", top: 80, left: 78 },
  { text: "/api", top: 4, left: 30 },
  { text: "lock.tryLock()", top: 62, left: 2 },
];

// Flow paths in a 1000x600 viewBox, stretched to the hero.
const FLOWS = [
  "M 0 120 H 260 V 60 H 560 V 140 H 1000",
  "M 0 470 H 180 V 540 H 470 V 500 H 1000",
  "M 640 0 V 90 H 780 V 360 H 1000",
];

const NODES = [
  [260, 60], [560, 140], [180, 540], [470, 500], [780, 90], [780, 360],
];

export default function TechBackdrop() {
  return (
    <div className="pf-backdrop" aria-hidden="true">
      <div className="pf-backdrop-grid" />

      <svg className="pf-backdrop-flows" viewBox="0 0 1000 600" preserveAspectRatio="none">
        {FLOWS.map((d, i) => (
          <g key={d}>
            <path d={d} className="pf-flow-base" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              className="pf-flow-pulse"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * -2.3}s` }}
            />
          </g>
        ))}
      </svg>

      {NODES.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className="pf-node"
          style={{
            left: `${x / 10}%`,
            top: `${y / 6}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      {SNIPPETS.map((s) => (
        <span
          key={s.text}
          className={`pf-snippet${s.left < 10 ? " pf-snippet-edge" : ""}`}
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
