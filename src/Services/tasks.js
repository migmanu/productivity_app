import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasks'

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

const taskService = {
    getAll,
    create,
    update
}


export default taskService 