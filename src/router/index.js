import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {title: '自述文件', requireAuth: true},
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: {title: '系统首页', requireAuth: true}
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: {title: '自定义图标',requireAuth: true}
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: {title: '基础表格', requireAuth: true}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: {title: 'tab选项卡', requireAuth: true}
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: {title: '基本表单', requireAuth: true}
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import('../components/page/VueEditor.vue'),
                    meta: {title: '富文本编辑器', requireAuth: true}
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import('../components/page/Upload.vue'),
                    meta: {title: '文件上传', requireAuth: true}
                },
                {
                    path: '/tour',
                    component: () => import('../components/tour_pages/Tour.vue'),
                    meta: {title: '景点管理', requireAuth: true}
                },
                {
                    path: '/ordermng',
                    component: () => import('../components/tour_pages/OrderMng.vue'),
                    meta: {title: '订单管理', requireAuth: true}
                },
                {
                    path: '/feedback',
                    component: () => import( '../components/tour_pages/Feedback.vue'),
                    meta: {title: '留言管理', requireAuth: true}
                },

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {title: '登录'}
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})


export default router
