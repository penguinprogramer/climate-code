<template>
  <div>
    <el-scrollbar wrap-style="max-height: 100vh;">
      <transition name="el-fade-in-linear">
        <div v-if="companyData" class="dashbord-container">
          <el-row :gutter="20">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <breakdown :data="companyData.breakdown" /></div
            ></el-col>
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <intensity :data="companyData.intensity" /></div
            ></el-col>
          </el-row>
        </div>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import breakdown from "../components/breakdown.vue";
import Intensity from "../components/intensity.vue";
export default {
  components: {
    breakdown,
    Intensity,
  },
  data() {
    return {
      companyData: null,
    };
  },
  async created() {
    const loading = this.$loading({
      lock: true,
    });
    this.companyData = await this.getData(this.$route.params.name);
    loading.close();
  },
  methods: {
    async getData(company) {
      const response = await fetch("/api/companies?name=" + company.trim());
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
</style>
