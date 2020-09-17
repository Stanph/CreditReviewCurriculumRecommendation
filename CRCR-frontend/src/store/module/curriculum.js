import {
    addCurriculum,
    getCurriculum,
  } from '@/api/curriculum'
  import { getToken } from '@/libs/util'
  export default {
    state: {
      token: getToken()
    },
    mutations: {
  
    },
    getters: {
  
    },
    actions: {
      //获取成绩
      getCurriculum({ state }) {
        return new Promise((resolve, reject) => {
          getCurriculum({
            token: state.token
          }).then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
      },
      //添加成绩
      addCurriculum({ state }, { columns, tableData }) {
        return new Promise((resolve, reject) => {
          addCurriculum({
            token: state.token,
            columns,
            tableData
          }).then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
      }
    }
  }
  