import { toggleTodo, filterTodos, removeTodo } from "./todos"

//Render the amount of uncompleted todos in the browser
const getSummary = (filteredTodos) => {
    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)
    const summary = document.createElement("h2")
    const plural = incompletedTodos.length === 1 ? "" : "s"
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left:`
    document.querySelector("#todos").appendChild(summary)
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement("div")
    const textEl = document.createElement("span")
    const removeButton = document.createElement("button")
    const checkbox = document.createElement("input")
    
    //Set up the todo checkbox
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener("change", function () {
        toggleTodo(todo.id)
        renderTodos()
    })

    textEl.textContent = todo.title.length ? todo.title : "Untitled todo"
    todoEl.appendChild(textEl)

    //Set up the remove todo button
    removeButton.textContent = "x"
    todoEl.appendChild(removeButton)
    removeButton.addEventListener("click", function () {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

//Render neсessary/filtered Todos in the browser
const renderTodos = () => {
    const filteredTodos = filterTodos()

    document.querySelector("#todos").innerHTML = ""
    
    getSummary(filteredTodos)
    
    filteredTodos.forEach((todo) => {
        const todoEl = generateTodoDOM(todo)
        document.querySelector("#todos").appendChild(todoEl)
    })
}

export { renderTodos }