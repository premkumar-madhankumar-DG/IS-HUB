import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import skills, { categories } from "./Skills";

const ACCENT = "#F26A21";

function getTier(proficiency) {
  if (proficiency >= 90) return { label: "Expert", color: ACCENT };
  if (proficiency >= 75) return { label: "Advanced", color: "#FB923C" };
  if (proficiency >= 55) return { label: "Proficient", color: "#FDBA74" };
  return { label: "Familiar", color: "#9CA3AF" };
}

function categoryLabel(id) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/* Radial gauge that draws itself in once the card enters view. */
function RingGauge({ value, color, isInView, size = 60 }) {
  const stroke = 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", top: -6, left: -6, transform: "rotate(-90deg)" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#EEF0F2"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={
          isInView ? { strokeDashoffset: circumference - (value / 100) * circumference } : {}
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      />
    </svg>
  );
}

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 0 });
  const Icon = skill.icon;
  const tier = getTier(skill.proficiency);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${hovered ? "rgba(242,106,33,0.28)" : "#E5E7EB"}`,
        borderRadius: "16px",
        padding: "26px",
        boxShadow: hovered
          ? "0 18px 48px rgba(242,106,33,0.12), 0 2px 8px rgba(17,24,39,0.07)"
          : "0 2px 16px rgba(17,24,39,0.05)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s, border-color 0.25s",
      }}
    >
      {/* Cursor-tracked spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          background: `radial-gradient(180px circle at ${spot.x}% ${spot.y}%, rgba(242,106,33,0.07), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Animated top bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(to right, #F26A21, rgba(242,106,33,0.2))",
          transformOrigin: "left",
        }}
      />

      {/* Icon + gauge + tier pill */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <RingGauge value={skill.proficiency} color={tier.color} isInView={isInView} />
          <motion.div
            animate={{ background: hovered ? "#FFF4EE" : "#F3F4F6" }}
            transition={{ duration: 0.25 }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${hovered ? "rgba(242,106,33,0.2)" : "transparent"}`,
            }}
          >
            <Icon size={21} color={hovered ? ACCENT : "#6B7280"} strokeWidth={1.8} />
          </motion.div>
        </div>

        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: tier.color,
            background: tier.label === "Familiar" ? "#F3F4F6" : "#FFF7ED",
            border: `1px solid ${tier.label === "Familiar" ? "#E5E7EB" : "rgba(242,106,33,0.18)"}`,
            padding: "3px 10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
          }}
        >
          {tier.label}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#111827",
          margin: "0 0 4px",
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
        }}
      >
        {skill.name}
      </h3>

      {/* Category · years */}
      <p
        style={{
          fontSize: "11px",
          fontFamily: "monospace",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#9CA3AF",
          margin: "0 0 14px",
        }}
      >
        {categoryLabel(skill.category)} · {skill.years} {skill.years === 1 ? "yr" : "yrs"}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "#6B7280",
          lineHeight: 1.65,
          margin: "0 0 20px",
          flex: 1,
        }}
      >
        {skill.description}
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F3F4F6", marginBottom: "14px" }} />

      {/* Proficiency footer */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#9CA3AF",
            }}
          >
            Proficiency
          </span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "monospace",
              fontWeight: 700,
              color: tier.color,
            }}
          >
            {skill.proficiency}%
          </span>
        </div>
        <div
          style={{
            height: "5px",
            borderRadius: "4px",
            background: "#F3F4F6",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "100%",
              borderRadius: "4px",
              background: tier.color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsTools() {
  const [active, setActive] = useState("all");
  const headerRef = useRef(null);

  const filtered = useMemo(
    () => (active === "all" ? skills : skills.filter((s) => s.category === active)),
    [active]
  );

  const tabs = useMemo(() => [{ id: "all", label: "All" }, ...categories], []);

  return (
    <section
      id="skills"
      style={{
        background: "#F3F4F6",
        padding: "88px 0 80px",
        borderBottom: "1px solid #E5E7EB",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes skillsBlobDrift1 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(40px, 30px) scale(1.12); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes skillsBlobDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-30px, -24px) scale(1.08); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes skillsTickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes skillsPulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        .skills-ticker-track { animation: skillsTickerScroll 38s linear infinite; }
        .skills-ticker-track:hover { animation-play-state: paused; }
        .skills-pulse-dot { animation: skillsPulseDot 2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .skills-ticker-track, .skills-pulse-dot, .skills-blob { animation: none !important; }
        }
      `}</style>

      {/* Ambient background blobs */}
      <div
        className="skills-blob"
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,106,33,0.10), transparent 70%)",
          filter: "blur(10px)",
          animation: "skillsBlobDrift1 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        className="skills-blob"
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-40px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,106,33,0.08), transparent 70%)",
          filter: "blur(10px)",
          animation: "skillsBlobDrift2 20s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 32px", position: "relative" }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "32px" }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: ACCENT,
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: "10px",
            }}
          >
            Technical Capabilities
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.025em",
                  margin: "0 0 10px",
                  lineHeight: 1.1,
                }}
              >
                Skills &amp; Tools
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  maxWidth: "440px",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                The languages, frameworks, and platforms our team uses every day — tracked by
                how deep that experience actually runs.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "#9CA3AF",
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              <span
                className="skills-pulse-dot"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              />
              {skills.length} tools across {categories.length} domains
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  position: "relative",
                  border: "none",
                  background: "transparent",
                  padding: "9px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  color: isActive ? "#FFFFFF" : "#374151",
                  isolation: "isolate",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "999px",
                      background: ACCENT,
                      zIndex: -1,
                    }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginBottom: "44px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Ambient capability ticker */}
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            paddingTop: "20px",
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div
            className="skills-ticker-track"
            style={{
              display: "flex",
              width: "max-content",
              gap: "28px",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "#9CA3AF",
              whiteSpace: "nowrap",
            }}
          >
            {[...skills, ...skills].map((skill, i) => (
              <span key={`${skill.id}-${i}`} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, opacity: 0.6 }} />
                {skill.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}