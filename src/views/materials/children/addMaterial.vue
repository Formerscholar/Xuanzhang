<template>
  <div id="addMaterial">
    <van-nav-bar title="新建物料" left-arrow @click-left="onClickLeft" right-text="提交" />
    <scroll class="scroll-wrapper">
      <el-card class="box-card">
        <el-row class="van-cell uploadImage">
          <span>上传图片</span>
          <!-- <Avatar :PropsImg="PropsImg" @ObtainUrl="ObtainUrl" style="margin: 0 0.357143rem;" /> -->
          <van-uploader :after-read="afterRead" />
        </el-row>
        <van-field v-model="text" label="物料名称" />
        <van-field v-model="text" label="物料规格" />
        <el-row class="van-cell MaterialProperties">
          <span>物料属性</span>
          <el-select v-model="value" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="Propertiestext"></span>
        </el-row>
        <el-row class="van-cell MaterialProperties">
          <span>物料分类</span>
          <el-select v-model="values" placeholder="请选择" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="Propertiestext">新增分类</span>
        </el-row>
        <van-field label="物料编码" value="自动生成" readonly />
        <el-row class="van-cell MaterialProperties">
          <span>基本单位</span>
          <el-select v-model="valuess" placeholder="请选择" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in optionsss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="Propertiestext">新增单位</span>
        </el-row>
        <van-field v-model="number" type="number" label="物料价格" />
        <van-field label="入库价格" value="自动生成" readonly />
        <van-field label="出库价格" value="自动生成" readonly />
        <van-field label="bom价格" value="自动生成" readonly />
      </el-card>
      <el-card class="box-card">
        <el-row class="van-cell MaterialProperties">
          <span>默认仓库</span>
          <el-select v-model="valuess" placeholder="请选择" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in optionsss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="Propertiestext">新增仓库</span>
        </el-row>
        <van-field v-model="digit" type="digit" label="库位号" />
      </el-card>
      <el-card class="box-card">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="库存预警" name="1">
            <van-field v-model="digit" type="digit" label="最大库存" />
            <van-field v-model="digit" type="digit" label="安全库存" />
            <van-field v-model="digit" type="digit" label="最小库存" />
            <van-field v-model="digit" type="digit" label="基本库存" />
          </el-collapse-item>
          <el-collapse-item title="物料详情" name="2">
            <van-field v-model="text" label="重量" />
            <van-field v-model="text" label="计件价格" />
            <van-field v-model="text" label="产品材质" />
            <van-field v-model="text" label="模具编码" />
            <el-upload
              class="upload-demo van-cell"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <span>模具照片</span>
              <el-button size="small" type="primary">上传</el-button>
            </el-upload>
          </el-collapse-item>
          <el-collapse-item title="质量验收及图纸" name="3">
            <el-upload
              class="upload-demo van-cell"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传设计图</el-button>
            </el-upload>
            <el-upload
              class="upload-demo van-cell"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
            <van-field v-model="message" rows="1" autosize label="备注" type="textarea" />
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </scroll>
  </div>
</template>
    
<script>
import Avatar from '@/components/content/Avatar/Avatar'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'addMaterial',
  data() {
    return {
      activeNames: [],
      PropsImg: '',
      options: [
        {
          value: '1',
          label: '产品'
        },
        {
          value: '2',
          label: '零件'
        }
      ],
      value: '1',
      optionss: [
        {
          value: '1',
          label: '2222'
        },
        {
          value: '2',
          label: '111'
        }
      ],
      values: '',
      optionsss: [
        {
          value: '1',
          label: '个'
        }
      ],
      valuess: ''
    }
  },
  components: { Avatar, scroll },
  activated() {
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    handleChange(val) {
      console.log(val)
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    ObtainUrl(data) {
      this.PropsImg = data
    }
  }
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  height: calc(100vh - 3.285714rem);
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 3.285714rem;
    bottom: 0;
    overflow: hidden;
    .box-card {
      margin-bottom: 0.571429rem;
    }
  }
  
  .uploadImage {
    .van-uploader {
      margin-left: 0.714286rem;
    }
  }
  .MaterialProperties {
    display: flex;
    .el-select {
      flex: 1;
    }
    .Propertiestext {
      width: 89px;
    }
  }
}
</style>
