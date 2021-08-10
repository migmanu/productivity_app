import axios from 'axios'
const baseUrl = 'http://localhost:3001/tasks'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const taskService = {
    getAll,
    create
}


export default taskService 