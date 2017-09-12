import main from './main.js';
export default () => [
    {
        path: '/register',
        meta: {
	        title: '注册'
	    },
        component: function(resolve) {
            require(['../components/register.vue'], resolve);
        }
    },
    {
        path: '/login',
        meta: {
	        title: '登录'
	    },
        component: function(resolve) {
            require(['../components/login.vue'], resolve);
        }
    },
    main
];


