"use strict";
const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const headerButton = document.querySelector(".header-button");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [];
if (localStorage.getItem("todo") !== null) {
    todoData = JSON.parse(localStorage.getItem("todo"));
}

const render = function () {
    todoList.textContent = "";
    todoCompleted.textContent = "";

    todoData.forEach(function (item, index) {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        li.innerHTML =
            "<span class='text-todo'>" +
            item.value +
            "</span>" +
            "<div class='todo-buttons'>" +
            "<button class='todo-remove'></button>" +
            "<button class='todo-complete'></button>" +
            "</div>";

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector(".todo-complete");
        btnTodoComplete.addEventListener("click", function () {
            item.completed = !item.completed;
            render();
        });
        const btnTodoRemove = li.querySelector(".todo-remove");
        btnTodoRemove.addEventListener("click", function (event) {
            todoData.splice(index, 1);
            render();
        });
    });
    var json = JSON.stringify(todoData);
    localStorage.setItem("todo", json);
};
headerButton.addEventListener("mouseover", function () {
    if (headerInput.value === "") {
        headerButton.disabled = true;
        headerInput.placeholder = "Сначала введите название задачи";
    }
});

todoControl.addEventListener("input", function () {
    if (headerInput.value.length > 0) {
        headerButton.disabled = false;
        headerInput.placeholder = "Какие планы?";
    }
});
todoControl.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };

    todoData.push(newTodo);

    headerInput.value = ""; //Очищаем поле ввода

    render();
});

render();
