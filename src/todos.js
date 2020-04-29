import { v4 as uuidv4 } from "uuid"
import { getFilters } from "./filters"

let todos = []

const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const addTodo = (title) => {

    if (title) {
        todos.push({
            id: uuidv4(),
            title,
            completed: false
        })
        saveTodos()
    }

    document.querySelector("#input-todo").value = ""
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

const filterTodos = () => {
    const filters = getFilters()
    const filteredTodos = todos.filter((todo) => {
        const machedTodos = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const uncompletedTodos = !filters.hideCompleted || !todo.completed
        return machedTodos && uncompletedTodos
    })
    return filteredTodos
}

loadTodos()

export {
    addTodo,
    removeTodo,
    toggleTodo,
    filterTodos,
    loadTodos
}