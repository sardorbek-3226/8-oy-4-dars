const inputEl = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const listEl = document.getElementById("todo-list") as HTMLUListElement;
const itemsLeftEl = document.getElementById("items-left") as HTMLElement;

const filterAllBtn = document.getElementById("filter-all") as HTMLButtonElement;
const filterActiveBtn = document.getElementById("filter-active") as HTMLButtonElement;
const filterCompletedBtn = document.getElementById("filter-completed") as HTMLButtonElement;

let todos: { text: string; completed: boolean }[] = [];
let currentFilter: "all" | "active" | "completed" = "all";

function renderTodos() {
  listEl.innerHTML = "";

  let filtered = todos;
  if (currentFilter === "active") {
    filtered = todos.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = todos.filter(t => t.completed);
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center gap-3 px-4 py-3";
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} class="h-5 w-5 rounded-full text-purple-500">
      <span class="${todo.completed ? "line-through text-gray-500" : ""}">${todo.text}</span>
    `;

    li.querySelector("input")?.addEventListener("change", () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });

    listEl.appendChild(li);
  });

  const left = todos.filter(t => !t.completed).length;
  itemsLeftEl.textContent = `${left} items left`;

  // aktiv tugmaga rang beramiz
  filterAllBtn.classList.remove("text-purple-400");
  filterActiveBtn.classList.remove("text-purple-400");
  filterCompletedBtn.classList.remove("text-purple-400");

  if (currentFilter === "all") filterAllBtn.classList.add("text-purple-400");
  if (currentFilter === "active") filterActiveBtn.classList.add("text-purple-400");
  if (currentFilter === "completed") filterCompletedBtn.classList.add("text-purple-400");
}

// Todo qo‘shish
addBtn.addEventListener("click", () => {
  if (inputEl.value.trim() !== "") {
    todos.push({ text: inputEl.value.trim(), completed: false });
    inputEl.value = "";
    renderTodos();
  }
});

// "Enter" bosilganda ham ishlashi uchun
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Filter tugmalari
filterAllBtn.addEventListener("click", () => {
  currentFilter = "all";
  renderTodos();
});
filterActiveBtn.addEventListener("click", () => {
  currentFilter = "active";
  renderTodos();
});
filterCompletedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  renderTodos();
});

// Clear Completed
document.getElementById("clear-completed")?.addEventListener("click", () => {
  todos = todos.filter(t => !t.completed);
  renderTodos();
});
