<template>


    <el-container style="height: 100vh;position: relative;z-index: 0">
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
        <canvas id="canvas_background" style="display:block"></canvas>
    </el-container>

</template>

<script>
    import MenuTop from './menus/MenuTop'

    export default {
        components: {
            MenuTop
        },
        data() {
            return {
            }
        },
        mounted() {
            this.setBackgroundCanvas()
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            setBackgroundCanvas() {
                let canvas = document.querySelector("#canvas_background")
                let ctx = canvas.getContext("2d")

                canvas.width = document.documentElement.clientWidth
                canvas.height = document.documentElement.clientHeight

                ctx.moveTo(80, 80)
                ctx.lineTo(240, 80)
                ctx.stroke()


                function random(min, max) {
                    if (arguments.length < 2) {
                        max = min
                        min = 0
                    }

                    if (min > max) {
                        let hold = max
                        max = min
                        min = hold
                    }

                    return Math.floor(Math.random() * (max - min + 1)) + min
                }
            }
        },
        created() {
            let _this = this
        },
        watch: {}
    }
</script>

<style lang="less" scoped>


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
        min-height: 100vh;
    }

    .el-footer {
        width: 100%;
        color: #545c64;
        font-size: 14px;
        margin-top: 80px;
    }

    #canvas_background {
        position: absolute;
        z-index: 0;
    }

</style>
