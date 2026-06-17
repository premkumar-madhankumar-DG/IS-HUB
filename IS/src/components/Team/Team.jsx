import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import employees from "../../data/employees";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TeamCard({ member }) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "16px",
        padding: "28px 24px 24px",
        textAlign: "center",
        boxShadow: "0 2px 16px rgba(17,24,39,0.06)",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.2s, border-color 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(242,106,33,0.1), 0 2px 8px rgba(17,24,39,0.07)";
        e.currentTarget.style.borderColor = "rgba(242,106,33,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(17,24,39,0.06)";
        e.currentTarget.style.borderColor = "#E5E7EB";
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: "linear-gradient(to right, #F26A21, rgba(242,106,33,0.15))",
      }} />

      {/* Avatar */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #F3F4F6",
            display: "block",
          }}
        />
        {/* Online dot */}
        <span style={{
          position: "absolute",
          bottom: "4px",
          right: "4px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#22c55e",
          border: "2px solid #fff",
        }} />
      </div>

      <h3 style={{
        fontSize: "15px",
        fontWeight: 700,
        color: "#111827",
        margin: "0 0 4px",
        letterSpacing: "-0.01em",
      }}>
        {member.name}
      </h3>

      <p style={{
        fontSize: "12px",
        fontWeight: 600,
        color: "#F26A21",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        margin: "0 0 6px",
        fontFamily: "monospace",
      }}>
        {member.role}
      </p>

      <p style={{
        fontSize: "12px",
        color: "#9CA3AF",
        margin: "0 0 18px",
      }}>
        {member.exp}
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: "#F3F4F6", marginBottom: "16px" }} />

      {/* Social icons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        {[
          { Icon: FaLinkedin, href: member.linkedin },
          { Icon: FaGithub, href: member.github },
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "#F3F4F6",
              color: "#6B7280",
              transition: "background 0.2s, color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFF4EE";
              e.currentTarget.style.color = "#F26A21";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F3F4F6";
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <Icon size={15} strokeWidth={1.8} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      style={{
        background: "#FFFFFF",
        padding: "88px 0 72px",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "48px" }}
        >
          <p style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#F26A21",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: "10px",
          }}>
            The People
          </p>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-0.025em",
            margin: "0 0 12px",
            lineHeight: 1.1,
          }}>
            Meet the team
          </h2>
          <p style={{
            fontSize: "15px",
            color: "#6B7280",
            maxWidth: "420px",
            lineHeight: 1.6,
            margin: 0,
          }}>
            The specialists behind every system — designers, engineers, and strategists keeping BW running.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <style>{`
            .team-swiper .swiper-button-next,
            .team-swiper .swiper-button-prev {
              width: 36px;
              height: 36px;
              background: #fff;
              border: 1px solid #E5E7EB;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(17,24,39,0.08);
              color: #111827;
              top: 40%;
              transition: border-color 0.2s, color 0.2s;
            }
            .team-swiper .swiper-button-next:hover,
            .team-swiper .swiper-button-prev:hover {
              border-color: #F26A21;
              color: #F26A21;
            }
            .team-swiper .swiper-button-next::after,
            .team-swiper .swiper-button-prev::after {
              font-size: 13px;
              font-weight: 700;
            }
            .team-swiper .swiper-pagination-bullet {
              background: #D1D5DB;
              opacity: 1;
              width: 6px;
              height: 6px;
              transition: background 0.2s, width 0.2s;
            }
            .team-swiper .swiper-pagination-bullet-active {
              background: #F26A21;
              width: 20px;
              border-radius: 3px;
            }
            .team-swiper .swiper-pagination {
              bottom: 0;
            }
          `}</style>

          <Swiper
            className="team-swiper"
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            spaceBetween={20}
            style={{ paddingBottom: "36px" }}
          >
            {employees.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}