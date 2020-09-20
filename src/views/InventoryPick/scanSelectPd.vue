<template>
  <div id="Inventory">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>产品</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3">
      <el-card class="box-card item1">
        <div class="product_box">
          <div class="left_img" @click="imgClick">
            <img
              v-if="img_URL && img_URL != 0"
              :src="img_URL | getUrl"
              alt="logo"
            />
            <img
              v-else-if="img_url_lin && img_url_lin != 0"
              class="img"
              :src="img_url_lin | getUrl"
            />
            <img src="@/assets/image/Default.png" v-else />
          </div>
          <div class="right_box">
            <div class="right_name">
              <span v-if="state">{{ state }}</span>
              <span v-else class="pltext">请选择产品名称</span>
              <van-icon name="arrow" />
            </div>
            <div class="right_model" v-if="isfouck">
              <span v-if="Products">{{ Products }}</span>
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
        <div class="nums">库存数量:{{ nums }}</div>
        <van-field
          v-if="model != 'Inventory'"
          v-model="digit"
          placeholder="请输入数量"
          class="newStyle leftINPUT"
          type="digit"
        />
      </el-card>
    </scroll>
    <myBtns :commitFun="commite" :cancelFun="onClickLeft">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>确认</span>
      </span>
    </myBtns>
    <simple-cropper
      :initParam="uploadParam"
      :successCallback="uploadHandle"
      ref="cropper"
    />
  </div>
</template>

<script>
import { getMaterielList } from '@/network/deal'
import { getEditMateriel } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  data() {
    return {
      state: '',
      img_URL: '',
      img_url_lin: '',
      Products: '',
      material_id: '',
      digit: null,
      nums: 0,
      isfouck: true,
      uploadParam: 4,
      listItems: [],
      model: null,
      iid: 0,
      company_id: '',
      materiel: {},
    }
  },
  components: {
    SimpleCropper: () =>
      import('@/components/common/SimpleCroppes/SimpleCroppes'),
    myBtns: () => import('@/components/common/my_btns/my_btns'),
  },
  computed: {
    getMaterielListData() {
      return {
        company_id: this.company_id,
        _: new Date().getTime(),
      }
    },
    getEditMaterielData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
  },
  activated() {
    this.iid = this.$route.params.id
    this.model = this.$route.query.data
    this.getEditMaterielS()
    if (this.model == 'Inventory') {
      this.commite()
    }
  },
  methods: {
    async getEditMaterielS() {
      const { data } = await getEditMateriel(this.getEditMaterielData)

      this.materiel = data.materiel[0]
      const {
        name,
        specification,
        img_url,
        img_url_lin,
        id,
        stock,
      } = this.materiel
      this.isfouck = true
      this.state = name
      this.Products = specification
      this.img_URL = img_url
      this.img_url_lin = img_url_lin
      this.material_id = id
      this.nums = stock
      this.listItem = {}
      this.isFlowingShow = []
      for (const key in this.listItem) {
        this.listItems.push(this.listItem[key])
      }
    },
    commite() {
      switch (this.model) {
        case 'MaterialReturn':
          if (this.digit <= 0) {
            this.$dialog({ message: '数量不允许为0' })
          } else {
            this.$bus.$emit('proudectReturn', {
              materiel: this.materiel,
              digit: this.digit,
            })
            this.$router.replace('/MaterialReturn')
            this.state = ''
            this.img_URL = ''
            this.img_url_lin = ''
            this.Products = ''
            this.material_id = ''
            this.digit = null
            this.nums = 0
            this.isfouck = true
            this.uploadParam = 4
            this.listItems = []
          }
          break
        case 'Inventory':
          this.$bus.$emit('proudectReturn', {
            materiel: this.materiel,
            digit: this.digit,
          })
          this.$router.replace('/Inventory')
          this.state = ''
          this.img_URL = ''
          this.img_url_lin = ''
          this.Products = ''
          this.nums = 0
          this.material_id = ''
          this.digit = null
          this.isfouck = true
          this.uploadParam = 4
          this.listItems = []
          break
        case 'picking':
          if (this.digit <= 0) {
            this.$dialog({ message: '数量不允许为0' })
          } else {
            this.$bus.$emit('proudectReturn', {
              materiel: this.materiel,
              digit: this.digit,
            })
            this.$router.replace('/picking')
            this.state = ''
            this.img_URL = ''
            this.img_url_lin = ''
            this.Products = ''
            this.nums = 0
            this.material_id = ''
            this.digit = null
            this.isfouck = true
            this.uploadParam = 4
            this.listItems = []
          }
          break
        default:
          this.$router.go(-1)
          this.state = ''
          this.img_URL = ''
          this.img_url_lin = ''
          this.Products = ''
          this.nums = 0
          this.material_id = ''
          this.digit = null
          this.isfouck = true
          this.uploadParam = 4
          this.listItems = []
          break
      }
    },
    uploadHandle(data) {
      this.img_URL = data
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
      this.nums = 0
      this.digit = null
      this.isfouck = true
      this.uploadParam = 4
      this.listItems = []
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
          this.nums = item.stock
          this.listItem = {}
          this.isFlowingShow = []
          for (const key in this.listItem) {
            this.listItems.push(this.listItem[key])
          }
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
    bottom: 4.442857rem;
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
      .nums {
        font-size: 1.142857rem;
      }
    }
  }
}
</style>
