import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import {
    detailButton,
    renderSortedTasks,
    renderTask
} from "./dom-functions";
import {
    allProjects,
    allTasks,
    makeNewTask
} from "./list-functions";
import { blurBackground } from '.';

export {
    formTask,
    formProject,
    sidebarNavigation,
    renderFormEdit
};

const formTask = document.getElementById('form-task');
const formProject = document.getElementById('form-project');


formTask.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.getElementById('form-task-title').value;
    const description = document.getElementById('form-task-description').value;
    const dueDate = document.getElementById('form-task-date').value;
    const priority = document.getElementById('form-task-priority').value;
    const allIndex = allTasks.length;
    let project = '';
    if (allProjects[1]) {
        project = document.getElementById('form-task-project').value;
    } else {
        project = allProjects[0];
    }

    
    const newTask = makeNewTask(title, description, dueDate, priority, project, allIndex);
    allTasks.push(newTask);
    renderSortedTasks();
    formTask.parentNode.parentNode.classList.toggle('disabled');
    const currentForm = document.getElementById('form-task-container');
    blurBackground(currentForm);
});


formProject.addEventListener('submit', event => {
    event.preventDefault();
    const newProject = [document.getElementById('form-project-title').value];
    allProjects.push(newProject);
    renderProjects();

});

function renderProjects() {
    const list = document.getElementById('menu');
    const listItems = list.querySelectorAll('li');
    const formList = document.getElementById('form-task-project');
    const formListItems = formList.querySelectorAll('option');
    const formListEdit = document.getElementById('form-edit-project');
    const formListEditItems = formListEdit.querySelectorAll('option');

    for (let i = 3; i < listItems.length; i++) {
        listItems[i].remove();
    }

    for (let i = 0; i < formListItems.length; i++) {
        formListItems[i].remove();    
    }

    for (let i = 0; i < formListEditItems.length; i++) {
        formListEditItems[i].remove();
       
    }

    for (let i = 1; i < allProjects.length; i++) {
        const project = allProjects[i][0];
        const item = document.createElement('li');
        const option = document.createElement('option');
        const editOption = document.createElement('option');
        item.textContent = option.textContent = editOption.textContent = `${project}`;
        formList.appendChild(option);
        list.appendChild(item);
        formListEdit.appendChild(editOption);
    }

    document.getElementById('form-project').parentNode.parentNode.classList.add('disabled');
    const currentForm = document.getElementById('form-project-container');
    blurBackground(currentForm);
    sidebarNavigation();
}


function sidebarNavigation() {
    const sidebarItems = document.querySelectorAll('li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', sidebarItemClick);
    });
}

function sidebarItemClick(e) {
    const sidebarItems = document.querySelectorAll('li');
    sidebarItems.forEach(item => {
        item.classList.remove('selected');
    })
    e.target.classList.add('selected');
    renderSortedTasks();
}

function renderFormEdit(task) {
    const currentContainer = document.getElementById('form-edit-container');
    const editForm = document.getElementById('form-edit');
    currentContainer.classList.remove('disabled');
    blurBackground(currentContainer);
    editForm.querySelector('#form-edit-title').value = task.title;
    editForm.querySelector('#form-edit-date').value = task.dueDate;
    editForm.querySelector('#form-edit-description').value = task.description;
    editForm.querySelector('#form-edit-priority').value = task.priority;
    editForm.querySelector('#form-edit-project').value = task.project;
    const closeButton = currentContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        currentContainer.classList.add('disabled');
        blurBackground(currentContainer);
    });
}