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
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">工具</template>
                <el-menu-item index="2-1">桌面快速启动程序</el-menu-item>
                <el-menu-item index="2-2">redis管理工具</el-menu-item>
            </el-submenu>
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
