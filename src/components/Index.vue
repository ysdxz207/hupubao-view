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
        <canvas id="canvas_background"></canvas>
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

                let img = new Image()
                img.src = require('../assets/images/leaves/2.png')
                img.onload = function () {
                    ctx.rect(0, 0, canvas.width, canvas.height)

                    ctx.fillStyle = ctx.createPattern(img, "repeat")
                    ctx.fill()
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
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        pointer-events: none;
        opacity: 0.08;
    }
</style>
