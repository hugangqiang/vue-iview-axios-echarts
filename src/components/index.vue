
<template>
    <div class="layout" :class="{'layout-menu-heid-text': spanLeft < 3}">
        <div class="layout-header">
            <div class="layout-hader-left">
                 <div class="layout-logo-left"><router-link to="/">oa</router-link></div>
                 <div class="topbar-btn">管理控制台</div>
                 <Dropdown trigger="click" class="topbar-btn bgColor">
                    <a href="javascript:void(0)">
                        服务
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item>任务</Dropdown-item>
                        <Dropdown-item>考勤</Dropdown-item>
                        <Dropdown-item>日报</Dropdown-item>
                        <Dropdown-item>计划</Dropdown-item>
                        <Dropdown-item>报表</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </div>
            <div class="layout-hader-right">
                <div class="topbar-btn">
                    <Icon type="ios-bell"></Icon>
                </div>
                <Dropdown  class="topbar-btn bgColor">
                    <a href="javascript:void(0)">
                       {{ userName }}
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item>
                            <a href="javascript:;">修改密码</a>
                        </Dropdown-item>
                        <Dropdown-item>
                            <a href="javascript:;">基本资料</a>
                        </Dropdown-item>
                        <Dropdown-item>
                            <a href="javascript:;" @click="logout()">退出</a>
                        </Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
                <div class="topbar-btn skin">
                     <a href="javascript:void(0)">换肤</a>
                     <div class="bodyBg">
                         <ul>
                            <li class="default">
                                <div  @click="bgDefaultTodo()">默认</div>
                            </li>
                            <li v-for="(item, index) in bg" :class="{completed:item===bgTodos}">
                                <img  @click="bgTodo(index,item)" :src="imgUrl+item.url">
                                <Icon type="record"></Icon>
                            </li>
                         </ul>
                         <div class="more">
                            <router-link to="/bg">更多</router-link>
                        </div>
                     </div>
                </div>
            </div>
        </div>

        <div class="layout-body">
            <div class="layout-menu-left">
                <Menu :theme="theme3" :open-names="['1']" accordion width="auto">
                    <div class="menuToggle" @click="toggleClick">
                        <Icon type="navicon"></Icon>
                    </div>
                    <Submenu name="1">
                        <template slot="title">
                            <span class="layout-text"><Icon type="ios-paper"></Icon>
                            内容管理</span>
                        </template>
                        <Menu-item name="1-1">
                            <Icon type="clipboard"></Icon>
                            <span class="layout-text">文章管理</span>
                        </Menu-item>
                        <Menu-item name="1-2">
                            <Icon type="compose"></Icon>
                            <span class="layout-text">评论管理</span>
                        </Menu-item>
                        <Menu-item name="1-3">
                            <Icon type="ios-lightbulb"></Icon>
                            <span class="layout-text">举报管理</span>
                        </Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <span class="layout-text"><Icon type="android-person"></Icon>
                            用户管理</span>
                        </template>
                        <Menu-item name="2-1">
                            <Icon type="person-add"></Icon>
                            <span class="layout-text">新增用户</span>
                        </Menu-item>
                        <Menu-item name="2-2">
                            <Icon type="person-stalker"></Icon>
                            <span class="layout-text">活跃用户</span>
                        </Menu-item>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <span class="layout-text"><Icon type="stats-bars"></Icon>
                            统计分析</span>                            
                        </template>
                        <Menu-item name="3-1">
                            <Icon type="fork-repo"></Icon>
                            <span class="layout-text">新增和启动</span>
                        </Menu-item>
                        <Menu-item name="3-2">
                            <Icon type="stats-bars"></Icon>
                            <span class="layout-text">活跃分析</span>
                        </Menu-item>
                        <Menu-item name="3-3">
                            <Icon type="ios-pulse"></Icon>
                            <span class="layout-text">时段分析</span>
                        </Menu-item>
                        <Menu-item name="3-4">
                            <Icon type="coffee"></Icon>
                            <span class="layout-text">用户留存</span>
                        </Menu-item>
                        <Menu-item name="3-5">
                            <Icon type="flash"></Icon>
                            <span class="layout-text">流失用户</span>
                        </Menu-item>
                    </Submenu>
                </Menu>
            </div>
            <div class="layout-content-right">
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 3,
                spanRight: 21,
                imgUrl: window.config.api + '/download?url=',
                bg: [],
                bgTodos: "",
                theme3: 'dark'
            }
        },
        computed: {
            userName(){
                return this.$store.state.userinfo.userName;
            }
        },
        created(){
            
            let _this = this;
            axios.get(window.config.api + '/bgUrl').then(function (response) {
                for(let i=0; i<6; i++){
                    _this.bg.push(response.data[i]);
                }
            });
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 3) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 3;
                    this.spanRight = 21;
                }
            },
            bgDefaultTodo (){
                let bg = document.querySelector('.wrap');
                bg.style.background= '#666';
                this.bgTodos = '';
            },
            bgTodo ($index,todo){
                let bg = document.querySelector('.wrap');
                let imgUrl = this.imgUrl;
                bg.style.background= `url(${imgUrl}${todo.url})`;
                bg.style.backgroundPosition= 'center';
                bg.style.backgroundSize= 'auto';
                this.bgTodos = todo;
            },
            //退出登录
            logout (){
                this.$Modal.confirm({
                    content: '<h2>是否退出系统？</h2>',
                    onOk: () => {
                        localStorage.removeItem('token')
                        this.$router.push({path:'/login'});
                    },
                    onCancel: () => {
                    }
                });       
            }
        }
    }
</script>
<style lang="scss">
    .layout{
        overflow: hidden;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .layout-header{
        height: 50px;
        background: rgba(0,0,0,.1);
        .topbar-btn{
            padding: 0 20px;
            float: left;
            height: 50px;
            cursor: pointer;
            color: #fff;
            font-size: 14px;   
            line-height: 50px;
            border-right: 1px solid rgba(0,0,0,.05);
            i{
                font-size: 18px;
            }
        }
        .topbar-btn:hover{
            background: rgba(0,0,0,.3);
            border-right: 1px solid rgba(0,0,0,0);
        }
        .layout-hader-left{
            float: left;
            height: 50px;
            a{
                color: #fff;
            }
            .layout-logo-left{
                height: 50px;
                width: 50px;
                float: left;
                padding: 0;
                color: #fff;
                font-size: 20px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                border-right: 1px solid rgba(0,0,0,.05);
                a{
                    display: block;
                }
            }
            .layout-logo-left:hover{
                background: rgba(0,0,0,.3);
                border-right: 1px solid rgba(0,0,0,0);
            }
            .ivu-dropdown{
                line-height: 50px;
                height: 50px;
                padding: 0 20px;
                .ivu-dropdown-item{
                    padding: 10px 16px;
                }
            }
            .ivu-select-dropdown {
                margin: 0;
                border-radius: 0;
            }
            .topbar-btn.ivu-dropdown{
                padding: 0;
                .ivu-dropdown-rel{
                    padding: 0 20px;
                }
            }
        }

        .layout-hader-right{
            float: right;
            a{
                color: #fff;
                display: block;
            }
            .topbar-btn{
                border-right: none;
                border-left: 1px solid rgba(0,0,0,.05);
            }
            .topbar-btn:hover{
                border-left: 1px solid rgba(0,0,0,0);
            }
            .ivu-dropdown{
                line-height: 50px;
                height: 50px;
                padding: 0 20px;
                .ivu-dropdown-item{
                    padding: 0;
                    a{
                        padding: 10px 16px;
                    }
                }
            }
            .ivu-select-dropdown {
                margin: 0;
                border-radius: 0;
            }
            .skin{
                position: relative;
                .bodyBg{
                    position: absolute;
                    background: rgba(0,0,0,.6);
                    top: 100%;
                    right: 0;
                    z-index: 10;
                    display: none;
                    ul{
                        margin: 0;
                        padding: 5px 0 0;
                        li{
                            padding: 5px 10px;
                            height: 75px;
                            position: relative;
                            color: #00a810;

                            img{
                                width: 100px;
                                height: 65px;
                                float: left;
                            }
                            .ivu-icon{
                                display: none;
                                position:absolute;
                                right: 15px;
                                bottom: 10px;
                            }
                        }
                        .default{
                            div{
                                width: 100px;
                                height: 65px;
                                float: left;
                                background: #666;
                                text-align: center;
                                line-height: 65px;
                                font-size: 20px;
                                color: #fff;
                            }
                            .ivu-icon{
                                display: block;
                            }
                        }
                    }
                    ul li.completed .ivu-icon{
                        display: block;
                    }
                    .more{
                        padding: 0;
                        display: block;
                        margin-top: 5px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        font-size: 14px;
                        background: rgba(0,0,0,.5);
                        a{
                            display: block;
                        }
                    }
                }
            }
            .skin:hover .bodyBg{
                display: block;
            }
        }

    }
    
    .layout-menu-left{
        background: rgba(0,0,0,0.1);
        width: 180px;
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        .menuToggle{
            cursor: pointer;
            text-align: center;
            line-height: 30px;
            background: rgba(0,0,0,0);
            i{
                color: hsla(0,0%,100%,.7);
                transform: rotateZ(90deg);
                font-size: 25px;
                margin-top: 8px;
            } 
        }
        .menuToggle:hover{
            i{
                color: #fff;
            }
        }
        .ivu-menu-dark.ivu-menu-vertical{
            background: rgba(0,0,0,0);
            .ivu-menu-opened{
                background: rgba(0,0,0,0);
            }
            .ivu-menu-opened .ivu-menu-submenu-title {
                background: rgba(0,0,0,0.1);
            }
            .ivu-menu-submenu-title .ivu-icon-ios-arrow-down:before{
                content: "\F104";
            }
            .ivu-menu-item, .ivu-menu-submenu-title{
                padding: 9.5px 24px;
                transition: none;
            }

            .ivu-menu-submenu .ivu-menu-item{
                padding-left: 24px;
                position: relative;
                i{
                    margin-right: 8px;
                }
            }

            .ivu-menu-submenu .ivu-menu-submenu-title:hover{
                background: rgba(0,0,0,0.1)!important;
            }

            .ivu-menu-submenu .ivu-menu-item:hover{
                background: rgba(0,0,0,0.1)!important;
            }
            .ivu-menu-submenu .ivu-menu-item-active, 
            .ivu-menu-submenu .ivu-menu-item-active:hover {
                border-right: none;
                color: #fff;
                background: rgba(0,84,255,0.15)!important;
            }
            
        }
    }

    .layout-content-right{
        position: absolute;
        top: 50px;
        left: 180px;
        bottom: 0;
        right: 0;
        overflow: auto;
        .layout-content{
            margin: 15px;
        }
    }
    
    .layout-menu-heid-text .layout-menu-left{
        width: 50px;
        .ivu-menu-dark.ivu-menu-vertical{
            .menuToggle{
                i{
                    transform: rotateZ(0deg);
                }
            }
            .layout-text{
                display: none;
                min-width: 100px;
                height: 40px;
                position: absolute;
                left: 60px;
                top: 0;
                background: rgba(0, 0, 0,.2);
                text-align: left;
                padding-left: 15px;
                line-height: 40px;
                z-index: 9999;
                .ivu-icon{
                    display: none;
                }
            }
            .layout-text:before {
                content: "";
                border-right: 6px solid rgba(0, 0, 0,.2);
                border-top: 5px solid rgba(0,0,0,0);
                border-bottom: 5px solid rgba(0,0,0,0);
                position: absolute;
                font-size: 15px;
                left: -6px;
                top: 16px;
            }
            .ivu-menu-submenu-title-icon{
                position: static;
                float: none;
            }
            .ivu-menu-submenu{
                .ivu-menu-submenu-title,
                .ivu-menu-item{
                    padding: 0;                
                    height: 40px;
                    text-align: center;
                    .ivu-icon{
                        margin: 0;
                        font-size: 18px;
                        line-height: 40px;
                    }
                }
                .ivu-menu-submenu-title:hover .layout-text,
                .ivu-menu-item:hover .layout-text{
                    display: block;
                }
            }
        }
        
    }

    .layout-menu-heid-text .layout-content-right{
        left: 50px;
    }
   
</style>