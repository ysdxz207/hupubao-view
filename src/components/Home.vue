<template>
    <div class="home-main">
        <el-card class="box-card"
                 v-for="article in page.list"
                 :key="article.id">
            <div slot="header">
                <el-button type="text" >{{article.title}}</el-button>
            </div>
            <div>
                {{article.context.substring(0, 200)}}
            </div>
        </el-card>
        <el-pagination
                background
                @size-change="pageSizeChangeHandler"
                @current-change="pageNumChangeHandler"
                :current-page="search.pageNum"
                :page-sizes="[10, 20, 40, 100]"
                :page-size="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="search.total">
        </el-pagination>
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
            },
            pageNumChangeHandler() {

            },
            pageSizeChangeHandler() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .el-pagination {
        margin-top: 20px;
    }

    .home-main{
        padding-bottom: 20px;
    }
    .box-card {
        margin-bottom: 10px;
        text-align: left;
    }


    .box-card /deep/ .el-card__header {
        padding: 0 10px;
    }

</style>
