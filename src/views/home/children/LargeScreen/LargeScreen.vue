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
                <span class="search_text">商务</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="jack">洽谈</a-select-option>
                  <a-select-option value="lucy">生产</a-select-option>
                  <a-select-option value="Yiminghe">发货</a-select-option>
                </a-select>
              </div>
              <div class="search_right">
                <span class="search_text">生产</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="0">整装待发</a-select-option>
                  <a-select-option value="1">正在生产</a-select-option>
                </a-select>
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
                    <img src="@/assets/image/dpng.png" alt="logo" />
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag type="success">备用状态</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                      <van-tag v-else type="success">整装待发</van-tag>
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
                <span class="search_text">商务</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="jack">洽谈</a-select-option>
                  <a-select-option value="lucy">生产</a-select-option>
                  <a-select-option value="Yiminghe">发货</a-select-option>
                </a-select>
              </div>
              <div class="search_right">
                <span class="search_text">生产</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="0">整装待发</a-select-option>
                  <a-select-option value="1">正在生产</a-select-option>
                </a-select>
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
                    <img src="@/assets/image/dpng.png" alt="logo" />
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag type="success">备用状态</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                      <van-tag v-else type="success">整装待发</van-tag>
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
                <span class="search_text">商务</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="jack">洽谈</a-select-option>
                  <a-select-option value="lucy">生产</a-select-option>
                  <a-select-option value="Yiminghe">发货</a-select-option>
                </a-select>
              </div>
              <div class="search_right">
                <span class="search_text">生产</span>
                <a-select style="width: 8.571429rem" @change="handleChange">
                  <a-select-option value="0">整装待发</a-select-option>
                  <a-select-option value="1">正在生产</a-select-option>
                </a-select>
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
                    <img src="@/assets/image/dpng.png" alt="logo" />
                    <div class="left_box_content">
                      <span>{{item.product_name}}</span>
                      <span>{{item.product_model}}</span>
                      <span>{{item.commitment_period | setCommitmentPeriod}}</span>
                    </div>
                  </div>
                  <div class="right_box">
                    <div class="child_right">
                      <van-tag type="success">备用状态</van-tag>
                    </div>
                    <div @click.stop="changeProduct(item.id)" class="child_right">
                      <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                      <van-tag v-else type="success">整装待发</van-tag>
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
import { getlargeAcreenOrderProduct, changeProductStatus } from '@/network/home'

export default {
  data() {
    return {
      active: 0,
      deactivated: 0,
      currentRate: 0,
      allpage: 1,
      Opage: 1,
      Tpage: 1,
      Spage: 1,
      ProductList: [],
      ProductLists: [],
      ProductListss: [],
      IsTpage: true,
      IsTpages: true,
      IsTpagess: true,
      isOShow: false,
      isTShow: false,
      isSShow: false
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
      this.deactivated = 0
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
        order_type: 'contract',
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
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    clickscroll() {
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      if (this.deactivated == 0) {
        this.ProductList = []
        this.getlargeAcreen()
      } else if (this.deactivated == 1) {
        this.ProductLists = []
        this.getlargeAcreens()
      } else if (this.deactivated == 2) {
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
          if (this.deactivated == 0) {
            order_type = 'contract'
          }
          if (this.deactivated == 1) {
            order_type = 'flow'
          }
          if (this.deactivated == 2) {
            order_type = 'oem'
          }
          const { code } = await changeProductStatus({
            token: this.$store.state.token,
            order_type,
            id,
            _: new Date().getTime()
          })
          if (code == 200) {
            console.log(this.deactivated)
            if (this.deactivated == 0) {
              this.getlargeAcreen()
            }
            if (this.deactivated == 1) {
              this.getlargeAcreens()
            }
            if (this.deactivated == 2) {
              this.getlargeAcreenss()
            }
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    loadMoress() {
      if (this.IsTpagess) {
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
      this.deactivated = 0
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
      this.deactivated = name
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
          this.$toast('没有更多数据了')
        } else {
          this.ProductList.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductList = data.unfinishedOrderProductList
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
          this.$toast('没有更多数据了')
        } else {
          this.ProductLists.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductLists = data.unfinishedOrderProductList
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
          this.$toast('没有更多数据了')
        } else {
          this.ProductListss.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductListss = data.unfinishedOrderProductList
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
        padding: 0.357143rem 0.714286rem;
        .search_left,
        .search_right {
          .search_text {
            margin-right: 0.357143rem;
            font-size: 1.142857rem;
          }
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
              img {
                width: 4.214286rem;
                height: 4.214286rem;
                border: 0.214286rem solid #cacc61;
                margin-right: 1.071429rem;
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
