import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FaBook, FaCode, FaDatabase, FaCog, FaFileAlt, FaRocket,
  FaCheckCircle, FaUsers, FaMedkit, FaPhone, FaDownload, FaArrowRight, FaTimes
} from "react-icons/fa";
import "./Training.css";

const trainingWeeks = [
  {
    week: "Week 1",
    title: "Foundation",
    description: "SCADA Basics, ISA-95 & Ignition Introduction",
    icon: FaBook,
    color: "#3b82f6",
    borderColor: "#3b82f6",
    topics: [
      "SCADA Architecture & Components",
      "ISA-95 / ISA-88 Overview",
      "Ignition Gateway, Designer & Client",
      "OPC-UA Fundamentals",
      "Licensing & Module Overview",
      "ICS/SCADA Security Basics",
    ],
    references: [
      { title: "Ignition Documentation - Getting Started", url: "https://docs.inductiveautomation.com" },
      { title: "SCADA Basics Tutorial", url: "https://www.inductiveautomation.com" },
      { title: "ISA-95 Standards Guide", url: "#" },
      { title: "Ignition Gateway Setup", url: "#" },
    ],
  },
  {
    week: "Week 2",
    title: "Scripting & Logic",
    description: "Python Basics & Ignition Scripting",
    icon: FaCode,
    color: "#10b981",
    borderColor: "#10b981",
    topics: [
      "Python Fundamentals",
      "Python on Cython",
      "Ignition Scripting Contexts",
      "Tag Change, Timer & Action Scripts",
      "UDTs & Reusable Patterns",
      "Alarm Pipelines & Scripting",
    ],
    references: [
      { title: "Python Programming Guide", url: "#" },
      { title: "Ignition Scripting Manual", url: "#" },
      { title: "Tag Event Scripts", url: "#" },
      { title: "UDT Best Practices", url: "#" },
    ],
  },
  {
    week: "Week 3",
    title: "Data Layer",
    description: "Databases, Historian & Integration",
    icon: FaDatabase,
    color: "#8b5cf6",
    borderColor: "#8b5cf6",
    topics: [
      "SQL Essentials",
      "Ignition Database Connections",
      "Tag Historian & Storage",
      "Named Queries & Transactions",
      "Reporting & Time-series Data",
      "MQTT & Sparkplug B",
    ],
    references: [
      { title: "SQL Query Guide", url: "#" },
      { title: "Database Connectivity", url: "#" },
      { title: "Tag Historian Configuration", url: "#" },
      { title: "Named Queries Tutorial", url: "#" },
    ],
  },
  {
    week: "Week 4",
    title: "DevOps & Tooling",
    description: "Git, Docker & Project Management",
    icon: FaCog,
    color: "#f59e0b",
    borderColor: "#f59e0b",
    topics: [
      "Git Workflow & Best Practices",
      "Ignition Project import/Export",
      "Docker Fundamentals",
      "Ignition in Docker",
      "EAM & Multi-Gateway Management",
      "Backup, Restore & CI Pipeline Basics",
    ],
    references: [
      { title: "Git Workflow Guide", url: "#" },
      { title: "Docker for Ignition", url: "#" },
      { title: "Project Import/Export", url: "#" },
      { title: "CI/CD Pipeline Setup", url: "#" },
    ],
  },
  {
    week: "Week 5",
    title: "Domain Applications",
    description: "Process industry Concepts",
    icon: FaFileAlt,
    color: "#ef4444",
    borderColor: "#ef4444",
    topics: [
      "Process Industry Concepts",
      "BMS - HVAC, AHU, VRV",
      "EPMS - Power & Energy KPIs",
      "BACnet/IP & Modbus TCP",
      "Data Centre Monitoring (PUE, DCiE)",
      "Alarm Management (ISA-18.2)",
    ],
    references: [
      { title: "BMS Industry Standards", url: "#" },
      { title: "EPMS Configuration", url: "#" },
      { title: "BACnet Protocol Guide", url: "#" },
      { title: "ISA-18.2 Alarm Management", url: "#" },
    ],
  },
  {
    week: "Week 6",
    title: "Migration & Capstone",
    description: "SCADA Migration & Mini-Project",
    icon: FaRocket,
    color: "#3b82f6",
    borderColor: "#3b82f6",
    topics: [
      "Migration Approach & Planning",
      "Tag Mapping & Data Validation",
      "Perspective Dashboard Design",
      "Best Practices & Documentation",
      "Capstone Mini-Project",
      "Review & Presentation",
    ],
    references: [
      { title: "Migration Planning Guide", url: "#" },
      { title: "Data Validation Checklist", url: "#" },
      { title: "Perspective Design Best Practices", url: "#" },
      { title: "Capstone Project Examples", url: "#" },
    ],
  },
];

const features = [
  {
    icon: FaBook,
    title: "6 Weeks Program",
    description: "Structured learning journey",
  },
  {
    icon: FaUsers,
    title: "Hands-on Learning",
    description: "Practical examples & real-world projects",
  },
  {
    icon: FaMedkit,
    title: "Expert Resources",
    description: "Curated resources from leaders in the field",
  },
  {
    icon: FaCheckCircle,
    title: "Capstone Project",
    description: "Build & showcase your knowledge",
  },
];

const resources = [
  {
    icon: FaBook,
    title: "Ignition University",
    description: "Official training videos and courses",
  },
  {
    icon: FaFileAlt,
    title: "Documentation",
    description: "Official documentation and guides",
  },
  {
    icon: FaCode,
    title: "Example Lab",
    description: "Example sampling functionality reference",
  },
  {
    icon: FaMedkit,
    title: "Best Practices",
    description: "Industry standards and guidelines",
  },
];

/* Modal Component */
function ReferenceModal({ week, onClose }) {
  if (!week) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <h2 className="modal-title">{week.week} - {week.title}</h2>
              <p className="modal-subtitle">{week.description}</p>
            </div>
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <h3 className="reference-title">Reference Links & Resources</h3>
            <div className="references-list">
              {week.references.map((ref, idx) => (
                <motion.a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="ref-content">
                    <span className="ref-number">{idx + 1}</span>
                    <div className="ref-text">
                      <p className="ref-link-title">{ref.title}</p>
                    </div>
                  </div>
                  <FaArrowRight className="ref-arrow" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Training() {
  const [selectedWeek, setSelectedWeek] = useState(null);

  return (
    <section id="training" className="training-section">
      <div className="training-container">
        {/* Badge and Header */}
        <motion.div
          className="training-badge-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="badge">TRAINING PROGRAM</span>
        </motion.div>

        <motion.div
          className="training-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h1 className="training-title">Ignition SCADA Training Program</h1>
          <p className="training-subtitle">
            A 6-week onboarding program for new team members across Process Industry,
            BMS/EPMS and Migration projects.
          </p>
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          className="journey-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="journey-title">6-Week Learning Journey</h2>

          {/* Timeline with Connected Steps */}
          <div className="timeline-wrapper">
            <svg className="timeline-svg" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet">
              {/* Connecting lines */}
              <line x1="100" y1="60" x2="1100" y2="60" className="timeline-line" />
              {/* Circles and connections between them */}
              {trainingWeeks.map((item, idx) => {
                const x = 100 + (idx * 1000 / 5);
                return (
                  <g key={idx}>
                    <circle cx={x} cy="60" r="20" className={`timeline-circle ${idx === 0 ? 'active' : ''}`} style={{ fill: item.color }} />
                    <text x={x} y="68" textAnchor="middle" className="timeline-text">{idx + 1}</text>
                  </g>
                );
              })}
            </svg>

            {/* Week labels below timeline */}
            <div className="week-labels">
              {trainingWeeks.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="week-label-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="label-week">{item.week}</div>
                  <div className="label-title">{item.title}</div>
                  <div className="label-icon" style={{ color: item.color }}>
                    <item.icon />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed Cards Grid (3 columns, 2 rows) */}
          <div className="detailed-cards-grid">
            {trainingWeeks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="detailed-card"
                  style={{ borderLeftColor: item.borderColor }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                >
                  <div className="card-top">
                    <span className="week-label-badge" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                      {item.week}
                    </span>
                    <Icon className="card-icon-large" style={{ color: item.color }} />
                  </div>

                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-subtitle">{item.description}</p>

                  <ul className="card-topics">
                    {item.topics.map((topic, tidx) => (
                      <li key={tidx}>
                        <span className="bullet" style={{ color: item.color }}>•</span> {topic}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className="view-details-btn"
                    style={{ color: item.color, borderColor: item.color }}
                    onClick={() => setSelectedWeek(item)}
                    whileHover={{ x: 4 }}
                  >
                    View Details <FaArrowRight style={{ marginLeft: "0.5rem" }} />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Reference Modal */}
      {selectedWeek && (
        <ReferenceModal week={selectedWeek} onClose={() => setSelectedWeek(null)} />
      )}
    </section>
  );
}
