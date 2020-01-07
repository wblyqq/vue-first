<template>
  <div class="rank">
    <ul>
      <li draggable="true" @dragstart="dragStart($event)" @dragover="dragAllow($event)" @drop=drop($event)>111111</li>
    </ul>
    <ul class="ul2" @dragover="dragAllow($event)" @drop=dropul($event)>
      <li draggable="true" v-for="(item) in ul2list" v-bind:key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ul2list: []
    }
  },
  methods: {
    dragStart (e) {
      console.log('start')
    },
    dragAllow(e) {
      e.preventDefault()
      console.log('allow')
    },
    drop(e) {
      console.log('drop')
    },
    dropul(e) {
      alert(11111)
      this.ul2list.push('222222')
    }
  }
}
</script>
<style>
.rank {
  width: 100%;
  height: 500px;
  border: 1px red dotted ;
}
.ul2 {
  background-color: orange;
  border: 2px palegreen solid;
  height: 200px;
}
</style>
