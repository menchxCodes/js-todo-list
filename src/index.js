import "./styles/style.css";
import Todo from "./scripts/class/todo";
import { todoValidator, projectValidator } from "./scripts/validator";
import format from "date-fns/format";
import Project from "./scripts/class/project";
import { domHandler } from "./scripts/domHandler";
import { projects } from "./scripts/class/projects";
import { storage } from "./scripts/storage";
// console.log("hello");
// const task1 = new Todo("invalid date", "this is a stask", "asd", "high");
// const task2 = new Todo("valid task", "this is a disc", "1996-08-30");
// const task3 = new Todo("Aboozabi", "this is a disc", "2000-02-23");
// const task4 = new Todo("Kesafat", "this is a disc", "2013-03-13");
// projects.projects[0].addTodoToList(task1);
// projects.projects[0].addTodoToList(task2);
// projects.projects[0].addTodoToList(task3);
// projects.projects[0].addTodoToList(task4);
// const p2 = new Project("Shopping List");
// projects.addProject(p2);
// console.log(projects.currentProject);

// console.log(storage.available("localStorage"));
// let string = JSON.stringify(projects);
// localStorage.setItem("localProjects", string);
// console.log(localStorage);

// let object = JSON.parse(string);
// console.log(object);
if (storage.populated()) {
  let string = localStorage.getItem("localProjects");
  let object = JSON.parse(string);
  projects.loadProject(object);
}

domHandler.createPage();
domHandler.renderPage();
