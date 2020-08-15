<template>
  <div id="Inventory">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>盘库</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3">
      <el-card class="box-card item1">
        <div class="Scandiv" @click="Scan">
          <span>扫码选择产品</span>
          <van-icon name="scan" />
        </div>
        <div class="product_box">
          <div class="left_img" @click="imgClick">
            <img v-if="img_URL && img_URL != 0 " :src="img_URL | getUrl" alt="logo" />
            <img
              v-else-if="img_url_lin && img_url_lin != 0 "
              class="img"
              :src="img_url_lin  | getUrl"
            />
            <img src="@/assets/image/Default.png" v-else />
          </div>
          <div class="right_box">
            <div class="right_name" @click.stop="focusClick">
              <span v-if="state">{{state}}</span>
              <span v-else class="pltext">请选择产品名称</span>
              <van-icon name="arrow" />
            </div>
            <div class="right_model" v-if="isfouck" @click.stop="focusClick">
              <span v-if="Products">{{Products}}</span>
              <span v-else class="pltext">请选择产品型号</span>
              <van-icon name="arrow" />
            </div>
            <van-field
              class="right_model field_handle"
              style="padding:0 0 ;"
              v-else
              v-model="Products"
              placeholder="请手动填写产品型号"
            />
          </div>
        </div>
        <van-field v-model="digit" class="newStyle leftINPUT" type="digit" />
      </el-card>
    </scroll>
    <myBtns :commitFun="commite" :cancelFun="onClickLeft">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>提交</span>
      </span>
    </myBtns>
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper" />
  </div>
</template>
    
<script>
import myBtns from '@/components/common/my_btns/my_btns'
import SimpleCropper from '@/components/common/SimpleCroppes/SimpleCroppes'
import { getMaterielList, addInventory } from '@/network/deal'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  data() {
    return {
      state: '',
      img_URL: '',
      img_url_lin: '',
      Products: '',
      material_id: '',
      digit: 0,
      isfouck: true,
      uploadParam: 4,
      listItems: [],
    }
  },
  components: {
    SimpleCropper,
    myBtns,
  },
  computed: {
    getMaterielListData() {
      return {
        company_id: this.$store.state.userInfo[0].user_compser_id,
        _: new Date().getTime(),
      }
    },
    addInventoryData() {
      return {
        token: this.$store.state.token,
        material_id: this.material_id,
        inventory_num: this.digit,
      }
    },
  },
  activated() {
    this.getMaterielLists()
  },
  methods: {
    Scan() {
      this.$router.push('/scan')
      console.log('扫码')
    },
    async commite() {
      console.log('提交')
      const { code, msg } = await addInventory(this.addInventoryData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.onClickLeft()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async getMaterielLists() {
      const { data } = await getMaterielList(this.getMaterielListData)
      this.listItem = { ...data }
      this.isFlowingShow = []
      for (const key in this.listItem) {
        this.listItems.push(this.listItem[key])
      }
      console.log(this.listItems)
    },
    uploadHandle(data) {
      this.img_URL = data
      console.log(this.img_URL)
    },
    imgClick() {
      this.$refs['cropper'].upload()
    },
    onClickLeft() {
      this.state = ''
      this.img_URL = ''
      this.img_url_lin = ''
      this.Products = ''
      this.material_id = ''
      this.digit = 0
      this.isfouck = true
      this.uploadParam = 4
      this.listItems = []
      this.$router.replace('/home')
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
        console.log(item)
        if (typeof item == 'string') {
          this.isfouck = false
          this.state = item
        } else {
          this.isfouck = true
          this.state = item.name
          this.Products = item.specification
          this.img_URL = item?.img_url
          this.img_url_lin = item.img_url_lin
          this.material_id = item.id
          this.listItem = {}
          this.isFlowingShow = []
          for (const key in this.listItem) {
            this.listItems.push(this.listItem[key])
          }
          console.log(this.listItems)
        }
      })
    },
  },
  filters: {
    getUrl(value) {
      if (value.indexOf(bestURL) == -1) {
        return bestURL + value
      } else {
        return value
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#Inventory {
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
      font-size: 1.285714rem;
      margin-left: -2.071429rem;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.142857rem;
    bottom: 0;
    overflow: hidden;
    .item1 {
      margin-bottom: 0.714286rem;
      padding: 0.714286rem;
      .Scandiv {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2.785714rem;
        border-radius: 0.357143rem;
        background-color: #dfe6e9;
        color: #636e72;
        margin: 0.714286rem 0;
        .van-icon {
          font-size: 1.5rem;
          margin-left: 0.714286rem;
        }
      }
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          width: 4.928571rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          padding-right: 0.714286rem;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
          padding: 0 1rem;
        }
      }
      .title_box_ess {
        background-color: #eee;
        font-size: 1rem;
        color: #ea6e33;
        height: 3.142857rem;
        line-height: 3.142857rem;
        padding: 0 1.142857rem;
      }

      .product_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.571429rem 1.142857rem;
        .left_img {
          width: 5.357143rem;
          height: 5rem;
          margin-right: 0.857143rem;
          border-radius: 0.357143rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right_box {
          height: 100%;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .right_name {
            font-size: 1.285714rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            span {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .pltext {
              width: 100%;
              text-align: right;
              color: #a2a2a2;
              font-size: 1rem;
              margin-right: 2rem;
            }
            .van-icon {
            }
          }
          .right_model {
            font-size: 1.142857rem;
            color: #a2a2a2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            span {
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .pltext {
              width: 100%;
              font-size: 1rem;
              text-align: right;
              color: #a2a2a2;
              margin-right: 2rem;
            }
            .van-icon {
              font-size: 1.285714rem;
              color: #303133;
            }
          }
        }
      }
    }
  }
}
</style>
