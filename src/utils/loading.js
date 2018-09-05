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
        background: '#fbfbfb'
    });
}

Obj.hide = function () {
    if (loading) {
        loading.close()
        loading = undefined
    }
}

export default Obj