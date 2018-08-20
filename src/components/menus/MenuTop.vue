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
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import request from '~/utils/request'

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
                if (key === "btn-toggle") {
                    return
                }
                this.bus.$emit('selectMenuType', key)
            },
            logout() {
                let _this = this;
                request('/logout', {
                    method: 'get'
                }).then(response => {
                    if (response.statusCode !== 200) {
                        _this.$message.error({
                            showClose: true,
                            message: response.message,
                            duration: 5 * 1000
                        })
                    } else {
                        sessionStorage.removeItem("userInfo")
                        sessionStorage.removeItem("token")
                        _this.$router.push({path: '/'})
                    }
                }).catch(error => {
                    _this.$message.error({
                        showClose: true,
                        message: error,
                        duration: 5 * 1000
                    })
                })
            },
            handleCommand(command) {
                let _this = this
                switch (command) {
                    case 'logout':
                        _this.logout()
                        break
                }
            },
            searchHander() {
                this.bus.$emit('searchDialog')
            },
            toggleLeftMenuCollapse() {
                let isCollapse = !!this.menuLeftCollapseClass
                this.menuLeftCollapseClass = isCollapse ? '' : 'menu-left-collapse'
                this.bus.$emit('toggleLeftMenuCollapse', isCollapse)
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
