import {
  addGrades,
  getGrades,
  getCredit,
  getSubGrades
} from '@/api/grades'
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
    //获取学分
    getCredit({state}){
      return new Promise((resolve, reject) => {
        getCredit({
          token: state.token
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取成绩
    getGrades({ state }) {
      return new Promise((resolve, reject) => {
        getGrades({
          token: state.token
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //获取替代成绩
    getSubGrades({ state }) {
      return new Promise((resolve, reject) => {
        getSubGrades({
          token: state.token
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //添加成绩
    addGrades({ state }, { columns, tableData }) {
      return new Promise((resolve, reject) => {
        addGrades({
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
