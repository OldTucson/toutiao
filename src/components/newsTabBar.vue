<template>
    <cube-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler">

    </cube-scroll-nav-bar>
</template>

<script>
import navs from '../config/navs'
export default {
    data () {
        return {
            current:'推荐',
            labels: [
                '推荐',
                '视频',
                '热点',
                '社会',
                '娱乐',
                '军事',
                '科技',
                
                '体育',
                '财经',
                '国际',
                '时尚'
            ]
        }
    },
    methods: {
        changeHandler(cur) {
            this.current = cur
            let channel = navs[cur]
            this.$router.push({path:'/',query:{channel}})
        }
    }
}
</script>

<style>

</style>
