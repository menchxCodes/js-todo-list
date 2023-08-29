import Todo from "./class/todo";
import Project from "./class/project";
import { Projects, projects } from "./class/projects";
import format from "date-fns/format";
import { todoValidator } from "./validator";

const domHandler = (function () {
  const createForm = function () {
    let button = document.createElement("input");
    button.id = "submit-btn";
    button.type = "submit";
    button.value = "New Item";
    const form = document.createElement("form");
    form.id = "input-form";

    let fields = [
      { name: "title", type: "text" },
      { name: "description", type: "text" },
      {
        name: "dueDate",
        type: "date",
        value: format(Date.now(), "yyyy-MM-dd"),
      },
    ];
    let labels = ["Title:", "Description:", "Deadline:"];

    fields.forEach((field, index) => {
      let formItemContainer = document.createElement("div");
      formItemContainer.classList.add("form-item");

      let inputElement = document.createElement("input");
      let labelElement = document.createElement("label");

      inputElement.id = "input-" + field.name;
      inputElement.type = field.type;
      inputElement.setAttribute("name", "input-" + field.name);
      if (field.value) {
        inputElement.value = field.value;
      }
      labelElement.setAttribute("for", "input-" + field.name);
      labelElement.textContent = labels[index];

      formItemContainer.appendChild(labelElement);
      formItemContainer.appendChild(inputElement);

      form.appendChild(formItemContainer);
    });

    form.appendChild(button);

    document.body.appendChild(form);
  };

  const createProjects = function () {
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    document.body.appendChild(projectsContainer);
  };

  const renderProject = function (project, index) {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    let projectName = document.createElement("div");
    projectName.classList.add("project-name");
    if (project == projects.currentProject) {
      projectName.classList.add("current-project");
    }
    projectName.textContent = `${project.name}`;

    let tasksContainer = document.createElement("ol");
    tasksContainer.classList.add("tasks-container");

    project.list.forEach((task, index) => {
      let taskDiv = renderTask(task, index);
      tasksContainer.appendChild(taskDiv);
    });

    const newTaskBtn = document.createElement("button");
    newTaskBtn.id = "new-task-btn";
    newTaskBtn.textContent = "New Task";
    tasksContainer.appendChild(newTaskBtn);

    projectDiv.appendChild(projectName);
    projectDiv.appendChild(tasksContainer);

    return projectDiv;
  };

  const renderTask = function (task, index) {
    let taskContainer = document.createElement("li");
    taskContainer.classList.add("task-item");

    let taskItem = document.createElement("input");
    taskItem.classList.add("task");

    taskItem.value = task.title;

    taskContainer.appendChild(taskItem);

    return taskContainer;
  };

  const renderProjects = function () {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.replaceChildren();

    projects.projects.forEach((project, index) => {
      let projectDiv = renderProject(project, index);
      projectsContainer.appendChild(projectDiv);
    });

    const newProjectBtn = document.createElement("button");
    newProjectBtn.id = "new-project-btn";
    newProjectBtn.textContent = "New Project";
    projectsContainer.appendChild(newProjectBtn);
  };

  const createEvents = function () {
    const sumbitButton = document.getElementById("submit-btn");
    const inputForm = document.getElementById("input-form");

    inputForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(inputForm);

      let title = data.get("input-title");
      let desc = data.get("input-description");
      let date = data.get("input-dueDate");

      let todoItem = new Todo(title, desc, date);
      let currentProject = projects.currentProject;
      currentProject.addTodoToList(todoItem);

      renderProjects();
    });
  };

  const createPage = function () {
    createForm();
    createEvents();
    createProjects();
    renderProjects();
  };

  const renderPage = function () {
    renderProjects();
  };
  return { createPage, renderPage };
})();

export { domHandler };
