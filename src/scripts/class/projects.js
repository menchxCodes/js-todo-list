import { projectValidator } from "../validator";
import Project from "./project";

export class Projects {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Todo List"));
    this.currentProject = this.projects[0];
    this.count = this.projects.length;
  }

  addProject(project) {
    if (projectValidator.validate(project)) {
      this.projects.push(project);
      this.count += 1;
    } else {
      return console.log("project not valid");
    }
  }

  setCurrentProject(project) {
    if (this.projects.includes(project)) {
      this.currentProject = project;
      console.log(`set ${project.name} as the current project`);
      return this.currentProject;
    } else {
      return console.log("project not found");
    }
  }
}

const projects = new Projects();
export { projects };
