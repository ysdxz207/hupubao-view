<template>
    <div>
        <el-card class="box-card">
            <div v-for="article in page.list"
                 :key="article.id"
                 class="text item">
                {{'列表内容 ' + article.title }}
            </div>
        </el-card>
    </div>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                page: {},
                search: {}
            }
        },
        created() {
            let _this = this
        },
        mounted() {
            this.loadArticleList()
        },
        watch: {},
        methods: {
            loadArticleList() {
                let _this = this
                Blog.getArticles(_this.search)
                    .then(function (response) {
                        _this.page = response
                        console.log(_this.page)
                        _this.bus.$emit('pager', _this.pageInfo)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 4px;
    }

    .box-card {
        width: 80%;
    }
</style>
