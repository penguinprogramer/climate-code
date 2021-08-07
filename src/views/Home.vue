<template>
  <div class="home" v-bind:style="homeStyle">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <search-bar class="search" />
    <div id="autocomplete" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import niceColorPalettes from "nice-color-palettes";
export default {
  name: "Home",
  components: {
    SearchBar,
  },
  data() {
    return {
      colors: [],
      homeStyle: {
        background: "",
      },
    };
  },
  mounted() {
    this.colors =
      niceColorPalettes[Math.round(niceColorPalettes.length * Math.random())];
    this.homeStyle.background = `linear-gradient(to bottom, ${this.colors[0]}, ${this.colors[0]})`;
  },
};
</script>
<style lang="sass" scoped>
.search
  max-width: 400px
  width: 80%
.home
  padding-top: 50vh
  display: flex
  // justify-content: center
  align-items: center
  flex-direction: column
  height: 100%
</style>
