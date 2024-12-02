const aaddTask = document.querySelector('#aadd-task')
const taskInput = document.querySelector('#task-input')

const listContainer = document.querySelector('#list-container')
const error = document.querySelector('#error')

const modal = document.querySelector('#modal-wrapper')
const closeModal = document.querySelector('#close-modal')
const modalWrapper = document.querySelector('#modal-wrapper')


async function getTasks(){
    try{
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852')

        const data = await res.json()

        

        console.log(data)
        data.forEach(task => createListItem(task))
        

    }
    catch (error){
        console.log('fel', error)
    }
}



async function addTask(task){
    try{
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: task})
        })

        const newTask = await res.json()

        createListItem(newTask)

        console.log(newTask)
    }
    catch (error) {
        console.log('fel', error)
    }

    
}

async function deleteTask(id){
    try{
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852`, {
            method: 'DELETE'
        })
        console.log(`task id ${id}`)

    }
    catch (error){
        console.log('fel', error)
    }
}


async function updateTask(id, completed){
    try{
        const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${id}?apikey=1734c322-ea8f-4b07-98a4-b3b9fed52852`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: completed})
        })

        const data = await res.json();

        console.log(data)
    }
    catch (error){
        console.log('Fel', error)
    }
}



function displayError(message) {
    if (!document.querySelector('.error')) {
        const errorMsg = document.createElement('span');
        errorMsg.textContent = message;
        errorMsg.classList.add('error');
        error.appendChild(errorMsg);
    }
}


function clearError() {
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
}


function showModal() {
    modalWrapper.style.display = 'block';
}


function createListItem(task) {
    clearError();

    const li = document.createElement('li');
    li.classList.add('task-card');
    li.dataset._id = task._id;

    const taskText = document.createElement('span');
    taskText.textContent = task.title;
    if (task.completed) taskText.classList.add('complete');
    li.appendChild(taskText);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    
    deleteBtn.addEventListener('click', async e => {
        e.stopPropagation();
        if (!task.completed) {
            showModal();
        } else {
            await deleteTask(task._id);
            li.remove();
        }
    });

    li.addEventListener('click', async () => {
        const taskStatus = !task.completed;
        await updateTask(task._id, taskStatus);
        taskText.classList.toggle('complete');
        task.completed = taskStatus;
    });

    listContainer.appendChild(li);
}




aaddTask.addEventListener('submit', async e => {
    e.preventDefault();
    const taskTitle = taskInput.value.trim();

    if (taskTitle === '') {
        displayError('You need to enter a task');
    } else {
        clearError();
        await addTask(taskTitle);
    }

    taskInput.value = '';
});


modalWrapper.addEventListener('click', e => {
    if (e.target === modalWrapper) {
        modalWrapper.style.display = 'none';
    }
});


closeModal.addEventListener('click', e => {
    modalWrapper.style.display = 'none';
});


getTasks();












