import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";
import employees from "../../data/employees";
import projects from "../../data/projects";

const ticketBars = [38, 52, 46, 70, 58, 84, 64];

// Word-by-word animated headline
function AnimatedHeadline() {
  const line1 = ["Engineering", "the", "systems"];
  const line2 = ["behind", "every"];
  const accent = "blueprint.";

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  let wordIndex = 0;

  return (
    <h1
      style={{
        fontSize: "clamp(36px, 5.5vw, 60px)",
        fontWeight: 800,
        color: "#111827",
        letterSpacing: "-0.03em",
        lineHeight: 1.08,
        margin: "0 0 24px",
      }}
    >
      <span style={{ display: "block" }}>
        {line1.map((word) => {
          const i = wordIndex++;
          return (
            <motion.span
              key={word + i}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block", marginRight: "0.28em" }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
      <span style={{ display: "block" }}>
        {line2.map((word) => {
          const i = wordIndex++;
          return (
            <motion.span
              key={word + i}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block", marginRight: "0.28em" }}
            >
              {word}
            </motion.span>
          );
        })}
        <motion.span
          custom={wordIndex}
          variants={wordVariant}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-block",
            color: "#F26A21",
          }}
        >
          {accent}
        </motion.span>
      </span>
    </h1>
  );
}

function StatPill({ label, value, suffix = "", decimals = 0, delay = 0 }) {
  const [ref, display] = useCountUp(value, { delay });
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "0 32px",
        borderRight: "1px solid #E5E7EB",
      }}
    >
      <span
        style={{
          fontSize: "clamp(22px, 3vw, 30px)",
          fontWeight: 800,
          color: "#111827",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {decimals ? (display / Math.pow(10, decimals)).toFixed(decimals) : display}
        {suffix}
      </span>
      <span style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 500, letterSpacing: "0.02em" }}>
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: "#FFFFFF",
        padding: "120px 0 80px",
        position: "relative",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#F26A21",
              animation: "pulse-bw 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#6B7280",
              fontFamily: "monospace",
            }}
          >
            BW Design Group — Information Systems
          </span>
        </motion.div>

        {/* Headline */}
        <AnimatedHeadline />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          style={{
            fontSize: "18px",
            color: "#6B7280",
            lineHeight: 1.65,
            maxWidth: "540px",
            margin: "0 0 36px",
          }}
        >
          We design, ship, and maintain the platforms, security, and data infrastructure running underneath BW Design Group — so architects can stay focused on the drawings.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "64px" }}
        >
          <Link
            to="projects"
            smooth
            duration={500}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#111827",
              color: "#FFFFFF",
              padding: "13px 24px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F26A21")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111827")}
          >
            View active systems
            <ArrowRight size={14} />
          </Link>

          <Link
            to="team"
            smooth
            duration={500}
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "#111827",
              padding: "13px 24px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              border: "1px solid #E5E7EB",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#F26A21";
              e.currentTarget.style.color = "#F26A21";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.color = "#111827";
            }}
          >
            Meet the team
          </Link>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "stretch",
            borderTop: "1px solid #E5E7EB",
            paddingTop: "32px",
          }}
        >
          {/* First stat — no left padding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              paddingRight: "32px",
              borderRight: "1px solid #E5E7EB",
            }}
          >
            {(() => {
              const [ref, display] = [null, 9998];
              return (
                <div>
                  <span
                    style={{
                      fontSize: "clamp(22px, 3vw, 30px)",
                      fontWeight: 800,
                      color: "#111827",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    99.98%
                  </span>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", fontWeight: 500, marginTop: "4px" }}>
                    Uptime
                  </div>
                </div>
              );
            })()}
          </div>

          <StatPill label="Active systems" value={projects.length} delay={100} />
          <StatPill label="Team members" value={employees.length} delay={200} />

          {/* Ticket volume chart — last slot */}
          <div style={{ padding: "0 0 0 32px", flex: 1 }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#9CA3AF",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "8px",
              }}
            >
              Tickets / 7d
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "30px" }}>
              {ticketBars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.05, ease: "easeOut" }}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === ticketBars.length - 1 ? "#F26A21" : "#E5E7EB",
                    borderRadius: "3px",
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-bw {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}