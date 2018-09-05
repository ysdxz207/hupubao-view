<template>
    <div class="home-main">
        <transition-group enter-active-class="animated bounceInLeft">
        <el-card class="box-card"
                 v-for="article in page.list"
                 :key="article.id">
            <div slot="header" class="article-title">
                <router-link :to="{path: 'article',query:{id:article.id}}">
                    {{article.title}}
                </router-link>
                <div class="article-create-time">
                    <span>时间：{{article.createTime}}</span>
                    <span v-if="article.category">
                        <span class="split">|</span>
                        分类：
                        <router-link :to="{ name: 'home', query: { category: article.category }}">
                        {{article.category}}
                        </router-link>
                    </span>
                </div>
            </div>
            <div>
                {{article.intro}}
            </div>
        </el-card>
        </transition-group>
        <el-pagination
                v-if="page.list"
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
                },
                container: undefined
            }
        },
        created() {
            let _this = this
            _this.bus.$on('search', function (keywords) {
                _this.page.title = keywords
                _this.loadArticleList()
            })
        },
        mounted() {
            let _this = this
            this.page.category = this.$route.query.category
            this.page.tagId = this.$route.query.tagId
            this.loadArticleList()
            this.$nextTick(function () {
                window.addEventListener('scroll', (e) => {
                    if (!_this.container) {
                        _this.container = e.target
                    }
                }, true)
            })
        },
        watch: {
            '$route' (to, from) {
                this.page.pageNum = 1
                this.page.category = this.$route.query.category
                this.page.tagId = this.$route.query.tagId
                this.loadArticleList()
            }

        },
        methods: {
            loadArticleList() {
                let _this = this
                Blog.getArticles(_this.page)
                    .then(function (response) {
                        _this.page = response
                        Blog.toTop(_this.container)
                    }).catch(e => {
                })
            },
            pageNumChangeHandler(pageNum) {
                this.page.pageNum = pageNum
                this.loadArticleList()
            },
            pageSizeChangeHandler(pageSize) {
                this.page.pageSize = pageSize
                this.loadArticleList()
            }

        }
    }
</script>

<style lang="less" scoped>

    .el-pagination {
        margin-top: 20px;
    }

    .home-main{
        height: 100%;
        padding-bottom: 20px;
    }
    .box-card {
        margin-bottom: 10px;
        text-align: left;
    }

    .home-main .article-title a {
        text-decoration: none;
        line-height: 30px;
    }

    /deep/ .box-card .el-card__header {
        padding: 0 10px;
    }

    .article-create-time {
        font-size: 12px;
        color: #545c64;
    }

    .split {
        color: #909090;
        margin-left: 4px;
        margin-right: 4px;
    }

</style>
