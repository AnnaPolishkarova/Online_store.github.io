document.addEventListener('DOMContentLoaded', () => {
    const saveSettingsButton = document.getElementById('save-settings');
    const loadSettingsButton = document.getElementById('load-settings');
    const form = document.getElementById('task-form');
    const taskList = document.getElementById('tasks-list');

    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById('task-title').value.trim();
        const taskDate = document.getElementById('task-date').value;

        if (!taskTitle || !taskDate) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        addTask(taskTitle, taskDate);
        form.reset();
    });

    function addTask(title, date, isCompleted = false) {
        if (!title || !date) return;

        const taskItem = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = `${title} (до ${date})`;
        taskItem.appendChild(taskContent);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const completeButton = document.createElement('button');
        completeButton.className = 'mark-complete';
        completeButton.textContent = isCompleted ? 'Выполнено' : 'Выполнить';
        completeButton.style.backgroundColor = isCompleted ? 'green' : 'blue';

        completeButton.addEventListener('click', () => {
            const isNowCompleted = taskItem.classList.toggle('completed');
            completeButton.textContent = isNowCompleted ? 'Выполнено' : 'Выполнить';
            completeButton.style.backgroundColor = isNowCompleted ? 'green' : 'blue';
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-task';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);
        taskItem.appendChild(actionsDiv);

        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((task) => {
            const text = task.querySelector('span').innerText;
            const [title, datePart] = text.split(' (до ');
            if (!title || !datePart) return; // Игнорируем некорректные задачи
            const date = datePart.replace(')', '').trim();
            const isCompleted = task.classList.contains('completed');
            tasks.push({ title, date, isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';

        tasks.forEach((task) => {
            if (task.title && task.date) {
                addTask(task.title, task.date, task.isCompleted);
            }
        });
    }

    saveSettingsButton.addEventListener('click', () => {
        saveTasks();
        alert('Параметры сохранены');
    });

    loadSettingsButton.addEventListener('click', () => {
        loadTasks();
        alert('Параметры загружены');
    });
});
