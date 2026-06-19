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
      className="team-card"
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="team-card-accent" />

      <div className="team-avatar-wrapper">
        <img
          src={member.image}
          alt={member.name}
          className="team-avatar"
        />
        <span className="team-status-dot" />
      </div>

      <h3 className="team-name">{member.name}</h3>

      <p className="team-role">
        {member.role}
      </p>

      <p className="team-exp">{member.exp}</p>

      <div className="team-divider" />

      <div className="team-socials">
        {[
          { Icon: FaLinkedin, href: member.linkedin },
          { Icon: FaGithub, href: member.github },
        ].map(({ Icon, href }, i) => (
          <a
            key={i}
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-link"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="team-section">
      <div className="team-container">
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="team-eyebrow">The People</p>

          <h2 className="team-title">
            Meet the team
          </h2>

          <p className="team-description">
            The specialists behind every system — designers,
            engineers, and strategists keeping BW running.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Swiper
            className="team-swiper"
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            loop
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
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