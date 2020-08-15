<template>
  <div id="LargeScreen">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>生产任务</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <van-tabs v-model="active" @click="tabsClick">
        <van-tab :title="titleArr[0]" v-if="titleArr[0] != undefined">
          <scroll
            class="scroll_wrapper"
            ref="scrolls"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMores"
            @scroll="clickscroll"
          >
            <div class="search_box">
              <div class="search_left">
                <el-select
                  v-model="businessValue"
                  placeholder="商务状态"
                  @change="businesChange"
                  @focus="focushandle(0)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in business"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="search_right">
                <el-select
                  v-model="workshopValue"
                  placeholder="车间状态"
                  @change="workshopChange"
                  @focus="focushandle(0)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in workshop"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div
              class="box-card"
              v-for="(item,index) in ProductList"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div
                class="background_box"
                :style="{width:Math.round(((item.number - item.surplus_number) / item.number)*100) + '%'}"
              ></div>
              <div class="content_box" @click="pageHandleClick(item)">
                <div class="title_box">
                  <div class="left_title">
                    <!-- <input type="text" > -->
                    <!-- <span>{{item.order_number | orderNum}}</span> -->
                    <span>{{item.order_number }}</span>
                    <span>{{item.name_alias}}</span>
                  </div>
                  <div class="right_title">
                    <span>{{item.surplus_number | setSurplusNumber}}</span>
                  </div>
                </div>
                <div class="content_child">
                  <div class="left_box">
                    <!-- <img src="@/assets/image/dpng.png" alt="logo" /> -->
                    <div class="img"></div>
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag
                        :type="item.business_status | setbusinessstatus"
                        :color="item.business_status == 1 ? '#FFCC33':'' "
                      >{{item.business_status | setbusinessName}}</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag
                        :type="item.status | setchestatus"
                        :color="item.status == 0 ? '#FFCC33':'' "
                      >{{item.status | setcheName}}</van-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll>
        </van-tab>
        <van-tab :title="titleArr[1]" v-if="titleArr[1] != undefined">
          <scroll
            class="scroll_wrapper"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="clickscroll"
          >
            <div class="search_box">
              <div class="search_left">
                <el-select
                  v-model="omesValue"
                  placeholder="商务状态"
                  @change="omesChange"
                  @focus="focushandle(1)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in omess"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="search_right">
                <el-select
                  v-model="workshopValue"
                  placeholder="车间状态"
                  @change="workshopChange"
                  @focus="focushandle(1)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in workshop"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div
              class="box-card"
              v-for="(item,index) in ProductLists"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div
                class="background_box"
                :style="{width:Math.round(((item.number - item.surplus_number) / item.number)*100) + '%'}"
              ></div>
              <div class="content_box" @click="pageHandleClick(item)">
                <div class="title_box">
                  <div class="left_title">
                    <span>{{item.order_number}}</span>
                    <span>{{item.name_alias}}</span>
                  </div>
                  <div class="right_title">
                    <span>{{item.surplus_number | setSurplusNumber}}</span>
                  </div>
                </div>
                <div class="content_child">
                  <div class="left_box">
                    <!-- <img src="@/assets/image/dpng.png" alt="logo" /> -->
                    <div class="img"></div>
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag
                        :type="item.business_status | omesstatus"
                        :color="item.business_status == 1 ? '#FFCC33':'' "
                      >{{item.business_status | omesName}}</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag
                        :type="item.status | setchestatus"
                        :color="item.status == 0 ? '#FFCC33':'' "
                      >{{item.status | setcheName}}</van-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll>
        </van-tab>
        <van-tab :title="titleArr[2]" v-if="titleArr[2] != undefined">
          <scroll
            class="scroll_wrapper"
            ref="scrollss"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMoress"
            @scroll="clickscroll"
          >
            <div class="search_box">
              <div class="search_left">
                <el-select
                  v-model="omesValue"
                  placeholder="商务状态"
                  @change="omesChange"
                  @focus="focushandle(2)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in omess"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="search_right">
                <el-select
                  v-model="workshopValue"
                  placeholder="车间状态"
                  @change="workshopChange"
                  @focus="focushandle(2)"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in workshop"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div
              class="box-card"
              v-for="(item,index) in ProductListss"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div
                class="background_box"
                :style="{width:Math.round(((item.number - item.surplus_number) / item.number)*100) + '%'}"
              ></div>
              <div class="content_box" @click="pageHandleClick(item)">
                <div class="title_box">
                  <div class="left_title">
                    <span>{{item.order_number}}</span>
                    <span>{{item.name_alias}}</span>
                  </div>
                  <div class="right_title">
                    <span>{{item.surplus_number | setSurplusNumber}}</span>
                  </div>
                </div>
                <div class="content_child">
                  <div class="left_box">
                    <!-- <img src="@/assets/image/dpng.png" alt="logo" /> -->
                    <div class="img"></div>
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag
                        :type="item.business_status | omesstatus"
                        :color="item.business_status == 1 ? '#FFCC33':'' "
                      >{{item.business_status | omesName}}</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag
                        :type="item.status | setchestatus"
                        :color="item.status == 0 ? '#FFCC33':'' "
                      >{{item.status | setcheName}}</van-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
    
<script>
import { getCompleteOrderProduct, changeProductStatus } from '@/network/home'

export default {
  data() {
    return {
      active: 0,
      currentRate: 0,
      allpage: 1,
      Opage: 1,
      Tpage: 1,
      Spage: 1,
      order_type: '',
      order_typeArr: [],
      business_status: 0,
      che_status: 0,
      ProductList: [],
      ProductLists: [],
      ProductListss: [],
      IsTpage: true,
      IsTpages: true,
      IsTpagess: true,
      isOShow: false,
      isTShow: false,
      isSShow: false,
      tipe: 0,
      businessValue: '',
      titleArr: ['', '', ''],
      business: [
        {
          value: '0',
          label: '洽谈中',
        },
        {
          value: '1',
          label: '启动生产',
        },
        {
          value: '2',
          label: '准许发货',
        },
        {
          value: '3',
          label: '无状态',
        },
      ],
      omesValue: '',
      omess: [
        {
          value: '0',
          label: '准许发货',
        },
        {
          value: '1',
          label: '不予生产',
        },
      ],
      workshopValue: '',
      workshop: [
        {
          value: '1',
          label: '整装待发',
        },
        {
          value: '0',
          label: '生产中',
        },
      ],
    }
  },
  activated() {
    this.ProductList = []
    this.getlargeAcreen()
    this.ProductLists = []
    this.getlargeAcreens()
    this.ProductListss = []
    this.getlargeAcreenss()
    this.allpage = 1
    this.Opage = 1
    this.Tpage = 1
    this.Spage = 1
  },
  computed: {
    getlargeAcreenOrderData() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: '0',
        _: new Date().getTime(),
      }
    },
    getlargeAcreenOrderDatas() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'flow',
        _: new Date().getTime(),
      }
    },
    getlargeAcreenOrderDatass: {
      get() {
        return {
          token: this.$store.state.token,
          page: this.allpage,
          offset: 20,
          order_type: 'oem',
          _: new Date().getTime(),
        }
      },
      set(newValue) {
        console.log(newValue)
      },
    },
  },
  filters: {
    setCommitmentPeriod(value) {
      return '交期:' + value
    },
    setSurplusNumber(value) {
      return '待产数量:' + value + '件'
    },
    setchestatus(value) {
      if (value == 0) {
        return 'warning'
      } else {
        return 'success'
      }
    },
    setcheName(value) {
      if (value == 0) {
        return '生产中'
      } else {
        return '整装待发'
      }
    },
    setbusinessstatus(value) {
      if (value == 0) {
        return 'danger'
      } else if (value == 1) {
        return 'warning'
      } else if (value == 2) {
        return 'success'
      } else if (value == 3) {
        return 'primary'
      }
    },
    setbusinessName(value) {
      if (value == 0) {
        return '洽谈中'
      } else if (value == 1) {
        return '启动生产'
      } else if (value == 2) {
        return '准许发货'
      } else if (value == 3) {
        return '无状态'
      }
    },
    omesstatus(value) {
      if (value == 0) {
        return 'success'
      } else {
        return 'primary'
      }
    },
    omesName(value) {
      if (value == 0) {
        return '准许发货'
      } else {
        return '不予生产'
      }
    },
  },
  methods: {
    businesChange(value) {
      this.business_status = value
      this.getLargeAcreenNEW(this.tipe)
      console.log(value)
    },
    omesChange(value) {
      this.business_status = value
      this.getLargeAcreenNEW(this.tipe)
      console.log(value)
    },
    workshopChange(value) {
      this.che_status = value
      this.getLargeAcreenNEW(this.tipe)
      console.log(value)
    },
    focushandle(i) {
      this.tipe = i
      console.log(i)
    },
    async getLargeAcreenNEW(i) {
      const { data } = await getCompleteOrderProduct({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        order_type: this.order_typeArr[i],
        business_status: this.business_status,
        che_status: this.che_status,
        distributor_id: null,
        _: new Date().getTime(),
      })
      console.log('getCompleteOrderProduct', data)
      if (i == 0) {
        this.ProductList = []
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductList.push(item)
        })
      } else if (i == 1) {
        this.ProductLists = []
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductLists.push(item)
        })
      } else if (i == 2) {
        this.ProductListss = []
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductListss.push(item)
        })
      }
    },
    clickscroll() {
      this.businessValue = ''
      this.workshopValue = ''
      this.omesValue = ''
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      if (this.active == 0) {
        this.ProductList = []
        this.getlargeAcreen()
      } else if (this.active == 1) {
        this.ProductLists = []
        this.getlargeAcreens()
      } else if (this.active == 2) {
        this.ProductListss = []
        this.getlargeAcreenss()
      }
    },
    changeProduct(id) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否更改状态?',
        })
        .then(async () => {
          // let order_type
          // if (this.isOShow && this.isTShow && this.isSShow) {
          //   if (this.active == 0) {
          //     order_type = 'contract'
          //   }
          //   if (this.active == 1) {
          //     order_type = 'flow'
          //   }
          //   if (this.active == 2) {
          //     order_type = 'oem'
          //   }
          // } else if (!this.isOShow && this.isTShow && this.isSShow) {
          //   if (this.active == 0) {
          //     order_type = 'flow'
          //   }
          //   if (this.active == 1) {
          //     order_type = 'oem'
          //   }
          // } else if (this.isOShow && !this.isTShow && this.isSShow) {
          //   if (this.active == 0) {
          //     order_type = 'contract'
          //   }
          //   if (this.active == 1) {
          //     order_type = 'oem'
          //   }
          // } else if (this.isOShow && this.isTShow && !this.isSShow) {
          //   if (this.active == 0) {
          //     order_type = 'contract'
          //   }
          //   if (this.active == 1) {
          //     order_type = 'flow'
          //   }
          // }

          const { code } = await changeProductStatus({
            token: this.$store.state.token,
            order_type: this.order_type,
            id,
            _: new Date().getTime(),
          })
          if (code == 200) {
            console.log(this.active)
            if (this.active == 0) {
              this.ProductList = []
              this.getlargeAcreen()
            }
            if (this.active == 1) {
              this.ProductLists = []
              this.getlargeAcreens()
            }
            if (this.active == 2) {
              this.ProductListss = []
              this.getlargeAcreenss()
            }
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    loadMoress() {
      if (this.IsTpIsTpagessages) {
        this.Spage += 1
        this.allpage = this.Spage
        this.getlargeAcreenss()
      } else {
        this.$toast('没有更多数据了')
      }
    },
    loadMores() {
      if (this.IsTpages) {
        this.Opage += 1
        this.allpage = this.Opage
        this.getlargeAcreen()
      } else {
        this.$toast('没有更多数据了')
      }
    },
    loadMore() {
      if (this.IsTpage) {
        this.Tpage += 1
        this.allpage = this.Tpage
        this.getlargeAcreens()
      } else {
        this.$toast('没有更多数据了')
      }
    },
    pageHandleClick(data) {
      this.$router.push({
        path: '/ScreenItem',
        query: {
          active: this.active,
          data: JSON.parse(JSON.stringify(data)),
        },
      })
    },
    blacknext() {
      this.$router.replace('/home')
      this.active = 0
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      this.IsTpage = true
      this.IsTpages = true
      this.IsTpagess = true
    },
    tabsClick(name, title) {
      this.businessValue = ''
      this.workshopValue = ''
      this.omesValue = ''
      if (title == '合同订单') {
        this.order_type = 'contract'
      } else if (title == '流水订单') {
        this.order_type = 'flow'
      } else if (title == '代工订单') {
        this.order_type = 'oem'
      }
      console.log(name, title)
    },
    async getlargeAcreen() {
      const { data } = await getCompleteOrderProduct(
        this.getlargeAcreenOrderData
      )
      console.log('getlargeAcreenOrderProduct', data)
      this.titleArr[0] = data.companyOrderType.contract
      this.titleArr[1] = data.companyOrderType.flow
      this.titleArr[2] = data.companyOrderType.oem
      this.order_typeArr[0] = 'contract'
      this.order_typeArr[1] = 'flow'
      this.order_typeArr[2] = 'oem'
      console.log(this.titleArr)
      if (this.Opage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpages = false
        } else {
          data.unfinishedOrderProductList.forEach((item) => {
            this.ProductList.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductList.push(item)
        })
      }
    },
    async getlargeAcreens() {
      const { data } = await getCompleteOrderProduct(
        this.getlargeAcreenOrderDatas
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      if (this.Tpage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpage = false
        } else {
          data.unfinishedOrderProductList.forEach((item) => {
            this.ProductLists.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductLists.push(item)
        })
      }
    },
    async getlargeAcreenss() {
      const { data } = await getCompleteOrderProduct(
        this.getlargeAcreenOrderDatass
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)

      if (this.Spage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpIsTpagessages = false
        } else {
          data.unfinishedOrderProductList.forEach((item) => {
            this.ProductListss.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach((item) => {
          this.ProductListss.push(item)
        })
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#LargeScreen {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .content {
    height: calc(100vh - 5.428571rem);
    .scroll_wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 3.142857rem;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      background-color: #eeeeee;
      height: calc(100vh - 8.571429rem);
      .search_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 0.357143rem 0.714286rem;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
        margin-bottom: 0.357143rem;
        .search_left,
        .search_right {
          flex: 1;
        }
      }
      .box-card {
        position: relative;
        background-color: #fff;
        .background_box {
          height: 7.071429rem;
          background-color: #d1e8ff;
        }
        .content_box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          .title_box {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            height: 2.142857rem;
            padding: 0 1.857143rem;
            border-bottom: 1px solid #f2f2f2;
            span {
              font-size: 0.857143rem;
              margin: 0 0.357143rem;
              color: #565656;
            }
          }
          .content_child {
            padding: 0.357143rem 2.071429rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left_box {
              display: flex;
              .img {
                width: 4.214286rem;
                height: 4.214286rem;
                border: 0.214286rem solid #cacc61;
                margin-right: 1.071429rem;
                background-color: #ccc;
              }
              .left_box_content {
                display: flex;
                flex-direction: column;

                span {
                  font-size: 1rem;
                  color: #545454;
                  &:first-child {
                    font-weight: 700;
                  }
                  &:last-child {
                    font-size: 0.857143rem;
                  }
                }
              }
            }
            .right_box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: stretch;
              overflow: hidden;
              width: 4.142857rem;
              .child_right {
                width: 100%;
                margin-bottom: 0.714286rem;
                .van-tag {
                  width: 100%;
                  display: inline-block;
                  text-align: justify;
                  text-align-last: justify;
                }
                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
          .click_more {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              font-size: 0.714286rem;
              color: #6b6b6b;
            }
          }
        }
      }
    }
  }
}
</style>
