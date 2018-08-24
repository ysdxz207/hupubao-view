<template>
    <div class="home-main">
        <el-card class="box-card"
                 v-for="article in page.list"
                 :key="article.id">
            <div slot="header">
                <el-button type="text" size="small" @click="showArticle(article.id)">{{article.title}}</el-button>
                <div class="article-create-time">{{article.createTime}}</div>
            </div>
            <div>
                {{article.context.substring(0, 200)}}
            </div>
        </el-card>
        <el-pagination
                background
                @size-change="pageSizeChangeHandler"
                @current-change="pageNumChangeHandler"
                :current-page="page.pageNum"
                :page-sizes="[10, 20, 40, 100]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                page: {
                }
            }
        },
        created() {
            let _this = this
        },
        mounted() {
            this.loadArticleList()
        },
        watch: {
            '$route' () {
                this.page.pageNum = 1
                this.page.category = this.$route.query.category
                this.loadArticleList()
            }

        },
        methods: {
            loadArticleList() {
                let _this = this
                const loading = this.$loading({
                    lock: true,
                    text: '加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.2)'
                });
                Blog.getArticles(_this.page)
                    .then(function (response) {
                        _this.page = response
                        loading.close()
                    }).catch(e => {
                        loading.close()
                })
            },
            pageNumChangeHandler(pageNum) {
                this.page.pageNum = pageNum
                this.loadArticleList()
            },
            pageSizeChangeHandler(pageSize) {
                this.page.pageSize = pageSize
                this.loadArticleList()
            },
            showArticle(id) {
                this.$router.push({name: 'article', query: {id: id}})
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

    .article-create-time {
        font-size: 12px;
        color: #545c64;
    }

</style>
