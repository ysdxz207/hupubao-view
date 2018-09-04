<template>
    <div class="home-main">
        <transition-group name="list"
                          enter-active-class="animated bounceInDown"
                          leave-active-class="animated bounceOut">
        <el-card class="box-card"
                 v-for="article in page.list"
                 :key="article.id">
            <div slot="header">
                <router-link :to="{path: 'article',query:{id:article.id}}">
                    {{article.title}}
                </router-link>
                <div class="article-">
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
        },
        mounted() {
            let _this = this
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
            '$route' () {
                this.page.pageNum = 1
                this.page.category = this.$route.query.category
                this.loadArticleList()
            }

        },
        methods: {
            loadArticleList() {
                let _this = this
                // const loading = this.$loading({
                //     lock: true,
                //     text: '加载中...',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(255, 255, 255, 0.2)'
                // });
                Blog.getArticles(_this.page)
                    .then(function (response) {
                        _this.page = response
                        // Blog.toTop(_this.container)
                        // loading.close()
                    }).catch(e => {
                        // loading.close()
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

    @interval:300;
    @n:0;

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

    .home-main a {
        color: #909399;
        text-decoration: none;
        line-height: 30px;
    }

    .box-card /deep/ .el-card__header {
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

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to
        /* .list-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transition: opacity ((@n + 1) * @interval)ms ease;
    }

</style>
