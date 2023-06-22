const List = (title, description, dueDate, priority, index) => {
    return {
        title,
        description,
        dueDate,
        priority,
        index
    }
};

const allTasks = [];

export default function makeNewList(title, description, dueDate, priority, index) {
    const list = List(title, description, dueDate, priority, index);
    allTasks.push(list);
    return allTasks;
};