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
    const span = li.getElementsByTagName("span")[0];
    if (task.completed) {
      span.classList.add("line-through");
    }

    li.addEventListener("click", () => {
      span.classList.toggle("line-through");

      // update completed flag
      tasks.forEach((t) => {
        if (task.id === t.id) {
          t.completed = !t.completed;
        }
      });

      saveTasks(); // use your existing function
    });

    const deleteBtn = li.getElementsByClassName("delete-btn")[0];
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    const editBtn = li.getElementsByClassName("edit-btn")[0];
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // stop li click toggle

      // create input
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent; // start with old text
      input.className = " grow-1 mr-3 shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]";
      span.replaceWith(input);
      input.focus();

      // commit function
      function commit() {
        const newValue = input.value.trim();
        if (newValue) {
          span.textContent = newValue;
          // update correct task
          tasks.forEach((t) => {
            if (t.id === task.id) {
              t.text = newValue;
            }
          });
          saveTasks();
        }
        input.replaceWith(span);
      }

      // events
      input.addEventListener("blur", commit, { once: true });
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") commit();
        if (ev.key === "Escape") input.replaceWith(span);
      });
    });

    todoList.append(li);
  }
});
