export {
    makeNewTask,
    allProjects,
    allTasks
}

let allTasks = [];
let allProjects = ['none'];

const Task = (title, description, dueDate, priority, project, allIndex) => {
    return {
        title,
        description,
        dueDate,
        priority,
        project,
        allIndex
    }
};

function makeNewTask(title, description, dueDate, priority, project, allIndex) {
    const task = Task(title, description, dueDate, priority, project, allIndex);
    return task;
};