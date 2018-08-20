import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/icon/iconfont.css'
import Global from '~/global/Global'
import Directives from '~/global/Directives'


const Index = () => import('./components/Index.vue').then(m => m.default)
const Home = () => import('./components/Home.vue').then(m => m.default)
const Pager = () => import('./components/widgets/Pager.vue').then(m => m.default)
const EditBar = () => import('./components/widgets/EditBar.vue').then(m => m.default)
const Login = () => import('./components/Login.vue').then(m => m.default)
const Register = () => import('./components/Register.vue').then(m => m.default)
const Article = () => import('./components/blog/Article.vue').then(m => m.default)
const ArticleEdit = () => import('./components/blog/ArticleEdit.vue').then(m => m.default)
const ArticleCategory = () => import('./components/blog/Category.vue').then(m => m.default)
const ArticleTag = () => import('./components/blog/Tag.vue').then(m => m.default)
const AccessUser = () => import('./components/access/User.vue').then(m => m.default)
const AccessRole = () => import('./components/access/Role.vue').then(m => m.default)
const AccessMenu = () => import('./components/access/Menu.vue').then(m => m.default)
const AccessPermissions = () => import('./components/access/Permission.vue').then(m => m.default)
const Afu = () => import('./components/afu/Afu.vue').then(m => m.default)
const AfuType = () => import('./components/afu/AfuType.vue').then(m => m.default)
const AfuEdit = () => import('./components/afu/AfuEdit.vue').then(m => m.default)
const AfuTypeEdit = () => import('./components/afu/AfuTypeEdit.vue').then(m => m.default)
const SearchArticle = () => import('./components/search/blog/SearchArticle.vue').then(m => m.default)
const Breadcrumb = () => import('./components/Breadcrumb.vue').then(m => m.default)
const Logging = () => import('./components/logging/Logging.vue').then(m => m.default)
const SearchLogging = () => import('./components/search/logging/SearchLogging.vue').then(m => m.default)


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Directives)

Vue.prototype.Constants = Global

const routes = [
    {
        name: 'home',
        path: '/',
        component: Index,
        children: [
            {
                path: '', component: Home
            }
        ]
    },
    {
        name: 'blog',
        path: '/blog',
        component: Index,
        children: [
            {
                name: Global.Blog.article.name,
                path: 'article', components: {
                    default: Article,
                    toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    footer: Pager
                }
            },
            {
                name: Global.Blog.category.name,
                path: 'category', components: {
                    default: ArticleCategory,
                    // toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    footer: Pager
                }
            },
            {
                name: Global.Blog.tag.name,
                path: 'tag', components: {
                    default: ArticleTag,
                    // toolbar: SearchArticle,
                    breadcrumb: Breadcrumb,
                    footer: Pager
                }
            }
        ]
    },
    {
        path: '/access',
        component: Index,
        children: [
            {
                name: Global.Access.user.list.name,
                path: 'user',
                components: {
                    default: AccessUser,
                    footer: Pager
                }
            },
            {
                name: Global.Access.role.list.name,
                path: 'role',
                components: {
                    default: AccessRole,
                    footer: Pager
                }
            },
            {
                name: Global.Access.menu.list.name,
                path: 'menu',
                components: {
                    default: AccessMenu,
                    footer: Pager
                }
            },
            {
                name: Global.Access.permission.list.name,
                path: 'permission',
                components: {
                    default: AccessPermissions,
                    footer: Pager
                }
            }
        ]
    },
    {
        path: '/afu',
        component: Index,
        children: [
            {
                name: 'afu',
                path: '/',
                components: {
                    default: Afu,
                    footer: Pager
                }
            },
            {
                name: Global.Afu.type.name,
                path: 'type',
                components: {
                    default: AfuType,
                    footer: Pager
                }
            },
            {
                name: Global.Afu.edit.name,
                path: '/afu/edit',
                components: {
                    default: AfuEdit
                }
            },
            {
                name: Global.Afu.type.edit.name,
                path: '/afu/type/edit',
                components: {
                    default: AfuTypeEdit
                }
            }
        ]
    },
    {
        path: '/logging',
        component: Index,
        children: [
            {
                name: Global.Logging.list.name,
                path: '/',
                components: {
                    default: Logging,
                    toolbar: SearchLogging,
                    footer: Pager
                }
            }
        ]
    },
    {
        name: Global.Login.login.name,
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    }]

const router = new VueRouter({
    routes
})


router.afterEach(() => {

})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')

let originRemoveItem = sessionStorage.removeItem
//监听sessionStorage
sessionStorage.removeItem = function (key, newValue) {
    originRemoveItem.apply(this, arguments)
    let removeItemEvent = new Event('noAuthEvent')
    removeItemEvent.key = key
    removeItemEvent.newValue = newValue
    window.dispatchEvent(removeItemEvent)
}
window.addEventListener('noAuthEvent', function (e) {
    if (e.key === 'token') {
        router.push({name: Global.Login.login.name})
    }
})


Vue.prototype.bus = new Vue()
