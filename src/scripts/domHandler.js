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

  const renderProject = function (project) {
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    let projectName = document.createElement("div");
    projectName.classList.add("project-name");

    projectName.textContent = `${project.name}`;

    let tasksContainer = document.createElement("ol");
    tasksContainer.classList.add("tasks-container");

    project.list.forEach((task) => {
      let taskDiv = renderTask(project, task);
      tasksContainer.appendChild(taskDiv);
    });

    const newTaskBtn = document.createElement("button");
    newTaskBtn.classList.add("new-task-btn");
    newTaskBtn.textContent = "New Task";

    newTaskBtn.addEventListener("click", function (e) {
      newTaskBtn.classList.add("hidden");
      let taskDiv = document.createElement("input");
      taskDiv.classList.add("temp-task");

      taskDiv.addEventListener("change", function (e) {
        let newTask = new Todo(
          this.value,
          "",
          format(Date.now(), "yyyy-MM-dd")
        );
        if (todoValidator.validate(newTask)) {
          project.addTodoToList(newTask);

          renderPage();
        } else {
          renderPage();
        }
      });
      tasksContainer.insertBefore(taskDiv, tasksContainer.lastChild);
    });
    tasksContainer.appendChild(newTaskBtn);

    projectDiv.appendChild(projectName);
    projectDiv.appendChild(tasksContainer);

    return projectDiv;
  };

  const renderTask = function (project, task) {
    let taskContainer = document.createElement("li");
    taskContainer.classList.add("task-item");

    let taskItem = document.createElement("input");
    taskItem.classList.add("task");

    let taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons");

    let detailsBtn = document.createElement("button");
    detailsBtn.classList.add("details-btn");
    detailsBtn.textContent = "details";

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "delete";

    taskButtons.appendChild(detailsBtn);
    taskButtons.appendChild(deleteBtn);

    taskItem.value = task.title;

    taskItem.addEventListener("change", function (e) {
      let newTask = new Todo(this.value, "", format(Date.now(), "yyyy-MM-dd"));
      if (todoValidator.validate(newTask)) {
        task.title = this.value;
        document.activeElement?.blur();
        // renderPage();
      } else {
        this.value = task.title;
        console.log("invalid new task");
      }
    });

    deleteBtn.addEventListener("click", function () {
      project.removeTodoFromList(task);
      renderPage();
    });

    taskContainer.appendChild(taskItem);
    taskContainer.appendChild(taskButtons);

    return taskContainer;
  };

  const renderProjects = function () {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.replaceChildren();

    projects.projects.forEach((project) => {
      let projectDiv = renderProject(project);
      projectsContainer.appendChild(projectDiv);
    });

    const newProjectBtn = document.createElement("button");
    newProjectBtn.id = "new-project-btn";
    newProjectBtn.textContent = "New Project";
    projectsContainer.appendChild(newProjectBtn);
  };

  const createPage = function () {
    createProjects();
  };

  const renderPage = function () {
    renderProjects();

    console.log(projects);
  };
  return { createPage, renderPage };
})();

export { domHandler };
