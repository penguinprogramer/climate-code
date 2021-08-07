<template>
  <div>
    cam
    <div class="video-container">
      <video ref="video" id="vid" playsinline autoplay></video>
    </div>
    <search-bar />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
export default {
  components: { SearchBar },
  data() {
    return {
      stream: null,
    };
  },
  async created() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      this.$refs.video.srcObject = this.stream;
    } catch (error) {
      console.log("error setting up video", error);
    }
  },
};
</script>

<style lang="sass" scoped>
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
