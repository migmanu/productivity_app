import axios from 'axios'
const baseUrl = '/api/tasks'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const edit = task => {
    const id = task.id
    const objectUrl = baseUrl + '/' + id
    return axios.put(objectUrl, task)
}

const taskService = {
    getAll,
    create,
    edit
}


export default taskService 