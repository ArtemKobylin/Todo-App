console.log("filters.js")
const filters = {
    searchText: "",
    hideCompleted: false
}

const getFilters = () => filters

const setFilters = (update) => {
    if (typeof update.searchText === "string") {
        filters.searchText = update.searchText
    }

    if (typeof update.hideCompleted === "boolean") {
        filters.hideCompleted = update.hideCompleted
    }
}

export { getFilters, setFilters }