<template>
    <div class="wrap">
        <cube-scroll
        ref="scroll"
        @pulling-up="pullupHandler"
        :options="options">
        <div class="news" @touchstart="refresh">
        <template v-for="(n, index) in news">
          <router-link v-if="n.image_list.length" :key="index" to="/" class="new new1">
            <h4 class="new-title">{{n.title}}</h4>
            <ul class="imgs">
              <li class="img-item" v-for="img in n.image_list" :key="img.url">
                <img :src="img.url" alt="">
              </li>
            </ul>
            <div class="new-info">
              <span>{{n.media_name}}</span>
              <span>评论 {{n.repin_count}}</span>
              <span>15分钟前</span>
            </div>
          </router-link>
          <router-link v-else-if="n.large_image_url" :key="index" to="/" class="new new2">
            <div class="new-body">
              <h4 class="new-title">{{n.title}}</h4>
              <div class="new-info">
                <span>{{n.media_name}}</span>
                <span>评论 {{n.repin_count}}</span>
                <span>15分钟前</span>
              </div>
            </div>
            <img width="113" :src="n.large_image_url" alt="">
          </router-link>
          <router-link v-else :key="index" to="/" class="new new3">
            <h4 class="new-title">{{n.title}}</h4>
            <div class="new-info">
              <span>{{n.media_name}}</span>
              <span>评论 {{n.repin_count}}</span>
              <span>15分钟前</span>
            </div>
          </router-link>
        </template>
      </div>
    </cube-scroll>
    </div>
</template>

<script>
import bus from '../bus'
export default {
    props: {
        news:Array
    },
    data () {
        return {
        page: 1,
        options: {
            observeDOM: true,
            click: true,
            probeType: 1,
            scrollbar: false,
            pullDownRefresh: {
            
            },
            pullUpLoad: {
            threshold: 50,
            txt: { more: '正在加载', noMore: '' }
            }
        }
        }
    },
    methods: {
        refresh () {
            this.$resf.scroll.refresh()
        },
        pullupHandler () {
            this.page = this.page + 1
            this.$emit('update:news',this.page)
        }
    },
    created () {
        bus.$on('loadEnd', () => {
            this.$refs.scroll.forceUpdate()
        })
    }
}
</script>

<style>
   .wrap {
    position: absolute;
    top: 98px;
    bottom: 0;
    width: 100%;
  }

  .news {
    padding: 0 15px;
  }
  .new {
    margin-bottom: 10px;
    display: block;
  }
  .new .new-title {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .new .new-info {
    font-size: 12px;
    transform: scale(0.85);
    transform-origin: left center;
    margin-top: 5px;
  }
  .new1 .imgs {
    display: flex;
  }
  .new1 .imgs img {
    width: 100%;
  }
  .new1 .imgs .img-item {
    margin-right: 2px;
  }
  .new1 .imgs .img-item:last-child {
    margin-right: 0;
  }

  .new2 {
    display: flex;
    align-items: flex-start;
  }
  .new2 .new-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
