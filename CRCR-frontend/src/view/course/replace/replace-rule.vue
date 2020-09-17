<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="替代规则名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入替代规则名称"></Input>
        </FormItem>
        <FormItem label="最低可替代成绩" prop="grade">
            <Input v-model="formValidate.grade" placeholder="请输入最低可替代成绩"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            formValidate: {
                name: '',
                grade: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '替代规则名称不能为空', trigger: 'blur' }
                ],
                grade: [
                    { required: true, message: '最低可替代成绩不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions([
            'addRule'
        ]),
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.addRule({
                        name:this.formValidate.name,
                        grade:this.formValidate.grade
                    })
                    this.$Message.success('替代规则添加成功!');
                } else {
                    this.$Message.error('替代规则添加失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>
