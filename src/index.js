import { setFilters } from "./filters"
import { addTodo, loadTodos } from "./todos"
import { renderTodos } from "./views"

renderTodos()

document.querySelector("#setting-form").addEventListener("submit", (e) => {
    e.preventDefault()
    addTodo(e.target.elements.inputTodo.value.trim())
    renderTodos()
})

document.querySelector("#input-filter").addEventListener("input", (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector("#hide-completed").addEventListener("change", (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener("storage", (e) => {
    if (e.key === "todos") {
        loadTodos()
        renderTodos()
    }
})