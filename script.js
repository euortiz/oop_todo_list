// grab elements
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// get data from localStorage on page load
let todoArr = JSON.parse(localStorage.getItem("todoArr")) || [];

// form part
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  const todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  Storage.addToStorage(todoArr);
});

// make object instance
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

//display the todo in the DOM;
class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
        <div class="todo">
          <p>${item.todo}</p>
          <span class="remove" data-id=${item.id}>❌</i></span>
        </div>
      `;
    });
    lists.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    input.value = "";
  }
  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeArrayTodo(btnId);
      Storage.addToStorage(todoArr);
    });
  }
  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
  }
}

// save data to localStorage
class Storage {
  static addToStorage(todoArr) {
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }
}

// display data on page load
UI.displayData();

// function to set up event listener for removing a todo item
function setupRemoveTodoListener() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        let btnId = e.target.dataset.id;
        UI.removeArrayTodo(btnId);
        Storage.addToStorage(todoArr);
      }
    });
  }
  
  // call the function once on page load
  setupRemoveTodoListener();
  