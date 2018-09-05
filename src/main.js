import App from './App.vue'
import './assets/icon/iconfont.css'
import Global from '~/global/Global'


const Index = () => import('./components/Index.vue').then(m => m.default)
const Home = () => import('./components/Home.vue').then(m => m.default)
const Right = () => import('./components/widgets/Right.vue').then(m => m.default)
const Article = () => import('./components/Article.vue').then(m => m.default)


Vue.use(VueRouter)

Vue.prototype.Constants = Global
Vue.prototype.bus = new Vue()


const routes = [
    {
        name: 'index',
        path: '/',
        component: Index,
        children: [
            {
                name: 'home',
                path: '', components: {
                    default: Home,
                    right: Right
                }
            },
            {
                name: 'article',
                path: '/article', components: {
                    default: Article,
                    right: Right
                }
            }
        ]
    }]

const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    // my code
    next()
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


