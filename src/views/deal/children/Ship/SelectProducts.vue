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
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3">
      <el-card class="box-card item1">
        <div class="swiper_img">
          <img v-if="img_URL && img_url != 0 " :src="img_URL | getUrl" alt="logo" />
          <img
            v-else-if="img_url_lin && img_url_lin != 0 "
            class="img"
            :src="img_url_lin  | getUrl"
          />
          <img src="@/assets/image/Default.png" v-else />
          <i class="iconfont icon-pic img_btn" @click="imgClick"></i>
        </div>

        <van-field v-model="state" label="产品名称" @focus="focusClick" />
        <van-field v-model="Products" label="产品型号" @focus="focusClick" />
        <van-field v-model="productPrice" type="number" label="产品价格" />
        <van-field v-model="productWeight" v-if="isWeightShow" type="number" label="产品重量" />
        <van-field
          v-for="(item,index) in isFlowingShow"
          v-model="FlowingProducts[index+1]"
          :key="item.id"
          :data-id="item.id"
          :label="item.field_name"
        />
        <van-field v-model="quantity" type="number" label="产品数量" />
        <van-field v-model="processCost" type="number" label="加工费" />
        <van-field v-model="ProductSubtotal" type="number" label="产品小计" />
        <van-field v-model="ProductNotes" label="产品备注" />
        <div class="btns">
          <van-button @click="commite" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
        </div>
      </el-card>
    </scroll>
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper" />
  </div>
</template>
    
<script>
import SimpleCropper from '@/components/common/SimpleCroppes/SimpleCroppes'
import { bestURL, crosURl } from '@/network/baseURL'
import { getMaterielList } from '@/network/deal'

export default {
  data() {
    return {
      state: '',
      Products: '',
      productPrice: '',
      productWeight: '',
      FlowingProducts: ['0'],
      isWeightShow: false,
      isFlowingShow: [],
      quantity: '',
      img_url_lin: '',
      uploadParam: 4,
      ProductSubtotal: '',
      processCost: '',
      ProductNotes: '',
      img_URL: '',
      PropsImg: '',
      listItem: {},
      listItems: [],
      allData: {},
    }
  },
  components: {
    SimpleCropper,
  },
  filters: {
    getUrl(value) {
      return bestURL + value
    },
  },
  computed: {
    getMaterielListData() {
      return {
        company_id: 1,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    async getMaterielLists() {
      const { data } = await getMaterielList(this.getMaterielListData)
      this.listItem = { ...data }
      this.isFlowingShow = [...this.$route.query.data.isFlowingShow]
      for (const key in this.listItem) {
        this.listItems.push(this.listItem[key])
      }
      console.log(this.listItems)
    },
    imgClick() {
      this.$refs['cropper'].upload()
    },
    uploadHandle(data) {
      this.img_URL = data
      this.PropsImg = this.img_URL.split(bestURL)[1]
      console.log(this.img_URL, this.PropsImg)
    },
    commite() {
      let selectData = {
        productName: this.state,
        productModel: this.Products,
        productPrice: this.productPrice,
        productWeight: this.productWeight,
        FlowingProducts: this.FlowingProducts,
        quantity: this.quantity,
        ProductNotes: this.ProductNotes,
        processCost: this.processCost,
        img_url: this.PropsImg,
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
      this.quantity = ''
      this.img_url_lin = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.listItem = {}
      this.listItems = []
      this.img_URL = ''
      this.isFlowingShow = []
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
      this.$bus.$off('productNameSearch')
      this.$bus.$on('productNameSearch', (item) => {
        this.$refs.scroll.finishPullUp()
        console.log(item)
        this.isWeightShow = item.weight ? true : false
        this.productWeight = item.weight
        this.allData = item
        this.state = item.name
        this.Products = item.specification
        this.productPrice = item.out_price
        this.img_URL = item.img_url
        this.PropsImg = item.img_url
        this.img_url_lin = item.img_url_lin
        this.listItem = { ...this.$route.query.data.materiel }
        this.isFlowingShow = [...this.$route.query.data.isFlowingShow]
        for (const key in this.listItem) {
          this.listItems.push(this.listItem[key])
        }
        console.log(this.listItems)
        // this.distributor_id = item.id
      })
    },
    blacknext() {
      this.listItems = []
      this.$router.go(-1)
    },
  },
  activated() {
    this.getMaterielLists()
  },
  deactivated() {
    this.state = ''
    this.Products = ''
    this.img_URL = ''
    this.PropsImg = ''
    this.productPrice = ''
    this.productWeight = ''
    this.FlowingProducts = ['0']
    this.isWeightShow = false
    this.quantity = ''
    this.ProductSubtotal = ''
    this.ProductNotes = ''
    this.allData = {}
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
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    // top: 0;
    top: 5.142857rem;
    bottom: 0;
    overflow: hidden;
  }
  .item1 {
    margin-bottom: 0.714286rem;
    .swiper_img {
      width: 100%;
      height: 25.714286rem;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .img_btn {
        position: absolute;
        bottom: 1.071429rem;
        right: 1.071429rem;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        width: 2.857143rem;
        height: 2.857143rem;
        line-height: 2.857143rem;
        background-color: rgba(45, 52, 54, 0.4);
        font-size: 1.428571rem;
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
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
