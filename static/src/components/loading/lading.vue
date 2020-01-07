<template>
  <div class="loading">
    <img width="20px" height="20px" src="../../common/image/cat.jpg"/>
    <p class="desc">{{title}}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '载入中'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .loading {
    width:100%;
    text-align: center;
  }
  .loading desc {
    line-height: 20px;
    color $color-text-l;
    font-size $font-size-small
  }
</style>
