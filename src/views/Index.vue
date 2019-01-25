<template>
    <div>
        <news-nav></news-nav>
        
        <newsTabBar></newsTabBar>
        <news-list :news="news" @update:news="updateNews"></news-list>
    </div>
</template>

<script>
import newsNav from '../components/newsNav'
import newsTabBar from '../components/newsTabBar'
import newsList from '../components/newsList'
import axios from '../axios'
import bus from '../bus'
export default {
    components:{
        newsNav,
        newsTabBar,
        newsList
    },
    data () {
        return {
            news:[],
            toast:this.$createToast({
                time:10000,
                txt:'加载中'
            })
        }
    },
    created () {

    },
    watch: {
        '$route': {
            handler (to) {
                this.toast.show()
                axios.get('/list.php',{
                    params: {
                        tag:to.query.channel
                    }
                }).then(res => {
                    this.toast.hide()
                    this.news = res.data.data
                })
            },
            immediate:true
        }
    },
    methods: {
        updateNews (page) {
            axios.get('/lsit.php',{
                params: {
                    tag:this.$route.query.channel,
                    page
                }
            }).then(res => {
                this.news = [...this.news,...res.data.data]
                bus.$emit('loadEnd')
            })
        }
    }
}
</script>

<style>

</style>
