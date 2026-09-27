import React from "react";

/**
 * ScatteredTechStack
 * ---------------------------------------------------------------
 * Real brand logos, scattered as a faint background layer, pulled
 * live from the Simple Icons CDN (https://simpleicons.org). No logo
 * assets are bundled in this repo — each <img> just points at the
 * CDN, which also handles brand coloring via /<slug>/<hexColor>.
 *
 * NOTE on Java: Simple Icons has no official "Java" mark (Oracle
 * trademark) — "openjdk" is the closest standard equivalent used
 * across dev portfolios. Swap the slug if you'd rather use another.
 *
 * NOTE on Spring AI and AWS: no CDN icon exists (Spring AI has none
 * yet, AWS marks were removed from Simple Icons), so they render as
 * plain text badges instead.
 *
 * Pass `icons` / `badges` to use a different layout; defaults are the
 * hero layout.
 */

export const HERO_ICONS = [
  { slug: "openjdk", label: "Java", color: "F0713C", top: 6, left: 4, size: 70, rotate: -14 },
  { slug: "springboot", label: "Spring Boot", color: "6DB33F", top: 66, left: 2, size: 64, rotate: 9 },
  { slug: "apachekafka", label: "Kafka", color: "F2F0EC", top: 2, left: 44, size: 56, rotate: 16 },
  { slug: "rabbitmq", label: "RabbitMQ", color: "FF6600", top: 88, left: 36, size: 60, rotate: -7 },
  { slug: "mongodb", label: "MongoDB", color: "4DB33D", top: 14, left: 80, size: 74, rotate: 11 },
  { slug: "redis", label: "Redis", color: "D82C20", top: 74, left: 84, size: 58, rotate: -15 },
  { slug: "postgresql", label: "PostgreSQL", color: "4A90D9", top: 42, left: 92, size: 66, rotate: 6 },
  { slug: "nodedotjs", label: "Node.js", color: "83CD29", top: 90, left: 70, size: 54, rotate: -9 },
];

export const HERO_BADGES = [
  { label: "Spring AI", text: "Ai", top: 8, left: 62, size: 50, rotate: -11 },
  { label: "AWS", text: "AWS", top: 32, left: 0, size: 60, rotate: 19 },
];

export const SKILL_ICONS = [
  { slug: "openjdk", label: "Java", color: "F0713C", top: 4, left: 70, size: 72, rotate: 12 },
  { slug: "javascript", label: "JavaScript", color: "F7DF1E", top: 10, left: 90, size: 48, rotate: -8 },
  { slug: "typescript", label: "TypeScript", color: "3178C6", top: 28, left: 80, size: 54, rotate: 14 },
  { slug: "springboot", label: "Spring Boot", color: "6DB33F", top: 22, left: 58, size: 60, rotate: -12 },
  { slug: "apachekafka", label: "Kafka", color: "F2F0EC", top: 46, left: 90, size: 58, rotate: -6 },
  { slug: "rabbitmq", label: "RabbitMQ", color: "FF6600", top: 40, left: 68, size: 50, rotate: 18 },
  { slug: "redis", label: "Redis", color: "D82C20", top: 58, left: 78, size: 64, rotate: 9 },
  { slug: "nodedotjs", label: "Node.js", color: "83CD29", top: 70, left: 92, size: 50, rotate: -16 },
  { slug: "express", label: "Express.js", color: "F2F0EC", top: 3, left: 44, size: 44, rotate: 7 },
  { slug: "nestjs", label: "NestJS", color: "E0234E", top: 76, left: 64, size: 52, rotate: 11 },
  { slug: "mongodb", label: "MongoDB", color: "4DB33D", top: 86, left: 82, size: 60, rotate: -10 },
  { slug: "mysql", label: "MySQL", color: "4479A1", top: 62, left: 52, size: 56, rotate: 6 },
  { slug: "postgresql", label: "PostgreSQL", color: "4A90D9", top: 90, left: 46, size: 58, rotate: -7 },
  { slug: "junit5", label: "JUnit", color: "25A162", top: 34, left: 46, size: 42, rotate: -18 },
  { slug: "linux", label: "Linux", color: "FCC624", top: 92, left: 20, size: 50, rotate: 13 },
  { slug: "git", label: "Git", color: "F05032", top: 50, left: 36, size: 44, rotate: -9 },
];

export const SKILL_BADGES = [
  { label: "Spring AI", text: "Ai", top: 16, left: 34, size: 46, rotate: -11 },
  { label: "AWS", text: "AWS", top: 80, left: 4, size: 54, rotate: 15 },
];

export default function ScatteredTechStack({
  accent = "#FF4368",
  opacity = 0.09,
  icons = HERO_ICONS,
  badges = HERO_BADGES,
}) {
  return (
    <div className="scattered-stack" aria-hidden="true">
      <style>{`
        .scattered-stack { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .scattered-stack img, .scattered-stack .badge-fallback { position: absolute; }
        .scattered-stack .badge-fallback {
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px; border: 1px solid currentColor;
          font-family: var(--font-display); font-weight: 700;
        }
      `}</style>

      {icons.map((icon) => (
        <img
          key={icon.slug}
          src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
          alt=""
          width={icon.size}
          height={icon.size}
          loading="lazy"
          style={{
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            width: icon.size,
            height: icon.size,
            opacity,
            transform: `rotate(${icon.rotate}deg)`,
          }}
        />
      ))}

      {badges.map((badge) => (
        <div
          key={badge.label}
          className="badge-fallback"
          title={badge.label}
          style={{
            top: `${badge.top}%`,
            left: `${badge.left}%`,
            width: badge.size,
            height: badge.size,
            fontSize: badge.size * (badge.text.length > 2 ? 0.26 : 0.28),
            opacity,
            transform: `rotate(${badge.rotate}deg)`,
            color: accent,
          }}
        >
          {badge.text}
        </div>
      ))}
    </div>
  );
}
