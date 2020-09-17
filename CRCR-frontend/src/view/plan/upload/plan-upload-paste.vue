<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="学院" prop="faculty">
                <Input v-model="formValidate.faculty" placeholder="请输入学院名称" style="width: 50%"></Input>
            </FormItem>
            <FormItem label="专业" prop="major">
                <Input v-model="formValidate.major" placeholder="请输入专业名称" style="width: 50%"></Input>
            </FormItem>
            <FormItem label="培养计划年份" prop="enrollYear">
                <Input v-model="formValidate.enrollYear" placeholder="请选择专业培养计划年份" style="width: 50%"></Input>
            </FormItem>
        </Form>
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
                    <Table :height="400" :columns="columns" :data="tableData" />
                    <div class="update-paste-btn-con">
                        <Button type="primary" style="float: right;" @click="handleSubmit('formValidate')">提交</Button>
                    </div>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
import PasteEditor from '_c/paste-editor'
import { getTableDataFromArray } from '@/libs/util'
import { mapActions } from 'vuex'

export default {
    name: 'plan_upload_paste',
    components: {
        PasteEditor
    },
    data() {
        return {
            formValidate: {
                faculty: '',
                major: '',
                enrollYear: '',
            },
            ruleValidate: {
                faculty: [
                    { required: true, message: '学院名不能为空', trigger: 'blur' }
                ],
                major: [
                    { required: true, message: '专业名不能为空', trigger: 'blur' }
                ],
                enrollYear: [
                    { required: true, message: '培养计划年份不能为空', trigger: 'blur' }
                ]
            },
            pasteDataArr: [],
            columns: [],
            tableData: [],
            validated: true,
            update: false,
            errorIndex: 0
        }
    },
    methods: {
        ...mapActions([
            'createPlan'
        ]),
        handleSuccess() {
            this.validated = true
            this.update = true
        },
        handleError(index) {
            this.validated = false
            this.errorIndex = index
        },
        handleShow() {
            if (!this.validated) {
                this.$Notice.error({
                    title: '您的内容不规范',
                    desc: `您的第${this.errorIndex + 1}行数据不规范，请修改`
                })
            } else if (this.update) {
                let { columns, tableData } = getTableDataFromArray(this.pasteDataArr)
                this.columns = columns
                this.tableData = tableData
                this.update = false
            } else {
                this.$Notice.error({
                    title: '未修改'
                })
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (!valid) {
                    this.$Message.error('输入无效');
                } else if (this.tableData.length === 0) {
                    this.$Message.error('培养计划内容不能为空');
                } else {
                    this.createPlan({
                        majorName: this.formValidate.major,
                        facultyName: this.formValidate.faculty,
                        enrollYear: this.formValidate.enrollYear,
                        columns: this.columns,
                        tableData: this.tableData
                    }).then(res => {
                        this.$Message.success(res.data);
                        this.columns=[];
                        this.tableData=[];
                    }).catch(error => {
                        console.log(error);
                        this.$Message.error('培养计划创建失败');
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.update-paste {
    &-con {
        height: 350px;
    }
    &-btn-con {
        box-sizing: content-box;
        height: 30px;
        padding: 15px 0 5px;
    }
}

.paste-tip {
    color: #19be6b;
}
</style>
