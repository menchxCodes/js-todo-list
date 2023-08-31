import { projectValidator } from "../validator";
import Project from "./project";
import Todo from "./todo";

export class Projects {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Todo List"));
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

  loadProject(object) {
    this.projects = [];
    this.count = 0;

    object.projects.forEach((project) => {
      let newProject = new Project(project.name);
      project.list.forEach((task) => {
        let newTask = new Todo(
          task.title,
          task.description,
          task.dueDate,
          task.priority
        );
        newProject.addTodoToList(newTask);
      });
      this.addProject(newProject);
    });
  }
}

const projects = new Projects();
export { projects };
