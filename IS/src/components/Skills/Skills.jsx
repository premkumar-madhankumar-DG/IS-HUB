import {
  Code2,
  Braces,
  Paintbrush,
  PenTool,
  Server,
  Database,
  Box,
  Cloud,
  Binary,
  Workflow,
  Layers,
  BrainCircuit,
  GitBranch,
  ListChecks,
  BookOpen,
  Boxes,
} from "lucide-react";

// Category taxonomy — drives the filter tabs above the grid.
export const categories = [
  { id: "ignition", label: "Ignition Platform" },
  { id: "programming", label: "Programming" },
  { id: "database", label: "Database & Integration" },
  { id: "devops", label: "DevOps & Infrastructure" },
];
// Proficiency is 0–100 and drives both the ring gauge and the tier badge
// on each card. Tiers are derived automatically in the component:
// 90+ Expert · 75+ Advanced · 55+ Proficient · below Familiar.
const skills = [
  // IGNITION
  {
    id: "perspective",
    name: "Ignition Perspective",
    category: "ignition",
    icon: Workflow,
    proficiency: 95,
    years: 3,
    description:
      "Built responsive SCADA and MES applications using Perspective views, bindings and Flex layouts.",
  },
  {
    id: "designer",
    name: "Ignition Designer",
    category: "ignition",
    icon: Layers,
    proficiency: 95,
    years: 3,
    description:
      "Project architecture, UDTs, tag structures, navigation and reusable components.",
  },
  {
    id: "namedqueries",
    name: "Named Queries",
    category: "ignition",
    icon: Database,
    proficiency: 90,
    years: 3,
    description:
      "Parameterized queries, stored procedures and database integrations.",
  },
  {
    id: "alarmmanagement",
    name: "Alarm Management",
    category: "ignition",
    icon: ListChecks,
    proficiency: 85,
    years: 2,
    description:
      "Alarm pipelines, journals, shelving and notification workflows.",
  },
  {
    id: "gateway",
    name: "Gateway Architecture",
    category: "ignition",
    icon: Server,
    proficiency: 88,
    years: 3,
    description:
      "Gateway configuration, module management and enterprise deployments.",
  },

  // PROGRAMMING
  {
    id: "python",
    name: "Python",
    category: "programming",
    icon: Code2,
    proficiency: 95,
    years: 3,
    description:
      "Ignition scripting, automation, APIs, JSON handling and data processing.",
  },
  {
    id: "jython",
    name: "Ignition Scripting",
    category: "programming",
    icon: Braces,
    proficiency: 95,
    years: 3,
    description:
      "Gateway scripts, event scripts and extensive use of the system.* APIs.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "programming",
    icon: Code2,
    proficiency: 85,
    years: 2,
    description:
      "React applications, dashboards and frontend integrations.",
  },
  {
    id: "java",
    name: "Java",
    category: "programming",
    icon: Binary,
    proficiency: 75,
    years: 2,
    description:
      "Core object-oriented programming and enterprise application concepts.",
  },

  // DATABASE & INTEGRATION
  {
    id: "mssql",
    name: "Microsoft SQL Server",
    category: "database",
    icon: Database,
    proficiency: 90,
    years: 3,
    description:
      "Industrial data storage, reporting, historian queries and optimization.",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    icon: Database,
    proficiency: 85,
    years: 2,
    description:
      "Database development, maintenance and query optimization.",
  },
  {
    id: "opcua",
    name: "OPC-UA Integration",
    category: "database",
    icon: Workflow,
    proficiency: 90,
    years: 3,
    description:
      "Device connectivity, tag imports, certificate management and data exchange.",
  },
  {
    id: "restapi",
    name: "REST APIs",
    category: "database",
    icon: Cloud,
    proficiency: 88,
    years: 3,
    description:
      "API integrations, authentication, JSON processing and external systems.",
  },

  // DEVOPS
  {
    id: "git",
    name: "Git",
    category: "devops",
    icon: GitBranch,
    proficiency: 90,
    years: 3,
    description:
      "Branching strategies, pull requests and collaborative development.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "devops",
    icon: GitBranch,
    proficiency: 90,
    years: 3,
    description:
      "Repository management, code reviews and CI/CD workflows.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    icon: Box,
    proficiency: 85,
    years: 2,
    description:
      "Containerized Ignition deployments, Compose and custom images.",
  },
  {
    id: "linux",
    name: "Linux",
    category: "devops",
    icon: Server,
    proficiency: 80,
    years: 2,
    description:
      "Server administration, networking and container host management.",
  },
];

export default skills;