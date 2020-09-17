<template>
    <div>
        <Table border :columns="credit_columns" :data="credits">
        </Table>
        <Button @click="modal = true,show()" long type="primary" ghost>毕业资格自查</Button>
        <Modal v-model="modal" draggable scrollable title="未完成课程">
            <div>
                <Table :columns="uncomplete_columns" :data="uncomplete"></Table>
            </div>
        </Modal>
        <Table border :columns="columns" :data="data">
        </Table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'grades_search',
    data() {
        return {
            modal: false,
            columns: [{
                    title: '课程代码',
                    key: 'grade_courseCode',
                    sortable: true
                },
                {
                    title: '课程名称',
                    key: 'course_courseName',
                    sortable: true
                },
                {
                    title: '课程性质',
                    key: 'plan_courseNature',
                    sortable: true
                },
                {
                    title: '课程类别',
                    key: 'plan_courseType',
                    sortable: true
                },
                {
                    title: '学分',
                    key: 'course_courseCredit',
                    sortable: true
                },
                {
                    title: '成绩',
                    key: 'grade_grade',
                    sortable: true
                },
                {
                    title: '补考成绩',
                    key: 'grade_retestGrade',
                    sortable: true
                },
                {
                    title: '重修成绩',
                    key: 'grade_retakeGrade',
                    sortable: true
                },
                {
                    title: '是否通过',
                    key: 'grade_passFlag',
                    sortable: true
                }
            ],
            credit_columns: [{
                    title: '课程性质名称',
                    key: 'courseModule',
                    sortable: true
                },
                {
                    title: '学分要求',
                    key: 'require',
                    sortable: true
                },
                {
                    title: '获得学分',
                    key: 'credits',
                    sortable: true
                },
                {
                    title: '未通过学分',
                    key: 'failed',
                    sortable: true
                },
                {
                    title: '还需学分',
                    key: 'need',
                    sortable: true
                }
            ],
            uncomplete_columns: [{
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
            data: [],
            planIdSet: new Set(),
            gradeIdSet: new Set(),
            credits: [],
            uncomplete: [],
            rules: []
        }
    },
    created() {
        this.getGradesInfo();
    },
    methods: {
        ...mapActions([
            'getSubGrades',
            'getPlans',
            'getGraduateRule'
        ]),
        getGradesInfo() {
            this.getSubGrades().then(res => {
                console.log(res.data);
                this.planIdSet.clear();
                res.data.forEach(element => {
                    if (element.pl_planId === null) { //无替代课程 
                        this.planIdSet.add(element.plan_planId);
                        this.gradeIdSet.add(element.grade_gradeId);
                        if (element.plan_courseNature === null) {
                            element.plan_courseNature = '任选';
                        }
                        this.data.push(element);
                    } else if (this.planIdSet.has(element.pl_planId) === false && this.gradeIdSet.has(element.grade_gradeId) === false) { //有替代课程 未替代 且成绩不存在 
                        this.planIdSet.add(element.pl_planId);
                        this.gradeIdSet.add(element.grade_gradeId);
                        element.plan_courseNature = element.pl_courseNature;
                        element.plan_courseType = element.pl_courseType;
                        element.plan_majorDirection = element.pl_majorDirection;
                        element.grade_replaceFlag = 1;
                        element.course_courseCredit = element.co_courseCredit;
                        this.data.push(element);
                    } else if (this.gradeIdSet.has(element.grade_gradeId) === false) { //有替代课程 已替代 成绩不存在
                        this.planIdSet.add(element.plan_planId);
                        this.gradeIdSet.add(element.grade_gradeId);
                        if (element.plan_courseNature === null) {
                            element.plan_courseNature = '任选';
                        }
                        this.data.push(element);
                    } else {
                        if (this.planIdSet.has(element.pl_planId) === false) { //有替代课程 未替代 成绩存在
                            for (let i = 0; i < this.data.length; i++) {
                                if (this.data[i].grade_gradeId === element.grade_gradeId && this.data[i].plan_courseNature === '任选') {
                                    this.planIdSet.add(element.pl_planId);
                                    this.data[i].plan_courseNature = element.pl_courseNature;
                                    this.data[i].plan_courseType = element.pl_courseType;
                                    this.data[i].plan_majorDirection = element.pl_majorDirection;
                                    this.data[i].grade_replaceFlag = 1;
                                    this.data[i].course_courseCredit = element.co_courseCredit;
                                }
                            }
                        }
                    }
                });
                let natureContainer = {};
                this.data.forEach(element => {
                    natureContainer[element.plan_courseNature] = natureContainer[element.plan_courseNature] || [];
                    natureContainer[element.plan_courseNature].push(element);
                });
                let natureName = Object.keys(natureContainer);
                this.getGraduateRule({
                    majorId: this.data[0].user_majorId
                }).then(res => {
                    this.rules = res.data;
                    natureName.forEach(element => {
                        let count = 0;
                        let countFailed = 0;
                        natureContainer[element].forEach(element => {
                            if (element.grade_passFlag) {
                                count += element.course_courseCredit;
                            } else {
                                countFailed += element.course_courseCredit;
                            }
                        });
                        let i = 0;
                        for (i = 0; i < this.rules.length; i++) {
                            if (this.rules[i].courseModule === element) break;
                        }
                        let need=this.rules[i].credit-count;
                        this.credits.push({ 'courseModule': element, 'require': this.rules[i].credit, 'credits': count, 'failed': countFailed ,'need':need>0?need:0});
                    });
                });
            })
        },
        show() {
            if (this.data.length > 0) {
                this.uncomplete = [];
                this.getPlans({
                    majorId: this.data[0].user_majorId
                }).then(res => {
                    res.data.forEach(element => {
                        if (this.planIdSet.has(element.plan_planId) === false && element.plan_courseNature === '必修') {
                            this.uncomplete.push(element);
                        }
                    });
                })
            } else {
                this.$Messagge.error('请先导入成绩');
                this.modal = false;
            }
        }
    }

}
</script>
