import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';
import compareAsc from 'date-fns/compareAsc';

import {
    allProjects,
    allTasks
} from "./list-functions";
import {
    renderFormEdit
} from './form-functions';
import { blurBackground } from '.';

export {
    renderTask,
    detailButton,
    renderSortedTasks
}

function renderTask(task) {
    const canvas = document.getElementById('app');
    const newTask = document.createElement('div');
    const date = format(parseISO(task.dueDate), 'dd/MM/yyyy');
    newTask.classList.add('task', `priority-${task.priority}`);
    newTask.innerHTML = `<div class="task-left">
                       
                        <div class="task-left-top">
                            <input type="checkbox" name="" class="completed">
                            <h2 class="task-title">${task.title}</h2>
                        </div>
                        <p class="task-description description-disabled">
                            ${task.description}
                        </p>
                        </div>
                        <div class="task-right">
                            <p class="task-date">${date}</p>
                            <button class="task-details task-button">Details</button>
                            <button class="task-edit task-button">Edit</button>
                            <button class="task-delete task-button">Delete</button>
                            <div class="line"></div>
                        </div>`;
    newTask.dataset.index = task.allIndex;
    canvas.appendChild(newTask);
}

function detailButton() {
    const allButtons = document.querySelectorAll('.task-details');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTask = e.target.parentNode.parentNode;
            const currentDescription = currentTask.querySelector('.task-description');

            currentTask.classList.toggle('show-description');
            currentDescription.classList.toggle('description-disabled');
        });

        if (button.parentNode.parentNode.querySelector('.task-description').textContent == '') {
            button.disabled = true;
            button.style.cursor = 'default';
        }
    });
}

function renderSortedTasks() {
    if (allTasks[0]) {
        switch (document.querySelector('.selected').textContent) {
            case 'All Tasks':
                renderAllTasks();
                break;
            case 'Today':
                renderTodayTasks();
                break;
            case 'This Week':
                renderWeekTasks();
                break;
            default:
                renderProjectTasks(document.querySelector('.selected').textContent);
                break;
        }
    }
    detailButton();
    editButton();
    completedButton();
    deleteButton();
}

function clearAll() {
    document.getElementById('app').textContent = '';
}

function renderAllTasks() {
    document.getElementById('app').textContent = '';
    allTasks.forEach(task => {
        renderTask(task);
    });
}

function renderTodayTasks() {
    renderAllTasks();
    const taskList = document.querySelectorAll('.task');
    let currentTask;
    let today = new Date();
    today = format(today, 'yyyy-MM-dd');
    allTasks.forEach(task => {
        for (let j = 0; j < taskList.length; j++) {
            if (task.allIndex == taskList[j].dataset.index) {
                currentTask = taskList[j];
            }
        }
        if (task.dueDate != today) {
            currentTask.classList.add('task-disabled');
        }
    });
}

function renderWeekTasks() {
    renderAllTasks();
    const taskList = document.querySelectorAll('.task');
    let currentTask;
    allTasks.forEach(task => {
        for (let j = 0; j < taskList.length; j++) {
            if (task.allIndex == taskList[j].dataset.index) {
                currentTask = taskList[j];
            }
        }
        if (weekCheck(task.dueDate) != 1) {
            currentTask.classList.add('task-disabled');
        }
    });
}

function weekCheck(date) {
    let thisDate = format(parseISO(date), "yyyy, MM, dd");
    let today = new Date();
    let week = addDays(today, 7);
    week = format((week), "yyyy, MM, dd");
    const result = compareAsc(new Date(week), new Date(thisDate));
    return result;
}

function renderProjectTasks(name) {
    renderAllTasks();

    for (let i = 1; i < allProjects.length; i++) {
        allProjects[i] = [allProjects[i][0]];
    }
    if (allProjects[1]) {
        for (let i = 1; i < allProjects.length; i++) {
            for (let j = 0; j < allTasks.length; j++) {
                if (allTasks[j].project == allProjects[i][0]) {
                    allProjects[i].push(allTasks[j]);
                }
            }
        }
    }
    let currentProject;
    for (let i = 1; i < allProjects.length; i++) {
        if (allProjects[i][0] == name) {
            currentProject = allProjects[i];
        }
    }

    const taskList = document.querySelectorAll('.task');
    let currentTask;

    allTasks.forEach(task => {
        for (let j = 0; j < taskList.length; j++) {
            if (task.allIndex == taskList[j].dataset.index) {
                currentTask = taskList[j];
            }
        }
        if (!currentProject.includes(task)) {
            currentTask.classList.add('task-disabled');
        }
    });
}

let currentTask;


function editButton() {
    const allButtons = document.querySelectorAll('.task-edit');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTaskDiv = e.target.parentNode.parentNode;
            allTasks.forEach(task => {
                if (currentTaskDiv.dataset.index == task.allIndex) {
                    currentTask = task;
                }
            });
            renderFormEdit(currentTask);
        });
    });
}


const editForm = document.getElementById('form-edit');
editForm.addEventListener('submit', e => {
    e.preventDefault();
    currentTask.title = editForm.querySelector('#form-edit-title').value;
    currentTask.dueDate = editForm.querySelector('#form-edit-date').value;
    currentTask.description = editForm.querySelector('#form-edit-description').value;
    currentTask.priority = editForm.querySelector('#form-edit-priority').value;
    currentTask.project = editForm.querySelector('#form-edit-project').value;

    const currentForm = document.getElementById('form-edit-container');
    currentForm.classList.add('disabled');
    blurBackground(currentForm);
    clearAll();
    renderSortedTasks();
});

function completedButton() {
    const allButtons = document.querySelectorAll('.completed');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTaskDiv = e.target.parentNode.parentNode.parentNode;
            const currentDescription = currentTaskDiv.querySelector('.task-description');
            const line = currentTaskDiv.querySelector('.line');
            currentTaskDiv.classList.remove('show-description');
            currentDescription.classList.add('description-disabled');
            line.classList.toggle('show-line');
            const buttonList = currentTaskDiv.querySelectorAll('button');
            buttonList.forEach(item => {
                if (item.disabled == true) {
                    item.disabled = false;
                } else {
                    item.disabled = true;
                }
            });
        });
    });
}

function deleteButton() {
    const allButtons = document.querySelectorAll('.task-delete');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTaskDiv = e.target.parentNode.parentNode;
            allTasks.forEach(task => {
                if (currentTaskDiv.dataset.index == task.allIndex) {
                    currentTask = task;
                }
            });
            allTasks.splice(currentTask, 1);
            for(let i = 0; i < allTasks.length; i++) {
                allTasks[i].allIndex = i;
            }
            clearAll();
            renderSortedTasks();
        });
    });
}