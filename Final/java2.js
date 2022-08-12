

const filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    SumbitForm = document.querySelector(".js-form"),
    taskBox = document.querySelector(".task-box");
const taskInput = "";
let editId,
    isEditTask = false,
    todo = JSON.parse(localStorage.getItem("todo-list"));



filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});


function submitJSForm(e) {
  
    const taskInput = document.querySelector(".task-input input");


    // let taskInput=document.getElementById("name").value;
    let userTask = taskInput.value.trim();
    console.log("taskInput",taskInput)
    var val_d = document.getElementById("js-todo-input2").value;
 
    var val_t = document.getElementById("js-todo-input3").value;
    let combin = "<pre>" + userTask + "    " + val_d + "    " + val_t + " </pre>";
    if (!isEditTask) {
        if (!isEditTask) {
            // todo = !todo ? [] : todo;
            if (!todo) {
                todo = []
            }
            else { todo = todo }
            let taskInfo = { name: combin, status: "pending" };

            todo.push(taskInfo);
        } else {
            isEditTask = false;
            todo[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todo));
       const todos =  localStorage.getItem("todo-list")
     

    }
}
function showTodo(filter) {
    let liTag = "";
    if (todo) {
        todo.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li style="align:left" class="task">
                            <label for="${id}"><sup>Done?</sup>
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span><b style="color:green;">You don't have any task here</span><b>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");




function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todo[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todo[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todo))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todo.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todo));
    showTodo(filter);
}

function empty() {


    //const ref = localStorage.getItem('todoItems');
    localStorage.removeItem('todo-list');
    location.reload();

}
