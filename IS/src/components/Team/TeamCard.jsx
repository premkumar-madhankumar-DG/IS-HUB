import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

function TeamCard({ member }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="bg-white rounded-3xl shadow-md p-6 text-center"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-28 h-28 mx-auto rounded-full object-cover"
      />

      <h3 className="font-bold text-xl mt-4">
        {member.name}
      </h3>

      <p className="text-blue-600">
        {member.role}
      </p>

      <p className="text-gray-500 mt-2">
        {member.exp}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <FaLinkedin
          className="cursor-pointer hover:text-blue-600"
          size={20}
        />
        <FaGithub
          className="cursor-pointer hover:text-blue-600"
          size={20}
        />
      </div>
    </motion.div>
  );
}

export default TeamCard;