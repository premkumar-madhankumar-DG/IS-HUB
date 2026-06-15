import projects from "../../data/projects";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <section
      id="projects"
      className="py-28 bg-slate-50"
    >
      <div className="container-custom">

        <h2 className="text-center text-5xl font-bold mb-16">
          Our Projects
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

export default Projects;