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
            placeholder="Type something"
            prefix-icon="el-icon-search"
            @input="refine(inputValue)"
            v-model="inputValue"
          >
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

export default {
  data() {
    return {
      inputValue: "",
      searchClient: algoliasearch(
        "94O6A12T6R",
        "ab51f12ba8dbc0d3640438bb6c40daf7"
      ),
    };
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
