<template>
  <div>
    <el-scrollbar wrap-style="max-height: 100vh;">
      <transition name="el-fade-in-linear">
        <div v-if="productData" class="dashbord-container">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>Products</el-breadcrumb-item>

            <el-breadcrumb-item>{{ productData.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row :gutter="20" class="data-card">
            <Summary :data="productData" />
          </el-row>
          <!-- <el-row :gutter="20" class="data-card">
            <intensity :data="productData" />
          </el-row> -->
          <el-row :gutter="20" class="data-card">
            <breakdown
              :data="productData"
              title="What are the sources of emmissions from"
            />
          </el-row>
        </div>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import breakdown from "../components/breakdown.vue";
import Summary from "../components/summary.vue";
export default {
  components: {
    breakdown,
    Summary,
  },
  data() {
    return {
      productData: null,
    };
  },
  async created() {
    const loading = this.$loading({
      lock: true,
    });
    this.productData = await this.getData(this.$route.params.name);
    loading.close();
  },
  methods: {
    async getData(product) {
      const response = await fetch("/api/products?name=" + product.trim());
      const json = response.json();
      return json;
    },
  },
};
</script>

<style lang="sass" scoped>
.dashbord-container
    width: 80%
    margin: 5em auto
.data-card
    margin-top: 2em
</style>
