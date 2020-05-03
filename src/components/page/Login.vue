<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智慧旅游后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        show-password
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        adminLogin
    } from 'api'

    export default {
        data: function () {
            return {
                param: {
                    username: 'admin',
                    password: '123abc',
                },
                rules: {
                    userName: [
                        {
                            required: true,
                            max: 16,
                            message: '长度在 6-16 个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            min: 6,
                            max: 16,
                            message: '至少6-16个字符，至少1个字母和1个数字，其他可以是任意字符',
                            pattern: /^(?=.*[a-z])(?=.*\d)[^]{6,16}$/,
                            trigger: 'blur'
                        }
                    ]
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(async valid => {
                    if (valid) {
                        let result = await adminLogin(this.param.username, this.param.password)
                        if (result.data.code === 0) {
                            this.$message.success('登录成功');
                            window.sessionStorage.setItem('admin', this.param.username);
                            this.$router.push('/dashboard');
                        } else {
                            this.$message.error(result.data.msg)
                        }

                    } else {
                        this.$message.error('请输入正确的账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #3a8ee6;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .el-form-item {
        margin-bottom: 40px;
    }
</style>