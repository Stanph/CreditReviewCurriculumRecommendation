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
        <Table :columns="columns" :data="data">
    
            <template slot-scope="{ row, index }" slot="course_courseCode">
                                                                                                        <span >{{ row.course_courseCode }}</span>
</template>

<template slot-scope="{ row, index }" slot="course_courseName">
    <span>{{ row.course_courseName }}</span>
</template>

<template slot-scope="{ row, index }" slot="course_courseCredit">
    <span>{{ row.course_courseCredit }}</span>
</template>

<template slot-scope="{ row, index }" slot="course_courseHour">
    <span>{{ row.course_courseHour }}</span>
</template>

<template slot-scope="{ row, index }" slot="plan_courseNature">
    <Input type="text" v-model="edit_courseNature" v-if="editIndex === index" />
    <span v-else>{{ row.plan_courseNature }}</span>
</template>

<template slot-scope="{ row, index }" slot="plan_courseType">
    <Input type="text" v-model="edit_courseType" v-if="editIndex === index" />
    <span v-else>{{ row.plan_courseType }}</span>
</template>

<template slot-scope="{ row, index }" slot="plan_suggestTerm">
    <Input type="text" v-model="edit_suggestTerm" v-if="editIndex === index" />
    <span v-else>{{ row.plan_suggestTerm }}</span>
</template>

<template slot-scope="{ row, index }" slot="plan_majorDirection">
    <Input type="text" v-model="edit_majorDirection" v-if="editIndex === index" />
    <span v-else>{{ row.plan_majorDirection }}</span>
</template>

<template slot-scope="{ row, index }" slot="course_shortTerm">
    <span>{{ row.course_shortTerm }}</span>
</template>

<template slot-scope="{ row, index }" slot="edit">
    <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
    </div>
    <div v-else>
        <Button @click="handleEdit(row, index)">编辑</Button>
    </div>
    </template>
        </Table>
        <br/>
        <Button v-if="but===true" @click="modal = true" style="float: right" type="primary" ghost>添加</Button>
        <br/>
        <p v-if="modal===true" style="font-size: 14px">
        <Row :gutter="10">
            <i-col>
                <Card>
                    <div class="update-paste-con">
                        <span class="paste-tip">将培养计划内容粘贴入下框：</span>
                        <paste-editor v-model="pasteDataArr" @on-success="handleSuccess" @on-error="handleError" />
                    </div>
                    <br/>
                    <div class="update-paste-btn-con">
                        <span class="paste-tip">使用Tab键换列，使用回车键换行</span>
                        <Button type="primary" style="float: right;" @click="handleShow">显示表格数据</Button>
                    </div>
                </Card>
            </i-col>
        </Row>
        <Row :gutter="10">
            <i-col>
                <Card>
                    <Table :height="400" :columns="add_columns" :data="add_data" />
                </Card>
            </i-col>
        </Row>
        <br/>
        <Button type="primary" @click="handleSubmit()" style="float: right;">提交</Button>
        </p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PasteEditor from '_c/paste-editor'
import { getTableDataFromArray } from '@/libs/util'

export default {
    name: 'plan_update',
    components: {
        PasteEditor
    },
    data() {
        return {
            codeSet: new Set(),
            pasteDataArr: [],
            update: false,
            validated: true,
            errorIndex: 0,
            modal: false,
            but: false,
            facultyList: [],
            majorList: [],
            enrollYearList: [],
            faculty: '',
            major: '',
            enrollYear: '',
            majorId:'',
            columns: [{
                    title: '课程代码',
                    slot: 'course_courseCode'
                },
                {
                    title: '课程名称',
                    slot: 'course_courseName'
                },
                {
                    title: '学分',
                    slot: 'course_courseCredit'
                },
                {
                    title: '周学时',
                    slot: 'course_courseHour'
                },
                {
                    title: '课程性质',
                    slot: 'plan_courseNature'
                },
                {
                    title: '课程类别',
                    slot: 'plan_courseType'
                },
                {
                    title: '建议修读学期',
                    slot: 'plan_suggestTerm'
                },
                {
                    title: '专业方向',
                    slot: 'plan_majorDirection'
                },
                {
                    title: '是否短学期',
                    slot: 'course_shortTerm'
                },
                {
                    title: ' ',
                    slot: 'edit'
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
            add_columns: [],
            data: [],
            add_data: [],
            editIndex: -1,
            edit_courseNature: '',
            edit_courseType: '',
            edit_majorDirection: '',
            edit_suggestTerm: ''
        }
    },
    created() {
        this.facultyName();
    },
    computed: {

    },
    watch: {
        '$route' (to, from) {
            this.facultyName();
        },
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
                    this.codeSet.clear();
                    this.getMajorId({
                        facultyName: this.faculty,
                        majorName: this.major,
                        enrollYear: nval
                    }).then(res => {
                        this.majorId=res.data;
                        this.getPlans({
                            majorId: res.data
                        }).then(res => {
                            res.data.forEach(element => {
                                this.data.push(element);
                                this.codeSet.add(element.course_courseCode);
                            });
                            this.but = true;
                        })
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
            'getPlans',
            'updatePlan',
            'deletePlan',
            'addPlan'
        ]),
        remove(index) {
            this.deletePlan({
                planId: this.data[index].plan_planId
            }).then(res => {
                this.codeSet.delete(this.data[index].course_courseCode);
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
        handleEdit(row, index) {
            this.edit_courseNature = row.plan_courseNature;
            this.edit_courseType = row.plan_courseType;
            this.edit_majorDirection = row.plan_majorDirection;
            this.edit_suggestTerm = row.plan_suggestTerm;
            this.editIndex = index;
        },
        handleSave(index) {
            this.data[index].plan_courseNature = this.edit_courseNature;
            this.data[index].plan_courseType = this.edit_courseType;
            this.data[index].plan_majorDirection = this.edit_majorDirection;
            this.data[index].plan_suggestTerm = this.edit_suggestTerm;
            this.editIndex = -1;
            this.updatePlan({
                planId: this.data[index].plan_planId,
                courseNature: this.data[index].plan_courseNature,
                courseType: this.data[index].plan_courseType,
                majorDirection: this.data[index].plan_majorDirection,
                suggestTerm: this.data[index].plan_suggestTerm
            }).then(res => {
                this.$Message.success('培养计划更新成功');
            }).catch(error => {
                console.log(error);
                this.$Message.error('培养计划更新失败');
            })
        },
        handleShow() {
            if (!this.validated) {
                this.$Notice.error({
                    title: '您的内容不规范',
                    desc: `您的第${this.errorIndex + 1}行数据不规范，请修改`
                })
            } else if (this.update) {
                let { columns, tableData } = getTableDataFromArray(this.pasteDataArr)
                var i = 0;
                for (i = 0; i < tableData.length; i++) {
                    if (this.codeSet.has(tableData[i].课程代码)){
                        break;
                    }
                }
                if (i !== tableData.length) {
                    this.$Notice.error({
                        title: `您的第${i+2}行的课程已存在`
                    })
                } else {
                    this.add_columns = columns
                    this.add_data = tableData
                    this.update = false
                }
            } else {
                this.$Notice.error({
                    title: '未修改'
                })
            }
        },
        handleSuccess() {
            this.validated = true
            this.update = true
        },
        handleError(index) {
            this.validated = false
            this.errorIndex = index
        },
        handleSubmit() {
            console.log(this.add_data);
            if (this.add_data.length === 0) {
                this.$Message.error('培养计划内容不能为空');
            } else {
                this.addPlan({
                    majorId: this.majorId,
                    columns: this.add_columns,
                    tableData: this.add_data
                }).then(res => {
                    let majorId = this.majorId;
                    this.add_columns = [];
                    this.add_data = [];
                    this.pasteDataArr = [];
                    this.modal = false;
                    this.data = [];
                    this.codeSet.clear();
                    this.getPlans({
                        majorId: majorId
                    }).then(res => {
                        res.data.forEach(element => {
                            this.data.push(element);
                            this.codeSet.add(element.course_courseCode);
                        });
                    })
                    this.$Message.success(res.data);
                }).catch(error => {
                    console.log(error);
                    this.$Message.error('培养计划添加失败');
                })
            }
        }
    }
}
</script>
