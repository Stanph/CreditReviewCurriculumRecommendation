import axios from '@/libs/api.request'

export const getCredit = ({token}) => {
    const data={
        token
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/grades/credit',
        data,
        method: 'post'
    })
}
export const getGrades = ({token}) => {
    const data={
        token
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/grades',
        data,
        method: 'post'
    })
}
export const getSubGrades = ({token}) => {
    const data={
        token
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/grades/subGrades',
        data,
        method: 'post'
    })
}
export const addGrades = ({ token,columns, tableData}) => {
    const data = {
        token,
        columns, 
        tableData
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/grades/add',
        data,
        method: 'post'
    })
}