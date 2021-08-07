<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span
        >How much enviromental harm does
        <strong>{{ data.prettyName }}</strong> do compared to the rest of the
        <em> "{{ data.summary.industry }}" </em> industry
      </span>
    </div>
    <v-chart class="chart" :option="option" />
  </el-card>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "HelloWorld",
  components: {
    VChart,
  },
  props: {
    data: Object,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  data() {
    return {
      option: {
        title: {
          //   text: "Traffic Sources",
          //   left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Industry Average",
            type: "line",

            data: this.data.industryIntesity,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            name: this.data.name,
            type: "line",

            data: this.data.intensity,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
