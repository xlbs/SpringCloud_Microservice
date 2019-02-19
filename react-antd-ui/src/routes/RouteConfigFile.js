import handleHome from "../probusiness/home/index";
import ChangePassword from "../probusiness/system/components/ChangePassword";
import PersonCenter from "../probusiness/system/components/PersonCenter";
import handleReimbursement from "../probusiness/process/reimbursement/index";
import handleLeave from "../probusiness/process/leave/index";
import handleBlogHome from "../probusiness/blog/home/index";

export default {
    menus: [ // 菜单相关路由
        { key: '/home', title: '首页', icon: 'home', component: handleHome },
        {
            key: '/blog', title: '博客系统', icon: 'appstore',
            subs: [
                { key: '/home', title: '首页', icon: 'home', component: handleBlogHome },
            ],
        },
        {
            key: '/process', title: '流程系统', icon: 'appstore',
            subs: [
                { key: '/leave', title: '请假流程', icon: 'calendar', component: handleLeave },
                { key: '/reimbursement', title: '报销流程', icon: 'pay-circle-o', component: handleReimbursement },
            ],
        },
        {
            key: '/system', title: '系统设置', icon: 'setting',
            subs: [
                { key: '/changepassword', title: '修改密码', icon:'edit', component: ChangePassword },
                { key: '/personcenter', title: '个人中心', icon: 'user', component: PersonCenter },
            ],
        },
    ],
    others: [] // 非菜单相关路由
}