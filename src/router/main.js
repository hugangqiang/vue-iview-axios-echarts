export default {
    path: '/',
	//依赖部分
    component: resolve => require(['../components/index.vue'], resolve),
	//默认跳转
    redirect: '/home',
    meta: {
	    title: 'oa'
    },

	//以下部分为主页的子模块
    children: [
        {
            path: 'home',
            meta: {
                title: 'oa-home'
            },
            component: resolve => require(['../main/index.vue'], resolve),	
        },
        {
            path: 'bg',
            meta: {
                title: 'oa-home'
            },
            component: resolve => require(['../main/bg.vue'], resolve),  
        }
    ]
};
