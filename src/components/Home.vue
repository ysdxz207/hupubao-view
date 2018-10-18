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
        <canvas id="canvas_background"></canvas>
    </div>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                page: {},
                searchInfo: {},
                container: undefined
            }
        },
        created() {
            let _this = this
        },
        mounted() {
            let _this = this
            _this.setBackgroundCanvas()
            _this.searchInfo.category = _this.$route.query.category
            _this.searchInfo.tagId = _this.$route.query.tagId
            _this.searchInfo.title = _this.$route.query.keywords
            _this.loadArticleList()
            _this.$nextTick(function () {
                window.addEventListener('scroll', (e) => {
                    if (!_this.container) {
                        _this.container = e.target
                    }
                }, true)
            })
        },
        watch: {
            '$route'(to, from) {
                this.searchInfo.pageNum = 1
                this.searchInfo.category = this.$route.query.category
                this.searchInfo.tagId = this.$route.query.tagId
                this.searchInfo.title = this.$route.query.keywords
                this.loadArticleList()
            }

        },
        methods: {
            loadArticleList() {
                let _this = this
                Blog.getArticles(_this.searchInfo)
                    .then(function (response) {
                        _this.page = response
                        Blog.toTop(_this.container)
                    }).catch(e => {
                })
            },
            pageNumChangeHandler(pageNum) {
                this.searchInfo.pageNum = pageNum
                this.loadArticleList()
            },
            pageSizeChangeHandler(pageSize) {
                this.searchInfo.pageSize = pageSize
                this.loadArticleList()
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

        }
    }
</script>

<style lang="less" scoped>

    .el-pagination {
        margin-top: 20px;
    }

    .home-main {
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
