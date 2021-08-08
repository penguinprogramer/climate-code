<template>
  <p>
    Around
    <strong :style="{ color: betterThanAverage ? '#67c23a' : '#f56c6c' }"
      >{{ cur }}
    </strong>
    {{ unit }} of product compared to an average of
    {{ avg.toFixed(2) }}
  </p>
</template>

<script>
export default {
  props: {
    unit: String,
    data: Object,
    datakey: String,
  },
  computed: {
    avg() {
      return this.data.average[this.datakey];
    },
    cur() {
      return this.data.details[this.datakey];
    },
    betterThanAverage() {
      return this.avg > this.cur;
    },
  },
};
</script>

<style lang="sass" scoped></style>
