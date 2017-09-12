<template>
	<div class="wrap">
		<router-view></router-view>
	</div>
</template>

<script>
export default{
    created(){
        //如果用户已经登录
        //生成一个用户data
        //传下去
        let _this = this;
        _this.$store.commit('SAVE_USER', {});
        //获取存储的变量token的值
        let token = localStorage.getItem('token');
        if(token){
            //发送请求用户登录信息接口拿到用户真实信息
            //如果后端能返回当前用户的登录信息则无需重复登录
            //如果后端返回失效的登录信息则跳转到登录页重新登录
            axios({
                method: "POST",
                url: window.config.api,
                data:{
                    token: token
                }
            }).then(function(response){
               if(!response.data.success){
                    _this.$router.push({path: '/login'});
                    return false;
                }
                _this.$store.commit('SAVE_USER', response.data.userInfo);
            });
        }
        else{
            if(!/^\#\/(login|register)/.test(window.location.hash)){
                _this.$router.push({path: '/login'});
            }
        } 
    }
}
</script>
<style lang="scss">
	.wrap{
		background: #666;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
	.bgColor .ivu-select-dropdown{
		background: rgba(0,0,0,.5);
		color: #fff;
		.ivu-dropdown-item{
			color: #fff;
		}
		.ivu-dropdown-item:hover{
			color: #000;
		}
        .ivu-dropdown-item:hover a{
            color: #000;
        }
	}
</style>