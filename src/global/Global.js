
const PageInfo = {
    pageNum: 1,
    pageSize: 10
}


const Blog = {
    article: {
        service: 'front.articles'
    },
    articleDetail: {
        service: 'front.article'
    },
    category: {
        service: 'front.category'
    },
    tag: {
        service: 'front.tag'
    }
}

const Utils = function () {
    Array.prototype.remove = function (item) {
        let index = this.indexOf(item)
        if (index > -1) {
            this.slice(index, 1)
        }
    }
}
export default {
    Utils,
    PageInfo,
    Blog
}
