import { detailButton } from "./dom-functions";
import { formTask, formProject, sidebarNavigation } from "./form-functions";
import format from "date-fns/format";

export {
    blurBackground
}

const createButtonTask = document.getElementById('create-button-task');
const createButtonProject = document.getElementById('create-button-project');

createButtonTask.addEventListener('click', () => {
    renderForm('task');
});
createButtonProject.addEventListener('click', () => {
    renderForm('project');
});

function renderForm(name) {
    const allForms = document.querySelectorAll('.other-container');
    const currentContainer = document.getElementById(`form-${name}-container`);
    const currentForm = currentContainer.querySelector('form');
    const closeButton = currentContainer.querySelector('.close-button');
    currentForm.reset();
    allForms.forEach(e => {
        if(e != currentContainer) {
            e.classList.add('disabled');
        }
    });
    currentContainer.classList.toggle('disabled');
    blurBackground(currentContainer);
    closeButton.addEventListener('click', () => {
        currentContainer.classList.add('disabled');
        blurBackground(currentContainer);
    });

    let today = new Date();
    today = format(today, 'yyyy-MM-dd');
    console.log(today);
    document.getElementById('form-task-date').setAttribute('min', `${today}`);
    document.getElementById('form-edit-date').setAttribute('min', `${today}`);
}

// detailButton();
sidebarNavigation();

function blurBackground(currentContainer) {
    if(currentContainer.classList.contains('disabled')) {
        document.querySelector('.blur-container').classList.add('hidden');
    } else {
        document.querySelector('.blur-container').classList.remove('hidden');
    }
}