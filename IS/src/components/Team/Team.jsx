import employees from "../../data/employees";
import TeamCard from "./TeamCard";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Team() {
  return (
    <section
      id="team"
      className="py-24 bg-slate-50"
    >
      <div className="container-custom">

        <h2 className="text-center text-5xl font-bold mb-14">
          Meet Our Amazing Team
        </h2>

        <Swiper
        className="team-swiper"
          modules={[
            Pagination,
            Navigation,
            Autoplay,
          ]}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          navigation
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
        >
          {employees.map((member) => (
            <SwiperSlide  className="pb-10" key={member.id}>
              <TeamCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Team;