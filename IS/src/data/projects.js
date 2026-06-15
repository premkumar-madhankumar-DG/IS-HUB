import {
  FaChartLine,
  FaBrain,
  FaCloud,
  FaComments,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "NexaTracker",
    description:
      "Advanced project management and time tracking platform.",
    technologies: ["React", "Node.js", "MongoDB"],
    icon: FaChartLine,
  },

  {
    id: 2,
    title: "NexaAI",
    description:
      "AI-powered analytics platform for business insights.",
    technologies: ["Python", "TensorFlow", "AWS"],
    icon: FaBrain,
  },

  {
    id: 3,
    title: "NexaCloud",
    description:
      "Cloud infrastructure management made simple.",
    technologies: ["AWS", "Docker", "Kubernetes"],
    icon: FaCloud,
  },

  {
    id: 4,
    title: "NexaChat",
    description:
      "Real-time communication and collaboration platform.",
    technologies: ["Socket.io", "React", "Node.js"],
    icon: FaComments,
  },

  {
    id: 5,
    title: "NexaSecure",
    description:
      "Cybersecurity solution for modern enterprises.",
    technologies: ["Go", "PostgreSQL", "Redis"],
    icon: FaShieldAlt,
  },

  {
    id: 6,
    title: "NexaMobile",
    description:
      "Cross-platform mobile application framework.",
    technologies: ["Flutter", "Dart", "Firebase"],
    icon: FaMobileAlt,
  },
];

export default projects;