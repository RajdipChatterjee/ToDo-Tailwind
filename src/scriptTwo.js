document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.getElementById("todo-input");
  let addTask = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];
  tasks.forEach((task)=>renderTask(task));

  addTask.addEventListener("click", () => {
    let task = todoInput.value.trim();
    if (task == "") return;
    const taskObj = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    tasks.push(taskObj);
    saveTask(taskObj);
  });

  function saveTask(taskObj) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(taskObj);
  }

  function renderTask(task) {
    const li = document.createElement("li");

    li.innerHTML = `
    <span class="grow">${task.text}</span>
    <div>
        <button class="delete-btn bg-blue-600 p-1 rounded-sm duration-300 hover:bg-blue-500">
            <img src="./assets/edit-svgrepo-com.svg" />
        </button>
        <button class="edit-btn bg-red-600 p-1 rounded-sm duration-300 hover:bg-red-500">
            <img src="./assets/trash-bin-trash-svgrepo-com.svg" />
        </button>
    </div>
    `;
    todoList.append(li);
    li.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') return;
      task.completed = !task.completed;
      li.classList.toggle('line-through')
      saveTask();
    })

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
      tasks.forEach((task)=>renderTask(task));
    })
  }

  tasks.forEach((value) => {

  })
});