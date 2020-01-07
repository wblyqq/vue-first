<template>
  <div class="search">
    <div>A:数据--{{dataA}}</div>
    <div>B:数据--{{dataB}}</div>
    <com-a :datalistA="dataA" @updataa="dabaA_update"></com-a>
    <com-b :datalistB="dataB" @updatab="dabaB_update"></com-b>
    <com-c :datalistC="dataC"></com-c>
    <div>
      <ul @drop="outdrop($event)">
        <li>11111</li>
      </ul>
    </div>
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
  mounted: function () {
    var _this = this
    this.$root.$on('deleA', function (index) {
      let data = _this.Adata
      data.splice(index, 1)
      this.Adata = data
      if (this.Adata.length === 0) {
        // this.Adata.push('9:999')
      }
    })
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
      template: `<ul id='sonA' name="drog">
                 <li draggable="true" v-for="(item,index) in sonASelfData"  @dragstart="dragStart($event, index, item)" @dragover="allowDrop" @drop="drop($event, index)" v-bind:key="item">{{item}}</li>
                 </ul>`,
      data() {
        return {
          sonASelfData: this.sonAdata
        }
      },
      watch: {
        'sonASelfData.length': {
          handler(newvalue, oldvalue) {
            let _this = this
            // eslint-disable-next-line no-undef
            document.getElementById('sonA').addEventListener('drop', function ($event) {
              $event.preventDefault()
              let data = $event.dataTransfer.getData('item')
              let index = $event.dataTransfer.getData('index')
              if (_this.sonASelfData.length === 0) {
                _this.sonASelfData.push(data)
                _this.$root.$emit('deleB', index)
              }
            })
            document.getElementById('sonA').addEventListener('dragover', function ($event) {
              $event.preventDefault()
            })
          }
        }
      },
      methods: {
        uldrop($event) {
          $event.preventDefault()
          alert(11)
        },
        allowDrop(e) {
          e.preventDefault()
        },
        mydata(item) {
          alert(item)
        },
        dragStart(e, index, item) {
          let tar = e.target
          console.log(tar)
          e.dataTransfer.setData('index', index)
          e.dataTransfer.setData('item', item)
          e.dataTransfer.setData('from', 'sonA')
          if (tar.tagName.toLocaleLowerCase() === 'li') {
          }
        },
        move(e) {
          console.log(444444)
        },
        drop(e, index) {
          this.allowDrop(e)
          let arr = this.sonASelfData.concat([])
          let dragIndex = e.dataTransfer.getData('index')
          let dragFrom = e.dataTransfer.getData('from')
          // eslint-disable-next-line no-unused-vars
          let dragItem = e.dataTransfer.getData('item')
          if (dragFrom === 'sonA') {
            let temp = arr.splice(dragIndex, 1)
            arr.splice(index, 0, temp[0])
            this.sonASelfData = arr
            this.$emit('updatasonA', this.sonASelfData)
          } else {
            arr.splice(index, 0, dragItem) // 增加节点
            // 通知来的节点删除
            this.sonASelfData = arr
            this.$emit('updatasonA', this.sonASelfData)
            this.$root.$emit('deleB', dragIndex)
          }
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
    var _this = this
    this.$root.$on('deleB', function (index) {
      let data = _this.Bdata
      data.splice(index, 1)
      this.Bdata = data
    })
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
      this.Bdata = data
      this.$emit('updatab', this.Bdata)
    }
  },
  components: {
    'sonB': {
      props: ['sonBdata'],
      template: `<transition-group id='sonB' name="drog" tag="ul" draggable="true" @dragover.prevent @drop="uldrop($event)">
                 <li draggable="true" v-for="(item,index) in sonBSelfData"  @dragstart="dragStart($event, index ,item)" @dragover="allowDrop" @drop="drop($event, index)" v-bind:key="item">{{item}}</li>
                 </transition-group>
                 `,
      data() {
        return {
          sonBSelfData: this.sonBdata
        }
      },
      watch: {
        'sonBSelfData.length': {
          handler(newvalue, oldvalue) {
            if (newvalue === 0) {
              // eslint-disable-next-line no-undef
              /*
              document.getElementById('sonB').addEventListener('mouseover', function (e) {
                alert('到mouseover')
                // 看是否有拖动数据
              })
              */
            }
          }
        }
      },
      mounted: function() { // 页面加载完显示数据
        console.log(this.sonBSelfData)
      },
      methods: {
        ulallowEnter(e) {
          e.preventDefault()
          alert(1111)
        },
        uldrop() {
          alert(12224234)
        },
        allowDrop(e) {
          e.preventDefault()
        },
        mydata(item) {
          alert(item)
        },
        dragStart(e, index, item) {
          let tar = e.target
          console.log(tar)
          e.dataTransfer.setData('index', index)
          e.dataTransfer.setData('item', item)
          e.dataTransfer.setData('from', 'sonB')
          if (tar.tagName.toLocaleLowerCase() === 'li') {
          }
        },
        move(e) {
          console.log(444444)
        },
        drop(e, index) {
          this.allowDrop(e)
          let arr = this.sonBSelfData.concat([])
          let dragIndex = e.dataTransfer.getData('index') // 拖拽的index
          let dragFrom = e.dataTransfer.getData('from')
          // eslint-disable-next-line no-unused-vars
          let dragItem = e.dataTransfer.getData('item')
          if (dragFrom === 'sonB') {
            let temp = arr.splice(dragIndex, 1)
            arr.splice(index, 0, temp[0]) // 插入的index
            this.sonBSelfData = arr
            this.$emit('update', this.sonBSelfData)
          } else {
            if (arr.length > 0) {
              arr.splice(index, 0, dragItem)
              this.sonBSelfData = arr
              this.$emit('update', this.sonBSelfData)
              this.$root.$emit('deleA', dragIndex)
            } else {
              arr.push(dragItem)
              this.sonBSelfData = arr
              this.$emit('update', this.sonBSelfData)
              this.$root.$emit('deleA', dragIndex)
            }
          }
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
    },
    outdrop: function (e) {
      alert(111)
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
