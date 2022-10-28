<template>
  <el-card class="box-card">
    <h1>
      <strong>Carbon Impact</strong>
    </h1>
    <p>
      {{ data.prettyName }} receives a carbon impact grade of
      <el-tag
        :type="details.carbonFootprint.rating == 'A' ? 'success' : 'danger'"
        >{{ details.carbonFootprint.rating }}
      </el-tag>
      in the
      <em>{{ data.summary.industry }}</em> industry
    </p>
    <div class="center-it">
      <el-card class="box-card cost-card">
        <h2>{{ Math.round(Math.random() * 1000000) / 10 }} tons</h2>
      </el-card>
    </div>
    <p>
      <a :href="details.certificate.url"> View carbon certificate </a> does
      around
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
