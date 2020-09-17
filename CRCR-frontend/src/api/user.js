import axios from '@/libs/api.request'

export const getMajor = ({token}) =>{
  const data = {
    token
  }
  return axios.request({
    url: 'http://127.0.0.1:3000/users/myMajor',
    data,
    method: 'post'
  })
}

export const setMajor = ({token,majorId,majorDirection}) =>{
  const data = {
    token,
    majorId,
    majorDirection
  }
  return axios.request({
    url: 'http://127.0.0.1:3000/users/setMyMajor',
    data,
    method: 'post'
  })
}

export const register = ({userName, email, password}) =>{
  const data = {
    userName,
    email,
    password
  }
  return axios.request({
    url: 'http://127.0.0.1:3000/users/register',
    data,
    method: 'post'
  })
}

export const login = ({ email, password }) => {
  const data = {
    email,
    password
  }
  return axios.request({
    url: 'http://127.0.0.1:3000/users/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  const data={
    token
  }
  return axios.request({
    url: 'http://127.0.0.1:3000/users/get_info',
    data,
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
