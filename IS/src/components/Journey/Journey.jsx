import { motion, AnimatePresence, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Rocket, Users, Globe, Award, TrendingUp, Zap, X, CheckCircle2, ArrowUpRight } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
const STEPS = [
  {
    year:"2015", step:"01", title:"The Founding Vision",
    desc:"BW Design Group opened with a small team and an outsized conviction — great design should solve real problems and reshape how businesses communicate.",
    details:"What started as three partners and a 400 sq ft studio was built on a single bet: that design done properly could be a business advantage, not a finishing coat. The earliest months were spent turning that conviction into a repeatable way of working, codified into the brand and process guidelines the studio still leans on today.",
    highlights:[
      "Founded by three partners in a 400 sq ft studio",
      "First paying client signed within six weeks of opening",
      "Core design philosophy codified into our first brand guidelines",
    ],
    Icon:Rocket,
  },
  {
    year:"2017", step:"02", title:"First Major Partnerships",
    desc:"Three Fortune 500 clients in 18 months. Word spread fast. The team doubled and our appetite for ambitious, high-stakes work grew with it.",
    details:"Landing the first enterprise logo changed the trajectory of the studio almost overnight. Referrals did the work marketing couldn't, and the team scaled to meet demand without loosening the standards that earned the work in the first place.",
    highlights:[
      "Landed three Fortune 500 clients in 18 months",
      "Team grew from 4 to 14 designers and strategists",
      "Launched our first proprietary brand workshop format",
    ],
    Icon:Users,
  },
  {
    year:"2019", step:"03", title:"Global Expansion",
    desc:"New studios in London and Singapore turned a regional agency into a global creative force — spanning time zones without losing the craft that defined us.",
    details:"Opening two studios in a single year forced a hard question: could the quality of the work survive distance? The answer was a remote-first collaboration framework built specifically to keep craft consistent across nine time zones — one still in use across every studio today.",
    highlights:[
      "Opened studios in London and Singapore",
      "Began operating across nine time zones",
      "Built a remote-first collaboration framework still in use today",
    ],
    Icon:Globe,
  },
  {
    year:"2021", step:"04", title:"Industry Recognition",
    desc:"Named Best Design Agency of the Year. Over 40 accolades across branding, digital, and experiential — proof our approach was setting a new standard.",
    details:"Recognition is a lagging indicator of work that was already changing how clients thought about design internally. The accolades mattered less for the trophy case and more for what they signaled: the studio's point of view was now part of the industry conversation.",
    highlights:[
      "Named Best Design Agency of the Year",
      "Earned 40+ industry accolades across branding, digital, and experiential",
      "Featured in 12 international design publications",
    ],
    Icon:Award,
  },
  {
    year:"2023", step:"05", title:"Scaling New Heights",
    desc:"200+ projects delivered, 50 team members strong. Our proprietary design system framework is now live across 12 industries worldwide.",
    details:"Scale introduced a new problem: how do you keep 50 people across multiple studios solving problems the same way? The answer was a proprietary design system framework, built in-house and now deployed across a dozen industries, that turned tribal knowledge into shared infrastructure.",
    highlights:[
      "Delivered 200+ projects across 12 industries",
      "Grew to a team of 50 across every studio",
      "Launched our proprietary design system framework",
    ],
    Icon:TrendingUp,
  },
  {
    year:"2025", step:"06", title:"The Next Chapter",
    desc:"AI-driven tools, a designer mentorship programme, and a bold new vision for the modern consultancy — the next decade starts here.",
    details:"The next chapter is less about a single milestone and more about building the systems that produce the next ten years of them — investing in tools, in people, and in the kind of mentorship that keeps craft alive as the studio keeps growing.",
    highlights:[
      "Rolling out AI-assisted design tooling across every studio",
      "Launched a formal mentorship programme for emerging designers",
      "Drafting the next five-year vision for the consultancy",
    ],
    Icon:Zap,
  },
];

const N = STEPS.length;

const CW            = 188;
const CH            = 200;
const DOT_R         = 13;
const PAD_L         = 60;
const ROAD_W_INNER  = 700;
const STEP_GAP      = 230;
const ROAD_TOP_PAD  = 340;
const ROAD_BOTTOM_PAD = 150;
const SVG_W = PAD_L * 2 + ROAD_W_INNER;
const SVG_H = ROAD_TOP_PAD + (N - 1) * STEP_GAP + ROAD_BOTTOM_PAD;

const X_FRACTIONS = [0.20, 0.64, 0.30, 0.72, 0.26, 0.60];

const roadX = i => PAD_L + X_FRACTIONS[i] * ROAD_W_INNER;
const roadY = i => ROAD_TOP_PAD + i * STEP_GAP;

function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

const ROAD_POINTS = STEPS.map((_, i) => ({ x: roadX(i), y: roadY(i) }));
const ROAD_PATH = smoothPath(ROAD_POINTS);

const START_PT = { x: roadX(0), y: roadY(0) };
const START_STUB_END = { x: START_PT.x - 90, y: START_PT.y + 70 };
const END_PT = { x: roadX(N - 1), y: roadY(N - 1) };
const END_STUB_END = { x: END_PT.x + 110, y: END_PT.y - 10 };

function perpCap(from, to, half = 15) {
  const dx = to.x - from.x, dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len, py = dx / len;
  return {
    a: { x: to.x + px * half, y: to.y + py * half },
    b: { x: to.x - px * half, y: to.y - py * half },
  };
}
const START_CAP = perpCap(START_PT, START_STUB_END);
const END_CAP = perpCap(END_PT, END_STUB_END);

function revealAtFor(i) {
  return 0.12 + (i / (N - 1)) * 0.75;
}

/* ─── Desktop Card ───────────────────────────────────────── */
function DesktopCard({ item, index, visible, onSelect }) {
  const { Icon } = item;
  const cx = roadX(index);
  const cy = roadY(index);
  const leftPct  = (cx / SVG_W) * 100;
  const topPct   = ((cy - CH - DOT_R - 28) / SVG_H) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={visible ? { opacity:1, y:0, scale:1 } : { opacity:0, y:18, scale:0.95 }}
      whileHover={visible ? { scale: 1.035, y: -3 } : {}}
      whileTap={visible ? { scale: 0.98 } : {}}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => visible && onSelect(item)}
      role="button"
      tabIndex={visible ? 0 : -1}
      aria-label={`View details for ${item.year} — ${item.title}`}
      onKeyDown={(e) => {
        if (visible && (e.key === "Enter" || e.key === " ")) onSelect(item);
      }}
      className={`journey-desktop-card${visible ? " journey-desktop-card--visible" : ""}`}
      style={{ left:`${leftPct}%`, top:`${topPct}%` }}
    >
      <div className="journey-card-top-bar" />
      <div className="journey-card-body">
        <div className="journey-card-header">
          <div className="journey-card-icon-wrap">
            <Icon size={16} color="#F26A21" strokeWidth={1.8} />
          </div>
          <div>
            <div className="journey-card-year">{item.year}</div>
            <div className="journey-card-title">{item.title}</div>
          </div>
        </div>
        <div className="journey-card-divider" />
        <p className="journey-card-desc">{item.desc}</p>
        <div className="journey-card-cta">
          VIEW DETAILS <ArrowUpRight size={10} strokeWidth={2.2} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Card ────────────────────────────────────────── */
function MobileCard({ item, index, onSelect }) {
  const ref = useRef(null);
  const { Icon } = item;
  const isLast = index === N - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x: -30 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:"-40px" }}
      transition={{ duration:0.5, delay: index * 0.08, ease:[0.22,1,0.36,1] }}
      className="journey-mobile-item"
    >
      {/* Left spine + dot */}
      <div className="journey-mobile-spine">
        <div className="journey-mobile-dot">
          <span className="journey-mobile-dot-label">{item.step}</span>
        </div>
        {!isLast && <div className="journey-mobile-line" />}
      </div>

      {/* Card */}
      <div
        onClick={() => onSelect(item)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${item.year} — ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelect(item);
        }}
        className={`journey-mobile-card${isLast ? " journey-mobile-card--last" : ""}`}
      >
        <div className="journey-mobile-card-bar" />
        <div className="journey-mobile-card-body">
          <div className="journey-card-header">
            <div className="journey-mobile-icon-wrap">
              <Icon size={16} color="#F26A21" strokeWidth={1.8} />
            </div>
            <div>
              <div className="journey-card-year">{item.year}</div>
              <div className="journey-mobile-card-title">{item.title}</div>
            </div>
          </div>
          <div className="journey-card-divider" />
          <p className="journey-mobile-card-desc">{item.desc}</p>
          <div className="journey-card-cta journey-card-cta--mobile">
            VIEW DETAILS <ArrowUpRight size={11} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Detail modal ───────────────────────────────────────── */
function ModalCard({ item, onClose }) {
  const { Icon } = item;
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="journey-modal-card"
    >
      <div className="journey-modal-top-bar" />

      <button onClick={onClose} aria-label="Close" className="journey-modal-close">
        <X size={16} />
      </button>

      <div className="journey-modal-body">
        <div className="journey-modal-step-bg">{item.step}</div>

        <div className="journey-modal-content">
          <div className="journey-modal-header">
            <div className="journey-modal-icon-wrap">
              <Icon size={26} color="#F26A21" strokeWidth={1.8} />
            </div>
            <div>
              <div className="journey-modal-eyebrow">
                {item.year} · STEP {item.step}
              </div>
              <h3 className="journey-modal-title">{item.title}</h3>
            </div>
          </div>

          <div className="journey-modal-divider" />

          <p className="journey-modal-desc">{item.details || item.desc}</p>

          {item.highlights && item.highlights.length > 0 && (
            <div className="journey-modal-highlights">
              {item.highlights.map((h, i) => (
                <div key={i} className="journey-modal-highlight-row">
                  <CheckCircle2 size={16} color="#F26A21" strokeWidth={2} className="journey-modal-check" />
                  <span className="journey-modal-highlight-text">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function JourneyDetailModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="journey-modal-overlay"
        >
          <ModalCard item={item} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main ───────────────────────────────────────────────── */
export default function Journey() {
  const sectionRef = useRef(null);
  const roadRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [scrollDir, setScrollDir] = useState("down");
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 1) setScrollDir("down");
      else if (y < lastY - 1) setScrollDir("up");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.3", "end 0.6"],
  });

  const pathLen = useMotionValue(0);
  useEffect(() => {
    return scrollYProgress.on("change", v => {
      pathLen.set(Math.max(0, Math.min(1, v)));
    });
  }, [scrollYProgress, pathLen]);

  const [visible, setVisible] = useState(Array(N).fill(false));
  useEffect(() => {
    return pathLen.on("change", v => {
      setVisible(STEPS.map((_, i) => v >= revealAtFor(i, scrollDir)));
    });
  }, [pathLen, scrollDir]);

  const markerX = useMotionValue(ROAD_POINTS[0].x);
  const markerY = useMotionValue(ROAD_POINTS[0].y);
  useEffect(() => {
    const el = roadRef.current;
    if (!el) return;
    const total = el.getTotalLength();
    return pathLen.on("change", v => {
      const pt = el.getPointAtLength(total * v);
      markerX.set(pt.x);
      markerY.set(pt.y);
    });
  }, [pathLen, markerX, markerY, isMobile]);

  return (
    <section ref={sectionRef} id="journey" className="journey-section">
      <div className="journey-container">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6 }}
          className="journey-header"
        >
          <p className="journey-eyebrow">Since 2015 · Mile by Mile</p>
          <h2 className="journey-heading">
            Every milestone,{" "}
            <span className="journey-heading-accent">further down the road.</span>
          </h2>
          <p className="journey-subheading">
            A decade in motion — each year another stretch of road for BW Design Group.
          </p>
        </motion.div>

        {/* ── MOBILE: vertical timeline ── */}
        {isMobile && (
          <div className="journey-mobile-list">
            {STEPS.slice().reverse().map((item, i) => (
              <MobileCard key={item.year} item={item} index={i} onSelect={setSelected} />
            ))}
          </div>
        )}

        {/* ── DESKTOP: SVG winding road ── */}
        {!isMobile && (
          <div className="journey-road-wrap">
            <div className="journey-road-inner" style={{ width:`${SVG_W}px` }}>

              {/* HTML cards layer */}
              <div className="journey-cards-layer">
                {STEPS.map((item, i) => (
                  <DesktopCard key={item.year} item={item} index={i} visible={visible[i]} onSelect={setSelected} />
                ))}
              </div>

              {/* SVG */}
              <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="journey-svg">
                <defs>
                  <pattern id="jg" width="70" height="70" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(242,106,33,0.04)" strokeWidth="0.8"/>
                  </pattern>
                </defs>
                <rect width={SVG_W} height={SVG_H} fill="url(#jg)" />

                {/* Road base */}
                <path
                  ref={roadRef}
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#E2E4E8"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="journey-road-base"
                />

                {/* Orange traveled overlay */}
                <motion.path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#F26A21"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength: pathLen }}
                />

                {/* Lane markings */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeDasharray="16 16"
                  strokeLinecap="round"
                />

                {/* Live position marker */}
                <motion.circle
                  cx={markerX} cy={markerY} r={9}
                  fill="#fff" stroke="#F26A21" strokeWidth="4"
                  className="journey-road-marker"
                />

                {/* Start stub */}
                <motion.line
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
                  x1={START_PT.x} y1={START_PT.y} x2={START_STUB_END.x} y2={START_STUB_END.y}
                  stroke="#E2E4E8" strokeWidth="46" strokeLinecap="round"
                />
                <motion.line
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
                  x1={START_CAP.a.x} y1={START_CAP.a.y} x2={START_CAP.b.x} y2={START_CAP.b.y}
                  stroke="#fff" strokeWidth="3"
                />
                <motion.text
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
                  x={START_STUB_END.x} y={START_STUB_END.y + 34}
                  textAnchor="middle" fontSize="9" fontWeight="700" fill="#9CA3AF" fontFamily="monospace" letterSpacing="1.5"
                >START</motion.text>

                {/* End stub */}
                <line
                  x1={END_PT.x} y1={END_PT.y} x2={END_STUB_END.x} y2={END_STUB_END.y}
                  stroke="#E2E4E8" strokeWidth="46" strokeLinecap="round"
                />
                <motion.line
                  x1={END_PT.x} y1={END_PT.y} x2={END_STUB_END.x} y2={END_STUB_END.y}
                  stroke="#F26A21" strokeWidth="46" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={visible[N-1] ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                <line
                  x1={END_CAP.a.x} y1={END_CAP.a.y} x2={END_CAP.b.x} y2={END_CAP.b.y}
                  stroke="#fff" strokeWidth="3"
                />
                <motion.path
                  d={`M ${END_STUB_END.x+8} ${END_STUB_END.y-16} L ${END_STUB_END.x+34} ${END_STUB_END.y-4} L ${END_STUB_END.x+8} ${END_STUB_END.y+8} Z`}
                  fill="#F26A21"
                  initial={{ opacity:0, scale:0.5 }}
                  animate={visible[N-1] ? { opacity:1, scale:1 } : { opacity:0, scale:0.5 }}
                  transition={{ type:"spring", stiffness:240, delay:0.3 }}
                  style={{ transformOrigin:`${END_STUB_END.x+8}px ${END_STUB_END.y-4}px` }}
                />

                {/* Dots on the road */}
                {STEPS.map((item, i) => (
                  <motion.g key={item.year}
                    initial={{ scale:0, opacity:0 }}
                    animate={visible[i] ? { scale:1, opacity:1 } : { scale:0, opacity:0 }}
                    transition={{ type:"spring", stiffness:300, damping:22 }}
                    style={{ transformOrigin:`${roadX(i)}px ${roadY(i)}px` }}
                  >
                    <circle cx={roadX(i)} cy={roadY(i)} r={DOT_R} fill="#F26A21" stroke="#fff" strokeWidth="3"/>
                    <motion.circle
                      cx={roadX(i)} cy={roadY(i)} r={DOT_R}
                      fill="none" stroke="#F26A21" strokeWidth="1.5"
                      animate={{ r:[DOT_R, DOT_R+9], opacity:[0.6,0] }}
                      transition={{ duration:1.8, repeat:Infinity, delay:i*0.18 }}
                    />
                    <text x={roadX(i)} y={roadY(i)+4}
                      textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="monospace"
                    >{item.step}</text>
                  </motion.g>
                ))}

                {/* Connector lines card → dot */}
                {STEPS.map((item, i) => {
                  const cx = roadX(i);
                  const dotTop = roadY(i) - DOT_R;
                  const cardBottomY = roadY(i) - DOT_R - 28;
                  return (
                    <motion.line key={item.year}
                      x1={cx} y1={dotTop} x2={cx} y2={cardBottomY}
                      stroke="#F26A21" strokeWidth="1.5" strokeDasharray="5 4"
                      initial={{ scaleY:0, opacity:0 }}
                      animate={visible[i] ? { scaleY:1, opacity:0.7 } : { scaleY:0, opacity:0 }}
                      style={{ transformOrigin:`${cx}px ${dotTop}px` }}
                      transition={{ duration:0.35 }}
                    />
                  );
                })}

                {/* Year labels */}
                {STEPS.map((item, i) => (
                  <motion.text key={item.year}
                    x={roadX(i)} y={roadY(i) + 32}
                    textAnchor="middle" fontSize="9" fontWeight="700"
                    fill="#9CA3AF" fontFamily="monospace" letterSpacing="1"
                    initial={{ opacity:0 }}
                    animate={visible[i] ? { opacity:1 } : { opacity:0 }}
                    transition={{ delay:0.1 }}
                  >{item.year}</motion.text>
                ))}
              </svg>
            </div>
          </div>
        )}

        {/* Footer rule */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.2 }}
          className="journey-footer"
        >
          <div className="journey-footer-line" />
          <span className="journey-footer-label">THE JOURNEY CONTINUES</span>
          <motion.span
            animate={{ x:[0,6,0] }}
            transition={{ duration:1.3, repeat:Infinity }}
            className="journey-footer-arrow"
          >→</motion.span>
          <div className="journey-footer-line" />
        </motion.div>
      </div>

      <JourneyDetailModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}