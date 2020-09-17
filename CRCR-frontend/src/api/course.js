import axios from '@/libs/api.request'
export const getCourses = () => {
    return axios.request({
        url: 'http://127.0.0.1:3000/courses',
        method: 'get'
    })
}
export const updateCourse = ({ courseId,courseName, courseHour, courseCredit, shortTerm }) => {
    const data={
        courseId,
        courseName,
        courseHour, 
        courseCredit,
        shortTerm
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/courses',
        data,
        method: 'put'
    })
}
export const addCourses = ({ columns, tableData}) => {
    const data = {
        columns, 
        tableData
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/courses/add',
        data,
        method: 'post'
    })
}
export const addRule = ({ name,grade}) => {
    const data = {
        name,
        grade
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/courses/addRule',
        data,
        method: 'post'
    })
}
export const getCourseSub = ({ courseId}) => {
    return axios.request({
        url: 'http://127.0.0.1:3000/courses/'+courseId,
        method: 'get'
    })
}
export const getRules=()=>{
    return axios.request({
        url: 'http://127.0.0.1:3000/courses/getRules',
        method: 'post'
    })
}
export const addCourseSub=({courseId, canBeReplacedBy, replaceRuleId})=>{
    const data = {
        courseId, 
        canBeReplacedBy, 
        replaceRuleId
    }
    return axios.request({
        url: 'http://127.0.0.1:3000/courses/addSub',
        data,
        method: 'post'
    })
}