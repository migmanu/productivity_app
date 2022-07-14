import axios from 'axios'
const baseUrl = '/api/tasks'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
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
