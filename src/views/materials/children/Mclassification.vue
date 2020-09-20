<template>
  <div id="Mclassification">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{ name }}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <el-row class="row">
        <span>{{ name }}</span>
        <el-select v-model="value" @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      options: [],
      value: '1',
      state: false,
    }
  },
  created() {
    this.data = this.$route.query.data.data
    this.name = this.$route.query.data.name
    this.route = this.$route.query.data.route
    this.options = [...this.$route.query.optionss]

    this.options.forEach((item, index) => {
      if (item.label == this.data) {
        this.value = item.value
      }
    })
  },
  destroyed() {
    let data = {
      data: this.data,
      name: this.name,
      route: this.route,
      value: this.value,
      state: this.state,
    }
    this.$bus.$emit('listbusData', data)

    this.data = null
    this.name = null
    this.route = null
    this.options = []
    this.value = '1'
    this.state = false
  },
  methods: {
    handleChange(value) {
      this.options.forEach((item, index) => {
        if (item.value == value) {
          this.data = item.label
        }
        if (value == this.value) {
          this.state = true
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
#Mclassification {
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
    }
  }
}
</style>
