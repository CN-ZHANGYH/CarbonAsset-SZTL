import { createRouter, createWebHistory } from 'vue-router';
import LoginHome from '../view/login/LoginHome.vue';
import Login from '../view/login/Login.vue';
import PersonalHome from "../view/PersonalHome.vue";
import MasterConsole from "../view/Dashboard/MasterConsole.vue";
import WorkConsole from "../view/Dashboard/WorkConsole.vue";
import UploadQualification from "../view/Firm/UploadQualification.vue";
import InquireQualification from "../view/Firm/InquireQualification.vue";
import ApplicationCarbon from "../view/Carbon/ApplicationCarbon.vue";
import GenerateCarbon from "../view/Carbon/GenerateCarbon.vue";
import SellingCarbon from "../view/Trading/SellingCarbon.vue";
import BuyCarbon from "../view/Trading/BuyCarbon.vue";
import CarbonCertificate from "../view/Inquire/CarbonCertificate.vue";
import QueryCarbonHistory from "../view/Inquire/QueryCarbonHistory.vue";
import QueryTransaction from "../view/Inquire/QueryTransaction.vue";
import Leader from "../view/Leader/Leader.vue";


const routes = [
    {
        path: '/',
        name: '数字碳链',
        meta: {title: "数字碳链"},
        component: LoginHome
    },
    {
        path: '/404',
        name: 'NotFound',
        meta: {title: "没有找到页面"},
        component: component => import("/src/view/Error/404.vue")
    },
    {
        path: '/401',
        name: 'NotAuth',
        meta: {title: "没有权限"},
        component: component => import("/src/view/Error/401.vue")
    },
    {
        path: '/Login',
        name: 'Login',
        meta: {title: "登录/注册"},
        component: Login
    },
    {
        path:'/PersonalHome',
        component: PersonalHome,
        // redirect:'/PersonalHome',
        children:[
            {
                path:'/MasterConsole',
                meta: {title: "主控台"},
                component:MasterConsole
            },
            {
                path:'/WorkConsole',
                meta: {title: "工作台"},
                component:WorkConsole
            },
            {
                path:'/UploadQualification',
                meta: {title: "企业上传资质"},
                component:UploadQualification
            },
            {
                path:'/InquireQualification',
                meta: {title: "企业基本信息"},
                component:InquireQualification
            },
            {
                path:'/ApplicationCarbon',
                meta: {title: "申请碳排放额度"},
                component:ApplicationCarbon
            },
            {
                path:'/GenerateCarbon',
                meta: {title: "碳排放报告"},
                component:GenerateCarbon
            },
            {
                path:'/SellingCarbon',
                meta: {title: "出售碳资产"},
                component:SellingCarbon
            },
            {
                path:'/BuyCarbon',
                meta: {title: "购买碳资产"},
                component:BuyCarbon
            },
            {
                path:'/CarbonCertificate',
                meta: {title: "碳证书"},
                component:CarbonCertificate
            },
            {
                path: '/QueryCarbonHistory',
                meta: {title: "碳排放记录"},
                component:QueryCarbonHistory
            },
            {
                path: '/QueryTransaction',
                meta: {title: "碳交易记录"},
                component:QueryTransaction
            },
            {
                path: '/Leader',
                meta: {title: "排行榜"},
                component:Leader
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title

    // 检查目标路由是否存在
    const foundRoute = router.getRoutes().find(route => route.path === to.path)
    if (!foundRoute) {
        next({ name: 'NotFound' })
    }
    // 添加路由守卫
    const user = JSON.parse(localStorage.getItem('user'))
    if (to.name != 'Login' && user == null) {
        // 如果不是登录页面且没有认证信息，则跳转到登录页面
        next({ name: 'Login' })
    }
    next()
})

export default router;
