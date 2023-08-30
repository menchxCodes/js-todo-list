import Todo from "./class/todo";
import Project from "./class/project";
import { Projects, projects } from "./class/projects";
import format from "date-fns/format";
import { projectValidator, todoValidator } from "./validator";
import { dom } from "./domHelpers";

const domHandler = (function () {
  const createProjects = function () {
    const projectsContainer = dom.create(
      document.body,
      "div",
      ".projects-container"
    );
  };

  const renderProject = function (project) {
    let projectDiv = dom.create("", "div", ".project");
    let projectName = dom.create(
      projectDiv,
      "div",
      ".project-name",
      project.name
    );

    let tasksContainer = dom.create(projectDiv, "div", ".tasks-container");

    project.list.forEach((task) => {
      let taskDiv = renderTask(project, task);
      tasksContainer.appendChild(taskDiv);
    });

    let newTaskBtn = dom.create(
      tasksContainer,
      "button",
      ".new-task-btn",
      "New Task"
    );

    hookNewTaskEvent(project, tasksContainer, newTaskBtn);

    return projectDiv;
  };

  const hookNewTaskEvent = function (project, tasksContainer, newTaskBtn) {
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
      taskDiv.focus();
    });
  };

  const renderTaskButtons = function () {
    let taskButtons = dom.create("", "div", ".task-buttons");
    let detailsBtn = dom.create(
      taskButtons,
      "button",
      "details-btn",
      "details"
    );
    let deleteBtn = dom.create(taskButtons, "button", "delete-btn", "delete");

    return {
      "button-group": taskButtons,
      "details-button": detailsBtn,
      "delete-button": deleteBtn,
    };
  };

  const renderTask = function (project, task) {
    let taskContainer = document.createElement("li");
    taskContainer.classList.add("task-item");

    let taskItem = document.createElement("input");
    taskItem.classList.add("task");

    let taskButtons = renderTaskButtons();

    taskItem.value = task.title;

    taskItem.addEventListener("change", function (e) {
      let newTask = new Todo(this.value, "", format(Date.now(), "yyyy-MM-dd"));
      if (todoValidator.validate(newTask)) {
        task.title = this.value;
        document.activeElement?.blur();
        console.log("successfully updated " + task);
        // renderPage();
      } else {
        this.value = task.title;
        console.log("invalid new task");
      }
    });

    let detailsBtn = taskButtons["details-button"];
    detailsBtn.addEventListener("click", function (e) {
      // renderTaskDialog(task);
      testRenderDialog(task);
    });

    let deleteBtn = taskButtons["delete-button"];
    deleteBtn.addEventListener("click", function () {
      if (confirm(`Are you sure yo want to delete "${task.title}"`)) {
        project.removeTodoFromList(task);
        renderPage();
      }
    });

    taskContainer.appendChild(taskItem);
    taskContainer.appendChild(taskButtons["button-group"]);

    return taskContainer;
  };
  const testRenderDialog = function (task) {
    let dialog = document.createElement("dialog");

    let taskTitle = dom.createInputLabel(
      "text",
      "dialog-task-title",
      "Title: ",
      task.title
    );

    let taskDescription = dom.createTextAreaLabel(
      "dialog-task-description",
      "Description: ",
      task.description
    );

    let taskDueDate = dom.createInputLabel(
      "date",
      "dialog-task-dueDate",
      "Due Date: ",
      task.dueDate
    );

    let taskPriority = dom.createSelect("Priority: ", [
      "low",
      "normal",
      "high",
    ]);
    taskPriority.div.classList.add("dialog-task-priority");
    taskPriority.select.value = task.priority;

    let taskContainer = dom.create(dialog, "div", ".dialog-task-container");
    dom.appendChildren(taskContainer, [
      taskTitle.div,
      taskDescription.div,
      taskDueDate.div,
      taskPriority.div,
    ]);

    let btnGroup = dom.create(taskContainer, "div", ".dialog-button-group");
    let saveBtn = dom.create(btnGroup, "button", "dialog-save-btn", "Save");
    let closeBtn = dom.create(btnGroup, "button", "dialog-delete-btn", "Close");

    saveBtn.addEventListener("click", function (e) {
      dialogSaveEvent(task, dialog, taskContainer);
    });

    closeBtn.addEventListener("click", function (e) {
      dialog.close();
    });

    dialog.appendChild(taskContainer);

    document.body.appendChild(dialog);
    dialog.showModal();
  };

  const dialogSaveEvent = function (task, dialog, container) {
    let title = container.querySelector(".dialog-task-title input");
    let description = container.querySelector(
      ".dialog-task-description textarea"
    );
    let dueDate = container.querySelector(".dialog-task-dueDate input");
    let priority = container.querySelector(".dialog-task-priority select");

    let newTask = new Todo(
      title.value,
      description.value,
      dueDate.value,
      priority.value
    );

    if (todoValidator.validate(newTask)) {
      task.title = newTask.title;
      task.description = newTask.description;
      task.dueDate = newTask.dueDate;
      task.priority = newTask.priority;

      dialog.close();
      renderPage();
    } else {
      console.log("failed to update task");
      dialog.close();
    }
  };

  const outOfBoundsEvent = function (dialog) {
    dialog.addEventListener("click", function (e) {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
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

    newProjectBtn.addEventListener("click", function (e) {
      newProjectDialog();
    });
    projectsContainer.appendChild(newProjectBtn);
  };

  const newProjectDialog = function () {
    let dialog = document.createElement("dialog");
    dialog.id = "new-project-dialog";
    document.body.appendChild(dialog);

    dialog.showModal();

    let projectNameLabel = document.createElement("label");
    projectNameLabel.setAttribute("for", "new-project-input");
    projectNameLabel.textContent = "Project Name:";

    let projectNameInput = document.createElement("input");
    projectNameInput.id = "new-project-input";

    let dialogCloseBtn = document.createElement("button");
    dialogCloseBtn.classList.add("dialog-close-btn");
    dialogCloseBtn.textContent = "Save";

    dialog.appendChild(projectNameLabel);
    dialog.appendChild(projectNameInput);
    dialog.appendChild(dialogCloseBtn);

    projectNameInput.focus();

    dialogCloseBtn.addEventListener("click", function (e) {
      let newProject = new Project(projectNameInput.value);
      if (projectValidator.validate(newProject)) {
        projects.addProject(newProject);
        dialog.close();
        renderPage();
      }
    });
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
