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
        <van-tab title="合同订单" v-if="isOShow">
          <scroll
            class="scroll_wrapper"
            ref="scrolls"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMores"
            @scroll="clickscroll"
          >
            <!-- <div class="hello">
              <div id="example">
                <p>firstName值: {{firstName}}</p>
                <p>lastName值: {{lastName}}</p>
              </div>
              <button @click="ClickCeshi">点击改变Name的值</button>
            </div>-->
            <div class="search_box">
              <div class="search_left">
                <el-select
                  v-model="businessValue"
                  placeholder="商务状态"
                  @change="businesChange"
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
                    <span>公司简称</span>
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
              <!-- <div class="content_box">
                <div class="title_box">
                  <span>{{item.order_number}}</span>
                  <span>公司简称</span>
                </div>
                <div class="content_child">
                  <div class="left_box">
                    <span>{{item.product_name}}</span>
                    <span>{{item.product_model}}</span>
                    <span>交期:{{item.commitment_period}}</span>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag type="success">备用状态</van-tag>
                    </div>
                    <div @click="changeProduct(item.id)" class="child_right">
                      <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                      <van-tag v-else type="success">整装待发</van-tag>
                    </div>
                  </div>
                </div>
                <van-progress
                  :pivot-text="'发货' +  Math.round(((item.number - item.surplus_number) / item.number)*100) + '%'"
                  :percentage="Math.round(((item.number - item.surplus_number) / item.number)*100)"
                  style=" margin: 0.714286rem 0; height: 1px;"
                />
                <div class="click_more" @click="pageHandleClick(item)">
                  <span>
                    查看具体生产要求
                    <a-icon type="right-circle" />
                  </span>
                </div>
              </div>-->
            </div>
          </scroll>
        </van-tab>
        <van-tab title="流水订单" v-if="isTShow">
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
                    <span>公司简称</span>
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
        <van-tab title="代工订单" v-if="isSShow">
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
                    <span>公司简称</span>
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
import {
  getlargeAcreenOrderProduct,
  changeProductStatus,
  getLargeAcreenOrderProduct
} from '@/network/home'

export default {
  data() {
    return {
      active: 0,
      currentRate: 0,
      allpage: 1,
      Opage: 1,
      Tpage: 1,
      Spage: 1,
      order_type: 'contract',
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
      businessValue: '',
      business: [
        {
          value: '0',
          label: '洽谈'
        },
        {
          value: '1',
          label: '生产'
        },
        {
          value: '2',
          label: '发货'
        },
        {
          value: '3',
          label: '无状态'
        }
      ],
      omesValue: '',
      omess: [
        {
          value: '0',
          label: '满足'
        },
        {
          value: '1',
          label: '不满足'
        }
      ],
      workshopValue: '',
      workshop: [
        {
          value: '1',
          label: '整装待发'
        },
        {
          value: '0',
          label: '正在生产'
        }
      ]
      // firstNames: '张',
      // lastNames: '三'
      // oneObj: {
      //   data: '001',
      //   upOBJ: {
      //     val: '456',
      //     downOBJ: {
      //       num: 1,
      //       setter: 8
      //     }
      //   }
      // },
      // twoOBJ: {},
      // twoOBJ: {
      //   one: 'chad',
      //   two: 'why',
      //   three: 'mht'
      // }
    }
  },

  // filters: {
  //   orderNum(value) {
  //     return '合同号: ' + value
  //   }
  // },
  activated() {
    // console.log('oneObj = ', this.oneObj)
    // console.log('twoOBJ = ', this.twoOBJ)
    // this.twoOBJ = { ...this.oneObj }
    // console.log('oneObj = ', this.oneObj)
    // console.log('twoOBJ = ', this.twoOBJ)

    // console.log('属性名', Object.keys(this.twoOBJ))
    // console.log('属性值', Object.values(this.twoOBJ))

    // for (const key in this.twoOBJ) {
    //   console.log('属性名' + key)
    //   console.log('属性值' + this.twoOBJ[key])
    // }

    // Object.keys(this.twoOBJ).forEach(key => {
    //   console.log(key, this.twoOBJ[key])
    // })

    this.allpage = 1
    if (this.Opage == 1) {
      this.getlargeAcreen()
    }
    if (this.Tpage == 1) {
      this.getlargeAcreens()
    }
    if (this.Spage == 1) {
      this.getlargeAcreenss()
    }
  },
  deactivated() {
    /*
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      this.IsTpage = true
      this.ProductList = []
      this.ProductLists = []
      this.ProductListss = []
    */
  },
  computed: {
    getlargeAcreenOrderData() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: '0',
        _: new Date().getTime()
      }
    },
    getlargeAcreenOrderDatas() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'flow',
        _: new Date().getTime()
      }
    },
    getlargeAcreenOrderDatass: {
      get() {
        return {
          token: this.$store.state.token,
          page: this.allpage,
          offset: 20,
          order_type: 'oem',
          _: new Date().getTime()
        }
      },
      set(newValue) {
        console.log(newValue)
      }
    },
    getLargeAcreenNEWData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        order_type: this.order_type,
        business_status: this.business_status,
        che_status: this.che_status,
        distributor_id: null,
        _: new Date().getTime()
      }
    }
    // firstName: {
    //   get: function() {
    //     return this.firstNames
    //   },
    //   set: function(newValue) {
    //     this.firstNames = newValue
    //     return newValue
    //   }
    // },
    // lastName: {
    //   get: function() {
    //     return this.lastNames
    //   },
    //   set: function(newValue) {
    //     this.lastNames = newValue
    //     return newValue
    //   }
    // }
  },
  watch: {
    // allpage(olddata, newdata) {
    //   console.log(olddata, newdata)
    // }
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
        return '正在生产'
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
        return '洽\xa0\xa0\xa0\xa0\xa0\xa0谈'
      } else if (value == 1) {
        return '生\xa0\xa0\xa0\xa0\xa0\xa0产'
      } else if (value == 2) {
        return '发\xa0\xa0\xa0\xa0\xa0\xa0货'
      } else if (value == 3) {
        return '无\xa0状\xa0态\xa0'
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
        return '满足条件'
      } else {
        return '不\xa0满\xa0足\xa0'
      }
    }
  },
  updated() {
    // console.log('firstName = ' + this.firstName)
    // console.log('lastName = ' + this.lastName)
    // console.log('firstNames = ' + this.firstNames)
    // console.log('lastNames = ' + this.lastNames)
  },
  methods: {
    // ClickCeshi() {
    //   this.firstNames = '三'
    //   this.lastNames = '张'
    // },
    businesChange(value) {
      this.business_status = value
      this.getLargeAcreenNEW()
    },
    omesChange(value) {
      this.business_status = value
      this.getLargeAcreenNEW()
    },
    workshopChange(value) {
      this.che_status = value
      this.getLargeAcreenNEW()
    },
    async getLargeAcreenNEW() {
      const { data } = await getLargeAcreenOrderProduct(
        this.getLargeAcreenNEWData
      )
      console.log('getLargeAcreenOrderProduct', data.unfinishedOrderProductList)
      //清除 列表  加入数据
      if (this.active == 0) {
        this.ProductList = []
        data.unfinishedOrderProductList.forEach(item => {
          this.ProductList.push(item)
        })
      } else if (this.active == 1) {
        this.ProductLists = []
        data.unfinishedOrderProductList.forEach(item => {
          this.ProductLists.push(item)
        })
      } else if (this.active == 2) {
        this.ProductListss = []
        data.unfinishedOrderProductList.forEach(item => {
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
          message: '是否更改状态?'
        })
        .then(async () => {
          let order_type
          if (this.active == 0) {
            order_type = 'contract'
          }
          if (this.active == 1) {
            order_type = 'flow'
          }
          if (this.active == 2) {
            order_type = 'oem'
          }
          const { code } = await changeProductStatus({
            token: this.$store.state.token,
            order_type,
            id,
            _: new Date().getTime()
          })
          if (code == 200) {
            console.log(this.active)
            if (this.active == 0) {
              this.getlargeAcreen()
            }
            if (this.active == 1) {
              this.getlargeAcreens()
            }
            if (this.active == 2) {
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
        this.$refs.scrollss.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scrollss.finishPullUp()
      }
    },
    loadMores() {
      if (this.IsTpages) {
        this.Opage += 1
        this.allpage = this.Opage
        this.getlargeAcreen()
        this.$refs.scrolls.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scrolls.finishPullUp()
      }
    },
    loadMore() {
      if (this.IsTpage) {
        this.Tpage += 1
        this.allpage = this.Tpage
        this.getlargeAcreens()
        this.$refs.scroll.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scroll.finishPullUp()
      }
    },
    pageHandleClick(data) {
      this.$router.push({
        path: '/ScreenItem',
        query: {
          active: this.active,
          data: JSON.parse(JSON.stringify(data))
        }
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
    tabsClick(name) {
      this.businessValue = ''
      this.workshopValue = ''
      this.omesValue = ''
      if (name == 0) {
        this.order_type = 'contract'
      } else if (name == 1) {
        this.order_type = 'flow'
      } else if (name == 2) {
        this.order_type = 'oem'
      }
    },
    async getlargeAcreen() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderData
      )
      this.isOShow = data.companyOrderType.contract ? true : false
      this.isTShow = data.companyOrderType.flow ? true : false
      this.isSShow = data.companyOrderType.oem ? true : false
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      if (this.Opage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpages = false
        } else {
          data.unfinishedOrderProductList.forEach(item => {
            this.ProductList.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach(item => {
          this.ProductList.push(item)
        })
      }
    },
    async getlargeAcreens() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderDatas
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      if (this.Tpage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpage = false
        } else {
          data.unfinishedOrderProductList.forEach(item => {
            this.ProductLists.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach(item => {
          this.ProductLists.push(item)
        })
      }
    },
    async getlargeAcreenss() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderDatass
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)

      if (this.Spage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpIsTpagessages = false
        } else {
          data.unfinishedOrderProductList.forEach(item => {
            this.ProductListss.push(item)
          })
        }
      } else {
        data.unfinishedOrderProductList.forEach(item => {
          this.ProductListss.push(item)
        })
      }
    }
  }
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
                margin-bottom: 0.714286rem;
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
