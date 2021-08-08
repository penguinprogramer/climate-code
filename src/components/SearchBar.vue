<template>
  <div>
    <ais-instant-search
      class="search-bar"
      :search-client="searchClient"
      index-name="comapnies"
    >
      <ais-search-box>
        <div slot-scope="{ isSearchStalled, refine }">
          <el-input
            placeholder="Check a company / product"
            prefix-icon="el-icon-search"
            @input="refine(inputValue)"
            @focus="refine(inputValue)"
            v-model="inputValue"
          >
            <el-button
              v-if="onCam"
              slot="prepend"
              icon="el-icon-s-home"
              @click="
                $router.push({
                  name: 'Home',
                })
              "
            ></el-button>
            <el-button
              v-if="!onCam"
              slot="append"
              icon="el-icon-camera"
              @click="
                $router.push({
                  name: 'Camera',
                })
              "
            ></el-button>
          </el-input>

          <span :hidden="!isSearchStalled">Loading...</span>
        </div>
      </ais-search-box>
      <el-scrollbar wrap-style="max-height: 49vh;">
        <ais-hits>
          <el-card
            class="search-result"
            shadow="hover"
            slot="item"
            slot-scope="{ item }"
          >
            <div slot="header" class="clearfix">
              <span class="company-name">{{
                item[" Company Name "].toLowerCase()
              }}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="
                  $router.push({
                    name: 'Company',
                    params: { name: item[' Company Name '] },
                  })
                "
                >More info</el-button
              >
            </div>

            {{ item[" Year "] }}
            {{ item[" Industry (Exiobase) "] }}
          </el-card>
        </ais-hits>
      </el-scrollbar>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
const algoliaClient = algoliasearch(
  "94O6A12T6R",
  "ab51f12ba8dbc0d3640438bb6c40daf7"
);
const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};
export default {
  props: {
    onCam: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: "",
      searchClient,
    };
  },
  methods: {
    setValue: function (value) {
      console.log("setting value");
      this.inputValue = value;
    },
  },
  created: function () {
    //   console.log()
    this.$parent.$on("companyResult", this.setValue);
  },
};
</script>
<style lang="sass" scoped>
.search-bar
    // width: 100px
    height: 50vh
.search-result
    margin-top: 1em
.company-name
    text-transform: capitalize
</style>
