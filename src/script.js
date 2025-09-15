document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.getElementById("todo-input");
  let addTaskButton = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(task => renderTask(task));
  addTaskButton.addEventListener("click", () => {
    let taskText = todoInput.value.trim();
    if (taskText == "") return;
    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; // clear input
  });

  function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id)
    li.innerHTML = `<li class="flex items-center">
                <span class="grow">${task.text}</span>
                <button id="deleteButton" class="bg-red-800 px-2 py-1 rounded-sm duration-300 hover:bg-red-700">delte</button>
            </li>`
    todoList.appendChild(li);
    li.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') return;
      task.completed = !task.completed;
      li.classList.toggle('line-through')
      saveTasks();
    })

    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTasks();
    })
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});