<template>

    <el-container>
        <el-container>
            <el-header><menu-top></menu-top></el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer style="height: 40px;">

            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import MenuTop from './menus/MenuTop'

    export default {
        components: {
            MenuTop
        },
        data () {
            return {
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created () {
        },
        watch: {
        }
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
    .el-main {
        padding: 0;
        height: 100%;
    }
    .el-footer {
        width: 100%;
        z-index: 1;
        background-color: #f7f7f7;
    }

</style>
