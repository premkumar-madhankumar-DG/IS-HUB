
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
    >
      <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">
        <Icon
          className="text-blue-600"
          size={28}
        />
      </div>

      <h3 className="text-2xl font-bold mt-6">
        {project.title}
      </h3>

      <p className="text-gray-600 mt-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-slate-100 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <button className="mt-6 flex items-center gap-2 text-blue-600 font-semibold">
        View Details
        <FaArrowRight />
      </button>
    </motion.div>
  );
}

export default ProjectCard;