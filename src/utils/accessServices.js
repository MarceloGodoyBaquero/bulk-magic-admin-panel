import api from './axiosConfigs'

export const loginAdmin = async (admin) => {
  return await api.post('/admin/login', admin)
}

export const createAdmin = async (admin) => {
  return await api.post('/admin/create', admin)
}

export const listAdmins = async () => {
  return await api.get('/admin/list')
}

export const checkSession = async (token) => {
  return await api.get('/admin/checkSession', {
    headers: {
      'x-refresh-token': token
    }
  })
}

export const deleteUser = async (id) => {
  return await api.delete(`/admin/deactivate/${id}`)
}


export const langSearch = async (code) => {
  return await api.get(`/admin/lang/${code}`)
}

export const langUpdate = async (code, sections) => {
  return await api.put(`/admin/lang/${code}`, sections)
}
