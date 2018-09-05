<template>
    <div>

        <div class="search">
            <el-input placeholder="搜索文章"
                      clearable
                      v-model="keywords"
                      @keyup.enter.native="search">
                <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="search"></el-button>
            </el-input>
        </div>
        <div class="widget">
            <div class="header">
                分类
            </div>
            <transition-group name="slide-fade">
                <div class="item"
                     v-for="(category, index) in categoryList"
                     :key="index"
                     @click="showCategoryArticles(category)">
                    {{category.name}}
                </div>
            </transition-group>
            <div class="item"
                 v-if="categoryList.length !== total"
                 @click="loadCategory(true)">
                加载更多...
            </div>
        </div>
        <div class="widget">
            <div class="header">
                热门标签
            </div>
            <div class="tags">
                <transition-group name="slide-fade">
                    <el-tag v-for="(tag, index) in tagList"
                            size="small"
                            :key="index"
                            @click.native="showTagArticles(tag)">
                        {{tag.name}}
                    </el-tag>
                </transition-group>
            </div>
        </div>

    </div>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                pageNum: 1,
                total: 0,
                tagList: [],
                categoryList: [],
                keywords: ''
            }
        },
        computed: {},
        mounted() {
            let _this = this

            _this.loadCategory()
            _this.loadTag()
        },
        methods: {
            showCategoryArticles(category) {
                this.$router.push({name: 'home', query: {category: category.name}})
            },
            showTagArticles(tag) {
                this.$router.push({name: 'home', query: {tagId: tag.id}})
            },
            search() {
                this.bus.$emit('search', this.keywords)
            },
            loadCategory(loadMore) {
                let _this = this
                if (loadMore) {
                    _this.pageNum = _this.pageNum + 1
                }
                Blog.getArticleCategories(_this.pageNum)
                    .then(response => {
                        _this.total = response.total
                        _this.categoryList = _this.categoryList.concat(response.list)
                    })
            },
            loadTag() {
                let _this = this
                Blog.getArticleTags()
                    .then(response => {
                        _this.tagList = _this.tagList.concat(response.list)
                    })
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>


    .search {
        margin-bottom: 10px;
    }

    .widget {
        border: 1px solid #ebeef5;
        background-color: #FFFFFF;
        border-radius: 6px;
        text-align: left;
        margin-bottom: 20px;
    }

    .widget .header {
        padding: 10px;
    }

    .widget .tags {
        text-align: center;
    }

    .widget .tags .el-tag {
        margin: 4px;
        cursor: pointer;
    }

    .item {
        cursor: pointer;
        border-top: 1px solid #ebeef5;
        padding: 8px 0px 8px 12px;
    }

    .item:hover {
        background-color: #f5f7fa;
    }
</style>
