<template>
    <div>
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="我的学院：">
                <Input v-model="formLeft.faculty"></Input>
            </FormItem>
            <FormItem label="我的专业：">
                <Input v-model="formLeft.major"></Input>
            </FormItem>
            <FormItem label="我的专业方向：">
                <Input v-model="formLeft.majorDirection"></Input>
            </FormItem>
            <FormItem label="我的培养年份：">
                <Input v-model="formLeft.enrollYear"></Input>
            </FormItem>
        </Form>
        <Row>
            <Button @click="modal = true" style="float:right" type="primary" ghost>选择专业</Button>
        </Row>
        <br/>
        <Modal v-model="modal" draggable scrollable title="请选择您的专业培养计划" @on-ok="asyncOK">
            <div>
                <Select v-model="facultyName" filterable placeholder="请选择您的学院名称">
                                                <Option v-for="item in facultyList" :value="item" :key="item" >{{ item}}</Option>
                                            </Select>
                <Select v-model="majorName" filterable placeholder="请选择您的专业名称">
                                                <Option v-for="item in majorList" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
                <Select v-model="enrollYearName" filterable placeholder="请选择您的培养计划年份">
                                                <Option v-for="item in enrollYearList" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
                <Select v-model="majorDirectionName" filterable placeholder="请选择您的专业方向">
                                                <Option v-for="item in majorDirectionList" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
            </div>
        </Modal>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'my_major',
    data() {
        return {
            formLeft: {
                faculty: '',
                major: '',
                enrollYear: '',
                majorDirection: ''
            },
            majorDirectionSet:new Set(),
            modal: false,
            facultyList: [],
            majorList: [],
            enrollYearList: [],
            majorDirectionList:[],
            majorDirectionName: '',
            facultyName: '',
            majorName: '',
            enrollYearName: '',
            majorId: '',
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
        this.getMyMajor();
        this.facultyNames();
    },
    watch: {
        facultyName: function(val) {
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
        majorName: function(val) {
            if (val !== '') {
                this.enrollYearList = [];
                this.getEnrollYear({
                    facultyName: this.facultyName,
                    majorName: val
                }).then(res => {
                    res.data.forEach(element => {
                        this.enrollYearList.push(element);
                    })
                })
            }
        },
        enrollYearName: function(val) {
            if (val != '') {
                this.majorDirectionSet.clear();
                this.getMajorId({
                    facultyName: this.facultyName,
                    majorName: this.majorName,
                    enrollYear: val
                }).then(res => {
                    this.getPlans({
                        majorId: res.data
                    }).then(res => {
                        res.data.forEach(element => {
                            this.majorDirectionSet.add(element.plan_majorDirection);
                        });
                        this.majorDirectionList=Array.from(this.majorDirectionSet);
                        console.log(this.majorDirectionSet);
                        console.log(this.majorDirectionList);
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
            'handleGetMajor',
            'handleSetMajor',
            'getPlans',
            'getUserInfo'
        ]),
        getMyMajor() {
            this.handleGetMajor().then(res => {
                this.formLeft.faculty = res.data.facultyName;
                this.formLeft.major = res.data.majorName;
                this.formLeft.enrollYear = res.data.enrollYear;
                this.getUserInfo().then(res => {
                    this.formLeft.majorDirection = res.majorDirection;
                })
                this.data = [];
                this.getPlans({
                    majorId: res.data.majorId
                }).then(res => {
                    res.data.forEach(element => {
                        this.data.push(element);
                    });
                })
            })
        },
        facultyNames() {
            this.getFacultyName().then(res => {
                this.facultyList = res.data;
            }).catch(error => {
                console.log(error);
                this.$Message.error(' 学院名获取失败');
            })
        },
        asyncOK() {
            this.formLeft.faculty = this.facultyName;
            this.formLeft.major = this.majorName;
            this.formLeft.enrollYear = this.enrollYearName;
            this.formLeft.majorDirection = this.majorDirectionName;
            this.getMajorId({
                facultyName: this.facultyName,
                majorName: this.majorName,
                enrollYear: this.enrollYearName
            }).then(res => {
                this.handleSetMajor({
                    majorId: res.data,
                    majorDirection:this.majorDirectionName
                }).then(res => {
                    this.$Message.success(res.data);
                    this.modal = false;
                })
                this.data = [];
                this.getPlans({
                    majorId: res.data
                }).then(res => {
                    res.data.forEach(element => {
                        this.data.push(element);
                    });
                })
            })
        }
    }
}
</script>