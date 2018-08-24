<template>
    <div>
        <h3>{{article.title}}</h3>
        <h5></h5>
        <h6></h6>
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
        data () {
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
        created () {
        },
        watch: {

        },
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
    .article-context {
        text-align: left;
        padding: 10px;
    }
    .article-context /deep/ a{
        color: #F56C6C;
        text-decoration: none;
    }

</style>
