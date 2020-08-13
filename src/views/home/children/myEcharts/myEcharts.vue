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
          text: '销售订单报表',
          align: 'left',
        },
        xAxis: {
          categories: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月',
          ],
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
      let Arr = []
      for (const key in data.OrderStatus) {
        if (typeof data.OrderStatus[key] == 'object') {
          Arr.push(Math.round(data.OrderStatus[key].Sale))
        }
      }
      state.options.series[0].data = Arr.reverse()
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