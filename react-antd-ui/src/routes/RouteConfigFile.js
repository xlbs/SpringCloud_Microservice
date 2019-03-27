import handleHome from "../probusiness/comm/home/index";
import handleBlogHome from "../probusiness/blog/home/index";
import handleLeave from "../probusiness/process/leave/index";
import handleReimbursement from "../probusiness/process/reimbursement/index";
import ChangePassword from "../probusiness/comm/system/changepassword/ChangePassword";
import handlePersonCenter from "../probusiness/comm/system/personcenter/index";

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
                { key: '/personcenter', title: '个人中心', icon: 'user', component: handlePersonCenter },
            ],
        },
    ],
    others: [] // 非菜单相关路由
}