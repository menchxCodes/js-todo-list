import { todoValidator } from "../validator";

class Project {
  constructor(name) {
    this.name = name;
    this.list = [];
    this.count = 0;
  }

  addTodoToList(todoItem) {
    if (todoValidator.validate(todoItem)) {
      this.list.push(todoItem);
      this.count += 1;
      console.log(`successfully added ${todoItem} to ${this.name}`);
      return this.list;
    } else {
      return console.log(`invalid todoItem ${todoItem}`);
    }
  }
}

export default Project;
