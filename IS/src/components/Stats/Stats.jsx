import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Folder, Users, Rocket, Globe } from "lucide-react";

const stats = [
  {
    icon: Folder,
    value: 120,
    suffix: "+",
    title: "Projects Delivered",
    description: "End-to-end systems shipped on time",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    title: "Team Members",
    description: "Specialists across every discipline",
  },
  {
    icon: Rocket,
    value: 8,
    suffix: "+",
    title: "Years of Experience",
    description: "Continuously building, never standing still",
  },
  {
    icon: Globe,
    value: 20,
    suffix: "+",
    title: "Countries Served",
    description: "Global reach, local understanding",
  },
];

function useCountUp(target, isInView) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return count;
}

function StatCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(item.value, isInView);
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(17,24,39,0.06)",
        cursor: "default",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(242,106,33,0.12), 0 2px 8px rgba(17,24,39,0.08)";
        e.currentTarget.style.borderColor = "rgba(242,106,33,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(17,24,39,0.06)";
        e.currentTarget.style.borderColor = "#E5E7EB";
      }}
    >
      {/* Top accent bar — animates in on view */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
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

      {/* Icon */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.15, type: "spring", stiffness: 260 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "#FFF4EE",
          border: "1px solid rgba(242,106,33,0.15)",
          marginBottom: "20px",
        }}
      >
        <Icon size={22} color="#F26A21" strokeWidth={1.8} />
      </motion.div>

      {/* Count */}
      <div
        style={{
          fontSize: "42px",
          fontWeight: 800,
          color: "#111827",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: "6px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ color: "#F26A21" }}>{item.suffix}</span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "13px",
          color: "#9CA3AF",
          lineHeight: 1.5,
        }}
      >
        {item.description}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      style={{
        background: "#F3F4F6",
        padding: "56px 0",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((item, index) => (
          <StatCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}