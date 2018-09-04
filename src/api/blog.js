import request from '~/utils/request'
import Global from '~/global/Global'

const blog = {}

blog.getArticleTags = function(params) {
    return request({
        data: {
            service: Global.Blog.tag.service,
            bizContent: params
        }
    })
}

blog.getArticleCategories = function() {
    return request({
        data: {
            service: Global.Blog.category.service,
            bizContent: {}
        }
    })
}

blog.getArticles = function(params) {
    return request({
        data: {
            service: Global.Blog.article.service,
            bizContent: params
        }
    })
}

blog.getArticleDetail = function (id) {

    return request({
        data: {
            service: Global.Blog.articleDetail.service,
            bizContent: {id}
        }
    })
}

blog.toTop = function (container){
    if (!container) {
        return
    }
    let back = setInterval(() => {
        if(container.scrollTop || 0){
            container.scrollTop-=20;
        }else {
            clearInterval(back)
        }
    })
}

export default blog;
