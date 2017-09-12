<template>
	<Row>
		<Col span="18">col-12</Col>
        <Col span="6">
			<Card>
		        <p slot="title">
		            <Icon type="volume-low"></Icon>
		            通知
		        </p>
		        <a href="#" slot="extra">
		            <Icon type="ios-close-outline"></Icon>
		        </a>
		        <Tabs value="name1">
			        <TabPane label="任务通知" name="name1">
						<ul>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
						</ul>
			        </TabPane>
			        <TabPane label="系统通知" name="name2">
						<ul>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
							<li>任务通知任务通知任务通知</li>
						</ul>
			        </TabPane>
			    </Tabs>
		    </Card>
        </Col>
	</Row>
</template>

<script>
export default{
    
}
</script>
<style lang="scss">
	.ivu-card-bordered {
	    border: none;
	}
	.ivu-card {
	    background: rgba(255,255,255,.8);
	    border-radius: 0px;
	}
	.ivu-card-head {
	    border-bottom: 1px solid #fff;
	}
</style>