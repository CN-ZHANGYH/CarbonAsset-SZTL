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
    {path: '/', component: LoginHome },
    {path: '/login', component: Login },
    {
        path:'/PersonalHome',
        component: PersonalHome,
        // redirect:'/PersonalHome',
        children:[
            {path:'/MasterConsole',component:MasterConsole},
            {path:'/WorkConsole',component:WorkConsole},
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

export default router;
