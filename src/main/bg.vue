<template>

	 <Row class="skin-list">
        <Col span="4" class="default">
            <div  @click="bgDefaultTodo()">默认</div>
        </Col>
        <Col span="4"  v-for="item in bg" :class="{completed:item===bgTodos}" :key="item.id">
        	<img  @click="bgTodo(item.id,item)" :src="imgUrl+item.url">
            <Icon type="record"></Icon>
        </Col>
        <Col span="4">
        	<Upload
		        ref="upload"
		        :show-upload-list="false"
		        :on-success="handleSuccess"
		        :on-error="handleError"
		        :format="['jpg','jpeg','png']"
		        :max-size="2048"
		        :on-format-error="handleFormatError"
		        :on-exceeded-size="handleMaxSize"
		        type="drag"
		        action="//127.0.0.1:1111/oa/upload"
		      >
		        <div>
		           <Icon type="android-add"></Icon>
		        </div>
		    </Upload>
        </Col>
    </Row>
    
</template>
<script>
     export default {
        data () {
            return {
                imgUrl: window.config.api + '/download?url=',
                bg: [],
                bgTodos: "",
            }
        },
        created(){
            let _this = this;
            axios.get(window.config.api + '/bgUrl').then(function (response) {
                _this.bg = response.data;
                _this.bgTodos = _this.bg[0];
            });
        },
        methods: {
        	bgTodo($index,todo){
                let bg = document.querySelector('.wrap');
                let imgUrl = this.imgUrl;
                bg.style.background= `url(${imgUrl}${todo.url})`;
                bg.style.backgroundPosition= 'center';
                bg.style.backgroundSize= 'auto';
                this.bgTodos = todo;
            },
            bgDefaultTodo (){
                let bg = document.querySelector('.wrap');
                bg.style.background= '#666';
                this.bgTodos = '';
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                this.$Notice.success({
                    title: '成功',
                    desc: res.message
                });
            },
            handleError (error, file) {
                this.$Notice.warning({
                    title: '失败',
                    desc: res.message
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            }
        },
        mounted () {
           
        }
    }
</script>
<style lang="scss">
	.skin-list{
        padding: 5px;
        background: rgba(255,255,255,.5);
		.ivu-col{
            position: relative;
            padding: 5px;
			img{
			    width: 100%;
                height: 100px;
                cursor: pointer;
                float: left;
			}
            .ivu-icon{
                display: none;
                position:absolute;
                right: 15px;
                bottom: 10px;
                color: red;
                font-size: 20px;
                color: #00a810;
            }
            .ivu-upload{
                width: 100%;
                height: 100px;
                background: #fff;
                border: none;
                .ivu-icon{
                    position: static;
                    line-height: 100px;
                    color: #333;
                    display: block;
                    font-size: 50px;
                }
            }
		}
        .completed .ivu-icon{
            display: block;
        }
        .default{
            div{
                width: 100%;
                height: 100px;
                cursor: pointer;
                float: left;
                background: #666;
                text-align: center;
                line-height: 100px;
                font-size: 20px;
                color: #fff;
            }
            .ivu-icon{
                display: block;
            }
        }
	}
</style>