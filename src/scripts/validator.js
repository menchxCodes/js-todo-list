import Todo from "./class/todo";

const todoValidator = (function () {
  const validateDate = function (dateInput) {
    let date = new Date(dateInput);
    if (date == "Invalid Date") {
      return false;
    } else {
      return true;
    }
  };

  const validateTitle = function (titleInput) {
    if (titleInput != undefined && titleInput != "") {
      return true;
    } else {
      return false;
    }
  };

  const validate = function (todoItem) {
    return validateDate(todoItem.dueDate) && validateTitle(todoItem.title);
  };

  return {
    validate,
  };
})();

const projectValidator = (function () {
  const validateName = function (projectName) {
    if (projectName != undefined && projectName != "") {
      return true;
    } else {
      return false;
    }
  };

  const validate = function (project) {
    return validateName(project.name);
  };

  return {
    validate,
  };
})();

export { todoValidator, projectValidator };
