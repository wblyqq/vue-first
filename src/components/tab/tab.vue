<template>
  <div class="tab">
    <router-link tag="div" class="tab-item div-line" to="./recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item div-line" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item div-line" to="/rank">
      <span class="tab-lin">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item div-line" to="./search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<style>
  .div-line{
    float:left;
    text-align:center;
    width:25%;
  }
  .tab {
    height: 25px;
  }
</style>
