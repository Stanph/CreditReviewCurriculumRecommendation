import axios from '@/libs/api.request'
export const createPlan = ({majorName,facultyName,enrollYear, columns, tableData}) => {
    const data = {
        majorName,
        facultyName,
        enrollYear, 
        columns, 
        tableData
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/create',
        data,
        method: 'post'
    })
}
export const addPlan = ({majorId, columns, tableData}) => {
    const data = {
        majorId,
        columns, 
        tableData
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/add',
        data,
        method: 'post'
    })
}
export const getFacultyName = ()=>{
    return axios.request({
        url:'http://127.0.0.1:3000/plans/facultyName',
        method:'get'
    })
}
export const getMajorName=({facultyName})=>{
    const data = {
        facultyName
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/majorName',
        data,
        method: 'post'
    })
}
export const getEnrollYear=({facultyName,majorName})=>{
    const data = {
        facultyName,
        majorName
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/enrollYear',
        data,
        method: 'post'
    })
}
export const getMajorId=({ facultyName, majorName ,enrollYear})=>{
    const data = {
        facultyName,
        majorName,
        enrollYear
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/majorId',
        data,
        method: 'post'
    })
}
export const getPlans = ({majorId})=>{
    return axios.request({
        url:'http://127.0.0.1:3000/plans/'+majorId,
        method:'get'
    })
}
export const updatePlan=({planId, courseNature, courseType, majorDirection, suggestTerm})=>{
    const data = {
        planId, 
        courseNature, 
        courseType, 
        majorDirection,
        suggestTerm
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans',
        data,
        method: 'put'
    })
}
export const deletePlan=({planId})=>{
    return axios.request({
        url:'http://127.0.0.1:3000/plans/'+planId,
        method:'delete'
    })
}
export const getGraduateRule = ({majorId})=>{
    return axios.request({
        url:'http://127.0.0.1:3000/plans/graduateRule/'+majorId,
        method:'get'
    })
}
export const addGraduateRule = ({courseModule,credit,majorId}) => {
    const data = {
        courseModule,
        credit,
        majorId
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/plans/graduateRule/add',
        data,
        method: 'post'
    })
}
export const deleteGraduateRule=({graduateRuleId})=>{
    return axios.request({
        url:'http://127.0.0.1:3000/plans/graduateRule/'+graduateRuleId,
        method:'delete'
    })
}