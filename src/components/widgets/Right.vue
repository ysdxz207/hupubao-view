<template>
    <div>
        <el-table
                class="category"
                :data="categoryList"
                border
                style="width: 100%"
                @row-click="showCategoryArticles">
            <el-table-column
                    align="left"
                    prop="name"
                    label="分类">
            </el-table-column>
        </el-table>
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
        computed: {
        },
        mounted() {
            let _this = this

            Blog.getArticleCategories()
                .then(response => {
                    _this.categoryList = response.list
                })
        },
        methods: {
            showCategoryArticles(row, event, column) {
                console.log(row)
            }
        },
        created() {
        },
        watch: {}
    }
</script>

<style lang="less" scoped>

    .category /deep/ .cell{
        cursor: pointer;
    }
</style>
