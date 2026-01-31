let input = document.querySelector("input");
let addBtn = document.querySelector(".add");
let result = document.querySelector(".results");
let errorMsg = document.querySelector(".error");
let paginationContainer = document.querySelector(".pajnation");

let currentPage = 1;
let rowsPerPage = 3;

function errorMassage(message) {
  errorMsg.classList.add("show");
  errorMsg.textContent = message;
  setTimeout(() => {
    errorMsg.classList.remove("show");
  }, 2000);
}

function displayTasks() {
  let tasks = Array.from(result.querySelectorAll(".result-box"));
  let start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;

  tasks.forEach((task, index) => {
    if (index >= start && index < end) {
      task.style.display = null;
    } else {
      task.style.display = "none";
    }
  });

  setupPagination(tasks.length);
}

function setupPagination(totalTasks) {
  paginationContainer.innerHTML = "";
  let pageCount = Math.ceil(totalTasks / rowsPerPage);

  if (pageCount <= 1) return;

  for (let i = 1; i <= pageCount; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      displayTasks();
    });
    paginationContainer.appendChild(btn);
  }
}
function addResultBox() {
  if (input.value.trim() === "") {
    errorMassage("Please enter a task");
  } else {
    let div = document.createElement("div");
    div.classList.add("result-box");

    let p = document.createElement("p");
    p.className = "task";
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    let resultText = document.createElement("span");
    resultText.textContent = input.value;

    let btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");

    let editBtn = document.createElement("span");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", function () {
      if (editBtn.textContent === "edit") {
        let currentText = resultText.textContent;
        p.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
        editBtn.textContent = "save";
        editBtn.classList.add("green");
        p.querySelector("input").focus();
      } else {
        let inputEditing = p.querySelector("input");
        if (inputEditing.value.trim() === "") {
          errorMassage("task can not be empty");
        } else {
          p.innerHTML =`<input type="checkbox"> 
          <span>${inputEditing.value}</span>` ;
          editBtn.textContent = "edit";
          editBtn.classList.remove("green");
        }
      }
    });

    let delBtn = document.createElement("span");
    delBtn.textContent = "delete";
    delBtn.addEventListener("click", function () {
      div.remove();
      let tasksCount = result.querySelectorAll(".result-box").length;
      if ((currentPage - 1) * rowsPerPage >= tasksCount && currentPage > 1) {
        currentPage--;
      }
      displayTasks();
    });
    p.appendChild(check);
    p.appendChild(resultText);
    div.appendChild(p);
    btnsDiv.appendChild(editBtn);
    btnsDiv.appendChild(delBtn);
    div.appendChild(btnsDiv);

    result.appendChild(div);
    input.value = "";

    displayTasks();
  }
}
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addResultBox()
  }
});
addBtn.addEventListener("click", addResultBox);
