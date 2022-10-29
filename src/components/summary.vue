<template>
  <el-card class="box-card">
    <h1>
      <strong>{{ data.prettyName }}</strong>
    </h1>
    <p>
      {{ data.prettyName }} ranks in the
      <el-tag :type="data.summary.percentile < 50 ? 'success' : 'danger'"
        >{{ Math.round(data.summary.percentile) }}th
      </el-tag>
      percentile for enviromental harm of the
      <em>{{ data.summary.industry }}</em> industry
    </p>
    <div class="center-it">
      <el-card class="box-card cost-card">
        <h2>
          ${{
            (Math.round(data.summary.cost / 100) * 100)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </h2>
      </el-card>
    </div>
    <p>
      {{ data.prettyName }} does around
      <strong> {{ words(Number(data.summary.cost.toPrecision(4))) }} </strong>
      dollars worth of envviromental harm in every year on average
    </p>
  </el-card>
</template>

<script>
import converter from "number-to-words";
export default {
  props: {
    data: Object,
    details: Object,
  },
  methods: {
    words(number) {
      return converter.toWords(number);
    },
  },
  mounted() {
    console.log(this.details);
  },
};
</script>

<style lang="sass" scoped>
.cost-card
    margin: auto
    display: inline-block
.center-it
    display: flex
    justify-content: center
    align-items: center
</style>
