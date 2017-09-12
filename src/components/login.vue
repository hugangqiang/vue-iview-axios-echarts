<template>
    <div class="loginBox">
        <div class="login-logo">
            <span>oa</span>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <Form-item prop="userName">
                <Input type="text" v-model="formInline.userName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <router-link to="/register">
                    <Button type="primary">注册</Button>
                </router-link>
                <Button type="primary" class="btn-login" @click="handleSubmit('formInline')">登录</Button>
            </Form-item>
        </Form>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    userName: '',
                    password: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            let _this = this;
            document.onkeyup = function(event){
                if(event.keyCode == 13){
                    _this.handleSubmit('formInline');
                } 
            };
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        axios({
                            method: "POST",
                            url: window.config.api + '/user/login',
                            data:this.$refs.formInline.$options.propsData.model
                        }).then(function(response){
                            _this.$Message.error(response.data.message);
                            if(!response.data.code){
                                _this.$Message.success(response.data.message);
                                localStorage.setItem('token',response.data.token);
                                _this.$router.push({path:'/'});
                            }
                        }).catch(function (error) {
                            console.log(error)
                            _this.$Message.error("登录异常，请稍后再尝试！");
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .loginBox{
        width: 300px;
        height: 280px;
        background: rgba(0,0,0,.5);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -140px;
        .login-logo{
            font-size: 40px;
            text-align: center;
            line-height: 100px;
            color: #fff;
        }
        .ivu-form-inline .ivu-form-item {
            display: block;
            margin-right: 0px;
            vertical-align: top;
            padding: 0 20px;
            .ivu-btn{
                width: 45%;
                float: left;
            }
            .btn-login{
                float: right;
            }
        }
    }
</style>