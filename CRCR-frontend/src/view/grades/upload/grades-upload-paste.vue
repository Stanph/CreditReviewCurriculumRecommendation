<template>
  <div>
    <Row :gutter="10">
        <i-col>
            <Card>
                <div class="update-paste-con">
                    <span class="paste-tip">请将你的成绩粘贴入下框：</span>
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
                    <Button type="primary" style="float: right;" @click="handleSubmit()">提交</Button>
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
    name: 'grades_update_paste',
    components: {
        PasteEditor
    },
    data() {
        return {
            codeSet: new Set(),
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
            'addGrades'
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
            }else if (this.update) {
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
        handleSubmit() {
            if (this.tableData.length === 0) {
                this.$Message.error('成绩不能为空');
            } else {
                this.addGrades({
                    columns: this.columns,
                    tableData: this.tableData
                }).then(res => {
                    this.$Message.success(res.data);
                    // this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                    this.$Message.error('成绩添加失败');
                })
            }
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
