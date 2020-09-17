<template>
    <div>
        <Select v-model="faculty" filterable placeholder="请选择学院名称">
            <Option v-for="item in facultyList" :value="item" :key="item" >{{ item}}</Option>
        </Select>
        <Select v-model="major" filterable placeholder="请选择专业名称">
            <Option v-for="item in majorList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Select v-model="enrollYear" filterable placeholder="请选择培养计划年份">
            <Option v-for="item in enrollYearList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'plan_search',
    data() {
        return {
            facultyList: [],
            majorList: [],
            enrollYearList: [],
            faculty: '',
            major: '',
            enrollYear: '',
            columns: [{
                    title: '课程代码',
                    key: 'course_courseCode'
                },
                {
                    title: '课程名称',
                    key: 'course_courseName'
                },
                {
                    title: '学分',
                    key: 'course_courseCredit'
                },
                {
                    title: '周学时',
                    key: 'course_courseHour'
                },
                {
                    title: '课程性质',
                    key: 'plan_courseNature'
                },
                {
                    title: '课程类别',
                    key: 'plan_courseType'
                },
                {
                    title: '建议修读学期',
                    key: 'plan_suggestTerm'
                },
                {
                    title: '专业方向',
                    key: 'plan_majorDirection'
                },
                {
                    title: '是否短学期',
                    key: 'course_shortTerm'
                }
            ],
            data: []
        }
    },
    created() {
        this.facultyName();
    },
    computed: {

    },
    watch: {
        faculty: function(val) {
            if (val !== '') {
                this.majorList = [];
                this.getMajorName({
                    facultyName: val
                }).then(res => {
                    res.data.forEach(element => {
                        this.majorList.push(element);
                    })
                });
            }
        },
        major: function(val) {
            if (val !== '') {
                this.enrollYearList = [];
                this.getEnrollYear({
                    facultyName: this.faculty,
                    majorName: val
                }).then(res => {
                    res.data.forEach(element => {
                        this.enrollYearList.push(element);
                    })
                })
            }
        },
        enrollYear: function(val) {
            if (val !== '') {
                this.data = [];
                this.getMajorId({
                    facultyName: this.faculty,
                    majorName: this.major,
                    enrollYear: val
                }).then(res => {
                    this.getPlans({
                        majorId: res.data
                    }).then(res => {
                        res.data.forEach(element => {
                            this.data.push(element);
                        });
                        this.but = true;
                    })
                })
            }
        }
    },
    methods: {
        ...mapActions([
            'getFacultyName',
            'getMajorName',
            'getEnrollYear',
            'getMajorId',
            'getPlans'
        ]),
        facultyName() {
            this.getFacultyName().then(res => {
                this.facultyList = res.data;
            }).catch(error => {
                console.log(error);
                this.$Message.error(' 学院名获取失败');
            })
        }
    }
}
</script>
