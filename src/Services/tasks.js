import axios from 'axios'
const baseUrl = '/api/tasks'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (task) => {
    const request = axios.put(`${baseUrl}/${task.id}`, task)
    return request.then(response => response.data)
}

const updateAll = (tasks) => {
    const request = axios.put(baseUrl, tasks)
    return request.then(response => response.data)
}

const taskService = {
    getAll,
    create,
    update,
    updateAll
}


export default taskService 