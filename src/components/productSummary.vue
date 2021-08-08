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
            ? "Worse than"
            : "Better than"
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
      {{ data.name }} emit around
      <strong> {{ data.details.total_emissions }} kg </strong>
      of carbon dioxide per kg of product produced.
    </p>
    <statement
      :data="data"
      datakey="freshwater_withdrawals_per_kilogram_liters_per_kilogram"
      unit="liters of freshwater is used per kilogram"
    />
    <statement
      :data="data"
      datakey="land_use_per_kilogram_m²_per_kilogram"
      unit="m² of land is used per kilogram"
    />
  </el-card>
</template>

<script>
import converter from "number-to-words";
import statement from "./statement.vue";
export default {
  components: { statement },
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
