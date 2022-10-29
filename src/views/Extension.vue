<template>
  <div>
    <transition name="el-fade-in-linear">
      <div v-if="companyData" class="dashbord-container">
        <h1 style="text-align: center">
          <strong>{{ companyData.prettyName }}</strong>
        </h1>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="5"
            ><el-progress
              :width="80"
              type="circle"
              :percentage="companyDetails.carbonFootprint.value * 33.3"
              :format="() => companyDetails.carbonFootprint.value + '/3'"
            ></el-progress>
            <p style="text-align: center">
              <strong>Carbon Footprint</strong>
            </p></el-col
          >

          <el-col :offset="1" :span="5"
            ><el-progress
              :width="80"
              type="circle"
              :percentage="companyDetails.carbonFootprint.value * 33.3"
              :format="() => companyDetails.carbonFootprint.value + '/3'"
            ></el-progress>
            <p style="text-align: center">
              <strong>Pollution</strong>
            </p></el-col
          >
        </el-row>

        <!-- :percentage="companyData.carbonFootprint.value * 10" -->

        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>Companies</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              companyData.summary.industry
            }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              companyData.prettyName
            }}</el-breadcrumb-item>
          </el-breadcrumb> -->
        <!-- <el-row :gutter="20" class="data-card"> -->
        <!-- <Summary :data="companyData" :details="companyDetails" /> -->
        <!-- </el-row> -->
        <!-- <el-row :gutter="20" class="data-card">
            <Carbon :data="companyData" :details="companyDetails" />
          </el-row> -->

        <el-row :gutter="20" class="data-card">
          <breakdown :data="companyData" />
        </el-row>
        <p>
          {{ companyData.prettyName }} ranks in the
          <el-tag
            :type="companyData.summary.percentile < 50 ? 'success' : 'danger'"
            >{{ Math.round(companyData.summary.percentile) }}th
          </el-tag>
          percentile for enviromental harm of the
          <em>{{ companyData.summary.industry }}</em> industry
        </p>
        <!-- <strong>Looking for better enviromental credentials?</strong>
        <br />
        <br /><br /> -->
        <el-button type="success" round
          ><a
            target="_blank"
            :href="
              'https://greeneye.docsoc.co.uk/#/company/' +
              this.$route.params.name.trim()
            "
            >Show Alternatives</a
          >
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import breakdown from "../components/breakdownLite.vue";
// import Carbon from "../components/carbon.vue";
// import Summary from "../components/summary.vue";
export default {
  components: {
    breakdown,
    // Summary,
    // Carbon,
  },
  data() {
    return {
      companyData: null,
      companyDetails: {
        carbonFootprint: {
          value: 0,
          rating: "A",
        },
      },
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
    width: 90%
    margin: 1em auto 0 auto
.data-card
    margin-top: 1em
</style>
