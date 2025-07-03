const addBtn = document.querySelector(".add-btn");
const taskLi = document.querySelector("#task-li");
const submitBtn = document.querySelector(".submit-btn");
const taskName = document.querySelector("#task-name");
const taskDesc = document.querySelector("#task-desc");
const taskDate = document.querySelector("#task-date");
const addTask = document.querySelector("#add-task");
const createTask = document.querySelector("#create-task");
const closeBtn = document.querySelector("#close-btn");

addBtn.addEventListener("click", function() {
    addTask.style.display = "block";
});


submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    taskLi.innerHTML += `
    <li class="to-do">${taskName.value}:<br> ${taskDesc.value}.
    Complete by: ${taskDate.value}</li>
    `;
    addTask.style.display = "none";
    createTask.reset();
});

closeBtn.addEventListener("click", function(){
    addTask.style.display = "none";
});


// to do when coming back to the code.
// add a complete task and delete task for each li 
// later integrate a priority feature that will change the ranking of the li
