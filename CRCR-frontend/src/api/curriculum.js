import axios from '@/libs/api.request'

export const getCurriculum = ({token}) => {
    const data={
        token
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/curriculum',
        data,
        method: 'post'
    })
}

export const addCurriculum = ({ token,columns, tableData}) => {
    const data = {
        token,
        columns, 
        tableData
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/curriculum/add',
        data,
        method: 'post'
    })
}