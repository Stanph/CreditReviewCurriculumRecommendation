<template>
    <div>
        <Select v-model="course" filterable placeholder="请输入要修改的课程名或代码">
            <Option v-for="item in courseList" :value="item" :key="item" >{{ item}}</Option>
        </Select>
        <Table :columns="columns" :data="data">
<template slot-scope="{ row, index }" slot="courseCode">
    <span >{{ row.courseCode }}</span>
</template>

<template slot-scope="{ row, index }" slot="courseName">
    <Input type="text" v-model="edit_courseName" v-if="editIndex === index" />
    <span v-else>{{ row.courseName }}</span>
</template>

<template slot-scope="{ row, index }" slot="courseCredit">
    <Input type="text" v-model="edit_courseCredit" v-if="editIndex === index" />
    <span v-else>{{ row.courseCredit }}</span>
</template>

<template slot-scope="{ row, index }" slot="courseHour">
    <Input type="text" v-model="edit_courseHour" v-if="editIndex === index" />
    <span v-else>{{ row.courseHour }}</span>
</template>

<template slot-scope="{ row, index }" slot="shortTerm">
    <Input type="text" v-model="edit_shortTerm" v-if="editIndex === index" />
    <span v-else>{{ row.shortTerm }}</span>
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
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'course_update',
    data() {
        return {
            editIndex: -1,
            edit_courseName: '',
            edit_courseHour: '',
            edit_courseCredit: '',
            edit_shortTerm: '',
            courseList: [],
            courseSet:new Set(),
            course:'',
            columns: [
                {
                    title: '课程代码',
                    slot: 'courseCode'
                },
                {
                    title: '课程名称',
                    slot: 'courseName'
                },
                {
                    title: '课程学时',
                    slot: 'courseHour'
                },
                {
                    title: '课程学分',
                    slot: 'courseCredit'
                },
                {
                    title: '是否短学期',
                    slot: 'shortTerm'
                },
                {
                    title: ' ',
                    slot: 'edit'
                }
            ],
            data: [],
            courses:[]
        }
    },
    created() {
        this.getCourseList();
    },
    watch: {
        course: function(val) {
            if (val !== '') {
                this.data=[];
                let i=0;
                for(i=0;i<this.courses.length;i++){
                    if(this.courses[i].courseCode===this.course){
                        this.data.push(this.courses[i]);
                    }else if(this.courses[i].courseName===this.course){
                        this.data.push(this.courses[i]);
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'getCourses',
            'updateCourse'
        ]),
        getCourseList() {
            this.getCourses().then(res => {
                this.courses=res.data;
                res.data.forEach(element => {
                    this.courseSet.add(element.courseCode);
                    this.courseSet.add(element.courseName);    
                });
                this.courseList=Array.from(this.courseSet);
            })
        },
        handleEdit(row, index) {
            this.edit_courseName = row.courseName;
            this.edit_courseCredit = row.courseCredit;
            this.edit_courseHour = row.courseHour;
            this.edit_shortTerm = row.shortTerm;
            this.editIndex = index;
        },
        handleSave(index) {
            this.data[index].courseName = this.edit_courseName;
            this.data[index].courseHour = this.edit_courseHour;
            this.data[index].courseCredit = this.edit_courseCredit;
            this.data[index].shortTerm = this.edit_shortTerm;
            this.editIndex = -1;
            console.log(this.data);
            
            this.updateCourse({
                courseId: this.data[index].courseId,
                courseName: this.data[index].courseName,
                courseHour: this.data[index].courseHour,
                courseCredit: this.data[index].courseCredit,
                shortTerm: this.data[index].shortTerm
            }).then(res => {
                this.$Message.success('课程更新成功');
            }).catch(error => {
                console.log(error);
                this.$Message.error('课程更新失败');
            })
        }
    }
}
</script>
