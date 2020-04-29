import { toggleTodo, filterTodos, removeTodo } from "./todos"

//Render the amount of uncompleted todos in the browser
const getSummary = (filteredTodos) => {
    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)
    const summary = document.createElement("h2")
    summary.classList.add("list-title")
    const plural = incompletedTodos.length === 1 ? "" : "s"
    summary.textContent = `You have ${incompletedTodos.length} todo${plural} left:`
    document.querySelector("#todos").appendChild(summary)
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const textEl = document.createElement("span")
    const removeButton = document.createElement("button")
    const checkbox = document.createElement("input")

    //Set up the todo checkbox
    checkbox.setAttribute("type", "checkbox")
    checkbox.classList.add("checkbox")
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    textEl.textContent = todo.title 
    containerEl.appendChild(textEl)
    containerEl.classList.add("list-item__container")
    todoEl.classList.add("list-item")
    todoEl.appendChild(containerEl)

    //Set up the remove todo button
    removeButton.textContent = "remove"
    removeButton.classList.add("button", "button--text")
    todoEl.appendChild(removeButton)
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

//Render neсessary/filtered Todos in the browser
const renderTodos = () => {
    const filteredTodos = filterTodos()
    const todosEl = document.querySelector("#todos")

    todosEl.innerHTML = ""

    getSummary(filteredTodos)

    if (filteredTodos.length) {
        filteredTodos.forEach((todo) => {
            const todoEl = generateTodoDOM(todo)
            todosEl.appendChild(todoEl)
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "No todo to show"
        emptyMessage.classList.add("empty-message")
        todosEl.appendChild(emptyMessage)
    }
}

export { renderTodos }