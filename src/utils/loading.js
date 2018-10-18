import { Loading } from 'element-ui'

let loading = undefined

const Obj = {}

Obj.show = function () {
    if (loading) {
        return
    }
    loading = Loading.service({
        target: '.main',
        lock: true,
        text: '',
        spinner: 'loading',
        background: 'rgba(255,255,255,0)'
    });
}

Obj.hide = function () {
    if (loading) {
        setTimeout(function () {
            loading.close()
            loading = undefined
        }, 300)
    }
}

export default Obj