import Todo from "./class/todo";
import Project from "./class/project";
import { Projects, projects } from "./class/projects";
import format from "date-fns/format";
import { todoValidator } from "./validator";

const domHandler = (function () {
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

    hookNewTaskEvent(project, tasksContainer, newTaskBtn);
    tasksContainer.appendChild(newTaskBtn);

    projectDiv.appendChild(projectName);
    projectDiv.appendChild(tasksContainer);

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
      renderTaskDialog(task);
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

  const renderTaskDialog = function (task) {
    let dialog = document.createElement("dialog");
    dialog.classList.add("task-dialog");

    let taskDetails = document.createElement("div");
    taskDetails.classList.add("task-details");

    let taskTitle = document.createElement("input");
    taskTitle.value = task.title;
    taskTitle.classList.add("dialog-title");

    let taskDescription = document.createElement("textarea");
    taskDescription.value = task.description;
    taskDescription.classList.add("dialog-description");

    let taskDueDate = document.createElement("input");
    taskDueDate.type = "date";
    taskDueDate.value = task.dueDate;
    taskDueDate.classList.add("dialog-dueDate");

    let taskPriority = document.createElement("select");

    let prioLow = document.createElement("option");
    prioLow.value = "low";
    prioLow.textContent = "low";

    let prioNormal = document.createElement("option");
    prioNormal.value = "normal";
    prioNormal.textContent = "normal";

    let prioHigh = document.createElement("option");
    prioHigh.value = "high";
    prioHigh.textContent = "high";

    taskPriority.appendChild(prioLow);
    taskPriority.appendChild(prioNormal);
    taskPriority.appendChild(prioHigh);

    taskPriority.value = task.priority;
    taskPriority.classList.add("dialog-priority");

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);
    taskDetails.appendChild(taskPriority);

    let saveBtn = document.createElement("button");
    saveBtn.classList.add("dialog-close-btn");
    saveBtn.textContent = "Save";

    saveBtn.addEventListener("click", function () {
      dialogSaveClose(
        task,
        dialog,
        taskTitle,
        taskDescription,
        taskDueDate,
        taskPriority
      );
    });

    dialog.addEventListener("click", function (e) {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialogSaveClose(
          task,
          dialog,
          taskTitle,
          taskDescription,
          taskDueDate,
          taskPriority
        );
      }
    });

    dialog.append(taskDetails);
    dialog.append(saveBtn);

    document.body.appendChild(dialog);
    dialog.showModal();
    console.log(dialog);
  };

  const dialogSaveClose = function (
    task,
    dialog,
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  ) {
    let newTask = new Todo(
      taskTitle.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value
    );

    console.log(newTask);

    if (todoValidator.validate(newTask)) {
      task.title = newTask.title;
      task.description = newTask.description;
      task.dueDate = newTask.dueDate;
      task.priority = newTask.priority;

      console.log(`${task} updated successfully.`);
      console.log(task, newTask);
      dialog.close();
    } else {
      console.log("failed to update task");
      dialog.close();
    }
    renderPage();
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
