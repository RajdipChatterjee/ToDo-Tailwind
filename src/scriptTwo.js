document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.getElementById("todo-input");
  let addTask = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  tasks.forEach((task) => renderTask(task));

  addTask.addEventListener("click", () => {
    let task = todoInput.value.trim();
    if (task === "") return;

    const taskObj = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    tasks.push(taskObj);
    saveTasks();
    renderTask(taskObj);

    todoInput.value = ""; // clear input
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="grow">${task.text}</span>
      <div>
        <button class="edit-btn bg-blue-600 p-1 rounded-sm duration-300 hover:bg-blue-500">
          <img src="./assets/edit-svgrepo-com.svg" />
        </button>
        <button class="delete-btn bg-red-600 p-1 rounded-sm duration-300 hover:bg-red-500">
          <img src="./assets/trash-bin-trash-svgrepo-com.svg" />
        </button>
      </div>
    `;

    // Apply line-through if completed
    if (task.completed) {
      li.classList.add("line-through");
    }

    // Toggle completion when clicking text
    li.querySelector("span").addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("line-through");
      saveTasks();
    });

    // Edit Task
    // li.querySelector(".edit-btn").addEventListener("click", (e) => {
    //   e.stopPropagation();
    //   tasks = tasks.forEach((t) => {
    //     if(t.id !== task.id) {

    //     }
    //   });
    //   saveTasks();
    //   li.remove();
    // })

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      li.remove();
    });

    todoList.append(li);
  }
});
