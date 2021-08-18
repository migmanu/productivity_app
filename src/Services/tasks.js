import axios from 'axios'
const baseUrl = '/api/tasks'

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