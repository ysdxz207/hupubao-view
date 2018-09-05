<template>
    <div>

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
        </div>

    </div>
</template>

<script>
    import Blog from '~/api/blog'

    export default {
        components: {},
        data() {
            return {
                categoryList: []
            }
        },
        computed: {},
        mounted() {
            let _this = this

            Blog.getArticleCategories()
                .then(response => {
                    _this.categoryList = response.list
                })
        },
        methods: {
            showCategoryArticles(category) {
                this.$router.push({name: 'home', query: {category: category.name}})
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>


    .widget {
        border: 1px solid #ebeef5;
        background-color: #FFFFFF;
        border-radius: 6px;
        text-align: left;
    }

    .widget .header {
        padding: 10px;
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
