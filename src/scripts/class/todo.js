class Todo {
  constructor(title, description, dueDate, priority = "normal") {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default Todo;
