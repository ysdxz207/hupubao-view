<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="home">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">工具</template>
                <el-menu-item index="https://github.com/ysdxz207/clipnote">笔记+粘贴板+快速启动</el-menu-item>
                <el-menu-item index="https://github.com/ysdxz207/quickrun">桌面快速启动程序</el-menu-item>
                <el-menu-item index="https://github.com/ysdxz207/medis">redis管理工具</el-menu-item>
                <el-menu-item index="https://github.com/ysdxz207/hupubao-common">简单封装java公共模块</el-menu-item>
            </el-submenu>
            <span><i class="el-icon-github"></i></span>
        </el-menu>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                user: {},
                menus: [],
                menuLeftCollapseClass: ''
            }
        },
        computed: {
            activeIndex: function () {
                return this.$route.name ? this.$route.name.split('.')[0] : this.Constants.Main.dashbord.name
            }
        },
        mounted() {
            let _this = this
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key === 'home') {
                    this.$router.push({name: key})
                } else {
                    window.open(key)
                }
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
    .menu-top {
    }

</style>
