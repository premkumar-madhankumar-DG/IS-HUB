import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-bold leading-tight">
            Building the Future
            <span className="text-blue-600">
              {" "}with Innovation
            </span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            NexaCore is a next-generation software company
            building scalable, secure, and intelligent
            digital solutions.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-6 py-4 rounded-xl">
              Explore Our Work
            </button>

            <button className="border px-6 py-4 rounded-xl">
              Meet Our Team
            </button>
          </div>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="Corporate Building"
          className="rounded-3xl shadow-xl"
        />
      </div>
    </section>
  );
}

export default Hero;