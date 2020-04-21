/*
 * @Description: 
 * @Author: Roc
 * @Date: 2019-10-31 10:08:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-06 17:22:24
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from 'store/index'
Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/download',
            name: 'home',
            component: Home,
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import( /* webpackChunkName: "login" */ './views/login.vue'),
            meta: {
                title: "注册",
                auth: false,
                keepAlive: true
            }
        },
        /**************京东h5页面*********** */
        {
            path: '/jDbuyingdetails',
            name: 'jDbuyingdetails',
            component: () => import('./views/jd/jDbuyingdetails.vue'), //jd秒杀商品
            meta: {
                title: "商品详情",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDflashsale',
            name: 'jDflashsale',
            component: () => import('./views/jd/jDflashsale.vue'), //jd特卖专场
            meta: {
                title: "限时抢购",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDgeneralmerchandise',
            name: 'jDbuyingdetails',
            component: () => import('./views/jd/jDgeneralmerchandise.vue'), //jd普通商品
            meta: {
                title: "商品详情",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDgroupgoods',
            name: 'jDgroupgoods',
            component: () => import('./views/jd/jDgroupgoods.vue'), //jd拼团商品
            meta: {
                title: "商品详情",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDbuyingdetails',
            name: 'jDbuyingdetails',
            component: () => import('./views/jd/jDbuyingdetails.vue'), //jd秒杀商品
            meta: {
                title: "商品详情",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDgroupzone',
            name: 'jDgroupzone',
            component: () => import('./views/jd/jDgroupzone.vue'), //jd小哥拼团列表
            meta: {
                title: "小哥拼团",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/jDhot',
            name: 'jDhot',
            component: () => import('./views/jd/jDhot.vue'), //jd 24小时热销
            meta: {
                title: "24小时最热榜单",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        }, {
            path: '/jDspecial',
            name: 'jDspecial',
            component: () => import('./views/jd/jDspecial.vue'), //jd特卖商品
            meta: {
                title: "特卖商品",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        /*************************************/
        {
            path: '/voucherdetailspage',
            name: 'voucherdetailspage',
            component: () => import('./views/voucherdetailspage.vue'),
            meta: {
                title: "666",
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/voucherdetails',
            name: 'voucherdetails',
            component: () => import('./views/voucherdetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/shoppingspree',
            name: 'shoppingspree',
            component: () => import('./views/shoppingspree.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/shopdetails',
            name: 'shopdetails',
            component: () => import('./views/shopdetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/packagedetails',
            name: 'packagedetails',
            component: () => import('./views/packagedetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/merchandetails',
            name: 'merchandetails',
            component: () => import('./views/merchandetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/groupzone',
            name: 'groupzone',
            component: () => import('./views/groupzone.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/groupgoods',
            name: 'groupgoods',
            component: () => import('./views/groupgoods.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/groupdetailspage',
            name: 'groupdetailspage',
            component: () => import('./views/groupdetailspage.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/goshop',
            name: 'goshop',
            component: () => import('./views/goshop.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/generalmerchandise',
            name: 'generalmerchandise',
            component: () => import('./views/generalmerchandise.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/flashsale',
            name: 'flashsale',
            component: () => import('./views/flashsale.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/buyingdetails',
            name: 'buyingdetails',
            component: () => import('./views/buyingdetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/businessdetails',
            name: 'businessdetails',
            component: () => import('./views/businessdetails.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/activitypage',
            name: 'activitypage',
            component: () => import('./views/activitypage.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/survey',
            name: 'survey',
            component: () => import('./views/survey.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        //代理商加盟
        {
            path: '/agent',
            name: 'agent',
            component: () => import('./views/cooperation/agent.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        //商家入驻
        {
            path: '/merchant',
            name: 'merchant',
            component: () => import('./views/cooperation/merchant.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        //骑手承包商加盟
        {
            path: '/contractor',
            name: 'contractor',
            component: () => import('./views/cooperation/contractor.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        //骑手招募
        {
            path: '/rider',
            name: 'rider',
            component: () => import('./views/cooperation/rider.vue'),
            meta: {
                auth: false, // 是否需要登录
                keepAlive: true // 是否缓存组件
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ './views/About.vue'),
            meta: {
                auth: true,
                keepAlive: true
            }
        },

        {
            path: '*', // 未匹配到路由时重定向
            redirect: '/login',
            meta: {
                // auth: true,
                // keepAlive: true
            }
        }
    ]
})
// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];
    // 当跳转时携带指定方向参数则优先使用指定参数
    if (to.params.direction) {
        store.commit('updateDirection', to.params.direction)
    } else {
        const toIndex = history.getItem(to.path)
        const fromIndex = history.getItem(from.path)
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
            if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                store.commit('updateDirection', 'forward')
            } else {
                store.commit('updateDirection', 'back')
            }
        } else {
            ++historyCount
            history.setItem('count', historyCount)
            to.path !== '/' && history.setItem(to.path, historyCount)
            store.commit('updateDirection', 'forward')
        }
    }
    if (auth) { // 需要登录
        if (token) {
            next()
        } else {
            next({
                path: '/download',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})
export default router
