<template>
    <div>
        <Select v-model="course" filterable placeholder="请输入需要设置可替代课程的课程名或代码">
                            <Option v-for="item in courseList" :value="item" :key="item" >{{ item}}</Option>
                        </Select>
        <Table border :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="courseCode">
                        <strong>{{ row.courseCode }}</strong>
</template>

<template slot-scope="{ row, index }" slot="action">
    <Button type="primary" size="small" style="margin-right: 5px" @click="getSub(index),modal = true">设置</Button>
    </template>
            
        </Table>  
        <Modal v-model="modal" draggable scrollable title="可替代课程列表">
                  <Table border :columns="sub_columns" :data="sub"> </Table>  
                  <br/>
                  <p style="color:green;font-size:14px;">添加可替代课程：</p>
                   <Select v-model="code" filterable placeholder="请输入替代课程代码">
                        <Option v-for="item in courses" :value="item.courseId" :key="item.courseId" >{{ item.courseCode }} {{item.courseName}} {{item.courseHour}} {{item.courseCredit}} {{item.shortTerm}}</Option>
                    </Select>
                    <Select v-model="rule" filterable placeholder="请选择替代规则">
                        <Option v-for="item in ruleList" :value="item.replaceRuleId" :key="item.replaceRuleId" >{{ item.ruleName}}</Option>
                    </Select>
                    <br/>
                    <br/>

            <Button type="primary" ghost long @click="handleSubmit()">添加</Button>

            </Modal>  
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'replace_course',
    data() {
        return {
            index: '',
            modal: false,
            courseList: [],
            courseSet: new Set(),
            course: '',
            code: '',
            rule: '',
            ruleList: [],
            columns: [{
                    title: '课程代码',
                    slot: 'courseCode'
                },
                {
                    title: '课程名称',
                    key: 'courseName'
                },
                {
                    title: '课程学时',
                    key: 'courseHour'
                },
                {
                    title: '课程学分',
                    key: 'courseCredit'
                },
                {
                    title: '是否短学期',
                    key: 'shortTerm'
                },
                {
                    title: '可替代课程数量',
                    key: 'substituteNum'
                },
                {
                    title: '查看',
                    slot: 'action',
                    width: 75,
                    align: 'center'
                }
            ],
            sub_columns: [{
                    title: '课程代码',
                    key: 'cou_courseCode'
                },
                {
                    title: '课程名称',
                    key: 'cou_courseName'
                },
                {
                    title: '课程学时',
                    key: 'cou_courseHour'
                },
                {
                    title: '课程学分',
                    key: 'cou_courseCredit'
                },
                {
                    title: '是否短学期',
                    key: 'cou_shortTerm'
                }
            ],
            data: [],
            courses: [],
            sub: []
        }
    },
    created() {
        this.getCourseList();
    },
    watch: {
        course: function(val) {
            if (val !== '') {
                this.data = [];
                let i = 0;
                for (i = 0; i < this.courses.length; i++) {
                    if (this.courses[i].courseCode === this.course) {
                        this.data.push(this.courses[i]);
                    } else if (this.courses[i].courseName === this.course) {
                        this.data.push(this.courses[i]);
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'getCourses',
            'updateCourse',
            'getCourseSub',
            'getRules',
            'addCourseSub'
        ]),
        getCourseList() {
            this.getCourses().then(res => {
                this.courses = res.data;
                res.data.forEach(element => {
                    this.courseSet.add(element.courseCode);
                    this.courseSet.add(element.courseName);
                });
                this.courseList = Array.from(this.courseSet);
                this.getRules().then(res => {
                    this.ruleList = res.data;
                })
            })
        },
        getSub(index) {
            this.index = index;
            this.getCourseSub({
                courseId: this.data[index].courseId
            }).then(res => {
                this.sub = res.data;
            })
        },
        handleSubmit() {
            if(this.rule===''||this.code===''){
                this.$Message.error('替代课程和替代规则均不能为空')
            }else{
            this.addCourseSub({
                courseId: this.data[this.index].courseId,
                canBeReplacedBy: this.code,
                replaceRuleId: this.rule
            }).then(res => {
                if (res.data === '替代课程添加成功！') {
                    let c = this.course;
                    this.course = '';
                    this.code = '';
                    this.rule = '';
                    this.getCourseSub({
                        courseId: this.data[this.index].courseId
                    }).then(res => {
                        this.sub = res.data;
                    })
                    this.$Message.success('替代课程添加成功！');
                    this.getCourses().then(res => {
                        this.courses = res.data;
                         this.course = c;
                    })
                } else {
                    console.log(res);
                    this.$Message.error(res.data);
                }
            })
            }
            }
    }
}
</script>
