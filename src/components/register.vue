<template>
    <div class="registerBox">
        <div class="register-logo">
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
            <Form-item prop="passwordCheck">
                <Input type="password" v-model="formInline.passwordCheck" placeholder="确认密码">
                    <Icon type="android-refresh" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleReset('formInline')">重置</Button>
                <Button type="primary" @click="handleSubmit('formInline')" class="btn-register">注册</Button>
            </Form-item>
        </Form>
    </div>
    
</template>
<script>
    import axios from 'axios';
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '' ) {
                    callback(new Error('请输入密码'));
                } else if( value.length < 6 ){
                    callback(new Error('密码长度不能低于6位'));
                } else {
                    if (this.formInline.passwordCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formInline.validateField('passwordCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }else if (value !== this.formInline.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formInline: {
                    userName: '',
                    password: '',
                    passwordCheck: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwordCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
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
                            url: window.config.api + '/user/register',
                            data:this.$refs.formInline.$options.propsData.model
                        }).then(function(response){
                            _this.$Message.error(response.data.message);
                            if(!response.data.code){
                                _this.$Message.success(response.data.message);
                                _this.$router.push({path:'/login'});
                            }
                        }).catch(function (error) {
                            console.log(error)
                            _this.$Message.error("注册异常，请稍后再尝试！");
                        });
                        
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style lang="scss">
    .registerBox{
        width: 300px;
        height: 350px;
        background: rgba(0,0,0,.5);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -175px;
        .register-logo{
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
            .btn-register{
                float: right;
            }
        }
    }
</style>