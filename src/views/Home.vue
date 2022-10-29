<template>
  <div>
    <div class="video-container">
      <video ref="vid" autoplay muted loop class="video-background">
        <source src="../assets/bg.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="typing">
      <h1>
        <span id="type-text-container"
          ><span id="type-text">Green Eye </span></span
        >
      </h1>
    </div>
    <div class="home" v-bind:style="homeStyle">
      <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
      <search-bar class="search" />
      <div id="autocomplete" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "../components/SearchBar.vue";
import niceColorPalettes from "nice-color-palettes";
// import Typed from "typed.js";

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
    this.$refs.vid.playbackRate = 0.5;
    // var options = {
    //   strings: [
    //     "The products <strong>you</strong> buy,",
    //     "The companies <strong>you</strong> use,",
    //     "It all makes a difference",
    //     "Choose the ones that don't cost the earth",
    //   ],
    //   typeSpeed: 200,
    //   backSpeed: 40,
    //   backDelay: 1000,

    //   loop: true,

    //   // showCursor: false,
    // };

    // new Typed("#type-text", options);
    // this.homeStyle.background = `linear-gradient(to bottom, ${this.colors[0]}, ${this.colors[0]})`;
  },
};
</script>
<style lang="sass" scoped>
.typing
  position: fixed
  text-align: center
  width: 100%
  top: 25%
  color: #fff
  h1
    span
      background: #1abc9c
      font-size: 50px
      padding: 0.3em 0.3em 0.3em 0.3em
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
.video-container
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh

  & > video
    display: block
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    z-index: -1

@media screen and (max-aspect-ratio: 1920/1080)
  .video-container > video
    height: 100%

@media screen and (min-aspect-ratio: 1920/1080)
  .video-container > video
    width: 100%
</style>
