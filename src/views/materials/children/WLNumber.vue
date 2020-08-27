<template>
  <div id="WLNumber">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{name}}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <el-row class="row">
        <span>{{name}}</span>
        <el-input v-model="input" clearable @change="handleChange"></el-input>
      </el-row>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      data: null,
      name: null,
      route: null,
      state: false,
      input: '',
    }
  },
  created() {
    this.data = this.$route.query.data.data
    this.name = this.$route.query.data.name
    this.route = this.$route.query.data.route
    this.input = this.data
    console.log(this.data, this.name, this.route)
  },
  destroyed() {
    let data = {
      data: this.data,
      name: this.name,
      route: this.route,
      state: this.state,
    }
    this.$bus.$emit('listbusData', data)
    console.log(this.data, this.name, this.route)
    this.data = null
    this.name = null
    this.route = null
    this.state = false
    this.input = ''
  },
  methods: {
    handleChange(value) {
      console.log(value)
      if (value != this.data) {
        this.state = true
        this.data = value
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>
    
<style scoped lang="scss">
#WLNumber {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -1.071429rem;
      span {
        font-size: 1.428571rem;
      }
    }
  }
  .content {
    margin-top: 0.714286rem;
    padding: 0.357143rem;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        width: 4.928571rem;
      }
    }
  }
}
</style>
