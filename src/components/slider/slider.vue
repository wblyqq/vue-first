<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
          <span class="dot" :class="{active:currentPageIndex===index}" v-for="(item,index) in dots" :key="index"></span>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from '../../common/js/dom.js'
export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    // 是否循环播放
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 播放间隔
    interval: {
      type: Number,
      default: 3000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    }
  },
  // 借助vue的一个生命周期钩子mounted当页面渲染完毕后获取轮播图的宽度
  mounted () {
    setTimeout(() => {
      this._setSliderWidth(false) // 设置滚动，要先设置slider的宽度
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
    })
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    // 设置slider宽度
    _setSliderWidth (isResize) {
      // 获取slider里面的所有子元素
      this.children = this.$refs.sliderGroup.children
      // 计算宽度
      let sliderWidth = 0
      // 获取手机屏幕宽度
      let clientWidth = this.$refs.slider.clientWidth
      console.log('sliderwidth:', sliderWidth)
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slide-item')
        child.style.width = clientWidth + 'px'
        sliderWidth += clientWidth
      }
      if (this.loop && !isResize) {
        sliderWidth += 2 * clientWidth
      }
      this.$refs.sliderGroup.style.width = sliderWidth + 'px'
      console.log('sliderWidth...', sliderWidth)
      console.log('width...', clientWidth)
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        // bounce: false,
        // stopPropagation: true,
        click: this.click
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
      this.slider.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this.autoPlay()
        }
      })
    },
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      // this.currentPageIndex = pageIndex // 第一轮1（第一张图） 2 3 4 0（最后一张图索引为0 因为放在了最前面）  1 2 3 4 0
      if (this.loop) {
        pageIndex = pageIndex - 1
      }
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        clearTimeout(this.timer)
        this._play()
      }
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      clearTimeout(this.timer)
      // eslint-disable-next-line no-unused-vars
      let playPage = this.currentPageIndex + 1
      if (this.loop) {
        playPage += 1
      }
      if (playPage === this.children.length - 2) {
        playPage = 0
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(playPage, 0, 400)
      }, this.interval)
    },
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
    .dots
      position: relative
      right: 0
      left: 0
      bottom: 10px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
