<template>
  <div class="singer">
    <div>A:数据--{{dataA}}</div>
    <div>B:数据--{{dataB}}</div>
    <com-a :datalistA="dataA" @updataa="dabaA_update"></com-a>
    <com-b :datalistB="dataB" @updatab="dabaB_update"></com-b>
    <com-c :datalistC="dataC"></com-c>
  </div>
</template>
<script>
const A = {
  template: `<div style="border: 1px solid red; margin-bottom: 10px; width: 300px;">
                 <h4>A组件</h4><p>{{a}}</p>
                 {{Adata}}
                 <sonA :sonAdata="Adata" @updatasonA="sonupdatetoA"></sonA>
             </div>`,
  props: ['datalistA'],
  data() {
    return {
      a: '我是A里面的数据',
      Adata: this.datalistA
    }
  },
  methods: {
    send() {
      this.$root.$emit('a-msg', this.a)
      console.log(this.Adata)
    },
    move() {
      alert(1111112321321)
    },
    sonupdatetoA(data) {
      this.Adata = data
      this.$emit('updataa', this.Adata)
    }
  },
  components: {
    'sonA': {
      props: ['sonAdata'],
      template: `<transition-group id='sonA' name="drog" tag="ul">
                 <li draggable="true" v-for="(item,index) in sonASelfData"  @dragstart="dragStart($event, index, item)" @dragover="allowDrop" @drop="drop($event, index)" v-bind:key="item">{{item}}</li>
                 </transition-group>`,
      data() {
        return {
          sonASelfData: this.sonAdata
        }
      },
      methods: {
        allowDrop(e) {
          e.preventDefault()
        },
        mydata(item) {
          alert(item)
        },
        dragStart(e, index, item) {
          let tar = e.target
          console.log(tar)
          e.dataTransfer.setData('Text', index)
          e.dataTransfer.setData('Item', item)
          if (tar.tagName.toLocaleLowerCase() === 'li') {
          }
        },
        move(e) {
          console.log(444444)
        },
        drop(e, index) {
          this.allowDrop(e)
          let arr = this.sonASelfData.concat([])
          let dragIndex = e.dataTransfer.getData('Text')
          let temp = arr.splice(dragIndex, 1)
          arr.splice(index, 0, temp[0])
          this.sonASelfData = arr
          this.$emit('updatasonA', this.sonASelfData)
        }
      }
    }
  }
}
var B = {
  template: `<div style="border: 1px solid green; margin-bottom: 10px; width: 300px;">
                    <h4>B组件</h4>
                    <p>{{b}}</p>
                    {{Bdata}}
                    <input type="button" value="把B数据给C" @click="send" />
                    <sonB :sonBdata="Bdata" @update="trangedata"></sonB>
             </div>`,
  props: ['datalistB'],
  data() {
    return {
      b: '我是B里面的数据',
      Bdata: this.datalistB
    }
  },
  mounted: function() {
    // eslint-disable-next-line no-undef
  },
  methods: {
    send() {
      this.$root.$emit('b-msg', this.b)
    },
    BsetAdata(bdata) {
      alert('dao-B-li')
      this.Bdata = bdata
    },
    trangedata(data) {
      alert('到B中了')
      this.Bdata = data
      this.$emit('updatab', this.Bdata)
    }
  },
  components: {
    'sonB': {
      props: ['sonBdata'],
      template: `<transition-group id='sonB' name="drog" tag="ul">
                 <li draggable="true" v-for="(item,index) in sonBSelfData"  @dragstart="dragStart($event, index)" @dragover="allowDrop" @drop="drop($event, index)" v-bind:key="item">{{item}}</li>
                 </transition-group>
                 `,
      data() {
        return {
          sonBSelfData: this.sonBdata
        }
      },
      mounted: function() {
        console.log(this.sonBSelfData)
      },
      methods: {
        allowDrop(e) {
          e.preventDefault()
        },
        mydata(item) {
          alert(item)
        },
        dragStart(e, index) {
          let tar = e.target
          console.log(tar)
          e.dataTransfer.setData('Text', index)
          if (tar.tagName.toLocaleLowerCase() === 'li') {
          }
        },
        move(e) {
          console.log(444444)
        },
        drop(e, index) {
          alert('dgdsdsgd')
          this.allowDrop(e)
          let arr = this.sonBSelfData.concat([])
          let dragIndex = e.dataTransfer.getData('Text') // 拖拽的index
          let temp = arr.splice(dragIndex, 1)
          arr.splice(index, 0, temp[0]) // 插入的index
          this.sonBSelfData = arr
          alert(this.sonBSelfData)
          this.$emit('update', this.sonBSelfData)
          // 触发某个事件进行和父组件交互
        }
      }
    }
  }
}
var C = {
  template: `<div style="border: 1px dotted green; margin-bottom: 10px; width: 300px;">
                <h4>我是C组件,我在坐等接收数据</h4>
                <p>{{a}}</p><p>{{b}}</p>
             </div>`,
  props: ['datalistC'],
  data() {
    return {
      a: '',
      b: '',
      Cdata: this.datalistC
    }
  },
  mounted() {
    let _this = this
    this.$root.$on('a-msg', function (a) {
      _this.a = a
      console.log(a)
    })
    this.$root.$on('b-msg', function (b) {
      this.b = b
      console.log(b)
    }.bind(this))
  },
  methods: {

  }
}
export default {
  name: 'search',
  data() {
    return {
      dataA: ['1: apple', '2: banana', '3: orange', '4: melon'],
      dataB: ['5: 55555', '6: 66666', '7: 77777', '8: 88888'],
      dataC: []
    }
  },
  methods: {
    dabaB_update: function(data) {
      this.dataB = data
    },
    dabaA_update: function (data) {
      this.dataA = data
    }
  },
  components: {
    'com-a': A,
    'com-b': B,
    'com-c': C
  }
}
</script>
<style>
  ul {
  min-height: 100px;
  width: 200px;
  margin: 20px auto;
  background: #eee;
}

li {
  min-height: 2em;
  margin-top: 10px;
  background: #abcded;
}

/*组件过渡类*/

.drog-move {
  transition: transform 1s;
}
</style>
