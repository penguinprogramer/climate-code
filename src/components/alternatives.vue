<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span
        >Here are some alternatives to
        <strong>{{ data.prettyName }}</strong> from the
        <em> "{{ data.summary.industry }}" </em> industry which have better
        enviromental credentials
      </span>
    </div>
    <el-card
      class="alternative-card"
      v-for="item in data.alternatives"
      :key="item.name"
    >
      {{ item.name }}
      <el-tag
        class="tag-percentile"
        :type="item.percentile < 50 ? 'success' : 'danger'"
        >{{ Math.round(item.percentile) }}th percentile
      </el-tag>
      <el-button
        type="text"
        @click="
          $router.replace({
            name: 'Company',
            params: { name: item.name },
          })
        "
        >More info</el-button
      >
    </el-card>
  </el-card>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="sass" scoped>
.tag-percentile
    float: right
.alternative-card
    margin-top: 2em
    padding: 1em
</style>
