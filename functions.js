// Geting the todos from local storage
const generateTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save the todos to local storage
const savedTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Setup up remove todo function
const removeTodo = (todoID) => {
    const todoIndex = todos.findIndex((todo) => todoID === todo.id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle wether the todo is completed or not
const toggleTodo = (todoID) => {
    const findTodo = todos.find((todo) => todo.id === todoID)
    if (findTodo) {
        findTodo.completed = !findTodo.completed
    }
}

// Render the todos list
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !todo.completed || !filters.hideCompleted
        return searchTextMatch && hideCompletedMatch
    })

    const todosLeft = filteredTodos.filter((todo) => {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(todosLeftDOM(todosLeft))

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodosDOM(todo))
    })

}

// Generate todos left DOM
const todosLeftDOM = (todosLeft) => {
    const todosLeftEl = document.createElement('h2')
    const plural = todosLeft.length === 1 ? '' : "'S"
    todosLeftEl.textContent = `You have ${todosLeft.length} TO-DO${plural} left!`
    return todosLeftEl
}

// Generate todos DOM
const generateTodosDOM = (todo) => {
    const divEl = document.createElement('label')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup up the check box
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    divEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        savedTodos(todos)
        renderTodos(todos, filters)
    })
    
    // Setup div element
    divEl.classList.add('todo-style')

    // Setup up text content
    textEl.textContent = todo.text
    divEl.appendChild(textEl)

    // Setup remove button
    removeButton.textContent = 'X'
    removeButton.classList.add('delete-button')
    divEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
            removeTodo(todo.id)
            savedTodos(todos)
            renderTodos(todos, filters)
    })

    return divEl
}
