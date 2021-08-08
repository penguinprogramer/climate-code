<template>
  <el-card class="box-card">
    <h1>
      <strong>{{ data.name }}</strong>
    </h1>
    <p>
      {{ data.name }} ranks
      <el-tag
        :type="
          data.details.total_emissions < data.average.total_emissions
            ? 'success'
            : 'danger'
        "
      >
        {{
          data.details.total_emissions > data.average.total_emissions
            ? "Below"
            : "Above"
        }}
        average
      </el-tag>
      for total emissions
    </p>
    <div class="center-it">
      <el-card class="box-card cost-card">
        <h2>{{ data.details.total_emissions }} kg</h2>
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
  },
  methods: {
    words(number) {
      return converter.toWords(number);
    },
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
