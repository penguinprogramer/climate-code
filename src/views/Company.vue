<template>
  <div>
    <el-scrollbar wrap-style="max-height: 100vh;">
      <transition name="el-fade-in-linear">
        <div v-if="companyData" class="dashbord-container">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>Companies</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              companyData.summary.industry
            }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              companyData.prettyName
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row :gutter="20" class="data-card">
            <Summary :data="companyData" :details="companyDetails" />
          </el-row>
          <el-row :gutter="20" class="data-card">
            <Carbon :data="companyData" :details="companyDetails" />
          </el-row>
          <el-row :gutter="20" class="data-card">
            <intensity :data="companyData" />
          </el-row>
          <el-row :gutter="20" class="data-card">
            <breakdown :data="companyData" />
          </el-row>
          <el-row :gutter="20" class="data-card">
            <alternatives :data="companyData" />
          </el-row>
        </div>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import Alternatives from "../components/alternatives.vue";
import breakdown from "../components/breakdown.vue";
import Carbon from "../components/carbon.vue";
import Intensity from "../components/intensity.vue";
import Summary from "../components/summary.vue";
export default {
  components: {
    breakdown,
    Intensity,
    Summary,
    Carbon,
    Alternatives,
  },
  data() {
    return {
      companyData: null,
      companyDetails: null,
    };
  },
  async created() {
    const loading = this.$loading({
      lock: true,
    });
    this.companyData = await this.getData(this.$route.params.name);
    this.companyDetails = await this.getDetails(this.$route.params.name);
    loading.close();
  },
  methods: {
    async getData(company) {
      const response = await fetch("/companies?name=" + company.trim());
      const json = response.json();
      return json;
    },
    async getDetails(company) {
      const response = await fetch("/details?name=" + company.trim());
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
