<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
      <div class="slider-wrapper" v-if="recommend.length">
        <slider>
          <!--填写 slot 卡槽-->
          <div v-for="(item,index) in recommend" :key="index" class="lunbo">
            <a :href="item.linkUrl" class="lunbo_a">
              <img @load="loadImg" :src="item.picUrl" class="needsclick lunbo_img"/>
            </a>
          </div>
        </slider>
      </div>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" @click="selectItem(item)" v-for="item of discList" :key="item.dissid">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>
<script>
import Slider from '../../components/slider/slider'
import Scroll from '../../components/scroll/scroll'
import Loading from '../../components/loading/lading'
import {getRecommend, getDiscList} from '../../api/recommend'
import {ERR_OK} from '../../api/config'
export default {
  data() {
    return {
      recommend: [],
      discList: []
    }
  },
  created () {
    setTimeout(() => {
      this._getRecommend()
    }, 1000)
    this._getDiscList()
  },
  methods: {
    // 异步
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.slider)
          this.recommend = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
          this.discList = res.data.list
        }
      })
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkloaded = true
      }
    },
    selectItem(item) {
      alert(item.creator.name)
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.lunbo{
  float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
}
.lunbo_a{
  display: block
  width: 100%
  overflow: hidden
  text-decoration: none
}
.lunbo_img {
 display: block
  width: 100%
}
  .list-title {
    text-align :center
    color: orange
  }
.item{
  display:flex
  box-sizing:border-box
  align-items: center
  padding:0 20px 20px 20px
}
.item .icon{
  flex:0 0 60px
  width:60px
  padding-right:20px
}
.item .text{
  display:flex
  flex-direction:column
  justify-content:center
  flex:1
  line-height:30px
  overflow:hidden
  font-size:$font-size-medium
}
.item .text .name{
  margin-bottom:10px
  color:$color-text
}
.item .text .desc{
  color:$color-text-d
}
</style>
