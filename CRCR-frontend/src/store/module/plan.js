import {
  createPlan,
  getFacultyName,
  getMajorName,
  getEnrollYear,
  getPlans,
  getMajorId,
  updatePlan,
  deletePlan,
  addPlan,
  addGraduateRule,
  deleteGraduateRule,
  getGraduateRule
} from '@/api/plan'
export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    //获取毕业条件
    getGraduateRule({},{majorId}){
      return new Promise((resolve, reject) => {
        getGraduateRule({
          majorId
        }).then(res => {
          console.log(res);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //删除毕业条件
    deleteGraduateRule({},{graduateRuleId}){
      return new Promise((resolve, reject) => {
        deleteGraduateRule({
          graduateRuleId
        }).then(res => {
          console.log(res);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //添加毕业条件
    addGraduateRule({},{courseModule,credit,majorId}){
      return new Promise((resolve, reject) => {
        addGraduateRule({
          courseModule,
          credit,
          majorId
        }).then(res => {
          console.log(res);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //创建培养计划
    createPlan({ }, { majorName, facultyName, enrollYear, columns, tableData }) {
      return new Promise((resolve, reject) => {
        createPlan({
          majorName,
          facultyName,
          enrollYear,
          columns,
          tableData
        }).then(res => {
          console.log(res);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //添加培养计划
    addPlan({ }, { majorId, columns, tableData }) {
      return new Promise((resolve, reject) => {
        addPlan({
          majorId,
          columns,
          tableData
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取学院名
    getFacultyName() {
      return new Promise((resolve, reject) => {
        getFacultyName().then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取指定学院下的专业名
    getMajorName({ }, { facultyName }) {
      return new Promise((resolve, reject) => {
        getMajorName({ facultyName }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取指定专业下的培养计划年份
    getEnrollYear({ }, { facultyName, majorName }) {
      return new Promise((resolve, reject) => {
        getEnrollYear({ facultyName, majorName }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取专业id
    getMajorId({ }, { facultyName, majorName, enrollYear }) {
      return new Promise((resolve, reject) => {
        getMajorId({ facultyName, majorName, enrollYear }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取培养计划
    getPlans({ }, { majorId }) {
      return new Promise((resolve, reject) => {
        getPlans({
          majorId
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //更新培养计划
    updatePlan({ }, { planId, courseNature, courseType, majorDirection, suggestTerm }) {
      return new Promise((resolve, reject) => {
        updatePlan({
          planId: planId,
          courseNature: courseNature,
          courseType: courseType,
          majorDirection: majorDirection,
          suggestTerm: suggestTerm
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //删除培养计划
    deletePlan({},{planId}){
      return new Promise((resolve,reject)=>{
        deletePlan({
          planId: planId
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    }
  }
}
