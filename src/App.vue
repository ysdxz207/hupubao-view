<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'fade'
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>

<style lang="less">
    @import './styles/transition.less';
    @import './styles/theme.less';

    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    html, body {
        margin: 0;
        padding: 0;
        background-color: @bgColor;
        overflow: hidden;
    }

    /*滚动条整体样式*/
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: transparent;
    }

    /*滚动条里面小方块*/
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgb(92, 101, 110);
        /*background: rgb(255, 132, 115);*/
    }

    /*滚动条里面轨道*/
    ::-webkit-scrollbar-track {
        border-radius: 8px;
    }


    //loading
    .el-loading-spinner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .loading {
        margin-top: 10%;
        display: inline-block;
        height: 240px;
        width: 240px;
        background: url("./assets/loading_ali.jpg") no-repeat center;
        background-size: 120px 120px;
    }
</style>
