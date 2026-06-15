import timeline from "../../data/timeline";
import { motion } from "framer-motion";

function Journey() {
  return (
    <section
      id="journey"
      className="py-28 bg-white"
    >
      <div className="container-custom">

        <h2 className="text-center text-5xl font-bold mb-20">
          Our Journey of Growth
        </h2>

        <div className="relative">

          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 -translate-x-1/2"></div>

          {timeline.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.year}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className={`mb-16 flex items-center ${
                  index % 2 === 0
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div className="w-full md:w-5/12 bg-white shadow-lg rounded-3xl p-6">

                  <div className="flex items-center gap-4">

                    <div className="bg-blue-100 p-4 rounded-xl">
                      <Icon
                        className="text-blue-600"
                        size={24}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-xl">
                        {item.year}
                      </h3>

                      <p className="font-semibold">
                        {item.title}
                      </p>
                    </div>

                  </div>

                  <p className="mt-4 text-gray-600">
                    {item.description}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Journey;