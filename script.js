const todos = generateTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#filter-todos').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const id = uuidv4()
    const text = e.target.elements.todoText.value
    if (text.length > 0) {
        todos.push({
            text: text,
            completed: false,
            id: id
        })
    }
    e.target.elements.todoText.value = ''
    savedTodos(todos)
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

