import {
    getCourses,
    updateCourse,
    addCourses,
    addRule,
    getCourseSub,
    getRules,
    addCourseSub
} from '@/api/course'
export default {
    state: {

    },
    mutations: {

    },
    getters: {

    },
    actions: {
        //获取课程信息
        getCourses() {
            return new Promise((resolve, reject) => {
                getCourses().then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //更新课程信息
        updateCourse({ }, { courseId,courseName, courseHour, courseCredit, shortTerm }) {
            return new Promise((resolve, reject) => {
                updateCourse({ courseId,courseName, courseHour, courseCredit, shortTerm }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //添加课程
        addCourses({ }, { columns, tableData }){
            return new Promise((resolve, reject) => {
                addCourses({
                  columns,
                  tableData
                }).then(res => {
                  resolve(res);
                }).catch(err => {
                  reject(err);
                })
              })
        },
        //添加替代规则
        addRule({},{name,grade}){
            return new Promise((resolve, reject) => {
                addRule({
                  name,
                  grade
                }).then(res => {
                  resolve(res);
                }).catch(err => {
                  reject(err);
                })
              })
        },
        //获取课程可替代列表
        getCourseSub({},{courseId}){
          return new Promise((resolve, reject) => {
            getCourseSub({
              courseId
            }).then(res => {
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        },
        //添加替代课程
        addCourseSub({},{courseId, canBeReplacedBy, replaceRuleId}){
          return new Promise((resolve,reject)=>{
            addCourseSub({courseId, canBeReplacedBy, replaceRuleId}).then(res=>{
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        },
        //获取替代规则
        getRules(){
          return new Promise((resolve, reject) => {
            getRules().then(res => {
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        }
    }
}
