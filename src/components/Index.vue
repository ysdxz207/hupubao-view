<template>


    <el-container style="height: 100vh;">
        <el-header>
            <menu-top></menu-top>
        </el-header>
        <el-main class="main-container">
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-aside width="300px">
                    <h1>右侧</h1>
                </el-aside>
            </el-container>
            <el-footer>
                I am footer.
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
        padding: 0 10%;
        height: 100%;
    }

    .el-footer {
        width: 100%;
        background-color: #f7f7f7;
    }

</style>
