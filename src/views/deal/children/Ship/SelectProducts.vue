<template>
  <div id="SelectProducts">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>选择产品</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <el-card class="box-card item1">
      <van-field v-model="state" label="产品名称" @focus="focusClick" />
      <van-field v-model="Products" label="产品型号" />
      <van-field v-model="productPrice" type="number" label="产品价格" />
      <van-field v-model="productWeight" v-if="isWeightShow" type="number" label="产品重量" />
      <van-field
        v-model="FlowingProducts[index+1]"
        v-for="(item,index) in isFlowingShow"
        :key="index"
        :data-id="index+1"
        label="流水产品"
      />
      <van-field v-model="quantity" type="number" label="产品数量" />
      <van-field v-model="ProductSubtotal" type="number" label="产品小计" />
      <van-field v-model="ProductNotes" label="产品备注" />
      <div class="btns">
        <van-button @click="commite" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
      </div>
    </el-card>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      state: '',
      Products: '',
      productPrice: '',
      productWeight: '',
      FlowingProducts: ['0'],
      isWeightShow: false,
      isFlowingShow: 0,
      quantity: '',
      ProductSubtotal: '',
      ProductNotes: '',
      listItem: {},
      listItems: [],
      allData: {},
    }
  },
  methods: {
    commite() {
      let selectData = {
        productName: this.state,
        productModel: this.Products,
        productPrice: this.productPrice,
        productWeight: this.productWeight,
        FlowingProducts: this.FlowingProducts,
        quantity: this.quantity,
        ProductNotes: this.ProductNotes,
      }
      this.$bus.$emit('SelectProducts', {
        allData: this.allData,
        selectData,
      })
      this.state = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = ['0']
      this.isWeightShow = false
      this.isFlowingShow = 0
      this.quantity = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.listItem = {}
      this.listItems = []
      this.allData = {}
      this.$router.go(-1)
    },
    focusClick() {
      this.$router.push({
        path: '/productNameSearch',
        query: {
          data: { ...this.listItems },
        },
      })
      this.$bus.$on('productNameSearch', (item) => {
        console.log(item)
        this.allData = item
        this.state = item.name
        this.Products = item.specification
        this.productPrice = item.out_price
        // this.distributor_id = item.id
      })
    },
    blacknext() {
      this.$router.go(-1)
    },
  },
  activated() {
    this.listItem = { ...this.$route.query.data }
    for (const key in this.listItem) {
      this.listItems.push(this.listItem[key])
    }
    console.log(this.listItems)
  },
  deactivated() {
    this.listItem = {}
  },
}
</script>
    
<style scoped lang="scss">
#SelectProducts {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .item1 {
    margin-bottom: 0.714286rem;
    .btns {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      .van-button {
        margin-right: 0.714286rem;
      }
    }
    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f8f7f5;
      padding: 0.714286rem 1.142857rem;

      em {
        display: block;
        font-size: 1.142857rem;
        color: #585858;
        font-weight: 700;
        width: 6.357143rem;
        text-align: left;
      }
      div {
        display: block;
        font-size: 1.142857rem;
        font-weight: 700;
        text-align: left;
        flex: 1;
      }
    }
    .AddProduct {
      display: flex;
      justify-content: center;
      align-items: center;
      .coutent {
        display: flex;
        justify-content: center;
        align-items: center;
        em {
          text-align: center;
        }
      }
    }
  }
}
</style>
