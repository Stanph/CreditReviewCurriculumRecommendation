<template>
    <div>
        <Table border :columns="columns" :data="data">
        </Table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'course_search',
    data() {
        return {
            columns: [
                {
                    title: '课程代码',
                    key: 'courseCode',
                    sortable: true
                },
                {
                    title: '课程名称',
                    key: 'courseName',
                    sortable: true
                },
                {
                    title: '课程学时',
                    key: 'courseHour',
                    sortable: true
                },
                {
                    title: '课程学分',
                    key: 'courseCredit',
                    sortable: true
                },
                {
                    title: '是否短学期',
                    key: 'shortTerm',
                    sortable: true
                }
            ],
            data: []
        }
    },
    created() {
        this.getCoursesInfo();
    },
    methods: {
        ...mapActions([
            'getCourses'
        ]),
        getCoursesInfo() {
            this.getCourses().then(res => {
                this.data = res.data;
            })
        }
    }

}
</script>
