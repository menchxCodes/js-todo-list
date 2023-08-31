import "./styles/style.css";
import { domHandler } from "./scripts/domHandler";
import { projects } from "./scripts/class/projects";
import { storage } from "./scripts/storage";

if (storage.populated()) {
  let string = localStorage.getItem("localProjects");
  let object = JSON.parse(string);
  projects.loadProject(object);
}

domHandler.createPage();
domHandler.renderPage();
