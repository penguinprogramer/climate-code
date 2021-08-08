<template>
  <div>
    <div class="video-container">
      <video ref="video" id="vid" playsinline autoplay></video>
    </div>
    <div class="search-container">
      <search-bar :onCam="true" />
    </div>
    <canvas
      ref="canvas"
      width="{217}"
      height="{217}"
      style="
        display: {
          started?'block': 'none';
        }
      "
    ></canvas>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Quagga from "quagga"; // ES6
import algoliasearch from "algoliasearch/lite";

export default {
  components: { SearchBar },
  data() {
    return {
      stream: null,
      tracking: true,
    };
  },
  methods: {
    findProduct(name) {
      const client = algoliasearch(
        "94O6A12T6R",
        "ab51f12ba8dbc0d3640438bb6c40daf7"
      );
      const index = client.initIndex("products");

      // only query string
      index.search(name).then(({ hits }) => {
        console.log(hits);
      });
    },
    async findCompany({ code }) {
      console.log("barcode");
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${code}.json`
      );

      const json = await response.json();
      console.log(code, json);

      if (json?.product?.brands) {
        console.log("EMMITting");
        this.$emit("companyResult", json.product.brands);
        this.findProduct(json?.product?._keywords[0]);
      } else {
        this.$message({
          message: "Could not find brand",
          type: "warning",
        });
      }
    },
  },
  destroyed() {
    Quagga.stop();
  },

  async created() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        },
      });
      this.$refs.video.srcObject = this.stream;
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: this.$refs.video, // Or '#yourElement' (optional)
          },
          decoder: {
            readers: ["ean_reader"],
          },
        },
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
        }
      );
    } catch (error) {
      console.log("error setting up video", error);
    }
    Quagga.onDetected(({ codeResult }) => {
      this.findCompany(codeResult);
    });
  },
};
</script>

<style lang="sass" scoped>
.video-container
    position: fixed
    top: 0
    left: 0
    min-width: 100vw
    min-height: 100vh

    & > video
        display: block
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        z-index: -1
        min-width: 100vw
        min-height: 100vh
.search-container
    margin: 4em 2em
    opacity: 0.6
// @media screen and (max-aspect-ratio: 1920/1080)
// .video-container > video
//     height: 100%

// @media screen and (min-aspect-ratio: 1920/1080)
// .video-container > video
//     width: 100%
</style>
