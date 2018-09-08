<template>
    <transition enter-active-class="animated zoomInUp">
        <div class="article-container">
            <h3>{{article.title}}</h3>
            <h5>分类：
                <router-link :to="{ name: 'home', query: { category: article.category }}">{{article.category}}</router-link>
            </h5>
            <h6>
                <el-tag v-for="(tag, index) in article.tagList"
                        :key="index"
                        size="small">
                    {{tag.name}}
                </el-tag>
            </h6>
            <el-card
                    shadow="never"
                    class="article-context" v-html="compiledContext">
            </el-card>

        </div>
    </transition>
</template>


<script>
    import marked from 'marked'
    import Blog from '~/api/blog'

    export default {
        components: {
        },
        data() {
            return {
                article: {
                    id: this.$route.query.id
                },
                container: undefined
            }
        },
        computed: {
            compiledContext () {
                if (this.article.context)
                return marked(this.article.context, { sanitize: false })
            }
        },
        mounted() {
            let _this = this
            this.loadArticle()
            this.$nextTick(function () {
                window.addEventListener('scroll', (e) => {
                    if (!_this.container) {
                        _this.container = e.target
                    }
                }, true)
            })
        },
        created() {
        },
        watch: {},
        methods: {
            loadArticle() {
                let _this = this
                Blog.getArticleDetail(_this.article.id)
                    .then(response => {
                        if (response.data) {
                            _this.article = response.data
                            Blog.toTop(_this.container)
                        }
                    })
            }
        },
    }
</script>

<style lang="less" scoped>
    .article-container {
        text-align: left;
    }

    .article-container a {
        color: #545454;
        text-decoration: none;
    }

    .article-container .el-tag {
        margin-right: 8px;
    }

    .article-context {
        text-align: left;
        padding: 10px;
    }

    .article-context /deep/ a {
        color: #F56C6C;
        text-decoration: none;
    }

</style>
