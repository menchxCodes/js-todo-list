import "./styles/style.css";
import Todo from "./scripts/class/todo";
import { todoValidator, projectValidator } from "./scripts/validator";
import format from "date-fns/format";
import Project from "./scripts/class/project";
import { domHandler } from "./scripts/domHandler";
import { projects } from "./scripts/class/projects";

// console.log("hello");
const task1 = new Todo("invalid date", "this is a stask", "asd", "high");
const task2 = new Todo("valid task", "this is a disc", "1994");
const task3 = new Todo("Aboozabi", "this is a disc", "1994");
const task4 = new Todo("Kesafat", "this is a disc", "1994");

projects.projects[0].addTodoToList(task1);
projects.projects[0].addTodoToList(task2);
projects.projects[0].addTodoToList(task3);
projects.projects[0].addTodoToList(task4);
const p2 = new Project("Shopping List");

console.log(projects.currentProject);

// projects.addProject(p1);
// projects.addProject(p2);
// p2.addTodoToList(task1);
// p2.addTodoToList(task2);
// console.log(projects);
// projects.setCurrentProject(p2);

// console.log(projects.projects);

// console.log(projects);

// projects.setCurrentProject(p2);
domHandler.createPage();
domHandler.renderPage();
