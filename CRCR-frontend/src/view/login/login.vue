<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">未注册？
                        <Button @click="modal1 = true" type="text" class="login-tip">点击注册</Button>
                        <Modal v-model="modal1" title="账号注册" :footer-hide="true">
                            <register-form @on-register-success-valid="register"></register-form>
                        </Modal>
                    </p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '_c/login-form'
import RegisterForm from '_c/register-form'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            modal1: false
        }
    },
    components: {
        LoginForm,
        RegisterForm
    },
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserInfo',
            'handleRegister'
        ]),
        handleSubmit({ email, password }) {
            this.handleLogin({ email, password }).then(res => {
                this.getUserInfo().then(res => {
                    this.$router.push("/home");
                })
            })
        },
        register({userName, email, password}){
          this.handleRegister({userName, email, password}).then(res =>{
            console.log(res);
            this.modal1 = false;
          }).catch(err=>{
            console.log(err);
            this.$Message.error("该邮箱已注册！注册失败！");
          })
        }
    }
}
</script>
