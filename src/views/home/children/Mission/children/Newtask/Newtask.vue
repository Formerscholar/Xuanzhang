<template>
  <div id="Newtask">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增任务</span>
      </div>
    </navbar>

    <scroll class="scroll-wrapper" :probeType="3">
      <el-card class="box-card" body-style="padding: 0.357143rem ;">
        <div @click="SelectionClick" class="newStyle van-cell DeliveryDate">
          <span class="lable">任务类型</span>
          <span>{{SelectionData}}</span>
        </div>

        <div @click="propertiesClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">任务属性</span>
          <span>{{propertiesData}}</span>
        </div>

        <div class="newStyle DeliveryDate van-cell">
          <span class="lable">截止时间</span>
          <span class="time" @click="tiemrClick">{{end_time}}</span>
        </div>
        <van-field v-model="title" class="newStyle DeliveryDate van-cell" label="任务标题" />
        <div @click="AobjectsClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">指派对象</span>
          <span>{{AobjectsData}}</span>
        </div>
        <div @click="ccpepolClick" class="newStyle DeliveryDate van-cell ccpepolData">
          <span class="lable">抄送人</span>
          <div>
            <span v-for="(item,index) in ccpepolData" :key="index">{{item}},</span>
          </div>
          <van-icon name="close" @click.stop="clearcpepol" />
        </div>

        <van-field
          v-model="textarea"
          autosize
          type="textarea"
          label="任务详情"
          placeholder="(选填)简要描述任务详情"
          class="newStyle DeliveryDate"
        />
        <div class="img_upload van-cell DeliveryDate">
          <span class="lable">上传图片</span>
          <img class="img_box" v-if="userImg" :src="userImg" @click="httpRequest" />
          <div v-else class="img_box" @click="httpRequest"></div>
        </div>
      </el-card>
    </scroll>

    <myBtns :commitFun="addDesignatedTask" :cancelFun="cancelForm">
      <span slot="cancel-btn">返 回</span>
      <span slot="commit-btn">
        <span>确 定</span>
      </span>
    </myBtns>

    <SimpleCroppes :initParam="uploadParam" :successCallback="uploadHandle" ref="croppers" />
    <van-datetime-picker
      class="datetime"
      v-if="isDatetime"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirms"
      @cancel="cancel"
    />
    <van-picker
      class="datetime"
      v-if="isSelection"
      title="任务类型"
      show-toolbar
      :columns="selectionArr"
      @confirm="SelectiononConfirm"
      @cancel="SelectiononCancel"
    />
    <van-picker
      class="datetime"
      v-if="isproperties"
      title="任务属性"
      show-toolbar
      :columns="styleValue"
      @confirm="propertiesonConfirm"
      @cancel="propertiesnCancel"
    />
    <van-picker
      class="datetime"
      v-if="isAobjects"
      title="指派对象"
      show-toolbar
      :columns="AssignArr"
      @confirm="AobjectsonConfirm"
      @cancel="AobjectsnCancel"
    />
    <van-picker
      class="datetime"
      v-if="isccpepol"
      title="抄送人"
      show-toolbar
      :columns="AssignArr"
      @confirm="ccpepolConfirm"
      @cancel="ccpepolCancel"
    />
  </div>
</template>
    
<script>
import { addDesignatedTasks, getAddDesignatedTasks } from '@/network/home'
import { setTimerType } from '@/common/filter'
import SimpleCroppes from '@/components/common/SimpleCroppes/SimpleCroppes'
import { bestURL, crosURl } from '@/network/baseURL'
import myBtns from '@/components/common/my_btns/my_btns'

export default {
  name: 'Newtask',
  data() {
    return {
      isDatetime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      end_time: setTimerType(new Date().getTime()),
      dialogImageUrl: '',
      dialogVisible: false,
      uploadParam: 4,
      SelectionData: '',
      propertiesData: '',
      isSelection: false,
      isproperties: false,
      isccpepol: false,
      isAobjects: false,
      timer: null,
      userImg: '',
      dialog: false,
      loading: false,
      styleValue: ['一般', '紧急'],
      title: '',
      value: '',
      Assign: '',
      Ccpeople: [],
      textarea: '',
      imgUrlAdd: '',
      propertieValue: '',
      AobjectsData: '',
      ccpepolData: [],
      selectionArr: [],
      AssignArr: [],
      designatedTasksType: [],
      users: [],
    }
  },
  components: {
    SimpleCroppes,
    myBtns,
  },
  async activated() {
    const { data } = await getAddDesignatedTasks({
      token: this.$store.state.token,
      _: new Date().getTime(),
    })
    console.log('UserDesignatedTasksData', data)
    this.designatedTasksType = data.designatedTasksType
    data.designatedTasksType.map((item) => {
      this.selectionArr.push(item.name)
    })
    this.users = data.users
    data.users.map((item) => {
      this.AssignArr.push(item.name)
    })
  },
  deactivated() {
    this.$refs.upload.clearFiles()
    this.userImg = ''
  },
  computed: {
    getAddDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    mydata() {
      return {
        token: this.$store.state.token,
      }
    },
    addDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        type: this.value,
        attribute: this.propertieValue,
        end_time: this.end_time,
        title: this.title,
        user_id: this.Assign,
        details: this.imgUrlAdd + this.textarea,
        users_cc: [...this.Ccpeople],
      }
    },
  },
  methods: {
    clearcpepol() {
      this.ccpepolData = []
      this.Ccpeople = []
    },
    ccpepolConfirm(value, index) {
      this.ccpepolData.push(value)
      this.users.forEach((item, index1) => {
        if (index1 == index) {
          this.Ccpeople.push(item.id)
        }
      })
      console.log(value, index, this.Ccpeople)
      this.isccpepol = false
    },
    ccpepolCancel() {
      this.isccpepol = false
    },
    ccpepolClick() {
      this.isccpepol = true
    },
    AobjectsonConfirm(value, index) {
      this.AobjectsData = value
      this.users.forEach((item, index1) => {
        if (index1 == index) {
          this.Assign = item.id
        }
      })
      console.log(value, index, this.AobjectsData)
      this.isAobjects = false
    },
    AobjectsnCancel() {
      this.isAobjects = false
    },
    AobjectsClick() {
      this.isAobjects = true
    },
    propertiesonConfirm(value, index) {
      this.propertiesData = value
      this.propertieValue = index + 1
      console.log(value, index, this.propertieValue)
      this.isproperties = false
    },
    propertiesnCancel() {
      this.isproperties = false
    },
    propertiesClick() {
      this.isproperties = true
    },
    SelectionClick() {
      this.isSelection = true
    },
    SelectiononConfirm(value, index) {
      this.SelectionData = value
      this.designatedTasksType.forEach((item, index1) => {
        if (index1 == index) {
          this.value = item.id
        }
      })
      console.log(value, index, this.value)
      this.isSelection = false
    },
    SelectiononCancel() {
      this.isSelection = false
    },
    tiemrClick() {
      this.isDatetime = true
    },
    cancel() {
      this.isDatetime = false
    },
    confirms(value) {
      this.end_time = setTimerType(value)
      this.isDatetime = false
    },
    uploadHandle(data) {
      this.userImg = data
      this.imgUrlAdd = `<img src="${data.split(bestURL)[1]}" />`
    },
    httpRequest() {
      this.$refs['croppers'].upload()
    },
    async addDesignatedTask() {
      const { code, msg } = await addDesignatedTasks(
        this.addDesignatedTasksData
      )
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    blacknext() {
      this.isDatetime = false
      this.dialogImageUrl = ''
      this.dialogVisible = false
      this.uploadParam = 4
      this.SelectionData = ''
      this.propertiesData = ''
      this.isSelection = false
      this.isproperties = false
      this.isccpepol = false
      this.isAobjects = false
      this.timer = null
      this.userImg = ''
      this.dialog = false
      this.loading = false
      this.title = ''
      this.value = ''
      this.Assign = ''
      this.Ccpeople = []
      this.textarea = ''
      this.imgUrlAdd = ''
      this.propertieValue = ''
      this.AobjectsData = ''
      this.ccpepolData = []
      this.selectionArr = []
      this.AssignArr = []
      this.designatedTasksType = []
      this.users = []
      this.$router.go(-1)
    },
    cancelForm() {
      this.blacknext()
    },
  },
}
</script>
    
<style scoped lang="scss">
#Newtask {
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
      margin-left: -1.071429rem;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .box-card {
      .img_upload {
        .img_box {
          display: inline-block;
          width: 3.5rem;
          height: 3.5rem;
          background-color: #ccc;
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
        }
      }
      .ccpepolData {
        position: relative;
        padding-right: 2.5rem;
        .van-icon {
          position: absolute;
          right: 0.714286rem;
          font-size: 1.285714rem;
        }
      }

      .details {
        border: none;
        margin-bottom: 0;
      }
    }
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>


