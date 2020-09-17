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
        <Button v-if="but" type="primary" long ghost @click="modal = true">添加毕业条件</Button>
        <Modal v-model="modal" draggable scrollable title="添加毕业条件" @on-ok="ok" @on-cancel="cancel">
            <div>
                <Select v-model="courseModule" filterable placeholder="请选择课程模块名称" >
                    <Option v-for="item in courseModuleSet" :value="item" :key="item" >{{ item}}</Option>
                 </Select>
                 <Form>
                    <FormItem  prop="credit">
                        <Input v-model="formValidate.credit" placeholder="请输入所要求的学分"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'rule-manage',
    data() {
        return {
            formValidate: {
                credit: ''
            },
            ruleValidate: {
                credit: [
                    { required: true, message: '要求学分不能为空', trigger: 'blur' }
                ]
            },
            modal: false,
            but: false,
            courseModule:'',
            courseModuleSet:new Set(),
            facultyList: [],
            majorList: [],
            enrollYearList: [],
            faculty: '',
            major: '',
            enrollYear: '',
            majorId: '',
            columns: [{
                    title: '课程模块',
                    key: 'courseModule'
                },
                {
                    title: '要求学分',
                    key: 'credit'
                },
                {
                    title: ' ',
                    slot: 'delete',
                    width: 70,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [],
        }
    },
    created() {
        this.facultyName();
    },
    watch: {
        faculty: {
            handler(nval, oval) {
                if (nval !== '') {
                    this.majorList = [];
                    this.major = '';
                    this.enrollYear = '';
                    this.getMajorName({
                        facultyName: nval
                    }).then(res => {
                        res.data.forEach(element => {
                            this.majorList.push(element);
                        })
                    });
                }
            },
            immediate: true
        },
        major: {
            handler(nval, oval) {
                if (nval !== '') {
                    this.enrollYearList = [];
                    this.enrollYear = '';
                    this.getEnrollYear({
                        facultyName: this.faculty,
                        majorName: nval
                    }).then(res => {
                        res.data.forEach(element => {
                            this.enrollYearList.push(element);
                        })
                    })
                }
            },
            immediate: true
        },
        enrollYear: {
            handler(nval, oval) {
                if (nval !== '') {
                    this.data = [];
                    this.getMajorId({
                        facultyName: this.faculty,
                        majorName: this.major,
                        enrollYear: nval
                    }).then(res => {
                        this.majorId = res.data;
                        this.getPlans({
                            majorId: res.data
                        }).then(res=>{
                            res.data.forEach(element=>{
                                this.courseModuleSet.add(element.plan_courseNature);
                                this.courseModuleSet.add(element.plan_courseType);
                                this.courseModuleSet.add(element.plan_majorDirection);
                            } )
                        });
                        this.getGraduateRule({
                            majorId: res.data
                        }).then(res => {
                            console.log(res);
                            this.data = res.data;
                        })
                        this.but = true;
                    })
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions([
            'getFacultyName',
            'getMajorName',
            'getEnrollYear',
            'getMajorId',
            'getGraduateRule',
            'deleteGraduateRule',
            'addGraduateRule',
            'getPlans'
        ]),
        remove(index) {
            this.deleteGraduateRule({
                graduateRuleId: this.data[index].graduateRuleId
            }).then(res => {
                this.data.splice(index, 1);
                this.$Message.success('删除成功');
            }).catch(error => {
                console.log(error);
                this.$Message.error(' 删除失败');
            })
        },
        facultyName() {
            this.getFacultyName().then(res => {
                this.facultyList = res.data;
            }).catch(error => {
                console.log(error);
                this.$Message.error(' 学院名获取失败');
            })
        },
        handleSubmit() {
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
        },
        ok() {
            this.addGraduateRule({
                majorId: this.majorId,
                courseModule: this.courseModule,
                credit: this.formValidate.credit
            }).then(res=>{
                this.data.push(res.data);
            })
            this.$Message.info('添加成功');
        },
        cancel() {
            this.$Message.info('已取消');
        }
    }
}
</script>
