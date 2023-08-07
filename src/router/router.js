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
import {login} from "../api/login.js";


const routes = [
    {path: '/', component: LoginHome },
    {
        path: '/404',
        name: 'NotFound',
        component: component => import("/src/view/Error/404.vue")
    },
    {
        path: '/401',
        name: 'NotAuth',
        component: component => import("/src/view/Error/401.vue")
    },
    {
        path: '/login',
        name: 'login',
        meta: {title: "登录"},
        component: Login
    },
    {
        path:'/PersonalHome',
        component: PersonalHome,
        // redirect:'/PersonalHome',
        children:[
            {
                path:'/MasterConsole',
                meta: {title: "登录"},
                component:MasterConsole
            },
            {
                path:'/WorkConsole',
                meta: {title: "登录"},
                component:WorkConsole
            },
            {path:'/UploadQualification',component:UploadQualification},
            {path:'/InquireQualification',component:InquireQualification},
            {path:'/ApplicationCarbon',component:ApplicationCarbon},
            {path:'/GenerateCarbon',component:GenerateCarbon},
            {path:'/SellingCarbon',component:SellingCarbon},
            {path:'/BuyCarbon',component:BuyCarbon},
            {path:'/CarbonCertificate',component:CarbonCertificate},
            {path: '/QueryCarbonHistory',component:QueryCarbonHistory},
            {path: '/QueryTransaction',component:QueryTransaction},
            {path: '/Leader',component:Leader}
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
    if (to.name != 'login' && user == null) {
        // 如果不是登录页面且没有认证信息，则跳转到登录页面
        next({ name: 'login' })
    }
    next()
})

export default router;
