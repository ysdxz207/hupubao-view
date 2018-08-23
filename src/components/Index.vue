<template>


    <el-container style="height: 100vh;">
        <el-header>
            <menu-top></menu-top>
        </el-header>
        <el-main class="main-container">
            <el-container>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
                <el-aside width="20%">
                    <router-view name="right"></router-view>
                </el-aside>
            </el-container>
            <el-footer>
                &copy;&nbsp;ysdxz207&nbsp;2018&nbsp;
                <a href="https://github.com/ysdxz207/hupubao-view" target="_blank">Version&nbsp;2.0</a>
            </el-footer>
        </el-main>
    </el-container>

</template>

<script>
    import MenuTop from './menus/MenuTop'

    export default {
        components: {
            MenuTop
        },
        data() {
            return {}
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>

    @import '../styles/transition.less';

    .menu-left:not(.el-menu--collapse) {
        width: 220px;
    }

    .el-header {
        padding: 0;
    }

    .main-container {
        margin-top: 4px;
        padding: 40px 8% 0 8%;
        height: 100%;
    }

    .main {
        padding-top: 0;
    }

    .el-footer {
        width: 100%;
        color: #545c64;
        font-size: 14px;
        margin-top: 80px;
    }

</style>
