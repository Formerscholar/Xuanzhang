<template>
  <div id="container" style="width: 100%;height:15.714286rem;"></div>
</template>
    
<script>
import { reactive, onActivated, computed } from '@vue/composition-api'
import { getUserIndex } from '@/network/home'

export default {
  setup(props, { root }) {
    const state = reactive({
      options: {
        credits: { enabled: false },
        subtitle: {
          text: '',
        },
        title: {
          text: '发货数据',
          align: 'left',
        },
        xAxis: {
          categories: [],
          labels: {
            autoRotation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            // step: 2,
            // formatter: function () {
            //   if (
            //     this.value == '1' ||
            //     this.value == '3' ||
            //     this.value == '6' ||
            //     this.value == '9' ||
            //     this.value == '12'
            //   ) {
            //     return this.value
            //   }
            // },
          },
        },
        yAxis: {
          visible: false,
          title: {
            text: '',
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: '#808080',
            },
          ],
        },
        tooltip: {
          valueSuffix: '元',
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0,
          enabled: false,
        },
        series: [
          {
            name: '',
            data: [],
          },
        ],
      },
    })

    onActivated(() => {
      getechIndex()
    })

    const getUserIndexData = computed(() => {
      return {
        token: root.$store.state.token,
        _: new Date().getTime(),
      }
    })

    async function getechIndex() {
      const { data } = await getUserIndex(getUserIndexData.value)
      console.log('getUserIndex', data)
      let arr = []
      let month = []
      for (let k = 11; k >= 0; k--) {
        arr.push(parseInt(data.OrderStatus.flowingWater[k].sale))
        month.push(data.OrderStatus.flowingWater[k].month.split('月')[0])
      }
      console.log(arr, month)
      state.options.series[0].data = arr
      state.options.xAxis.categories = month
      Highcharts.chart('container', state.options)
    }

    return {
      state,
    }
  },
}
</script>
    
<style lang="scss" scoped>
</style>