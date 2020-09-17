<template>
    <div>
        <Card>
            <div class="drag-box-card">
    
                <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
                <drag-list :list1.sync="list1" :list2.sync="list2" :list3.sync="list3" :list4.sync="list4" :list5.sync="list5" :list6.sync="list6" :list7.sync="list7" :list8.sync="list8" :dropConClass="dropConClass" @on-change="handleChange">
                    <h3 slot="left-title">第一学期</h3>
                    <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.course_courseName }}</Card>
                    <h3 slot="right-title">第二学期</h3>
                    <Card class="drag-item" slot="right" slot-scope="right">{{ right.itemRight.course_courseName }}</Card>
                    <h3 slot="left-title2">第三学期</h3>
                    <Card class="drag-item" slot="left2" slot-scope="left2">{{ left2.itemLeft2.course_courseName }}</Card>
                    <h3 slot="right-title2">第四学期</h3>
                    <Card class="drag-item" slot="right2" slot-scope="right2">{{ right2.itemRight2.course_courseName }}</Card>
                    <h3 slot="left-title3">第五学期</h3>
                    <Card class="drag-item" slot="left3" slot-scope="left3">{{ left3.itemLeft3.course_courseName }}</Card>
                    <h3 slot="right-title3">第六学期</h3>
                    <Card class="drag-item" slot="right3" slot-scope="right3">{{ right3.itemRight3.course_courseName }}</Card>
                    <h3 slot="left-title4">第七学期</h3>
                    <Card class="drag-item" slot="left4" slot-scope="left4">{{ left4.itemLeft4.course_courseName }}</Card>
                    <h3 slot="right-title4">第八学期</h3>
                    <Card class="drag-item" slot="right4" slot-scope="right4">{{ right4.itemRight4.course_courseName }}</Card>
                </drag-list>
            </div>
        </Card>
    </div>
</template>

<script>
import DragList from '_c/drag-list'
import { mapActions } from 'vuex'

export default {
    name: 'drag_list_page',
    components: {
        DragList
    },
    data() {
        return {
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
            list6: [],
            list7: [],
            list8: [],
            dropConClass: {
                left: ['drop-box', 'left-drop-box'],
                right: ['drop-box', 'right-drop-box'],
                left2: ['drop-box', 'left-drop-box'],
                right2: ['drop-box', 'right-drop-box'],
                left3: ['drop-box', 'left-drop-box'],
                right3: ['drop-box', 'right-drop-box'],
                left4: ['drop-box', 'left-drop-box'],
                right4: ['drop-box', 'right-drop-box']
            },
            handleList: [],
            majorId: '',
            majorDirection: ''
        }
    },
    created() {
        this.getList();
    },
    methods: {
        ...mapActions([
            'getPlans',
            'getUserInfo'
        ]),
        handleChange({ src, target, oldIndex, newIndex }) {
            this.handleList.push(`${src} => ${target}, ${oldIndex} => ${newIndex}`)
        },
        getList() {
            this.getUserInfo().then(res => {
                this.majorId = res.majorId;
                this.majorDirection = res.majorDirection;
                this.getPlans({
                    majorId: res.majorId
                }).then(res => {
                    res.data.forEach(element => {
                        if (element.plan_courseNature === '必修' || element.plan_majorDirection === this.majorDirection || element.plan_majorDirection === '专业方向基础模块') {
                            switch (element.plan_suggestTerm) {
                                case "1":
                                    this.list1.push(element);
                                    break;
                                case "2":
                                    this.list2.push(element);
                                    break;
                                case "3":
                                    this.list3.push(element);
                                    break;
                                case "4":
                                    this.list4.push(element);
                                    break;
                                case "5":
                                    this.list5.push(element);
                                    break;
                                case "6":
                                    this.list6.push(element);
                                    break;
                                case "7":
                                    this.list7.push(element);
                                    break;
                                case "8":
                                    this.list8.push(element);
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                });
            });
        }
    }
}
</script>

<style lang="less">
.drag-box-card {
    display: inline-block;
    .drag-item {
        margin: 10px;
    }
    h3 {
        padding: 10px 15px;
    }
    .drop-box {
        border: 1px solid #eeeeee;
        border-radius: 5px;
    }
    .left-drop-box {
        margin-right: 10px;
    }
    .right-drop-box {
        //
    }
}

.handle-log-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 200px;
    height: 500px;
    h3 {
        padding: 10px 14px;
    }
    .handle-inner-box {
        height: ~"calc(100% - 44px)";
        overflow: auto;
        p {
            padding: 14px 0;
            margin: 0 14px;
            border-bottom: 1px dashed #eeeeee;
        }
    }
}

.res-show-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 350px;
    height: 570px;
}
</style>
