<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="密码确认" prop="passwordCheck">
            <Input type="password" v-model="formValidate.passwordCheck" placeholder="请再次输入密码"></Input>
        </FormItem>
        <FormItem>
            <Button ghost type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formValidate.passwordCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate.validateField('passwordCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidate.password) {
                callback(new Error('两次输入的密码不同'));
            } else {
                callback();
            }
        };
        return {
            formValidate: {
                name: '',
                email: '',
                password: '',
                passwordCheck: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不对', trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                passwordCheck: [
                    { required: true, validator: validatePassCheck, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('on-register-success-valid', {
                        userName: this.formValidate.name, 
                        email: this.formValidate.email, 
                        password: this.formValidate.password
                    })
                } else{
                    this.$Message.error("注册信息无效！");
                }
            })

        }
    }
}
</script>
