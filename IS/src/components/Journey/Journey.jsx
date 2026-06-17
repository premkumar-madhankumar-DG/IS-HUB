import { motion, AnimatePresence, useScroll, useMotionValue, useTransform } from "framer-motion";
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

/* ─── Desktop SVG constants ─────────────────────────────── */
const TW      = 170;  // tread width
const TH      = 100;  // riser height
const PAD_L   = 50;
const PAD_TOP = 295;  // must be > CH + DOT_R + 28 = ~241 so top card never clips
const CW      = 188;  // card width
const CH      = 200;  // card height
const DOT_R   = 13;
const SVG_W   = PAD_L + N * TW + 160;
const SVG_H   = PAD_TOP + N * TH + 70;

const treadY = i => PAD_TOP + (N - 1 - i) * TH;
const treadX = i => PAD_L  + i * TW;

/* ─── Stair path: draws top-right → bottom-left ─────────── */
function stairPath() {
  const startX = treadX(N - 1) + TW;
  const startY = treadY(N - 1);
  let d = `M ${startX} ${startY}`;
  for (let i = N - 1; i >= 0; i--) {
    d += ` L ${treadX(i)} ${treadY(i)}`;
    d += ` L ${treadX(i)} ${treadY(i) + TH}`;
  }
  return d;
}
const PATH = stairPath();

/* ─── When each step should be revealed ─────────────────── */
// step N-1 (2025, top-right) reveals first at scroll ~0.05
// step 0   (2015, bottom-left) reveals last at scroll ~0.80
function revealAt(i) {
  const stepsFromTop = (N - 1) - i;
  return 0.05 + (stepsFromTop / (N - 1)) * 0.75;
}

/* ─── Desktop Card ───────────────────────────────────────── */
function DesktopCard({ item, index, visible, onSelect }) {
  const { Icon } = item;
  const cx = treadX(index) + TW / 2;
  const cy = treadY(index);
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
      style={{
        position:"absolute",
        left:`${leftPct}%`,
        top:`${topPct}%`,
        transform:"translateX(-50%)",
        width:`${CW}px`,
        background:"#fff",
        border:"1px solid #E5E7EB",
        borderRadius:"13px",
        boxShadow:"0 4px 20px rgba(17,24,39,0.09)",
        overflow:"hidden",
        zIndex:10,
        pointerEvents: visible ? "auto" : "none",
        cursor: visible ? "pointer" : "default",
      }}
    >
      <div style={{ height:"3px", background:"linear-gradient(90deg,#F26A21,rgba(242,106,33,0.15))" }} />
      <div style={{ padding:"14px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"9px", marginBottom:"9px" }}>
          <div style={{
            width:"32px", height:"32px", borderRadius:"8px",
            background:"#FFF4EE", border:"1px solid rgba(242,106,33,0.18)",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          }}>
            <Icon size={16} color="#F26A21" strokeWidth={1.8} />
          </div>
          <div>
            <div style={{ fontSize:"8px", fontWeight:700, color:"#F26A21", letterSpacing:"0.14em", fontFamily:"monospace" }}>
              {item.year}
            </div>
            <div style={{ fontSize:"12px", fontWeight:700, color:"#111827", lineHeight:1.2, letterSpacing:"-0.01em" }}>
              {item.title}
            </div>
          </div>
        </div>
        <div style={{ height:"1px", background:"#F3F4F6", marginBottom:"9px" }} />
        <p style={{ fontSize:"11px", color:"#6B7280", lineHeight:1.65, margin:"0 0 8px" }}>
          {item.desc}
        </p>
        <div style={{
          display:"flex", alignItems:"center", gap:"3px",
          fontSize:"9px", fontWeight:700, color:"#F26A21",
          fontFamily:"monospace", letterSpacing:"0.04em",
        }}>
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
      style={{ display:"flex", gap:"16px", position:"relative" }}
    >
      {/* Left spine + dot */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0, width:"36px" }}>
        <div style={{
          width:"32px", height:"32px", borderRadius:"50%",
          background:"#F26A21", border:"3px solid #fff",
          boxShadow:"0 0 0 2px #F26A21",
          display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0, zIndex:1,
        }}>
          <span style={{ fontSize:"9px", fontWeight:800, color:"#fff", fontFamily:"monospace" }}>{item.step}</span>
        </div>
        {!isLast && (
          <div style={{ width:"2px", flex:1, background:"linear-gradient(to bottom, #F26A21, #E5E7EB)", marginTop:"4px", minHeight:"32px" }} />
        )}
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
        style={{
          flex:1, background:"#fff", border:"1px solid #E5E7EB",
          borderRadius:"13px", overflow:"hidden",
          boxShadow:"0 2px 12px rgba(17,24,39,0.07)",
          marginBottom: isLast ? 0 : "16px",
          cursor:"pointer",
        }}
      >
        <div style={{ height:"3px", background:"linear-gradient(90deg,#F26A21,rgba(242,106,33,0.15))" }} />
        <div style={{ padding:"14px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
            <div style={{
              width:"34px", height:"34px", borderRadius:"9px",
              background:"#FFF4EE", border:"1px solid rgba(242,106,33,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>
              <Icon size={16} color="#F26A21" strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontSize:"9px", fontWeight:700, color:"#F26A21", letterSpacing:"0.14em", fontFamily:"monospace" }}>
                {item.year}
              </div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"#111827", lineHeight:1.2 }}>
                {item.title}
              </div>
            </div>
          </div>
          <div style={{ height:"1px", background:"#F3F4F6", marginBottom:"8px" }} />
          <p style={{ fontSize:"13px", color:"#6B7280", lineHeight:1.65, margin:"0 0 8px" }}>
            {item.desc}
          </p>
          <div style={{
            display:"flex", alignItems:"center", gap:"3px",
            fontSize:"10px", fontWeight:700, color:"#F26A21",
            fontFamily:"monospace", letterSpacing:"0.04em",
          }}>
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
      style={{
        position:"relative",
        width:"100%",
        maxWidth:"560px",
        maxHeight:"85vh",
        overflowY:"auto",
        background:"#fff",
        borderRadius:"20px",
        boxShadow:"0 30px 80px rgba(17,24,39,0.35)",
        border:"1px solid #E5E7EB",
      }}
    >
      <div style={{ height:"4px", background:"linear-gradient(90deg,#F26A21,rgba(242,106,33,0.15))" }} />

      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position:"absolute", top:"16px", right:"16px",
          width:"32px", height:"32px", borderRadius:"50%",
          border:"1px solid #E5E7EB", background:"#fff",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", color:"#6B7280", zIndex:2,
        }}
      >
        <X size={16} />
      </button>

      <div style={{ position:"relative", padding:"36px 40px 40px", overflow:"hidden" }}>
        <div style={{
          position:"absolute", top:"-6px", right:"30px",
          fontSize:"96px", fontWeight:800, color:"#F8F9FA",
          fontFamily:"monospace", lineHeight:1, zIndex:0, userSelect:"none",
        }}>
          {item.step}
        </div>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"8px" }}>
            <div style={{
              width:"56px", height:"56px", borderRadius:"14px",
              background:"#FFF4EE", border:"1px solid rgba(242,106,33,0.2)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            }}>
              <Icon size={26} color="#F26A21" strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontSize:"11px", fontWeight:700, color:"#F26A21", letterSpacing:"0.16em", fontFamily:"monospace", marginBottom:"4px" }}>
                {item.year} · STEP {item.step}
              </div>
              <h3 style={{ fontSize:"24px", fontWeight:800, color:"#111827", margin:0, letterSpacing:"-0.02em", lineHeight:1.2 }}>
                {item.title}
              </h3>
            </div>
          </div>

          <div style={{ height:"1px", background:"#F3F4F6", margin:"22px 0 20px" }} />

          <p style={{ fontSize:"15px", color:"#374151", lineHeight:1.75, margin:"0 0 22px" }}>
            {item.details || item.desc}
          </p>

          {item.highlights && item.highlights.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:"11px" }}>
              {item.highlights.map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                  <CheckCircle2 size={16} color="#F26A21" strokeWidth={2} style={{ flexShrink:0, marginTop:"2px" }} />
                  <span style={{ fontSize:"14px", color:"#4B5563", lineHeight:1.6 }}>{h}</span>
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
          style={{
            position:"fixed",
            inset:0,
            background:"rgba(17,24,39,0.55)",
            backdropFilter:"blur(4px)",
            WebkitBackdropFilter:"blur(4px)",
            zIndex:1000,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"24px",
          }}
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
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock background scroll + allow Escape to close while the detail modal is open
  useEffect(() => {
    if (!selected) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  // Scroll progress scoped to this section
  // offset: section enters at top of viewport → section leaves at bottom
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.6"],   // generous range so all cards show well before end
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
      setVisible(STEPS.map((_, i) => v >= revealAt(i)));
    });
  }, [pathLen]);

  // Per-tread orange highlight driven by scroll
  const treadProgress = STEPS.map((_, i) => {
    const stepsFromTop = (N - 1) - i;
    const segLen = TW + TH;
    const totalLen = N * segLen;
    const s = (stepsFromTop * segLen) / totalLen;
    const e = ((stepsFromTop + 1) * segLen) / totalLen;
    // map those fractions through revealAt range
    const scrollStart = 0.05 + s * 0.75;
    const scrollEnd   = 0.05 + e * 0.75;
    return useTransform(scrollYProgress, [scrollStart, scrollEnd], [0, 1]);
  });

  return (
    <section
      ref={sectionRef}
      id="journey"
      style={{
        background:"#FFFFFF",
        padding:"72px 0 64px",
        borderTop:"1px solid #E5E7EB",
        borderBottom:"1px solid #E5E7EB",
      }}
    >
      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 32px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6 }}
          style={{ textAlign:"center", marginBottom:"32px" }}
        >
          <p style={{
            fontSize:"11px", fontWeight:700, letterSpacing:"0.18em",
            color:"#F26A21", textTransform:"uppercase", fontFamily:"monospace", marginBottom:"10px",
          }}>Since 2015 · Step by Step</p>
          <h2 style={{
            fontSize:"clamp(28px,4.5vw,48px)", fontWeight:800, color:"#111827",
            margin:"0 0 12px", letterSpacing:"-0.03em", lineHeight:1.08,
          }}>
            Every milestone,{" "}
            <span style={{ color:"#F26A21", fontStyle:"italic" }}>a step higher.</span>
          </h2>
          <p style={{ fontSize:"15px", color:"#6B7280", maxWidth:"400px", margin:"0 auto", lineHeight:1.65 }}>
            A decade of climbing — each year a new stair carved into the story of BW Design Group.
          </p>
        </motion.div>

        {/* ── MOBILE: vertical timeline ── */}
        {isMobile && (
          <div style={{ padding:"8px 4px" }}>
            {STEPS.slice().reverse().map((item, i) => (
              <MobileCard key={item.year} item={item} index={i} onSelect={setSelected} />
            ))}
          </div>
        )}

        {/* ── DESKTOP: SVG staircase ── */}
        {!isMobile && (
          <div style={{ position:"relative", width:"100%", overflowX:"auto", overflowY:"visible" }}>
            <div style={{ position:"relative", width:`${SVG_W}px`, margin:"0 auto", minWidth:"600px" }}>

              {/* HTML cards layer */}
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"visible" }}>
                {STEPS.map((item, i) => (
                  <DesktopCard key={item.year} item={item} index={i} visible={visible[i]} onSelect={setSelected} />
                ))}
              </div>

              {/* SVG */}
              <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ display:"block", overflow:"visible" }}>
                <defs>
                  <pattern id="jg" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(242,106,33,0.04)" strokeWidth="0.8"/>
                  </pattern>
                </defs>
                <rect width={SVG_W} height={SVG_H} fill="url(#jg)" />

                {/* Stair fill */}
                <path
                  d={PATH + ` L ${PAD_L} ${PAD_TOP + N*TH} Z`}
                  fill="rgba(242,106,33,0.035)" stroke="none"
                />

                {/* Main outline — scroll-driven draw */}
                <motion.path
                  d={PATH} fill="none"
                  stroke="#111827" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ pathLength: pathLen }}
                />

                {/* Orange tread highlights */}
                {STEPS.map((_, i) => (
                  <motion.line key={i}
                    x1={treadX(i)}    y1={treadY(i)}
                    x2={treadX(i)+TW} y2={treadY(i)}
                    stroke="#F26A21" strokeWidth="4" strokeLinecap="round"
                    style={{ pathLength: treadProgress[i] }}
                  />
                ))}

                {/* Dots on treads */}
                {STEPS.map((item, i) => (
                  <motion.g key={item.year}
                    initial={{ scale:0, opacity:0 }}
                    animate={visible[i] ? { scale:1, opacity:1 } : { scale:0, opacity:0 }}
                    transition={{ type:"spring", stiffness:300, damping:22 }}
                    style={{ transformOrigin:`${treadX(i)+TW/2}px ${treadY(i)}px` }}
                  >
                    <circle cx={treadX(i)+TW/2} cy={treadY(i)} r={DOT_R} fill="#F26A21" stroke="#fff" strokeWidth="3"/>
                    <motion.circle
                      cx={treadX(i)+TW/2} cy={treadY(i)} r={DOT_R}
                      fill="none" stroke="#F26A21" strokeWidth="1.5"
                      animate={{ r:[DOT_R, DOT_R+9], opacity:[0.6,0] }}
                      transition={{ duration:1.8, repeat:Infinity, delay:i*0.18 }}
                    />
                    <text x={treadX(i)+TW/2} y={treadY(i)+4}
                      textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="monospace"
                    >{item.step}</text>
                  </motion.g>
                ))}

                {/* Connector lines card → dot */}
                {STEPS.map((item, i) => {
                  const cx = treadX(i)+TW/2;
                  const dotTop = treadY(i) - DOT_R;
                  const cardBottomY = ((treadY(i) - CH - DOT_R - 28) / SVG_H) * SVG_H + CH;
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

                {/* Year labels on treads */}
                {STEPS.map((item, i) => (
                  <motion.text key={item.year}
                    x={treadX(i)+TW/2} y={treadY(i)+28}
                    textAnchor="middle" fontSize="9" fontWeight="700"
                    fill="#9CA3AF" fontFamily="monospace" letterSpacing="1"
                    initial={{ opacity:0 }}
                    animate={visible[i] ? { opacity:1 } : { opacity:0 }}
                    transition={{ delay:0.1 }}
                  >{item.year}</motion.text>
                ))}

                {/* Ground line */}
                <line
                  x1={PAD_L-20} y1={PAD_TOP + N*TH}
                  x2={PAD_L + N*TW + 30} y2={PAD_TOP + N*TH}
                  stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="6 4"
                />
                <text x={PAD_L-18} y={PAD_TOP + N*TH - 8}
                  fontSize="8" fill="#D1D5DB" fontFamily="monospace" fontWeight="700"
                >START</text>

                {/* Summit flag */}
                <motion.g
                  initial={{ opacity:0, scale:0.5 }}
                  animate={visible[N-1] ? { opacity:1, scale:1 } : { opacity:0, scale:0.5 }}
                  transition={{ type:"spring", stiffness:220, delay:0.25 }}
                  style={{ transformOrigin:`${treadX(N-1)+TW}px ${treadY(N-1)}px` }}
                >
                  <line
                    x1={treadX(N-1)+TW} y1={treadY(N-1)}
                    x2={treadX(N-1)+TW} y2={treadY(N-1)-48}
                    stroke="#111827" strokeWidth="2.5" strokeLinecap="round"
                  />
                  <path
                    d={`M ${treadX(N-1)+TW} ${treadY(N-1)-48} L ${treadX(N-1)+TW+36} ${treadY(N-1)-37} L ${treadX(N-1)+TW} ${treadY(N-1)-26} Z`}
                    fill="#F26A21"
                  />
                  <rect x={treadX(N-1)+TW+44} y={treadY(N-1)-41} width={84} height={24} rx="6" fill="#111827"/>
                  <text x={treadX(N-1)+TW+86} y={treadY(N-1)-24}
                    textAnchor="middle" fontSize="9" fontWeight="800"
                    fill="#fff" fontFamily="monospace" letterSpacing="0.5"
                  >SUMMIT 2025</text>
                </motion.g>
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
          style={{
            marginTop:"40px",
            display:"flex", alignItems:"center", justifyContent:"center", gap:"16px",
          }}
        >
          <div style={{ flex:1, maxWidth:"120px", height:"1px", background:"#E5E7EB" }} />
          <span style={{ fontSize:"11px", color:"#9CA3AF", letterSpacing:"0.12em", fontFamily:"monospace" }}>
            THE JOURNEY CONTINUES
          </span>
          <motion.span
            animate={{ x:[0,6,0] }}
            transition={{ duration:1.3, repeat:Infinity }}
            style={{ color:"#F26A21", fontSize:"16px" }}
          >→</motion.span>
          <div style={{ flex:1, maxWidth:"120px", height:"1px", background:"#E5E7EB" }} />
        </motion.div>
      </div>

      <JourneyDetailModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}