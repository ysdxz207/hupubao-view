<template>
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
                class="article-context">
            <vue-markdown :source="article.context"/>
        </el-card>

        <!-- 在需要展示评论框处插入 -->
        <div class="cm-article" :data-key="article.id"></div>

    </div>
</template>


<script>

    import VueMarkdown from 'vue-markdown'
    import 萌评 from '~/static/comment'
    import Blog from '~/api/blog'

    export default {
        components: {
            VueMarkdown
        },
        data() {
            return {
                article: {
                    id: this.$route.query.id
                }
            }
        },
        mounted() {
            this.loadArticle()
            萌评.运转()
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
                        }
                        console.log(_this.article)
                    })
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "//comment.moe/dest/static/css/plus.css";

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
